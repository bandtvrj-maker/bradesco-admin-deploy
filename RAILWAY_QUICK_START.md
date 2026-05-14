# ⚡ Quick Start - Deploy no Railway (5 minutos)

## 🎯 Resumo Rápido

Este projeto está pronto para deploy no Railway. Siga os passos abaixo:

---

## 1️⃣ Criar Repositório Git

```bash
cd /home/ubuntu/bradesco-railway
git init
git add .
git commit -m "Bradesco Admin Panel - Ready for Railway"
git remote add origin https://github.com/seu-usuario/bradesco-admin-panel.git
git branch -M main
git push -u origin main
```

---

## 2️⃣ Acessar Railway

1. Vá para https://railway.app
2. Faça login ou crie uma conta
3. Clique em **"New Project"**

---

## 3️⃣ Conectar GitHub

1. Selecione **"Deploy from GitHub"**
2. Autorize Railway
3. Selecione seu repositório `bradesco-admin-panel`
4. Clique em **"Deploy"**

Railway iniciará o build automaticamente ✨

---

## 4️⃣ Adicionar MySQL

1. No painel, clique em **"+ Add"**
2. Selecione **"MySQL"**
3. Railway criará a instância

---

## 5️⃣ Configurar Variáveis

No painel Railway, vá para **"Variables"** e adicione:

```
DATABASE_URL=<copie da instância MySQL>
NODE_ENV=production
JWT_SECRET=<gere um valor seguro>
PORT=3000
```

**Gerar JWT_SECRET:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## 6️⃣ Pronto! 🚀

Seu app estará em: `https://seu-projeto.up.railway.app`

- **Cliente:** `/cliente`
- **Admin:** `/admin`

---

## 🆘 Problemas?

### Build falha?
- Verifique se `DATABASE_URL` está configurada
- Limpe cache: Settings → Redeploy → Clear Build Cache

### WebSocket não conecta?
- Verifique os logs: Deployments → Logs
- Certifique-se de que o servidor está rodando

### Banco de dados não conecta?
- Verifique a string `DATABASE_URL`
- Copie exatamente do painel MySQL do Railway

---

## 📚 Documentação Completa

Veja `RAILWAY_DEPLOY.md` para guia detalhado com troubleshooting, monitoramento e segurança.

---

**Pronto para produção! 🎉**
