import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure, staffProcedure, adminProcedure } from "./_core/trpc";
import { createQuote, getQuoteById, getAllQuotes, updateQuoteStatus, subscribeNewsletter, getDb } from "./db";
import { InsertQuote, users } from "../drizzle/schema";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { notifyOwner } from "./_core/notification";
import { makeRequest, PlaceDetailsResult } from "./_core/map";
import { sendQuoteNotification, sendContactNotification, sendNewsletterWelcome, sendSubmissionNotification } from "./email";
import { submitContactToJotform, submitFastQuoteToJotform, submitFullQuoteToJotform } from "./jotform-submit";
import { decodeVin, batchDecodeVins } from "./vin-decoder";
import { validateVin } from "../shared/vin-validator";
import { submissions, submissionFiles } from "../drizzle/schema";
import { desc, like, and, sql } from "drizzle-orm";
import { storagePut } from "./storage";

// Google Place ID for Trux Insurance Services
const TRUX_PLACE_ID = "ChIJq6pq55utD4gR7mAyuFzJt34";

// Cache reviews for 1 hour to avoid excessive API calls
let reviewsCache: { data: any; timestamp: number } | null = null;
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  reviews: router({
    getGoogleReviews: publicProcedure.query(async () => {
      // Return cached data if still valid
      if (reviewsCache && Date.now() - reviewsCache.timestamp < CACHE_DURATION) {
        return reviewsCache.data;
      }

      try {
        const details = await makeRequest<PlaceDetailsResult>(
          '/maps/api/place/details/json',
          {
            place_id: TRUX_PLACE_ID,
            fields: 'name,rating,user_ratings_total,reviews',
          }
        );

        if (details.status !== 'OK') {
          throw new Error(`Places API returned status: ${details.status}`);
        }

        const result = {
          name: details.result.name,
          rating: details.result.rating ?? 5,
          totalReviews: details.result.user_ratings_total ?? 0,
          reviews: (details.result.reviews ?? []).map((r) => ({
            authorName: r.author_name,
            rating: r.rating,
            text: r.text,
            time: r.time,
          })),
          placeId: TRUX_PLACE_ID,
        };

        // Cache the result
        reviewsCache = { data: result, timestamp: Date.now() };
        return result;
      } catch (error) {
        console.error('Failed to fetch Google Reviews:', error);
        // Return cached data even if expired, or null
        if (reviewsCache) {
          return reviewsCache.data;
        }
        return null;
      }
    }),
  }),

  quotes: router({
    submit: publicProcedure
      .input(z.any())
      .mutation(async ({ input }) => {
        const quote = input as InsertQuote;
        const created = await createQuote(quote);
        
        if (created?.id) {
          try {
            await notifyOwner({
              title: `New Quote: ${quote.businessName}`,
              content: `Business: ${quote.businessName}\nContact: ${quote.contactFirstName} ${quote.contactLastName}\nEmail: ${quote.contactEmail}\nPhone: ${quote.contactPhone}\nState: ${quote.policyState}\n\nView: /admin/quotes`,
            });
          } catch (error) {
            console.error('Notification failed:', error);
          }

          // Send email notification via Resend
          try {
            await sendQuoteNotification({
              businessName: quote.businessName || "",
              contactName: `${quote.contactFirstName} ${quote.contactLastName}`,
              email: quote.contactEmail || "",
              phone: quote.contactPhone || "",
              dotNumber: quote.dotNumber || undefined,
              state: quote.policyState || undefined,
              notes: quote.notes || undefined,
              submittedAt: new Date().toLocaleString("en-US", { timeZone: "America/Chicago" }),
            });
          } catch (error) {
            console.error('Email notification failed:', error);
          }

          // Push to JotForm (non-blocking)
          // Determine if this is a fast quote or full quote based on fields present
          const isFastQuote = !quote.ein && !quote.yearEstablished && !(quote.selectedCoverages as any[])?.length;
          if (isFastQuote) {
            submitFastQuoteToJotform({
              firstName: quote.contactFirstName || "",
              lastName: quote.contactLastName || "",
              email: quote.contactEmail || "",
              phone: quote.contactPhone || "",
              companyName: quote.businessName || "",
              dotNumber: quote.dotNumber || "",
              state: quote.policyState || "",
              notes: quote.notes || "",
            }).catch(err => console.error('[JotForm] Fast quote submission failed:', err));
          } else {
            submitFullQuoteToJotform({
              firstName: quote.contactFirstName || "",
              lastName: quote.contactLastName || "",
              companyName: quote.businessName || "",
              email: quote.contactEmail || "",
              phone: quote.contactPhone || "",
              dotMcNumber: quote.dotNumber || quote.mcNumber || "",
              primaryState: quote.policyState || "",
              powerUnits: String((quote.trucks as any[])?.length || 1),
              vehicleType: (quote.trucks as any[])?.[0]?.vehicleType || "",
              authorityType: "",
              ein: quote.ein || "",
              yearsInBusiness: quote.yearEstablished ? String(new Date().getFullYear() - quote.yearEstablished) : "",
              effectiveDate: quote.effectiveDate ? new Date(quote.effectiveDate).toISOString() : "",
              annualMileage: "",
              radiusOfOperation: "",
              annualRevenue: "",
              commodities: (quote.commodities as string[])?.join(", ") || "",
              avgLoadValue: "",
              maxLoadValue: "",
              coveragesNeeded: (quote.selectedCoverages as string[])?.join("\n") || "",
              desiredLimits: "",
              deductible: "",
              equipmentDetails: (quote.trucks as any[])?.map((t: any) => `${t.year} ${t.make} ${t.model} VIN:${t.vin || 'N/A'}`).join("\n") || "",
              driverDetails: (quote.drivers as any[])?.map((d: any) => `${d.firstName} ${d.lastName} DOB:${d.dob || 'N/A'} Lic:${d.licenseNumber || 'N/A'}`).join("\n") || "",
            }).catch(err => console.error('[JotForm] Full quote submission failed:', err));
          }
        }
        
        return { id: created?.id, success: !!created };
      }),
    
    getById: publicProcedure
      .input(z.number())
      .query(async ({ input }) => {
        return await getQuoteById(input);
      }),
    
    getAll: protectedProcedure
      .query(async ({ ctx }) => {
        if (ctx.user?.role !== 'admin') {
          throw new Error('Unauthorized');
        }
        return await getAllQuotes();
      }),
    
    updateStatus: protectedProcedure
      .input(z.object({
        id: z.number(),
        status: z.enum(['pending', 'under_review', 'approved', 'issued', 'rejected']),
        notes: z.string().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== 'admin') {
          throw new Error('Unauthorized');
        }
        return await updateQuoteStatus(input.id, input.status, input.notes);
      }),
  }),

  contact: router({
    submit: publicProcedure
      .input(z.object({
        name: z.string().min(1),
        email: z.string().email(),
        phone: z.string().optional(),
        company: z.string().optional(),
        message: z.string().min(1),
      }))
      .mutation(async ({ input }) => {
        try {
          await sendContactNotification({
            name: input.name,
            email: input.email,
            phone: input.phone,
            company: input.company,
            message: input.message,
            submittedAt: new Date().toLocaleString("en-US", { timeZone: "America/Chicago" }),
          });

          await notifyOwner({
            title: `Contact Form: ${input.name}`,
            content: `Name: ${input.name}\nEmail: ${input.email}\nPhone: ${input.phone || "—"}\nMessage: ${input.message}`,
          });
        } catch (error) {
          console.error('Contact form email failed:', error);
        }

        // Push to JotForm (non-blocking)
        submitContactToJotform({
          name: input.name,
          email: input.email,
          phone: input.phone,
          message: input.message,
        }).catch(err => console.error('[JotForm] Contact submission failed:', err));

        return { success: true };
      }),
  }),

  newsletter: router({
    subscribe: publicProcedure
      .input(z.object({
        email: z.string().email(),
      }))
      .mutation(async ({ input }) => {
        const result = await subscribeNewsletter(input.email);
        
        if (result.success && !result.alreadySubscribed) {
          // Send welcome email (non-blocking)
          sendNewsletterWelcome(input.email).catch((err) => {
            console.error('[Newsletter] Welcome email failed:', err);
          });
        }

        return result;
      }),
  }),

  portal: router({
    listUsers: staffProcedure.query(async () => {
      const db = await getDb();
      if (!db) return [];
      return await db.select().from(users).orderBy(users.createdAt);
    }),

    pendingUsers: staffProcedure.query(async () => {
      const db = await getDb();
      if (!db) return [];
      return await db.select().from(users).where(eq(users.accountStatus, "pending")).orderBy(users.createdAt);
    }),

    updateUserRole: adminProcedure
      .input(z.object({
        userId: z.number(),
        role: z.enum(["user", "staff", "admin", "customer"]),
      }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database not available");
        await db.update(users).set({ role: input.role }).where(eq(users.id, input.userId));
        return { success: true };
      }),

    updateUser: adminProcedure
      .input(z.object({
        userId: z.number(),
        name: z.string().optional(),
        email: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database not available");
        const updates: Record<string, any> = {};
        if (input.name !== undefined) updates.name = input.name;
        if (input.email !== undefined) updates.email = input.email;
        if (Object.keys(updates).length > 0) {
          await db.update(users).set(updates).where(eq(users.id, input.userId));
        }
        return { success: true };
      }),

    approveUser: staffProcedure
      .input(z.object({ userId: z.number() }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database not available");
        await db.update(users).set({ accountStatus: "approved" }).where(eq(users.id, input.userId));
        return { success: true };
      }),

    rejectUser: staffProcedure
      .input(z.object({ userId: z.number() }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database not available");
        await db.update(users).set({ accountStatus: "rejected" }).where(eq(users.id, input.userId));
        return { success: true };
      }),

    // Staff+ can view all quotes
    getAllQuotes: staffProcedure.query(async () => {
      return await getAllQuotes();
    }),
  }),

  // VIN verification procedures
  vin: router({
    validate: publicProcedure
      .input(z.object({ vin: z.string() }))
      .mutation(({ input }) => {
        return validateVin(input.vin);
      }),
    decode: publicProcedure
      .input(z.object({ vin: z.string(), modelYear: z.number().optional() }))
      .mutation(async ({ input }) => {
        return await decodeVin(input.vin, input.modelYear);
      }),
    batchDecode: publicProcedure
      .input(z.object({ vins: z.array(z.string()) }))
      .mutation(async ({ input }) => {
        return await batchDecodeVins(input.vins);
      }),
  }),

  // Submissions procedures
  submissions: router({
    create: publicProcedure
      .input(z.object({
        type: z.enum(['policy_change', 'certificate', 'claim', 'account_review', 'contact', 'fast_quote', 'full_quote']),
        customerEmail: z.string().email().optional(),
        userId: z.number().optional(),
        takenByUserId: z.number().optional(),
        data: z.array(z.object({
          section: z.string(),
          fields: z.array(z.object({ label: z.string(), value: z.any() })),
        })),
      }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new Error('Database unavailable');

        // Generate ref: TRX-YYMMDD-XXXX
        const now = new Date();
        const yy = String(now.getFullYear()).slice(2);
        const mm = String(now.getMonth() + 1).padStart(2, '0');
        const dd = String(now.getDate()).padStart(2, '0');
        const rand = String(Math.floor(Math.random() * 10000)).padStart(4, '0');
        const ref = `TRX-${yy}${mm}${dd}-${rand}`;

        const [result] = await db.insert(submissions).values({
          ref,
          type: input.type,
          userId: input.userId || null,
          customerEmail: input.customerEmail || null,
          takenByUserId: input.takenByUserId || null,
          data: input.data,
        });

        // Send email notification (fire-and-forget)
        const flatFields = (input.data || []).flatMap((s: any) =>
          (s.fields || []).map((f: any) => ({ label: f.label, value: String(f.value || '') }))
        );
        sendSubmissionNotification({
          ref,
          type: input.type,
          customerEmail: input.customerEmail || null,
          fields: flatFields,
        }).catch(() => {});

        return { id: result.insertId, ref };
      }),

    list: staffProcedure
      .input(z.object({
        search: z.string().optional(),
        type: z.string().optional(),
        workStatus: z.string().optional(),
        limit: z.number().default(50),
        offset: z.number().default(0),
      }).optional())
      .query(async ({ input }) => {
        const db = await getDb();
        if (!db) return [];
        const filters = input || { search: undefined, type: undefined, workStatus: undefined, limit: 50, offset: 0 };

        let query = db.select().from(submissions).orderBy(desc(submissions.createdAt));

        // Apply filters
        const conditions = [];
        if (filters.type) {
          conditions.push(eq(submissions.type, filters.type as any));
        }
        if (filters.workStatus) {
          conditions.push(eq(submissions.workStatus, filters.workStatus as any));
        }
        if (filters.search) {
          conditions.push(
            sql`(${submissions.ref} LIKE ${`%${filters.search}%`} OR ${submissions.customerEmail} LIKE ${`%${filters.search}%`} OR JSON_EXTRACT(${submissions.data}, '$') LIKE ${`%${filters.search}%`})`
          );
        }

        if (conditions.length > 0) {
          query = query.where(and(...conditions)) as any;
        }

        return await (query as any).limit(filters.limit).offset(filters.offset);
      }),

    updateStatus: staffProcedure
      .input(z.object({
        id: z.number(),
        workStatus: z.enum(['new', 'in_progress', 'done']),
      }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new Error('Database unavailable');
        await db.update(submissions).set({ workStatus: input.workStatus }).where(eq(submissions.id, input.id));
        return { success: true };
      }),

    getFiles: staffProcedure
      .input(z.object({ submissionId: z.number() }))
      .query(async ({ input }) => {
        const db = await getDb();
        if (!db) return [];
        return await db.select().from(submissionFiles).where(eq(submissionFiles.submissionId, input.submissionId));
      }),
  }),
});
export type AppRouter = typeof appRouter;
