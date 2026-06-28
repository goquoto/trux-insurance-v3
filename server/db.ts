import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, quotes, Quote, InsertQuote } from "../drizzle/schema";
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
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
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
    const result = await db.insert(quotes).values(quote);
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
