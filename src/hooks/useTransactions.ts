import { useState, useEffect, useCallback } from 'react';
import { transactionService, Transaction } from '../services/wallet.service';

interface UseTransactionsParams {
  startDate?: string;
  endDate?: string;
  type?: 'income' | 'expense' | 'transfer';
  accountId?: string;
  autoLoad?: boolean;
}

export const useTransactions = (params: UseTransactionsParams = {}) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { autoLoad = true, ...filters } = params;

  // Carregar transações
  const loadTransactions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await transactionService.getAll(filters);
      setTransactions(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao carregar transações';
      setError(message);
      console.error('Erro ao carregar transações:', err);
    } finally {
      setLoading(false);
    }
  }, [filters.startDate, filters.endDate, filters.type, filters.accountId]);

  // Criar nova transação
  const createTransaction = async (transaction: Omit<Transaction, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
    try {
      setLoading(true);
      setError(null);
      const newTransaction = await transactionService.create(transaction);
      setTransactions(prev => [newTransaction, ...prev]);
      return newTransaction;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao criar transação';
      setError(message);
      console.error('Erro ao criar transação:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Atualizar transação
  const updateTransaction = async (id: string, updates: Partial<Transaction>) => {
    try {
      setLoading(true);
      setError(null);
      const updated = await transactionService.update(id, updates);
      setTransactions(prev => 
        prev.map(t => t.id === id ? updated : t)
      );
      return updated;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao atualizar transação';
      setError(message);
      console.error('Erro ao atualizar transação:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Deletar transação
  const deleteTransaction = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await transactionService.delete(id);
      setTransactions(prev => prev.filter(t => t.id !== id));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao deletar transação';
      setError(message);
      console.error('Erro ao deletar transação:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Obter resumo
  const getSummary = async () => {
    try {
      const summary = await transactionService.getSummary({
        startDate: filters.startDate,
        endDate: filters.endDate,
      });
      return summary;
    } catch (err) {
      console.error('Erro ao obter resumo:', err);
      throw err;
    }
  };

  // Auto-load na montagem do componente
  useEffect(() => {
    if (autoLoad) {
      loadTransactions();
    }
  }, [autoLoad, loadTransactions]);

  return {
    transactions,
    loading,
    error,
    loadTransactions,
    createTransaction,
    updateTransaction,
    deleteTransaction,
    getSummary,
  };
};
