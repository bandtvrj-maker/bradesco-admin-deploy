import express, { type Express } from "express";
import fs from "fs";
import { type Server } from "http";
import { nanoid } from "nanoid";
import path from "path";
import { createServer as createViteServer } from "vite";
import viteConfig from "../../vite.config";

export async function setupVite(app: Express, server: Server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true as const,
  };

  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    server: serverOptions,
    appType: "custom",
  });

  // Middleware para skip Vite em rotas especificas
  app.use((req, res, next) => {
    if (req.path.startsWith("/cliente") || req.path.startsWith("/socket.io") || req.path.startsWith("/api")) {
      return next();
    }
    vite.middlewares(req, res, next);
  });

  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    // Nao interceptar rotas do cliente
    if (url.startsWith("/cliente") || url.startsWith("/socket.io") || url.startsWith("/api")) {
      return next();
    }

    try {
      const clientTemplate = path.resolve(process.cwd(), "client", "index.html");

      // always reload the index.html file from disk incase it changes
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app: Express) {
  const distPath =
    process.env.NODE_ENV === "development"
      ? path.resolve(process.cwd(), "dist", "public")
      : path.resolve(process.cwd(), "dist", "public");
  if (!fs.existsSync(distPath)) {
    console.error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }

  app.use(express.static(distPath));

  // fall through to index.html if the file doesn't exist (mas não para /cliente)
  app.use("*", (req, res) => {
    // Não servir index.html para /cliente - deixar a rota Express servir
    if (req.path.startsWith("/cliente")) {
      return res.status(404).send("Not found");
    }
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
