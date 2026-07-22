import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, quotes, Quote, InsertQuote, newsletterSubscribers, NewsletterSubscriber } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    // updateSet only contains fields safe to overwrite on subsequent logins
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }

    // --- Role assignment: ONLY on INSERT (new user creation) ---
    // Determine the email domain with an EXACT suffix match
    const emailLower = (user.email || '').toLowerCase();
    const isTruxinsDomain = emailLower.endsWith('@truxins.com');
    const isOwner = user.openId === ENV.ownerOpenId;

    // For INSERT (new user): assign role based on email domain
    // Admin is ONLY granted to the exact email milen@truxins.com or via explicit admin role-change
    const isAdminEmail = emailLower === 'milen@truxins.com';

    if (user.role !== undefined) {
      // Explicit role passed (e.g., from admin role-change) — apply to both insert and update
      values.role = user.role;
      updateSet.role = user.role;
    } else {
      // Auto-role only for INSERT values (new users)
      if (isAdminEmail) {
        values.role = 'admin';
      } else if (isTruxinsDomain) {
        values.role = 'staff';
      } else {
        values.role = 'user'; // pending approval
      }
      // DO NOT put role in updateSet — existing DB row's role wins on subsequent logins
    }

    // --- Account status: ONLY on INSERT (new user creation) ---
    if (isAdminEmail || isTruxinsDomain) {
      // @truxins.com accounts are auto-approved on creation
      (values as any).accountStatus = 'approved';
      // DO NOT override status on update — admin may have changed it
    } else {
      // Non-truxins accounts start as pending
      (values as any).accountStatus = 'pending';
      // DO NOT override status on update — admin may have approved them
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// TODO: add feature queries here as your schema grows.

// Quote helpers
export async function createQuote(quote: InsertQuote): Promise<Quote | null> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create quote: database not available");
    return null;
  }

  try {
    // Ensure effectiveDate is a Date object (frontend sends it as a string)
    // Also ensure all required fields have proper values (not undefined/default)
    const values = {
      ...quote,
      effectiveDate: quote.effectiveDate instanceof Date ? quote.effectiveDate : (quote.effectiveDate ? new Date(quote.effectiveDate as any) : new Date()),
      hasDba: quote.hasDba ?? 0,
      sameAsMailingAddress: quote.sameAsMailingAddress ?? 0,
      allVehiclesSameLocation: quote.allVehiclesSameLocation ?? 0,
      selectedCoverages: quote.selectedCoverages ?? [],
      trucks: quote.trucks ?? [],
      trailers: quote.trailers ?? [],
      drivers: quote.drivers ?? [],
      commodities: quote.commodities ?? [],
      mailingAddress: quote.mailingAddress || '',
      mailingCity: quote.mailingCity || '',
      mailingState: quote.mailingState || quote.policyState || '',
      mailingZip: quote.mailingZip || '',
      yearEstablished: quote.yearEstablished || new Date().getFullYear(),
      businessStructure: quote.businessStructure || 'Other',
    };
    const result = await db.insert(quotes).values(values);
    const insertedId = (result as any).insertId;
    const created = await db.select().from(quotes).where(eq(quotes.id, insertedId)).limit(1);
    return created.length > 0 ? created[0] : null;
  } catch (error) {
    console.error("[Database] Failed to create quote:", error);
    throw error;
  }
}

export async function getQuoteById(id: number): Promise<Quote | null> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get quote: database not available");
    return null;
  }

  try {
    const result = await db.select().from(quotes).where(eq(quotes.id, id)).limit(1);
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error("[Database] Failed to get quote:", error);
    throw error;
  }
}

export async function getAllQuotes(): Promise<Quote[]> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get quotes: database not available");
    return [];
  }

  try {
    return await db.select().from(quotes).orderBy(quotes.createdAt);
  } catch (error) {
    console.error("[Database] Failed to get quotes:", error);
    throw error;
  }
}

export async function updateQuoteStatus(id: number, status: Quote['status'], notes?: string): Promise<Quote | null> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot update quote: database not available");
    return null;
  }

  try {
    await db.update(quotes).set({ status, notes, updatedAt: new Date() }).where(eq(quotes.id, id));
    return getQuoteById(id);
  } catch (error) {
    console.error("[Database] Failed to update quote:", error);
    throw error;
  }
}

// Newsletter subscriber helpers
export async function subscribeNewsletter(email: string): Promise<{ success: boolean; alreadySubscribed: boolean }> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot subscribe: database not available");
    return { success: false, alreadySubscribed: false };
  }

  try {
    // Check if already subscribed
    const existing = await db.select().from(newsletterSubscribers).where(eq(newsletterSubscribers.email, email)).limit(1);
    
    if (existing.length > 0) {
      // If previously unsubscribed, reactivate
      if (!existing[0].isActive) {
        await db.update(newsletterSubscribers)
          .set({ isActive: 1, unsubscribedAt: null })
          .where(eq(newsletterSubscribers.email, email));
        return { success: true, alreadySubscribed: false };
      }
      return { success: true, alreadySubscribed: true };
    }

    // Insert new subscriber
    await db.insert(newsletterSubscribers).values({ email });
    return { success: true, alreadySubscribed: false };
  } catch (error) {
    console.error("[Database] Failed to subscribe newsletter:", error);
    throw error;
  }
}

export async function unsubscribeNewsletter(email: string): Promise<boolean> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot unsubscribe: database not available");
    return false;
  }

  try {
    await db.update(newsletterSubscribers)
      .set({ isActive: 0, unsubscribedAt: new Date() })
      .where(eq(newsletterSubscribers.email, email));
    return true;
  } catch (error) {
    console.error("[Database] Failed to unsubscribe newsletter:", error);
    throw error;
  }
}
