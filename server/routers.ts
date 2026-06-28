import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { createQuote, getQuoteById, getAllQuotes, updateQuoteStatus } from "./db";
import { InsertQuote } from "../drizzle/schema";
import { z } from "zod";
import { notifyOwner } from "./_core/notification";

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
});

export type AppRouter = typeof appRouter;
