import { useState, useEffect, useCallback } from 'react';
import { accountService, Account } from '../services/wallet.service';

export const useAccounts = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalBalance, setTotalBalance] = useState<number>(0);

  // Carregar contas
  const loadAccounts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await accountService.getAll();
      setAccounts(data);
      
      // Carregar saldo total
      const balance = await accountService.getTotalBalance();
      setTotalBalance(balance.totalBalance);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao carregar contas';
      setError(message);
      console.error('Erro ao carregar contas:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Criar nova conta
  const createAccount = async (account: Omit<Account, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
    try {
      setLoading(true);
      setError(null);
      const newAccount = await accountService.create(account);
      setAccounts(prev => [...prev, newAccount]);
      return newAccount;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao criar conta';
      setError(message);
      console.error('Erro ao criar conta:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Atualizar conta
  const updateAccount = async (id: string, updates: Partial<Account>) => {
    try {
      setLoading(true);
      setError(null);
      const updated = await accountService.update(id, updates);
      setAccounts(prev => 
        prev.map(a => a.id === id ? updated : a)
      );
      return updated;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao atualizar conta';
      setError(message);
      console.error('Erro ao atualizar conta:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Deletar conta
  const deleteAccount = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await accountService.delete(id);
      setAccounts(prev => prev.filter(a => a.id !== id));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao deletar conta';
      setError(message);
      console.error('Erro ao deletar conta:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Auto-load na montagem do componente
  useEffect(() => {
    loadAccounts();
  }, [loadAccounts]);

  return {
    accounts,
    totalBalance,
    loading,
    error,
    loadAccounts,
    createAccount,
    updateAccount,
    deleteAccount,
  };
};
