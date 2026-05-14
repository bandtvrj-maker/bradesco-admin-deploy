import { z } from 'zod';
import { protectedProcedure, router } from '../_core/trpc';
import { getOrCreateSettings, updateSettings } from '../db';

export const settingsRouter = router({
  // Obter configurações do operador
  getSettings: protectedProcedure.query(async ({ ctx }) => {
    try {
      const settings = await getOrCreateSettings(ctx.user.id);
      return settings;
    } catch (error) {
      console.error('Error fetching settings:', error);
      throw error;
    }
  }),

  // Atualizar configurações
  updateSettings: protectedProcedure
    .input(z.object({
      blockSuspiciousAccess: z.boolean().optional(),
      requireTwoFactor: z.boolean().optional(),
      notifyNewLogins: z.boolean().optional(),
      biaAvatarUrl: z.string().optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      try {
        const result = await updateSettings(ctx.user.id, {
          blockSuspiciousAccess: input.blockSuspiciousAccess,
          requireTwoFactor: input.requireTwoFactor,
          notifyNewLogins: input.notifyNewLogins,
          biaAvatarUrl: input.biaAvatarUrl,
        });
        return { success: true, data: result };
      } catch (error) {
        console.error('Error updating settings:', error);
        throw error;
      }
    }),
});
