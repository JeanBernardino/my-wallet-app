# Guia de Uso da API - MyWallet

Este documento mostra como usar o sistema de autenticação e API do MyWallet.

## 📋 Índice

1. [Configuração](#configuração)
2. [Fluxo de Autenticação](#fluxo-de-autenticação)
3. [Usando a API](#usando-a-api)
4. [Exemplos Práticos](#exemplos-práticos)
5. [Tratamento de Erros](#tratamento-de-erros)

## ⚙️ Configuração

### 1. Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

### 2. Estrutura do Backend

Sua API backend deve:
- Validar o token Firebase usando `firebase-admin`
- Extrair o UID do usuário do token
- Proteger rotas que requerem autenticação

Exemplo de middleware (Node.js/Express):

```javascript
const admin = require('firebase-admin');

async function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken; // { uid, email, ... }
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Token inválido' });
  }
}
```

## 🔐 Fluxo de Autenticação

### Como Funciona

1. **Frontend**: Usuário faz login com Google via Firebase
2. **Firebase**: Retorna um objeto `User` autenticado
3. **Frontend**: Extrai o ID Token do Firebase (JWT)
4. **Frontend → API**: Token enviado no header `Authorization: Bearer <TOKEN>`
5. **API**: Valida token com `firebase-admin`
6. **API**: Processa requisição e retorna resposta

### Expiração e Renovação

- **Tokens expiram em 1 hora** por padrão
- O sistema **renova automaticamente** em caso de 401
- Você pode forçar renovação com `refreshToken()`

## 🚀 Usando a API

### Hook de Autenticação

```typescript
import { useAuth } from './hooks';

function MyComponent() {
  const { user, loading, error, signInWithGoogle, logout, getToken } = useAuth();

  // Verificar se está autenticado
  if (!user) {
    return <button onClick={signInWithGoogle}>Login com Google</button>;
  }

  // Obter token manualmente (opcional)
  const handleGetToken = async () => {
    const token = await getToken();
    console.log('Token:', token);
  };

  return (
    <div>
      <p>Olá, {user.displayName}!</p>
      <button onClick={logout}>Sair</button>
    </div>
  );
}
```

### Usando os Serviços da API

#### Transações

```typescript
import { transactionService } from './services/wallet.service';

// Listar transações
const transactions = await transactionService.getAll();

// Filtrar transações
const filteredTransactions = await transactionService.getAll({
  startDate: '2026-01-01',
  endDate: '2026-01-31',
  type: 'expense',
});

// Criar nova transação
const newTransaction = await transactionService.create({
  type: 'expense',
  amount: 150.50,
  category: 'Alimentação',
  description: 'Jantar no restaurante',
  date: '2026-02-16',
  accountId: 'account-123',
});

// Atualizar transação
await transactionService.update('transaction-id', {
  amount: 200.00,
  description: 'Jantar e sobremesa',
});

// Deletar transação
await transactionService.delete('transaction-id');

// Obter resumo
const summary = await transactionService.getSummary({
  startDate: '2026-02-01',
  endDate: '2026-02-28',
});
console.log(summary); // { totalIncome, totalExpense, balance, transactionCount }
```

#### Contas

```typescript
import { accountService } from './services/wallet.service';

// Listar contas
const accounts = await accountService.getAll();

// Criar conta
const newAccount = await accountService.create({
  name: 'Conta Corrente',
  type: 'checking',
  balance: 5000.00,
  currency: 'BRL',
});

// Obter saldo total
const { totalBalance } = await accountService.getTotalBalance();
```

#### Categorias

```typescript
import { categoryService } from './services/wallet.service';

// Listar categorias de despesas
const expenseCategories = await categoryService.getAll('expense');

// Criar categoria
const category = await categoryService.create({
  name: 'Transporte',
  type: 'expense',
  icon: '🚗',
  color: '#FF5722',
});
```

#### Relatórios

```typescript
import { reportService } from './services/wallet.service';

// Relatório por categoria
const categoryReport = await reportService.getByCategory({
  startDate: '2026-01-01',
  endDate: '2026-12-31',
});

// Relatório mensal
const monthlyReport = await reportService.getMonthly(2026);

// Exportar para CSV
const csvBlob = await reportService.export('csv', {
  startDate: '2026-01-01',
  endDate: '2026-12-31',
});
```

## 💡 Exemplos Práticos

### Exemplo 1: Componente de Lista de Transações

```typescript
import { useState, useEffect } from 'react';
import { transactionService, Transaction } from './services/wallet.service';

export const TransactionList = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      setLoading(true);
      const data = await transactionService.getAll();
      setTransactions(data);
    } catch (err) {
      setError('Erro ao carregar transações');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await transactionService.delete(id);
      setTransactions(transactions.filter(t => t.id !== id));
    } catch (err) {
      console.error('Erro ao deletar:', err);
    }
  };

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      {transactions.map(transaction => (
        <div key={transaction.id}>
          <p>{transaction.description} - R$ {transaction.amount}</p>
          <button onClick={() => handleDelete(transaction.id!)}>Deletar</button>
        </div>
      ))}
    </div>
  );
};
```

### Exemplo 2: Criar Nova Transação

```typescript
import { useState } from 'react';
import { transactionService } from './services/wallet.service';

export const NewTransactionForm = () => {
  const [formData, setFormData] = useState({
    type: 'expense' as const,
    amount: 0,
    category: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    accountId: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await transactionService.create(formData);
      alert('Transação criada com sucesso!');
      // Resetar formulário ou redirecionar
    } catch (error) {
      console.error('Erro ao criar transação:', error);
      alert('Erro ao criar transação');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        value={formData.amount}
        onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
        placeholder="Valor"
      />
      <input
        type="text"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        placeholder="Descrição"
      />
      <button type="submit">Criar Transação</button>
    </form>
  );
};
```

### Exemplo 3: Dashboard com Resumo

```typescript
import { useState, useEffect } from 'react';
import { transactionService } from './services/wallet.service';

export const DashboardSummary = () => {
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
    transactionCount: 0,
  });

  useEffect(() => {
    loadSummary();
  }, []);

  const loadSummary = async () => {
    try {
      const data = await transactionService.getSummary();
      setSummary(data);
    } catch (error) {
      console.error('Erro ao carregar resumo:', error);
    }
  };

  return (
    <div>
      <h2>Resumo Financeiro</h2>
      <div>
        <p>Receitas: R$ {summary.totalIncome.toFixed(2)}</p>
        <p>Despesas: R$ {summary.totalExpense.toFixed(2)}</p>
        <p>Saldo: R$ {summary.balance.toFixed(2)}</p>
        <p>Total de Transações: {summary.transactionCount}</p>
      </div>
    </div>
  );
};
```

## 🚨 Tratamento de Erros

### Erros Automáticos

O sistema trata automaticamente:
- **401 Unauthorized**: Renova o token e tenta novamente
- **403 Forbidden**: Redireciona para login se necessário
- **500+ Server Errors**: Loga no console

### Tratamento Manual

```typescript
try {
  const data = await transactionService.create(newTransaction);
  console.log('Sucesso:', data);
} catch (error) {
  if (error.response) {
    // Erro da API
    const { status, data } = error.response;
    
    if (status === 400) {
      console.error('Dados inválidos:', data.message);
    } else if (status === 404) {
      console.error('Recurso não encontrado');
    } else {
      console.error('Erro do servidor:', data);
    }
  } else if (error.request) {
    // Erro de rede
    console.error('Sem resposta do servidor');
  } else {
    // Outro erro
    console.error('Erro:', error.message);
  }
}
```

## 🔧 Uso Avançado

### Chamadas Diretas com apiService

Se precisar de mais controle:

```typescript
import { apiService } from './services';

// GET com config customizada
const data = await apiService.get('/custom-endpoint', {
  params: { limit: 10 },
  timeout: 5000,
});

// POST com headers customizados
const result = await apiService.post('/custom-endpoint', 
  { data: 'example' },
  { headers: { 'X-Custom-Header': 'value' } }
);
```

### Verificar Token Atual

```typescript
import { apiService } from './services';

const token = await apiService.getCurrentToken();
console.log('Token atual:', token);

const isAuth = apiService.isAuthenticated();
console.log('Autenticado?', isAuth);
```

### Forçar Renovação de Token

```typescript
import { useAuth } from './hooks';

const { refreshToken } = useAuth();

// Forçar renovação
const newToken = await refreshToken();
```

## 📝 Notas Importantes

1. **Tokens são gerenciados automaticamente** - Não precisa adicionar manualmente em cada requisição
2. **Tokens expiram em 1 hora** - Renovação automática em caso de 401
3. **Use HTTPS em produção** - Nunca exponha tokens em URLs ou logs em produção
4. **Backend deve validar tokens** - Use `firebase-admin` para validar no servidor
5. **Logs de debug** - Remova `console.log` de tokens em produção

## 🎯 Próximos Passos

1. Configure sua API backend com `firebase-admin`
2. Implemente os endpoints necessários
3. Teste o fluxo de autenticação
4. Remova logs de debug em produção
5. Configure CORS adequadamente no backend
