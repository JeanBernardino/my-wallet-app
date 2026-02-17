# 🔐 Sistema de Autenticação e API - MyWallet

## ✅ Implementação Completa

Este documento resume a implementação do fluxo de autenticação com Firebase e integração com API backend.

---

## 📦 O que foi criado

### 1. **AuthContext** (`src/contexts/AuthContext.tsx`)
- Context global para gerenciar autenticação
- Estado compartilhado do usuário
- Funções de login/logout
- Gerenciamento de tokens
- Logs de debug para desenvolvimento

### 2. **Serviço de API** (`src/services/api.service.ts`)
- Cliente Axios configurado
- **Interceptor de Request**: Adiciona automaticamente o token em todas as requisições
- **Interceptor de Response**: Renova token automaticamente em caso de 401
- Métodos helper: `get`, `post`, `put`, `patch`, `delete`
- Funções auxiliares para obter token e verificar autenticação

### 3. **Serviços de Wallet** (`src/services/wallet.service.ts`)
Serviços tipados para:
- **Transações**: CRUD completo + resumos
- **Contas**: Gerenciamento de contas bancárias
- **Categorias**: Categorização de transações
- **Relatórios**: Análises e exportações
- **Usuário**: Perfil e estatísticas

### 4. **Hooks Customizados**

#### `useAuth` (`src/hooks/useAuth.ts`)
Simplificado para usar o AuthContext
```typescript
const { user, loading, error, signInWithGoogle, logout, getToken } = useAuth();
```

#### `useTransactions` (`src/hooks/useTransactions.ts`)
Hook completo para gerenciar transações:
```typescript
const {
  transactions,
  loading,
  error,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  getSummary,
} = useTransactions();
```

#### `useAccounts` (`src/hooks/useAccounts.ts`)
Hook para gerenciar contas:
```typescript
const {
  accounts,
  totalBalance,
  loading,
  createAccount,
  updateAccount,
  deleteAccount,
} = useAccounts();
```

### 5. **Componente de Exemplo** (`src/components/TransactionExample.tsx`)
Demonstração prática de uso da API com:
- Listagem de transações
- Formulário de criação
- Ação de deletar
- Tratamento de erros
- Info de debug

### 6. **Documentação** (`API_USAGE.md`)
Guia completo com:
- Configuração do projeto
- Explicação do fluxo
- Exemplos de código
- Casos de uso práticos
- Tratamento de erros

---

## 🔄 Fluxo de Autenticação

```
┌─────────────┐
│   FRONTEND  │
│             │
│  1. Login   │──────────────────┐
│  com Google │                  │
└─────────────┘                  ▼
                          ┌─────────────┐
                          │  FIREBASE   │
                          │             │
                          │  2. Retorna │
                          │  User + JWT │
                          └─────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────┐
│  INTERCEPTOR (api.service.ts)               │
│                                             │
│  3. Extrai token: user.getIdToken()         │
│  4. Adiciona header:                        │
│     Authorization: Bearer <TOKEN>           │
└─────────────────────────────────────────────┘
                                 │
                                 ▼
                          ┌─────────────┐
                          │  SUA API    │
                          │             │
                          │  5. Valida  │
                          │  com        │
                          │  firebase-  │
                          │  admin      │
                          └─────────────┘
```

---

## 🚀 Como Usar

### 1. Configure o `.env`

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

### 2. Configure o Backend

Sua API precisa validar o token:

```javascript
// Node.js + Express + firebase-admin
const admin = require('firebase-admin');

async function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }
  
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken; // { uid, email, name, ... }
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Token inválido' });
  }
}

// Use em rotas protegidas
app.get('/api/transactions', authenticateToken, async (req, res) => {
  const userId = req.user.uid;
  // Buscar transações do usuário...
});
```

### 3. Use no Frontend

```typescript
import { useTransactions } from './hooks';

function MyComponent() {
  const { transactions, loading, createTransaction } = useTransactions();
  
  const handleCreate = async () => {
    await createTransaction({
      type: 'expense',
      amount: 50.00,
      category: 'Alimentação',
      description: 'Almoço',
      date: '2026-02-16',
      accountId: 'account-id',
    });
  };
  
  return (
    <div>
      {transactions.map(t => (
        <div key={t.id}>{t.description} - R$ {t.amount}</div>
      ))}
      <button onClick={handleCreate}>Criar</button>
    </div>
  );
}
```

---

## 📋 Checklist de Implementação

