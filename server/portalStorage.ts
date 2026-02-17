import {
  type PortalUser,
  type PortalDocument, type InsertPortalDocument,
  type PortalTaxReturn,
  type PortalSignature,
  type PortalMessage,
  type PortalCryptoTransaction, type InsertPortalCrypto,
  portalUsers, portalDocuments, portalTaxReturns,
  portalSignatures, portalMessages, portalCryptoTransactions,
  portalPasswordResets,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, or, and, sql } from "drizzle-orm";

export class PortalStorage {
  // ==================== USERS ====================
  async createUser(data: { email: string; passwordHash: string; fullName: string; phone?: string }): Promise<PortalUser> {
    const [user] = await db.insert(portalUsers).values(data).returning();
    return user;
  }

  async getUserByEmail(email: string): Promise<PortalUser | undefined> {
    const [user] = await db.select().from(portalUsers).where(eq(portalUsers.email, email));
    return user;
  }

  async getUserById(id: string): Promise<PortalUser | undefined> {
    const [user] = await db.select().from(portalUsers).where(eq(portalUsers.id, id));
    return user;
  }

  async updateUser(id: string, data: Partial<Pick<PortalUser, 'fullName' | 'phone' | 'address' | 'filingStatus' | 'taxYear' | 'lastLogin'>>): Promise<PortalUser | undefined> {
    const [user] = await db.update(portalUsers).set(data).where(eq(portalUsers.id, id)).returning();
    return user;
  }

  async updateUserPassword(id: string, passwordHash: string): Promise<void> {
    await db.update(portalUsers).set({ passwordHash }).where(eq(portalUsers.id, id));
  }

  async getAllClients(): Promise<PortalUser[]> {
    return db.select().from(portalUsers).where(eq(portalUsers.role, "client")).orderBy(desc(portalUsers.createdAt));
  }

  // ==================== PASSWORD RESETS ====================
  async createPasswordReset(userId: string, token: string, expiresAt: Date): Promise<void> {
    await db.insert(portalPasswordResets).values({ userId, token, expiresAt });
  }

  async getPasswordReset(token: string) {
    const [reset] = await db.select().from(portalPasswordResets).where(eq(portalPasswordResets.token, token));
    return reset;
  }

  async markResetUsed(id: string): Promise<void> {
    await db.update(portalPasswordResets).set({ used: true }).where(eq(portalPasswordResets.id, id));
  }

  // ==================== DOCUMENTS ====================
  async createDocument(doc: InsertPortalDocument): Promise<PortalDocument> {
    const [result] = await db.insert(portalDocuments).values(doc).returning();
    return result;
  }

  async getDocumentsByUser(userId: string): Promise<PortalDocument[]> {
    return db.select().from(portalDocuments).where(eq(portalDocuments.userId, userId)).orderBy(desc(portalDocuments.uploadDate));
  }

  async getDocumentById(id: string): Promise<PortalDocument | undefined> {
    const [doc] = await db.select().from(portalDocuments).where(eq(portalDocuments.id, id));
    return doc;
  }

  async updateDocumentStatus(id: string, status: string, adminNotes?: string): Promise<PortalDocument | undefined> {
    const updateData: any = { status };
    if (adminNotes !== undefined) updateData.adminNotes = adminNotes;
    const [doc] = await db.update(portalDocuments).set(updateData).where(eq(portalDocuments.id, id)).returning();
    return doc;
  }

  async deleteDocument(id: string): Promise<void> {
    await db.delete(portalDocuments).where(eq(portalDocuments.id, id));
  }

  async getAllDocuments(): Promise<(PortalDocument & { userName?: string })[]> {
    const docs = await db.select().from(portalDocuments).orderBy(desc(portalDocuments.uploadDate));
    const enriched = await Promise.all(docs.map(async (doc) => {
      const user = await this.getUserById(doc.userId);
      return { ...doc, userName: user?.fullName };
    }));
    return enriched;
  }

  // ==================== TAX RETURNS ====================
  async createTaxReturn(data: { userId: string; fileName: string; filePath: string; taxYear: string; adminNotes?: string; signatureRequired?: boolean }): Promise<PortalTaxReturn> {
    const [result] = await db.insert(portalTaxReturns).values(data).returning();
    return result;
  }

  async getTaxReturnsByUser(userId: string): Promise<PortalTaxReturn[]> {
    return db.select().from(portalTaxReturns).where(eq(portalTaxReturns.userId, userId)).orderBy(desc(portalTaxReturns.uploadDate));
  }

  async getTaxReturnById(id: string): Promise<PortalTaxReturn | undefined> {
    const [ret] = await db.select().from(portalTaxReturns).where(eq(portalTaxReturns.id, id));
    return ret;
  }

  async updateTaxReturnStatus(id: string, status: string): Promise<PortalTaxReturn | undefined> {
    const [ret] = await db.update(portalTaxReturns).set({ status }).where(eq(portalTaxReturns.id, id)).returning();
    return ret;
  }

  async getAllTaxReturns(): Promise<PortalTaxReturn[]> {
    return db.select().from(portalTaxReturns).orderBy(desc(portalTaxReturns.uploadDate));
  }

