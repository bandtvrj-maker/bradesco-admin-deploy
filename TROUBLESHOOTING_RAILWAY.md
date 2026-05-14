# 🔧 Troubleshooting - Railway

**Versão:** 1.0.0  
**Data:** 11/05/2026

---

## 🚨 Problemas Comuns e Soluções

### 1. Build Falha

#### Erro: "Build timed out"

**Causa:** Build levou mais de 30 minutos

**Solução:**
```bash
# No painel Railway:
1. Vá para "Settings"
2. Aumente "Build Command Timeout" para 1200s (20 min)
3. Clique em "Redeploy"
```

#### Erro: "pnpm not found"

**Causa:** Railway não detectou pnpm

**Solução:**
1. Verifique `package.json` tem `"packageManager": "pnpm@..."`
2. Verifique `.npmrc` existe:
```
# .npmrc
shamefully-hoist=true
strict-peer-dependencies=false
```

#### Erro: "Cannot find module '@trpc/server'"

**Causa:** Dependências não foram instaladas

**Solução:**
```bash
# Limpar cache e reconstruir
1. No painel Railway: Deployments → Redeploy
2. Selecione "Clear Build Cache"
3. Aguarde rebuild
```

---

### 2. Banco de Dados

#### Erro: "DATABASE_URL is required"

**Causa:** Variável não configurada

**Solução:**
```bash
# Verificar se existe
railway variables | grep DATABASE_URL

# Se não existir, adicionar
railway variables set DATABASE_URL "mysql://..."

# Redeploy
railway redeploy
```

#### Erro: "Connection refused"

**Causa:** Banco de dados não está acessível

**Solução:**
1. Verifique se MySQL foi adicionado ao projeto:
   - Painel → "+ Add" → "MySQL"

2. Verifique a string de conexão:
   ```bash
   # Deve estar no formato:
   mysql://user:password@host:port/database
   ```

3. Aguarde 2-3 minutos para MySQL inicializar

#### Erro: "Access denied for user 'root'"

**Causa:** Senha incorreta

**Solução:**
1. Vá para a instância MySQL no painel
2. Clique em "Connect"
3. Copie a string de conexão correta
4. Atualize `DATABASE_URL`

---

### 3. WebSocket

#### Erro: "WebSocket connection failed"

**Causa:** Socket.IO não está conectando

**Solução:**
1. Verifique se o servidor está rodando:
   ```bash
   railway logs
   # Procure por "Server running on"
   ```

2. Verifique CORS no servidor:
   ```typescript
   // server/_core/index.ts
   const io = new Server(server, {
     cors: {
       origin: "*",
       methods: ["GET", "POST"]
     }
   });
   ```

3. Verifique no console do navegador:
   ```javascript
   console.log(socket.connected); // deve ser true
   console.log(socket.id); // deve ter um ID
   ```

#### Erro: "Socket.IO 404 Not Found"

**Causa:** Socket.IO não está sendo servido

**Solução:**
1. Verifique se `/socket.io/socket.io.js` existe
2. Verifique se o servidor Express está servindo arquivos estáticos:
   ```typescript
   app.use(express.static('dist/public'));
   ```

---

### 4. Aplicação

#### Erro: "Cannot GET /admin"

**Causa:** Rota não existe ou build não incluiu arquivos

**Solução:**
1. Verifique se o build completou:
   ```bash
   railway logs | grep "build"
   ```

2. Verifique se `dist/public` foi criado:
   ```bash
   # No painel Railway, vá para "Logs"
   # Procure por "Successfully built"
   ```

3. Reconstrua:
   ```bash
   railway redeploy
   ```

#### Erro: "504 Gateway Timeout"

**Causa:** Servidor não está respondendo

**Solução:**
1. Verifique se o servidor está rodando:
   ```bash
   railway logs
   ```

2. Verifique se há erros:
   ```bash
   railway logs | grep -i error
   ```

3. Reinicie:
   ```bash
   railway redeploy
   ```

#### Erro: "Cannot read property 'sessionId' of undefined"

**Causa:** Estado em memória foi perdido

