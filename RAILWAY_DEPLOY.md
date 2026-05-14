# 🚀 Guia Completo de Deploy no Railway

**Versão:** 1.0.0  
**Data:** 11/05/2026  
**Sistema:** Bradesco Admin Panel

---

## 📋 Pré-requisitos

- [x] Conta no Railway (https://railway.app)
- [x] Git instalado localmente
- [x] GitHub ou GitLab com acesso ao repositório
- [x] Node.js 22+ (para testes locais)
- [x] MySQL 8+ (para banco de dados)

---

## 🎯 Passo a Passo do Deploy

### Passo 1: Preparar o Repositório Git

```bash
# 1. Navegar para o diretório do projeto
cd /home/ubuntu/bradesco-railway

# 2. Inicializar git (se ainda não estiver)
git init
git add .
git commit -m "Initial commit: Bradesco Admin Panel ready for Railway"

# 3. Adicionar repositório remoto (GitHub/GitLab)
git remote add origin https://github.com/seu-usuario/bradesco-admin-panel.git
git branch -M main
git push -u origin main
```

### Passo 2: Criar Projeto no Railway

1. Acesse https://railway.app
2. Clique em **"New Project"**
3. Selecione **"Deploy from GitHub"**
4. Autorize o Railway a acessar seu GitHub
5. Selecione o repositório `bradesco-admin-panel`
6. Clique em **"Deploy"**

### Passo 3: Adicionar Banco de Dados MySQL

1. No painel do Railway, clique em **"+ Add"**
2. Selecione **"MySQL"**
3. Railway criará automaticamente uma instância MySQL
4. Copie a string de conexão (DATABASE_URL)

### Passo 4: Configurar Variáveis de Ambiente

1. No painel do Railway, vá para **"Variables"**
2. Adicione as seguintes variáveis:

```
DATABASE_URL=mysql://user:password@host:port/database
NODE_ENV=production
PORT=3000
JWT_SECRET=seu-jwt-secret-super-seguro-aqui
APP_NAME=Bradesco Admin Panel
```

**Importante:** Gere um JWT_SECRET seguro:
```bash
# No terminal
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Passo 5: Executar Migrations do Banco de Dados

1. No painel do Railway, vá para **"Deployments"**
2. Clique no deployment mais recente
3. Vá para **"Logs"** e procure por mensagens de erro
4. Se houver erro de schema, execute manualmente:

```bash
# Conectar ao banco de dados MySQL do Railway
mysql -h seu-host -u seu-usuario -p seu-database < drizzle/migrations.sql
```

Ou use a interface do Railway para executar SQL:
1. Vá para a instância MySQL
2. Clique em **"Connect"**
3. Cole o conteúdo do arquivo de migration

### Passo 6: Verificar o Deploy

1. Acesse a URL gerada pelo Railway (ex: `https://bradesco-admin-panel-production.up.railway.app`)
2. Teste os endpoints:
   - **Cliente:** `/cliente`
   - **Admin:** `/admin`
   - **Health Check:** `/api/health`

---

## 🔧 Configuração Avançada

### Aumentar Timeout de Build

Se o build falhar por timeout:

1. Vá para **"Settings"**
2. Procure por **"Build Command Timeout"**
3. Aumente para **1200 segundos** (20 minutos)

### Configurar Domain Customizado

1. Vá para **"Deployments"**
2. Clique em **"Settings"**
3. Vá para **"Domains"**
4. Clique em **"+ Add Domain"**
5. Digite seu domínio customizado
6. Configure os registros DNS conforme instruído

### Monitorar Logs

```bash
# Ver logs em tempo real
railway logs --follow

# Ver logs do build
railway logs --build
```

---

## 🐛 Troubleshooting

### Erro: "DATABASE_URL is required"

**Solução:** Verifique se a variável `DATABASE_URL` está configurada no Railway:
```bash
railway variables
```

### Erro: "Port already in use"

**Solução:** Railway define a porta automaticamente via variável `PORT`. O código já está configurado para usar:
```javascript
const port = process.env.PORT || 3000;
```

### Build falha com erro de dependências

**Solução:** Limpe o cache e reconstrua:
```bash
# No painel Railway
1. Vá para "Deployments"
2. Clique em "Redeploy"
3. Selecione "Clear Build Cache"
```

### WebSocket não conecta

**Solução:** Verifique se o Socket.IO está configurado para CORS:
```typescript
// server/_core/index.ts já está configurado com:
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});
```

### Banco de dados não conecta

**Solução:** Verifique a string de conexão:
```bash
# Formato correto:
mysql://username:password@host:port/database

# Exemplo Railway:
mysql://root:abc123@containers-us-west-xxx.railway.app:3306/bradesco_admin
```

---

## 📊 Monitoramento

### Ver Status do Deploy

```bash
railway status
```

### Ver Uso de Recursos

1. No painel Railway, vá para **"Metrics"**
2. Monitore:
   - CPU Usage
   - Memory Usage
   - Network I/O
   - Disk Usage

### Configurar Alertas

1. Vá para **"Settings"**
2. Clique em **"Notifications"**
3. Configure alertas para:
   - Deploy failures
   - High CPU usage
   - High memory usage

---

## 🔐 Segurança

### Variáveis Sensíveis

Nunca commite `.env` no repositório! Use `.env.example` como template.

```bash
# Adicionar ao .gitignore
echo ".env" >> .gitignore
git add .gitignore
git commit -m "Add .env to gitignore"
```

### HTTPS Automático

Railway fornece HTTPS automaticamente para todos os domínios.

### Rate Limiting

Considere adicionar rate limiting para a API:
```typescript
// Adicionar no server/_core/index.ts
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // limite de 100 requisições por IP
});

app.use('/api/', limiter);
```

---

## 📈 Performance

### Otimizações Recomendadas

1. **Ativar Gzip Compression:**
```typescript
import compression from 'compression';
app.use(compression());
```

2. **Configurar Cache Headers:**
```typescript
app.use(express.static('dist/public', {
  maxAge: '1d',
  etag: false
}));
```

3. **Usar CDN para Assets:**
- Considere usar Cloudflare para servir assets estáticos

### Escalar Horizontalmente

Se precisar de mais capacidade:

1. Vá para **"Settings"**
2. Aumente o número de **"Replicas"**
3. Railway distribuirá o tráfego automaticamente

---

## 🚀 CI/CD Automático

Railway detecta automaticamente pushes para o repositório e faz deploy.

Para desabilitar deploys automáticos:

1. Vá para **"Settings"**
2. Desabilite **"Auto Deploy"**

Para fazer deploy manual:
```bash
railway deploy
```

---

## 📞 Suporte

### Recursos Úteis

- [Railway Docs](https://docs.railway.app)
- [Railway Community](https://railway.app/community)
- [GitHub Issues](https://github.com/seu-usuario/bradesco-admin-panel/issues)

### Contato

Para problemas com o Railway, acesse: https://railway.app/support

---

## ✅ Checklist Final

Antes de considerar o deploy completo:

- [ ] Repositório Git criado e pushado
- [ ] Projeto Railway criado
- [ ] MySQL adicionado e conectado
- [ ] Variáveis de ambiente configuradas
- [ ] Build bem-sucedido
- [ ] Migrations executadas
- [ ] Cliente acessível em `/cliente`
- [ ] Admin acessível em `/admin`
- [ ] WebSocket conectando
- [ ] Banco de dados respondendo
- [ ] Logs monitorados
- [ ] Domínio customizado (opcional) configurado

---

**Pronto para produção! 🎉**

Seu Bradesco Admin Panel está online no Railway!

---

**Versão:** 1.0.0  
**Última atualização:** 11/05/2026
