import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import {
  insertBookingSchema,
  insertContactSchema,
  insertNewsletterSchema,
  insertCreditClubSchema,
} from "@shared/schema";
import { fromError } from "zod-validation-error";
import crypto from "crypto";
import { sendBookingConfirmationEmail } from "./email";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

const adminTokens = new Set<string>();

function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const token = req.headers["x-admin-token"] as string;
  if (token && adminTokens.has(token)) {
    return next();
  }
  return res.status(401).json({ error: "Unauthorized" });
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  const { registerPortalRoutes } = await import("./portalRoutes");
  registerPortalRoutes(app);

  app.post("/api/admin/login", (req, res) => {
    const { password } = req.body;
    if (!ADMIN_PASSWORD) {
      return res.status(500).json({ error: "Admin password not configured" });
    }
    if (password === ADMIN_PASSWORD) {
      const token = crypto.randomBytes(32).toString("hex");
      adminTokens.add(token);
      return res.json({ token });
    }
    return res.status(401).json({ error: "Invalid password" });
  });

  app.post("/api/admin/logout", (req, res) => {
    const token = req.headers["x-admin-token"] as string;
    if (token) adminTokens.delete(token);
    return res.json({ success: true });
  });

  app.get("/api/admin/verify", (req, res) => {
    const token = req.headers["x-admin-token"] as string;
    if (token && adminTokens.has(token)) {
      return res.json({ authenticated: true });
    }
    return res.status(401).json({ authenticated: false });
  });

  // ==================== BOOKINGS ====================
  app.post("/api/bookings", async (req, res) => {
    try {
      const parsed = insertBookingSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: fromError(parsed.error).message });
      }
      const booking = await storage.createBooking(parsed.data);

      sendBookingConfirmationEmail({
        clientName: parsed.data.clientName,
        clientEmail: parsed.data.clientEmail,
        clientPhone: parsed.data.clientPhone || "",
        serviceName: parsed.data.serviceName,
        serviceCategory: parsed.data.serviceCategory || "",
        date: parsed.data.date,
        time: parsed.data.time,
        totalAmount: parsed.data.totalAmount,
        businessName: parsed.data.businessName || undefined,
        businessType: parsed.data.businessType || undefined,
        description: parsed.data.description || undefined,
        addOns: parsed.data.addOns as { name: string; price: number }[] || [],
      }).catch(err => console.error("Email send failed (non-blocking):", err));

      res.status(201).json(booking);
    } catch (error: any) {
      console.error("Booking error:", error);
      res.status(500).json({ error: "Failed to create booking" });
    }
  });

  app.get("/api/bookings", requireAdmin, async (_req, res) => {
    try {
      const bookings = await storage.getBookings();
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch bookings" });
    }
  });

  app.get("/api/bookings/:id", requireAdmin, async (req, res) => {
    try {
      const booking = await storage.getBookingById(req.params.id);
      if (!booking) return res.status(404).json({ error: "Booking not found" });
      res.json(booking);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch booking" });
    }
  });

  app.patch("/api/bookings/:id/status", requireAdmin, async (req, res) => {
    try {
      const { status } = req.body;
      if (!status) return res.status(400).json({ error: "Status required" });
      const booking = await storage.updateBookingStatus(req.params.id, status);
      if (!booking) return res.status(404).json({ error: "Booking not found" });
      res.json(booking);
    } catch (error) {
      res.status(500).json({ error: "Failed to update booking status" });
    }
  });

  // ==================== CONTACTS ====================
  app.post("/api/contacts", async (req, res) => {
    try {
      const parsed = insertContactSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: fromError(parsed.error).message });
      }
      const contact = await storage.createContact(parsed.data);
      res.status(201).json(contact);
    } catch (error) {
      console.error("Contact error:", error);
      res.status(500).json({ error: "Failed to submit contact form" });
    }
  });

  app.get("/api/contacts", requireAdmin, async (_req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch contacts" });
    }
  });

  // ==================== NEWSLETTER ====================
  app.post("/api/newsletter", async (req, res) => {
    try {
      const parsed = insertNewsletterSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: fromError(parsed.error).message });
      }
      const subscriber = await storage.createNewsletterSubscriber(parsed.data);
      res.status(201).json(subscriber);
    } catch (error: any) {
      if (error?.code === "23505") {
        return res.status(409).json({ error: "Email already subscribed" });
      }
      console.error("Newsletter error:", error);
      res.status(500).json({ error: "Failed to subscribe" });
    }
  });

  app.get("/api/newsletter", requireAdmin, async (_req, res) => {
    try {
      const subscribers = await storage.getNewsletterSubscribers();
      res.json(subscribers);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch subscribers" });
    }
  });

  // ==================== CREDIT CLUB ====================
  app.post("/api/credit-club", async (req, res) => {
    try {
      const parsed = insertCreditClubSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: fromError(parsed.error).message });
      }
      const signup = await storage.createCreditClubSignup(parsed.data);
      res.status(201).json(signup);
    } catch (error) {
      console.error("Credit club error:", error);
      res.status(500).json({ error: "Failed to submit signup" });
    }
  });

  app.get("/api/credit-club", requireAdmin, async (_req, res) => {
    try {
      const signups = await storage.getCreditClubSignups();
      res.json(signups);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch signups" });
    }
  });

  // ==================== ADMIN DASHBOARD (protected) ====================
  app.get("/api/admin/dashboard", requireAdmin, async (_req, res) => {
    try {
      const stats = await storage.getDashboardStats();
      res.json(stats);
    } catch (error) {
      console.error("Dashboard error:", error);
      res.status(500).json({ error: "Failed to fetch dashboard data" });
    }
  });

  return httpServer;
}