**Solução:**
- Isso é normal após redeploy
- Recarregue o navegador
- Reconecte o cliente

---

### 5. Variáveis de Ambiente

#### Variáveis não estão sendo lidas

**Solução:**
1. Verifique se estão configuradas:
   ```bash
   railway variables
   ```

2. Verifique se o app está lendo corretamente:
   ```typescript
   console.log(process.env.DATABASE_URL); // deve ter valor
   ```

3. Redeploy para aplicar:
   ```bash
   railway redeploy
   ```

#### Erro: "process.env.DATABASE_URL is undefined"

**Solução:**
1. Adicione a variável:
   ```bash
   railway variables set DATABASE_URL "mysql://..."
   ```

2. Redeploy:
   ```bash
   railway redeploy
   ```

3. Aguarde 2-3 minutos

---

### 6. Performance

#### Aplicação lenta

**Causa:** Recursos insuficientes

**Solução:**
1. Verifique uso de recursos:
   - Painel → "Metrics"
   - Procure por CPU/Memory high

2. Aumente recursos:
   - Painel → "Settings"
   - Aumente "RAM" ou "CPU"

3. Escale horizontalmente:
   - Painel → "Settings"
   - Aumente "Replicas"

#### Timeout em requisições

**Solução:**
1. Aumente timeout do banco de dados:
   ```typescript
   // server/db.ts
   const db = drizzle(process.env.DATABASE_URL, {
     connectionTimeoutMillis: 30000,
     idleTimeoutMillis: 30000
   });
   ```

2. Redeploy

---

### 7. Logs e Debugging

#### Ver logs em tempo real

```bash
# Instalar Railway CLI
npm install -g @railway/cli

# Login
railway login

# Ver logs
railway logs --follow

# Ver logs do build
railway logs --build

# Ver logs de erro
railway logs | grep -i error
```

#### Logs não aparecem

**Solução:**
1. Verifique se o app está rodando:
   ```bash
   railway ps
   ```

2. Verifique se há erros:
   ```bash
   railway logs --tail 50
   ```

3. Redeploy:
   ```bash
   railway redeploy
   ```

---

### 8. Domínio Customizado

#### Domínio não funciona

**Solução:**
1. Verifique se está configurado:
   - Painel → "Deployments" → "Settings" → "Domains"

2. Verifique registros DNS:
   ```bash
   # Deve apontar para Railway
   nslookup seu-dominio.com
   ```

3. Aguarde propagação DNS (até 24h)

#### SSL não funciona

**Solução:**
- Railway fornece SSL automaticamente
- Aguarde 5-10 minutos após adicionar domínio

---

## 📊 Checklist de Debug

Quando algo não funciona:

- [ ] Verificar se o build completou: `railway logs`
- [ ] Verificar variáveis: `railway variables`
- [ ] Verificar se servidor está rodando: `railway ps`
- [ ] Verificar erros: `railway logs | grep error`
- [ ] Redeploy: `railway redeploy`
- [ ] Aguardar 2-3 minutos
- [ ] Recarregar navegador (Ctrl+Shift+R)
- [ ] Verificar console do navegador (F12)

---

## 🆘 Quando Nada Funciona

1. **Limpar cache e reconstruir:**
   ```bash
   # No painel: Deployments → Redeploy → Clear Build Cache
   ```

2. **Verificar logs completos:**
   ```bash
   railway logs --tail 100
   ```

3. **Contatar suporte Railway:**
   - https://railway.app/support
   - Discord: https://discord.gg/railway

4. **Verificar status do Railway:**
   - https://status.railway.app

---

## 📞 Recursos Úteis

- [Railway Docs](https://docs.railway.app)
- [Railway CLI Reference](https://docs.railway.app/reference/cli-api)
- [Node.js Troubleshooting](https://nodejs.org/en/docs/guides/nodejs-debugging-guide/)
- [Socket.IO Troubleshooting](https://socket.io/docs/v4/troubleshooting-connection-issues/)

---

**Versão:** 1.0.0  
**Última atualização:** 11/05/2026
