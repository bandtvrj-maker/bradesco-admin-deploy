# 🔐 Variáveis de Ambiente - Bradesco Admin Panel

## 📋 Visão Geral

Este documento descreve todas as variáveis de ambiente necessárias para executar o Bradesco Admin Panel em produção no Railway.

---

## ✅ Variáveis Obrigatórias

### `DATABASE_URL`

**Descrição:** String de conexão com o banco de dados MySQL

**Formato:**
```
mysql://username:password@host:port/database
```

**Exemplo Railway:**
```
mysql://root:abc123def456@containers-us-west-123.railway.app:3306/bradesco_admin
```

**Como obter:**
1. No painel Railway, vá para a instância MySQL
2. Clique em **"Connect"**
3. Copie a string de conexão

**Importante:**
- Nunca compartilhe esta string
- Mude a senha padrão em produção
- Use SSL em produção (adicione `?ssl=true` ao final)

---

### `NODE_ENV`

**Descrição:** Ambiente de execução

**Valores válidos:**
- `production` - Ambiente de produção
- `development` - Ambiente de desenvolvimento

**Recomendação:** Use `production` no Railway

---

### `JWT_SECRET`

**Descrição:** Chave secreta para assinar tokens JWT

**Requisitos:**
- Mínimo 32 caracteres
- Deve ser aleatória e segura
- Nunca compartilhe

**Gerar valor seguro:**
```bash
# Opção 1: Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Opção 2: OpenSSL
openssl rand -hex 32

# Opção 3: Python
python3 -c "import secrets; print(secrets.token_hex(32))"
```

**Exemplo:**
```
a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2
```

---

## 🔧 Variáveis Opcionais

### `PORT`

**Descrição:** Porta do servidor Express

**Valor padrão:** `3000`

**Nota:** Railway define automaticamente via `$PORT`. Não é necessário configurar.

---

### `APP_NAME`

**Descrição:** Nome da aplicação (usado em logs e UI)

**Valor padrão:** `Bradesco Admin Panel`

**Exemplo:**
```
APP_NAME=Bradesco Admin Panel - Produção
```

---

### `LOG_LEVEL`

**Descrição:** Nível de logging

**Valores válidos:**
- `debug` - Todos os logs
- `info` - Informações importantes
- `warn` - Apenas avisos
- `error` - Apenas erros

**Valor padrão:** `info`

---

## 🔒 Segurança

### Boas Práticas

1. **Nunca commite `.env` no repositório**
   ```bash
   echo ".env" >> .gitignore
   ```

2. **Use `.env.example` como template**
   ```bash
   cp .env.example .env
   # Edite .env com valores reais
   ```

3. **Regenere JWT_SECRET periodicamente**
   - Isso invalidará todas as sessões ativas
   - Faça em horários de baixo uso

4. **Use HTTPS em produção**
   - Railway fornece automaticamente

5. **Monitore acessos ao banco de dados**
   - Use logs do Railway
   - Configure alertas

### Rotação de Secrets

Para rotacionar `JWT_SECRET`:

1. Gere um novo valor
2. Atualize no Railway
3. Aguarde 5-10 minutos
4. Monitore logs para erros

---

## 🚀 Setup no Railway

### Via Dashboard

1. Vá para seu projeto no Railway
2. Clique em **"Variables"**
3. Clique em **"+ New Variable"**
4. Preencha:
   - **Name:** `DATABASE_URL`
   - **Value:** `mysql://...`
5. Clique em **"Add"**
6. Repita para outras variáveis

### Via CLI

```bash
# Instalar Railway CLI
npm install -g @railway/cli

# Login
railway login

# Listar variáveis
railway variables

# Adicionar variável
railway variables set DATABASE_URL "mysql://..."

# Remover variável
railway variables unset DATABASE_URL
```

---

## 📊 Exemplo Completo

```
# ============================================================================
# DATABASE
# ============================================================================
DATABASE_URL=mysql://root:senha123@containers-us-west-123.railway.app:3306/bradesco_admin

# ============================================================================
# SERVER
# ============================================================================
NODE_ENV=production
PORT=3000
APP_NAME=Bradesco Admin Panel

# ============================================================================
# SECURITY
# ============================================================================
JWT_SECRET=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2

# ============================================================================
# LOGGING
# ============================================================================
LOG_LEVEL=info
```

---

## 🔍 Verificar Variáveis

### No Railway Dashboard

1. Vá para seu projeto
2. Clique em **"Variables"**
3. Verifique se todas estão configuradas

### Via CLI

```bash
railway variables
```

### No Log do Deploy

1. Vá para **"Deployments"**
2. Clique no deployment
3. Vá para **"Logs"**
4. Procure por mensagens de inicialização

---

## ⚠️ Troubleshooting

### Erro: "DATABASE_URL is required"

**Solução:**
```bash
railway variables set DATABASE_URL "mysql://..."
railway redeploy
```

### Erro: "Invalid JWT_SECRET"

**Solução:**
```bash
# Gerar novo JWT_SECRET
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Atualizar no Railway
railway variables set JWT_SECRET "novo-valor"
railway redeploy
```

### Variáveis não aparecem no app

**Solução:**
1. Verifique se estão configuradas: `railway variables`
2. Redeploy: `railway redeploy`
3. Aguarde 2-3 minutos
4. Verifique logs: `railway logs`

---

## 📚 Referências

- [Railway Docs - Variables](https://docs.railway.app/guides/variables)
- [Node.js Environment Variables](https://nodejs.org/en/docs/guides/nodejs-env-vars/)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)

---

**Versão:** 1.0.0  
**Última atualização:** 11/05/2026
