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
import { sendQuoteNotification, sendContactNotification, sendNewsletterWelcome } from "./email";
import { submitContactToJotform, submitFastQuoteToJotform, submitFullQuoteToJotform } from "./jotform-submit";

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
        role: z.enum(["user", "staff", "admin"]),
      }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database not available");
        await db.update(users).set({ role: input.role }).where(eq(users.id, input.userId));
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
});

export type AppRouter = typeof appRouter;
