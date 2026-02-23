import { apiService } from './api.service';

// Tipos de dados
export interface Transaction {
  id?: string;
  userId?: string;
  type: 'income' | 'expense' | 'transfer';
  amount: number;
  category: string;
  description: string;
  date: string;
  accountId: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Account {
  id?: string;
  userId?: string;
  name: string;
  type: 'checking' | 'savings' | 'credit' | 'investment';
  balance: number;
  currency: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Category {
  id?: string;
  userId?: string;
  name: string;
  type: 'income' | 'expense';
  icon?: string;
  color?: string;
  createdAt?: string;
  updatedAt?: string;
}

// ============================================
// TRANSAÇÕES
// ============================================

export const transactionService = {
  // Listar todas as transações
  getAll: async (params?: {
    startDate?: string;
    endDate?: string;
    type?: string;
    accountId?: string;
  }): Promise<Transaction[]> => {
    const queryParams = new URLSearchParams(params as any).toString();
    const url = queryParams ? `/transactions?${queryParams}` : '/transactions';
    return await apiService.get<Transaction[]>(url);
  },

  // Obter uma transação específica
  getById: async (id: string): Promise<Transaction> => {
    return await apiService.get<Transaction>(`/transactions/${id}`);
  },

  // Criar nova transação
  create: async (transaction: Omit<Transaction, 'id' | 'userId' | 'createdAt' | 'updatedAt'>): Promise<Transaction> => {
    return await apiService.post<Transaction>('/transactions', transaction);
  },

  // Atualizar transação
  update: async (id: string, transaction: Partial<Transaction>): Promise<Transaction> => {
    return await apiService.put<Transaction>(`/transactions/${id}`, transaction);
  },

  // Deletar transação
  delete: async (id: string): Promise<void> => {
    return await apiService.delete(`/transactions/${id}`);
  },

  // Obter resumo de transações
  getSummary: async (params?: { startDate?: string; endDate?: string }) => {
    const queryParams = new URLSearchParams(params as any).toString();
    const url = queryParams ? `/transactions/summary?${queryParams}` : '/transactions/summary';
    return await apiService.get<{
      totalIncome: number;
      totalExpense: number;
      balance: number;
      transactionCount: number;
    }>(url);
  },
};

// ============================================
// CONTAS
// ============================================

export const accountService = {
  // Listar todas as contas
  getAll: async (): Promise<Account[]> => {
    return await apiService.get<Account[]>('/accounts');
  },

  // Obter uma conta específica
  getById: async (id: string): Promise<Account> => {
    return await apiService.get<Account>(`/accounts/${id}`);
  },

  // Criar nova conta
  create: async (account: Omit<Account, 'id' | 'userId' | 'createdAt' | 'updatedAt'>): Promise<Account> => {
    return await apiService.post<Account>('/accounts', account);
  },

  // Atualizar conta
  update: async (id: string, account: Partial<Account>): Promise<Account> => {
    return await apiService.put<Account>(`/accounts/${id}`, account);
  },

  // Deletar conta
  delete: async (id: string): Promise<void> => {
    return await apiService.delete(`/accounts/${id}`);
  },

  // Obter saldo total
  getTotalBalance: async (): Promise<{ totalBalance: number; currency: string }> => {
    return await apiService.get('/accounts/balance');
  },
};

// ============================================
// CATEGORIAS
// ============================================

export const categoryService = {
  // Listar todas as categorias
  getAll: async (type?: 'income' | 'expense'): Promise<Category[]> => {
    const url = type ? `/categories?type=${type}` : '/categories';
    return await apiService.get<Category[]>(url);
  },

  // Obter uma categoria específica
  getById: async (id: string): Promise<Category> => {
    return await apiService.get<Category>(`/categories/${id}`);
  },

  // Criar nova categoria
  create: async (category: Omit<Category, 'id' | 'userId' | 'createdAt' | 'updatedAt'>): Promise<Category> => {
    return await apiService.post<Category>('/categories', category);
  },

  // Atualizar categoria
  update: async (id: string, category: Partial<Category>): Promise<Category> => {
    return await apiService.put<Category>(`/categories/${id}`, category);
  },

  // Deletar categoria
  delete: async (id: string): Promise<void> => {
    return await apiService.delete(`/categories/${id}`);
  },
};

// ============================================
// RELATÓRIOS
// ============================================

export const reportService = {
  // Relatório por categoria
  getByCategory: async (params?: { startDate?: string; endDate?: string }) => {
    const queryParams = new URLSearchParams(params as any).toString();
    const url = queryParams ? `/reports/by-category?${queryParams}` : '/reports/by-category';
    return await apiService.get<Array<{
      category: string;
      amount: number;
      percentage: number;
      transactionCount: number;
    }>>(url);
  },

  // Relatório mensal
  getMonthly: async (year: number) => {
    return await apiService.get<Array<{
      month: number;
      income: number;
      expense: number;
      balance: number;
    }>>(`/reports/monthly?year=${year}`);
  },

  // Exportar dados
  export: async (format: 'csv' | 'pdf', params?: { startDate?: string; endDate?: string }) => {
    const queryParams = new URLSearchParams({ format, ...params } as any).toString();
    return await apiService.get<Blob>(`/reports/export?${queryParams}`, {
      responseType: 'blob',
    });
  },
};

// ============================================
// USUÁRIO/PERFIL
// ============================================

export const userService = {
  // Obter perfil do usuário
  getProfile: async () => {
    return await apiService.get('/user/profile');
  },

  // Atualizar perfil
  updateProfile: async (data: { displayName?: string; photoURL?: string; preferences?: any }) => {
    return await apiService.put('/user/profile', data);
  },

  // Obter estatísticas do usuário
  getStats: async () => {
    return await apiService.get<{
      totalTransactions: number;
      totalAccounts: number;
      totalCategories: number;
      lastTransactionDate: string;
    }>('/user/stats');
  },
};