  // ==================== SIGNATURES ====================
  async createSignature(data: { userId: string; returnId: string; signatureData: string; taxpayerName: string; ipAddress?: string; userAgent?: string }): Promise<PortalSignature> {
    const [sig] = await db.insert(portalSignatures).values(data).returning();
    return sig;
  }

  async getSignaturesByUser(userId: string): Promise<PortalSignature[]> {
    return db.select().from(portalSignatures).where(eq(portalSignatures.userId, userId)).orderBy(desc(portalSignatures.signedAt));
  }

  async getSignatureByReturn(returnId: string): Promise<PortalSignature | undefined> {
    const [sig] = await db.select().from(portalSignatures).where(eq(portalSignatures.returnId, returnId));
    return sig;
  }

  // ==================== MESSAGES ====================
  async createMessage(data: { senderId: string; recipientId: string; messageText?: string; attachments?: string[] }): Promise<PortalMessage> {
    const [msg] = await db.insert(portalMessages).values({
      senderId: data.senderId,
      recipientId: data.recipientId,
      messageText: data.messageText || null,
      attachments: data.attachments || [],
    }).returning();
    return msg;
  }

  async getMessagesBetweenUsers(userId1: string, userId2: string): Promise<PortalMessage[]> {
    return db.select().from(portalMessages).where(
      or(
        and(eq(portalMessages.senderId, userId1), eq(portalMessages.recipientId, userId2)),
        and(eq(portalMessages.senderId, userId2), eq(portalMessages.recipientId, userId1))
      )
    ).orderBy(portalMessages.sentAt);
  }

  async getMessagesForUser(userId: string): Promise<PortalMessage[]> {
    return db.select().from(portalMessages).where(
      or(eq(portalMessages.senderId, userId), eq(portalMessages.recipientId, userId))
    ).orderBy(desc(portalMessages.sentAt));
  }

  async markMessagesRead(messageIds: string[]): Promise<void> {
    for (const id of messageIds) {
      await db.update(portalMessages).set({ isRead: true, readAt: new Date() }).where(eq(portalMessages.id, id));
    }
  }

  async getUnreadCount(userId: string): Promise<number> {
    const result = await db.select({ count: sql<number>`count(*)` })
      .from(portalMessages)
      .where(and(eq(portalMessages.recipientId, userId), eq(portalMessages.isRead, false)));
    return Number(result[0]?.count || 0);
  }

  async getAllConversations(): Promise<{ userId: string; userName: string; lastMessage: string; unreadCount: number; lastAt: Date }[]> {
    const clients = await this.getAllClients();
    const conversations = [];
    for (const client of clients) {
      const msgs = await this.getMessagesForUser(client.id);
      if (msgs.length > 0) {
        const unread = msgs.filter(m => m.recipientId !== client.id && !m.isRead).length;
        conversations.push({
          userId: client.id,
          userName: client.fullName,
          lastMessage: msgs[0].messageText || '(attachment)',
          unreadCount: unread,
          lastAt: msgs[0].sentAt!,
        });
      }
    }
    return conversations;
  }

  // ==================== CRYPTO TRANSACTIONS ====================
  async createCryptoTransaction(data: InsertPortalCrypto): Promise<PortalCryptoTransaction> {
    const [tx] = await db.insert(portalCryptoTransactions).values(data).returning();
    return tx;
  }

  async getCryptoTransactionsByUser(userId: string): Promise<PortalCryptoTransaction[]> {
    return db.select().from(portalCryptoTransactions).where(eq(portalCryptoTransactions.userId, userId)).orderBy(desc(portalCryptoTransactions.createdAt));
  }

  async deleteCryptoTransaction(id: string): Promise<void> {
    await db.delete(portalCryptoTransactions).where(eq(portalCryptoTransactions.id, id));
  }

  async updateCryptoTransaction(id: string, data: Partial<InsertPortalCrypto>): Promise<PortalCryptoTransaction | undefined> {
    const [tx] = await db.update(portalCryptoTransactions).set(data).where(eq(portalCryptoTransactions.id, id)).returning();
    return tx;
  }

  async getAllCryptoTransactions(): Promise<PortalCryptoTransaction[]> {
    return db.select().from(portalCryptoTransactions).orderBy(desc(portalCryptoTransactions.createdAt));
  }

  // ==================== ADMIN DASHBOARD STATS ====================
  async getPortalDashboardStats() {
    const clients = await this.getAllClients();
    const docs = await this.getAllDocuments();
    const returns = await this.getAllTaxReturns();
    const pendingDocs = docs.filter(d => d.status === 'submitted');
    const pendingSigs = returns.filter(r => r.status === 'pending_signature');

    let totalUnread = 0;
    for (const client of clients) {
      totalUnread += await this.getUnreadCount(client.id);
    }

    return {
      totalClients: clients.length,
      pendingDocuments: pendingDocs.length,
      pendingSignatures: pendingSigs.length,
      unreadMessages: totalUnread,
      totalDocuments: docs.length,
      totalReturns: returns.length,
    };
  }
}

export const portalStorage = new PortalStorage();