### Frontend (✅ Completo)
- ✅ AuthContext com gerenciamento de estado
- ✅ Serviço de API com interceptores
- ✅ Tokens adicionados automaticamente
- ✅ Renovação automática de token expirado
- ✅ Hooks customizados para facilitar uso
- ✅ Tipos TypeScript completos
- ✅ Componente de exemplo
- ✅ Documentação completa

### Backend (⏳ Você precisa implementar)
- ⬜ Instalar `firebase-admin`
- ⬜ Inicializar Firebase Admin SDK
- ⬜ Criar middleware de autenticação
- ⬜ Proteger rotas com middleware
- ⬜ Extrair UID do usuário do token
- ⬜ Implementar endpoints da API
- ⬜ Configurar CORS

---

## 🔧 Estrutura de Endpoints Recomendada

```
GET    /api/transactions              - Listar transações
POST   /api/transactions              - Criar transação
GET    /api/transactions/:id          - Obter transação
PUT    /api/transactions/:id          - Atualizar transação
DELETE /api/transactions/:id          - Deletar transação
GET    /api/transactions/summary      - Resumo financeiro

GET    /api/accounts                  - Listar contas
POST   /api/accounts                  - Criar conta
GET    /api/accounts/:id              - Obter conta
PUT    /api/accounts/:id              - Atualizar conta
DELETE /api/accounts/:id              - Deletar conta
GET    /api/accounts/balance          - Saldo total

GET    /api/categories                - Listar categorias
POST   /api/categories                - Criar categoria
GET    /api/categories/:id            - Obter categoria
PUT    /api/categories/:id            - Atualizar categoria
DELETE /api/categories/:id            - Deletar categoria

GET    /api/reports/by-category       - Relatório por categoria
GET    /api/reports/monthly           - Relatório mensal
GET    /api/reports/export            - Exportar dados

GET    /api/user/profile              - Perfil do usuário
PUT    /api/user/profile              - Atualizar perfil
GET    /api/user/stats                - Estatísticas do usuário
```

---

## 🎯 Exemplo de Backend (Node.js + Express)

```javascript
const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');

// Inicializar Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(require('./serviceAccountKey.json'))
});

const app = express();

app.use(cors());
app.use(express.json());

// Middleware de autenticação
async function authenticate(req, res, next) {
  try {
    const token = req.headers.authorization?.split('Bearer ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Token não fornecido' });
    }
    
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Token inválido' });
  }
}

// Rotas
app.get('/api/transactions', authenticate, async (req, res) => {
  const userId = req.user.uid;
  // Buscar do banco de dados...
  res.json([]);
});

app.post('/api/transactions', authenticate, async (req, res) => {
  const userId = req.user.uid;
  const transaction = { ...req.body, userId };
  // Salvar no banco de dados...
  res.json(transaction);
});

app.listen(3000, () => {
  console.log('API rodando na porta 3000');
});
```

---

## 🐛 Debug e Troubleshooting

### Ver Token no Console
Os logs estão ativados no `AuthContext`. Abra o console (F12) e veja:
```
✅ Usuário autenticado: user@email.com
🔑 Token obtido: eyJhbGciOiJSUzI1NiI...
```

### Token não está sendo enviado?
Verifique se o `AuthProvider` está envolvendo o app no `main.tsx`:
```typescript
<AuthProvider>
  <App />
</AuthProvider>
```

### API retorna 401?
1. Verifique se o backend está validando corretamente
2. Veja os logs no console do navegador
3. Teste o token manualmente em https://jwt.io

### CORS Error?
Configure CORS no backend:
```javascript
app.use(cors({
  origin: 'http://localhost:5174',
  credentials: true
}));
```

---

## 📚 Recursos Adicionais

- [Firebase Admin SDK Docs](https://firebase.google.com/docs/admin/setup)
- [Axios Interceptors](https://axios-http.com/docs/interceptors)
- [JWT.io - Teste seus tokens](https://jwt.io)

---

## 🎉 Próximos Passos

1. **Implemente o backend** seguindo os exemplos
2. **Teste o fluxo completo** criando transações
3. **Remova logs de debug** em produção
4. **Configure HTTPS** em produção
5. **Implemente refresh token** se necessário
6. **Adicione testes** para os serviços

---

**Implementado por:** GitHub Copilot
**Data:** 16 de fevereiro de 2026
**Status:** ✅ Frontend Completo - Backend Pendente
