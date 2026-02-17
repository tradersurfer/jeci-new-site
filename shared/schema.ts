import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, boolean, jsonb, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// ==================== EXISTING JECI GROUP TABLES ====================

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const bookings = pgTable("bookings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  serviceName: text("service_name").notNull(),
  serviceCategory: text("service_category").notNull(),
  servicePrice: integer("service_price").notNull(),
  addOns: jsonb("add_ons").$type<{ name: string; price: number }[]>().default([]),
  totalAmount: integer("total_amount").notNull(),
  date: text("date").notNull(),
  time: text("time").notNull(),
  clientName: text("client_name").notNull(),
  clientEmail: text("client_email").notNull(),
  clientPhone: text("client_phone"),
  businessName: text("business_name"),
  businessType: text("business_type"),
  description: text("description"),
  referralSource: text("referral_source"),
  status: text("status").notNull().default("confirmed"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const contacts = pgTable("contacts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  subject: text("subject"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const newsletterSubscribers = pgTable("newsletter_subscribers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  name: text("name"),
  source: text("source").default("website"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const creditClubSignups = pgTable("credit_club_signups", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  creditScore: text("credit_score"),
  goals: text("goals"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ==================== TAX PORTAL TABLES ====================

export const portalUsers = pgTable("portal_users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  fullName: text("full_name").notNull(),
  phone: text("phone"),
  address: text("address"),
  role: text("role").notNull().default("client"),
  filingStatus: text("filing_status"),
  taxYear: text("tax_year").default("2025"),
  isActive: boolean("is_active").notNull().default(true),
  lastLogin: timestamp("last_login"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const portalDocuments = pgTable("portal_documents", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  fileName: text("file_name").notNull(),
  filePath: text("file_path").notNull(),
  fileSize: integer("file_size").notNull(),
  fileType: text("file_type").notNull(),
  category: text("category").notNull().default("Other Documents"),
  status: text("status").notNull().default("draft"),
  adminNotes: text("admin_notes"),
  uploadDate: timestamp("upload_date").defaultNow().notNull(),
});

export const portalTaxReturns = pgTable("portal_tax_returns", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  fileName: text("file_name").notNull(),
  filePath: text("file_path").notNull(),
  taxYear: text("tax_year").notNull(),
  status: text("status").notNull().default("pending_signature"),
  adminNotes: text("admin_notes"),
  signatureRequired: boolean("signature_required").notNull().default(true),
  uploadDate: timestamp("upload_date").defaultNow().notNull(),
});

export const portalSignatures = pgTable("portal_signatures", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  returnId: varchar("return_id").notNull(),
  signatureData: text("signature_data").notNull(),
  taxpayerName: text("taxpayer_name").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  signedAt: timestamp("signed_at").defaultNow().notNull(),
});

export const portalMessages = pgTable("portal_messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  senderId: varchar("sender_id").notNull(),
  recipientId: varchar("recipient_id").notNull(),
  messageText: text("message_text"),
  attachments: jsonb("attachments").$type<string[]>().default([]),
  isRead: boolean("is_read").notNull().default(false),
  readAt: timestamp("read_at"),
  sentAt: timestamp("sent_at").defaultNow().notNull(),
});

export const portalCryptoTransactions = pgTable("portal_crypto_transactions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  date: text("date").notNull(),
  cryptoType: text("crypto_type").notNull(),
  transactionType: text("transaction_type").notNull(),
  amount: decimal("amount").notNull(),
  usdValue: decimal("usd_value"),
  costBasis: decimal("cost_basis"),
  fees: decimal("fees"),
  exchange: text("exchange"),
  wallet: text("wallet"),
  txHash: text("tx_hash"),
  notes: text("notes"),
  source: text("source").notNull().default("manual"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const portalPasswordResets = pgTable("portal_password_resets", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  token: text("token").notNull().unique(),
  expiresAt: timestamp("expires_at").notNull(),
  used: boolean("used").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ==================== EXISTING INSERT SCHEMAS ====================

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertBookingSchema = createInsertSchema(bookings).omit({
  id: true,
  createdAt: true,
  status: true,
});

export const insertContactSchema = createInsertSchema(contacts).omit({
  id: true,
  createdAt: true,
});

export const insertNewsletterSchema = createInsertSchema(newsletterSubscribers).omit({
  id: true,
  createdAt: true,
});

export const insertCreditClubSchema = createInsertSchema(creditClubSignups).omit({
  id: true,
  createdAt: true,
});

// ==================== TAX PORTAL INSERT SCHEMAS ====================

export const insertPortalUserSchema = createInsertSchema(portalUsers).omit({
  id: true,
  createdAt: true,
  lastLogin: true,
  isActive: true,
  role: true,
});

export const portalLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const portalRegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  fullName: z.string().min(2),
  phone: z.string().optional(),
});

export const insertPortalDocumentSchema = createInsertSchema(portalDocuments).omit({
  id: true,
  uploadDate: true,
  status: true,
  adminNotes: true,
});

export const insertPortalTaxReturnSchema = createInsertSchema(portalTaxReturns).omit({
  id: true,
  uploadDate: true,
  status: true,
});

export const insertPortalSignatureSchema = createInsertSchema(portalSignatures).omit({
  id: true,
  signedAt: true,
});

export const insertPortalMessageSchema = z.object({
  recipientId: z.string(),
  messageText: z.string().optional(),
  attachments: z.array(z.string()).optional(),
});

export const insertPortalCryptoSchema = createInsertSchema(portalCryptoTransactions).omit({
  id: true,
  createdAt: true,
  source: true,
});

// ==================== EXISTING TYPES ====================

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type Booking = typeof bookings.$inferSelect;
export type InsertContact = z.infer<typeof insertContactSchema>;
export type Contact = typeof contacts.$inferSelect;
export type InsertNewsletter = z.infer<typeof insertNewsletterSchema>;
export type NewsletterSubscriber = typeof newsletterSubscribers.$inferSelect;
export type InsertCreditClub = z.infer<typeof insertCreditClubSchema>;
export type CreditClubSignup = typeof creditClubSignups.$inferSelect;

// ==================== TAX PORTAL TYPES ====================

export type PortalUser = typeof portalUsers.$inferSelect;
export type InsertPortalUser = z.infer<typeof insertPortalUserSchema>;
export type PortalDocument = typeof portalDocuments.$inferSelect;
export type InsertPortalDocument = z.infer<typeof insertPortalDocumentSchema>;
export type PortalTaxReturn = typeof portalTaxReturns.$inferSelect;
export type InsertPortalTaxReturn = z.infer<typeof insertPortalTaxReturnSchema>;
export type PortalSignature = typeof portalSignatures.$inferSelect;
export type InsertPortalSignature = z.infer<typeof insertPortalSignatureSchema>;
export type PortalMessage = typeof portalMessages.$inferSelect;
export type PortalCryptoTransaction = typeof portalCryptoTransactions.$inferSelect;
export type InsertPortalCrypto = z.infer<typeof insertPortalCryptoSchema>;
