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
    listUsers: adminProcedure.query(async () => {
      const db = await getDb();
      if (!db) return [];
      return await db.select().from(users).orderBy(users.createdAt);
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

    // Staff+ can view all quotes (same as existing but with staffProcedure)
    getAllQuotes: staffProcedure.query(async () => {
      return await getAllQuotes();
    }),
  }),
});

export type AppRouter = typeof appRouter;
