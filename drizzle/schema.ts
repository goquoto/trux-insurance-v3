import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, datetime, json } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "staff", "admin", "customer"]).default("user").notNull(),
  accountStatus: mysqlEnum("accountStatus", ["pending", "approved", "rejected"]).default("pending").notNull(),
  authProvider: varchar("authProvider", { length: 64 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Quotes table for storing insurance quote submissions
export const quotes = mysqlTable('quotes', {
  id: int('id').autoincrement().primaryKey(),
  
  // Basic Info
  effectiveDate: datetime('effectiveDate').notNull(),
  policyState: varchar('policyState', { length: 50 }).notNull(),
  currentlyInsured: int('currentlyInsured').notNull(),
  targetPremium: int('targetPremium'),
  dotNumber: varchar('dotNumber', { length: 20 }),
  mcNumber: varchar('mcNumber', { length: 20 }),
  ein: varchar('ein', { length: 20 }),
  
  // Business Info
  businessName: varchar('businessName', { length: 255 }).notNull(),
  hasDba: int('hasDba').notNull(),
  dbaName: varchar('dbaName', { length: 255 }),
  businessStructure: varchar('businessStructure', { length: 50 }).notNull(),
  website: varchar('website', { length: 255 }),
  yearEstablished: int('yearEstablished').notNull(),
  
  // Addresses
  mailingAddress: text('mailingAddress').notNull(),
  mailingCity: varchar('mailingCity', { length: 100 }).notNull(),
  mailingState: varchar('mailingState', { length: 50 }).notNull(),
  mailingZip: varchar('mailingZip', { length: 10 }).notNull(),
  garagingAddress: text('garagingAddress'),
  garagingCity: varchar('garagingCity', { length: 100 }),
  garagingState: varchar('garagingState', { length: 50 }),
  garagingZip: varchar('garagingZip', { length: 10 }),
  sameAsMailingAddress: int('sameAsMailingAddress').notNull(),
  allVehiclesSameLocation: int('allVehiclesSameLocation').notNull(),
  
  // Coverages (JSON array of coverage selections)
  selectedCoverages: json('selectedCoverages').$type().notNull(),
  
  // Contact Info
  contactFirstName: varchar('contactFirstName', { length: 100 }).notNull(),
  contactLastName: varchar('contactLastName', { length: 100 }).notNull(),
  contactEmail: varchar('contactEmail', { length: 320 }).notNull(),
  contactPhone: varchar('contactPhone', { length: 20 }).notNull(),
  
  // Trucks (JSON array)
  trucks: json('trucks').$type().notNull(),
  
  // Trailers (JSON array)
  trailers: json('trailers').$type().notNull(),
  
  // Drivers (JSON array)
  drivers: json('drivers').$type().notNull(),
  
  // Commodities (JSON array)
  commodities: json('commodities').$type().notNull(),
  
  // Quote Status
  status: mysqlEnum('status', ['pending', 'under_review', 'approved', 'issued', 'rejected']).default('pending').notNull(),
  notes: text('notes'),
  
  // Metadata
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().onUpdateNow().notNull(),
});

export type Quote = typeof quotes.$inferSelect;
export type InsertQuote = typeof quotes.$inferInsert;

// Newsletter subscribers table
export const newsletterSubscribers = mysqlTable('newsletter_subscribers', {
  id: int('id').autoincrement().primaryKey(),
  email: varchar('email', { length: 320 }).notNull().unique(),
  subscribedAt: timestamp('subscribedAt').defaultNow().notNull(),
  unsubscribedAt: timestamp('unsubscribedAt'),
  isActive: int('isActive').default(1).notNull(),
});

export type NewsletterSubscriber = typeof newsletterSubscribers.$inferSelect;
export type InsertNewsletterSubscriber = typeof newsletterSubscribers.$inferInsert;