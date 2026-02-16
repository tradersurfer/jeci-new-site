import {
  type User, type InsertUser,
  type Booking, type InsertBooking,
  type Contact, type InsertContact,
  type NewsletterSubscriber, type InsertNewsletter,
  type CreditClubSignup, type InsertCreditClub,
  users, bookings, contacts, newsletterSubscribers, creditClubSignups
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, sql } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  createBooking(booking: InsertBooking): Promise<Booking>;
  getBookings(): Promise<Booking[]>;
  getBookingById(id: string): Promise<Booking | undefined>;
  updateBookingStatus(id: string, status: string): Promise<Booking | undefined>;

  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;

  createNewsletterSubscriber(sub: InsertNewsletter): Promise<NewsletterSubscriber>;
  getNewsletterSubscribers(): Promise<NewsletterSubscriber[]>;

  createCreditClubSignup(signup: InsertCreditClub): Promise<CreditClubSignup>;
  getCreditClubSignups(): Promise<CreditClubSignup[]>;

  getDashboardStats(): Promise<{
    totalBookings: number;
    totalRevenue: number;
    totalContacts: number;
    totalSubscribers: number;
    recentBookings: Booking[];
  }>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async createBooking(booking: InsertBooking): Promise<Booking> {
    const [result] = await db.insert(bookings).values(booking).returning();
    return result;
  }

  async getBookings(): Promise<Booking[]> {
    return db.select().from(bookings).orderBy(desc(bookings.createdAt));
  }

  async getBookingById(id: string): Promise<Booking | undefined> {
    const [booking] = await db.select().from(bookings).where(eq(bookings.id, id));
    return booking;
  }

  async updateBookingStatus(id: string, status: string): Promise<Booking | undefined> {
    const [booking] = await db.update(bookings).set({ status }).where(eq(bookings.id, id)).returning();
    return booking;
  }

  async createContact(contact: InsertContact): Promise<Contact> {
    const [result] = await db.insert(contacts).values(contact).returning();
    return result;
  }

  async getContacts(): Promise<Contact[]> {
    return db.select().from(contacts).orderBy(desc(contacts.createdAt));
  }

  async createNewsletterSubscriber(sub: InsertNewsletter): Promise<NewsletterSubscriber> {
    const [result] = await db.insert(newsletterSubscribers).values(sub).returning();
    return result;
  }

  async getNewsletterSubscribers(): Promise<NewsletterSubscriber[]> {
    return db.select().from(newsletterSubscribers).orderBy(desc(newsletterSubscribers.createdAt));
  }

  async createCreditClubSignup(signup: InsertCreditClub): Promise<CreditClubSignup> {
    const [result] = await db.insert(creditClubSignups).values(signup).returning();
    return result;
  }

  async getCreditClubSignups(): Promise<CreditClubSignup[]> {
    return db.select().from(creditClubSignups).orderBy(desc(creditClubSignups.createdAt));
  }

  async getDashboardStats() {
    const allBookings = await this.getBookings();
    const allContacts = await this.getContacts();
    const allSubscribers = await this.getNewsletterSubscribers();

    const totalRevenue = allBookings.reduce((sum, b) => sum + b.totalAmount, 0);

    return {
      totalBookings: allBookings.length,
      totalRevenue,
      totalContacts: allContacts.length,
      totalSubscribers: allSubscribers.length,
      recentBookings: allBookings.slice(0, 10),
    };
  }
}

export const storage = new DatabaseStorage();
