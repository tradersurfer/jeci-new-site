import type { Express, Request, Response, NextFunction } from "express";
import { portalStorage } from "./portalStorage";
import { portalLoginSchema, portalRegisterSchema, insertPortalMessageSchema, insertPortalCryptoSchema } from "@shared/schema";
import { fromError } from "zod-validation-error";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import multer from "multer";
import path from "path";
import fs from "fs";

const JWT_SECRET = process.env.SESSION_SECRET || crypto.randomBytes(64).toString("hex");
const JWT_EXPIRY = "7d";

interface JwtPayload {
  userId: string;
  email: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      portalUser?: JwtPayload;
    }
  }
}

function authenticatePortal(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Authentication required" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    req.portalUser = decoded;
    return next();
  } catch {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

function requirePortalAdmin(req: Request, res: Response, next: NextFunction) {
  if (req.portalUser?.role !== "admin") {
    return res.status(403).json({ error: "Admin access required" });
  }
  return next();
}

const uploadsDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (_req, file, cb) => {
    const uniqueName = `${Date.now()}-${crypto.randomBytes(6).toString("hex")}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowed = /pdf|jpg|jpeg|png|doc|docx|xlsx|xls|csv/;
    const ext = allowed.test(path.extname(file.originalname).toLowerCase());
    const mime = allowed.test(file.mimetype) || file.mimetype.startsWith("image/") || file.mimetype.includes("pdf") || file.mimetype.includes("spreadsheet") || file.mimetype.includes("word") || file.mimetype.includes("csv");
    if (ext || mime) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type"));
    }
  },
});

export function registerPortalRoutes(app: Express) {

  // ==================== AUTH ====================
  app.post("/api/portal/register", async (req, res) => {
    try {
      const parsed = portalRegisterSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: fromError(parsed.error).message });
      }
      const { email, password, fullName, phone } = parsed.data;
      const existing = await portalStorage.getUserByEmail(email);
      if (existing) {
        return res.status(409).json({ error: "An account with this email already exists" });
      }
      const passwordHash = await bcrypt.hash(password, 12);
      const user = await portalStorage.createUser({ email, passwordHash, fullName, phone });
      const token = jwt.sign({ userId: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRY });
      return res.status(201).json({
        token,
        user: { id: user.id, email: user.email, fullName: user.fullName, role: user.role },
      });
    } catch (error: any) {
      console.error("Portal register error:", error);
      return res.status(500).json({ error: "Registration failed" });
    }
  });

  app.post("/api/portal/login", async (req, res) => {
    try {
      const parsed = portalLoginSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: fromError(parsed.error).message });
      }
      const { email, password } = parsed.data;
      const user = await portalStorage.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ error: "Invalid email or password" });
      }
      const valid = await bcrypt.compare(password, user.passwordHash);
      if (!valid) {
        return res.status(401).json({ error: "Invalid email or password" });
      }
      await portalStorage.updateUser(user.id, { lastLogin: new Date() });
      const token = jwt.sign({ userId: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRY });
      return res.json({
        token,
        user: { id: user.id, email: user.email, fullName: user.fullName, role: user.role },
      });
    } catch (error: any) {
      console.error("Portal login error:", error);
      return res.status(500).json({ error: "Login failed" });
    }
  });

  app.get("/api/portal/me", authenticatePortal, async (req, res) => {
    try {
      const user = await portalStorage.getUserById(req.portalUser!.userId);
      if (!user) return res.status(404).json({ error: "User not found" });
      const { passwordHash, ...safe } = user;
      return res.json(safe);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch profile" });
    }
  });

  app.patch("/api/portal/me", authenticatePortal, async (req, res) => {
    try {
      const { fullName, phone, address, filingStatus, taxYear } = req.body;
      const user = await portalStorage.updateUser(req.portalUser!.userId, { fullName, phone, address, filingStatus, taxYear });
      if (!user) return res.status(404).json({ error: "User not found" });
      const { passwordHash, ...safe } = user;
      return res.json(safe);
    } catch (error) {
      return res.status(500).json({ error: "Failed to update profile" });
    }
  });

  app.post("/api/portal/change-password", authenticatePortal, async (req, res) => {
    try {
      const { currentPassword, newPassword } = req.body;
      if (!newPassword || newPassword.length < 8) {
        return res.status(400).json({ error: "New password must be at least 8 characters" });
      }
      const user = await portalStorage.getUserById(req.portalUser!.userId);
      if (!user) return res.status(404).json({ error: "User not found" });
      const valid = await bcrypt.compare(currentPassword, user.passwordHash);
      if (!valid) return res.status(401).json({ error: "Current password is incorrect" });
      const hash = await bcrypt.hash(newPassword, 12);
      await portalStorage.updateUserPassword(user.id, hash);
      return res.json({ success: true });
    } catch (error) {
      return res.status(500).json({ error: "Failed to change password" });
    }
  });

  app.post("/api/portal/forgot-password", async (req, res) => {
    try {
      const { email } = req.body;
      const user = await portalStorage.getUserByEmail(email);
      if (!user) return res.json({ success: true });
      const token = crypto.randomBytes(32).toString("hex");
      const expiresAt = new Date(Date.now() + 3600000);
      await portalStorage.createPasswordReset(user.id, token, expiresAt);
      console.log(`Password reset token for ${email}: ${token}`);
      return res.json({ success: true });
    } catch (error) {
      return res.status(500).json({ error: "Failed to process request" });
    }
  });

  app.post("/api/portal/reset-password", async (req, res) => {
    try {
      const { token, newPassword } = req.body;
      if (!newPassword || newPassword.length < 8) {
        return res.status(400).json({ error: "Password must be at least 8 characters" });
      }
      const reset = await portalStorage.getPasswordReset(token);
      if (!reset || reset.used || reset.expiresAt < new Date()) {
        return res.status(400).json({ error: "Invalid or expired reset link" });
      }
      const hash = await bcrypt.hash(newPassword, 12);
      await portalStorage.updateUserPassword(reset.userId, hash);
      await portalStorage.markResetUsed(reset.id);
      return res.json({ success: true });
    } catch (error) {
      return res.status(500).json({ error: "Failed to reset password" });
    }
  });

  // ==================== DOCUMENTS ====================
  app.post("/api/portal/documents", authenticatePortal, upload.single("file"), async (req, res) => {
    try {
      if (!req.file) return res.status(400).json({ error: "No file uploaded" });
      const doc = await portalStorage.createDocument({
        userId: req.portalUser!.userId,
        fileName: req.file.originalname,
        filePath: req.file.filename,
        fileSize: req.file.size,
        fileType: req.file.mimetype,
        category: req.body.category || "Other Documents",
      });
      return res.status(201).json(doc);
    } catch (error: any) {
      console.error("Upload error:", error);
      return res.status(500).json({ error: "Upload failed" });
    }
  });

  app.get("/api/portal/documents", authenticatePortal, async (req, res) => {
    try {
      const docs = await portalStorage.getDocumentsByUser(req.portalUser!.userId);
      return res.json(docs);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch documents" });
    }
  });

  app.patch("/api/portal/documents/:id/status", authenticatePortal, async (req, res) => {
    try {
      const doc = await portalStorage.getDocumentById(req.params.id as string);
      if (!doc) return res.status(404).json({ error: "Document not found" });
      if (doc.userId !== req.portalUser!.userId && req.portalUser!.role !== "admin") {
        return res.status(403).json({ error: "Not authorized" });
      }
      const { status } = req.body;
      const updated = await portalStorage.updateDocumentStatus(req.params.id as string, status);
      return res.json(updated);
    } catch (error) {
      return res.status(500).json({ error: "Failed to update document" });
    }
  });

  app.delete("/api/portal/documents/:id", authenticatePortal, async (req, res) => {
    try {
      const doc = await portalStorage.getDocumentById(req.params.id as string);
      if (!doc) return res.status(404).json({ error: "Document not found" });
      if (doc.userId !== req.portalUser!.userId && req.portalUser!.role !== "admin") {
        return res.status(403).json({ error: "Not authorized" });
      }
      const filePath = path.join(uploadsDir, doc.filePath);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      await portalStorage.deleteDocument(doc.id);
      return res.json({ success: true });
    } catch (error) {
      return res.status(500).json({ error: "Failed to delete document" });
    }
  });

  app.get("/api/portal/documents/:id/download", authenticatePortal, async (req, res) => {
    try {
      const doc = await portalStorage.getDocumentById(req.params.id as string);
      if (!doc) return res.status(404).json({ error: "Document not found" });
      if (doc.userId !== req.portalUser!.userId && req.portalUser!.role !== "admin") {
        return res.status(403).json({ error: "Not authorized" });
      }
      const filePath = path.join(uploadsDir, doc.filePath);
      if (!fs.existsSync(filePath)) return res.status(404).json({ error: "File not found" });
      res.setHeader("Content-Disposition", `attachment; filename="${doc.fileName}"`);
      return res.sendFile(filePath);
    } catch (error) {
      return res.status(500).json({ error: "Download failed" });
    }
  });

  // ==================== TAX RETURNS ====================
  app.get("/api/portal/returns", authenticatePortal, async (req, res) => {
    try {
      const returns = await portalStorage.getTaxReturnsByUser(req.portalUser!.userId);
      return res.json(returns);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch returns" });
    }
  });

  app.get("/api/portal/returns/:id", authenticatePortal, async (req, res) => {
    try {
      const ret = await portalStorage.getTaxReturnById(req.params.id as string);
      if (!ret) return res.status(404).json({ error: "Return not found" });
      return res.json(ret);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch return" });
    }
  });

  app.get("/api/portal/returns/:id/download", authenticatePortal, async (req, res) => {
    try {
      const ret = await portalStorage.getTaxReturnById(req.params.id as string);
      if (!ret) return res.status(404).json({ error: "Return not found" });
      if (ret.userId !== req.portalUser!.userId && req.portalUser!.role !== "admin") {
        return res.status(403).json({ error: "Not authorized" });
      }
      const filePath = path.join(uploadsDir, ret.filePath);
      if (!fs.existsSync(filePath)) return res.status(404).json({ error: "File not found" });
      res.setHeader("Content-Disposition", `attachment; filename="${ret.fileName}"`);
      return res.sendFile(filePath);
    } catch (error) {
      return res.status(500).json({ error: "Download failed" });
    }
  });

  // ==================== SIGNATURES ====================
  app.post("/api/portal/signatures", authenticatePortal, async (req, res) => {
    try {
      const { returnId, signatureData, taxpayerName } = req.body;
      if (!returnId || !signatureData || !taxpayerName) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      const ret = await portalStorage.getTaxReturnById(returnId);
      if (!ret) return res.status(404).json({ error: "Return not found" });
      const sig = await portalStorage.createSignature({
        userId: req.portalUser!.userId,
        returnId,
        signatureData,
        taxpayerName,
        ipAddress: (req.headers["x-forwarded-for"] as string) || req.ip || "unknown",
        userAgent: req.headers["user-agent"] || "unknown",
      });
      await portalStorage.updateTaxReturnStatus(returnId, "signed");
      return res.status(201).json(sig);
    } catch (error) {
      console.error("Signature error:", error);
      return res.status(500).json({ error: "Failed to submit signature" });
    }
  });

  app.get("/api/portal/signatures", authenticatePortal, async (req, res) => {
    try {
      const sigs = await portalStorage.getSignaturesByUser(req.portalUser!.userId);
      return res.json(sigs);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch signatures" });
    }
  });

  // ==================== MESSAGES ====================
  app.get("/api/portal/messages", authenticatePortal, async (req, res) => {
    try {
      const messages = await portalStorage.getMessagesForUser(req.portalUser!.userId);
      return res.json(messages);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch messages" });
    }
  });

  app.get("/api/portal/messages/:userId", authenticatePortal, async (req, res) => {
    try {
      const messages = await portalStorage.getMessagesBetweenUsers(req.portalUser!.userId, req.params.userId as string);
      return res.json(messages);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch messages" });
    }
  });

  app.post("/api/portal/messages", authenticatePortal, async (req, res) => {
    try {
      const parsed = insertPortalMessageSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: fromError(parsed.error).message });
      }
      const msg = await portalStorage.createMessage({
        senderId: req.portalUser!.userId,
        recipientId: parsed.data.recipientId,
        messageText: parsed.data.messageText,
        attachments: parsed.data.attachments,
      });
      return res.status(201).json(msg);
    } catch (error) {
      return res.status(500).json({ error: "Failed to send message" });
    }
  });

  app.post("/api/portal/messages/mark-read", authenticatePortal, async (req, res) => {
    try {
      const { messageIds } = req.body;
      if (!Array.isArray(messageIds)) return res.status(400).json({ error: "messageIds required" });
      await portalStorage.markMessagesRead(messageIds);
      return res.json({ success: true });
    } catch (error) {
      return res.status(500).json({ error: "Failed to mark messages" });
    }
  });

  app.get("/api/portal/messages/unread-count", authenticatePortal, async (req, res) => {
    try {
      const count = await portalStorage.getUnreadCount(req.portalUser!.userId);
      return res.json({ count });
    } catch (error) {
      return res.status(500).json({ error: "Failed to get count" });
    }
  });

  // ==================== CRYPTO ====================
  app.get("/api/portal/crypto", authenticatePortal, async (req, res) => {
    try {
      const txs = await portalStorage.getCryptoTransactionsByUser(req.portalUser!.userId);
      return res.json(txs);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch transactions" });
    }
  });

  app.post("/api/portal/crypto", authenticatePortal, async (req, res) => {
    try {
      const parsed = insertPortalCryptoSchema.safeParse({ ...req.body, userId: req.portalUser!.userId });
      if (!parsed.success) {
        return res.status(400).json({ error: fromError(parsed.error).message });
      }
      const tx = await portalStorage.createCryptoTransaction(parsed.data);
      return res.status(201).json(tx);
    } catch (error) {
      console.error("Crypto error:", error);
      return res.status(500).json({ error: "Failed to create transaction" });
    }
  });

  app.delete("/api/portal/crypto/:id", authenticatePortal, async (req, res) => {
    try {
      await portalStorage.deleteCryptoTransaction(req.params.id as string);
      return res.json({ success: true });
    } catch (error) {
      return res.status(500).json({ error: "Failed to delete transaction" });
    }
  });

  // ==================== ADMIN ROUTES ====================
  app.get("/api/portal/admin/dashboard", authenticatePortal, requirePortalAdmin, async (_req, res) => {
    try {
      const stats = await portalStorage.getPortalDashboardStats();
      return res.json(stats);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch stats" });
    }
  });

  app.get("/api/portal/admin/clients", authenticatePortal, requirePortalAdmin, async (_req, res) => {
    try {
      const clients = await portalStorage.getAllClients();
      return res.json(clients.map(c => {
        const { passwordHash, ...safe } = c;
        return safe;
      }));
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch clients" });
    }
  });

  app.get("/api/portal/admin/clients/:id", authenticatePortal, requirePortalAdmin, async (req, res) => {
    try {
      const user = await portalStorage.getUserById(req.params.id as string);
      if (!user) return res.status(404).json({ error: "Client not found" });
      const { passwordHash, ...safe } = user;
      const docs = await portalStorage.getDocumentsByUser(user.id);
      const returns = await portalStorage.getTaxReturnsByUser(user.id);
      const crypto = await portalStorage.getCryptoTransactionsByUser(user.id);
      return res.json({ ...safe, documents: docs, returns, crypto });
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch client" });
    }
  });

  app.get("/api/portal/admin/documents", authenticatePortal, requirePortalAdmin, async (_req, res) => {
    try {
      const docs = await portalStorage.getAllDocuments();
      return res.json(docs);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch documents" });
    }
  });

  app.patch("/api/portal/admin/documents/:id", authenticatePortal, requirePortalAdmin, async (req, res) => {
    try {
      const { status, adminNotes } = req.body;
      const doc = await portalStorage.updateDocumentStatus(req.params.id as string, status, adminNotes);
      if (!doc) return res.status(404).json({ error: "Document not found" });
      return res.json(doc);
    } catch (error) {
      return res.status(500).json({ error: "Failed to update document" });
    }
  });

  app.post("/api/portal/admin/returns", authenticatePortal, requirePortalAdmin, upload.single("file"), async (req, res) => {
    try {
      if (!req.file) return res.status(400).json({ error: "No file uploaded" });
      const { userId, taxYear, adminNotes } = req.body;
      if (!userId || !taxYear) return res.status(400).json({ error: "userId and taxYear required" });
      const ret = await portalStorage.createTaxReturn({
        userId,
        fileName: req.file.originalname,
        filePath: req.file.filename,
        taxYear,
        adminNotes,
      });
      return res.status(201).json(ret);
    } catch (error) {
      console.error("Return upload error:", error);
      return res.status(500).json({ error: "Failed to upload return" });
    }
  });

  app.get("/api/portal/admin/returns", authenticatePortal, requirePortalAdmin, async (_req, res) => {
    try {
      const returns = await portalStorage.getAllTaxReturns();
      return res.json(returns);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch returns" });
    }
  });

  app.get("/api/portal/admin/messages", authenticatePortal, requirePortalAdmin, async (_req, res) => {
    try {
      const conversations = await portalStorage.getAllConversations();
      return res.json(conversations);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch conversations" });
    }
  });

  app.get("/api/portal/admin/crypto", authenticatePortal, requirePortalAdmin, async (_req, res) => {
    try {
      const txs = await portalStorage.getAllCryptoTransactions();
      return res.json(txs);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch transactions" });
    }
  });
}
