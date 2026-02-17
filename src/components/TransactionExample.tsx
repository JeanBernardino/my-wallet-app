import { useState } from 'react';
import { useTransactions } from '../hooks';
import { Transaction } from '../services/wallet.service';

/**
 * Componente de exemplo que demonstra como usar a API de transações
 * 
 * Este componente mostra:
 * - Como listar transações com o hook useTransactions
 * - Como criar uma nova transação
 * - Como deletar uma transação
 * - Como tratar erros
 * 
 * NOTA: Este é um componente de exemplo para documentação.
 * Para usar em produção, substitua os estilos inline por classes Tailwind.
 */
export const TransactionExample = () => {
  const {
    transactions,
    loading,
    error,
    createTransaction,
    deleteTransaction,
    loadTransactions,
  } = useTransactions();

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Omit<Transaction, 'id' | 'userId' | 'createdAt' | 'updatedAt'>>({
    type: 'expense',
    amount: 0,
    category: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    accountId: 'default-account-id',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await createTransaction(formData);
      alert('✅ Transação criada com sucesso!');
      setShowForm(false);
      
      // Resetar formulário
      setFormData({
        type: 'expense',
        amount: 0,
        category: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
        accountId: 'default-account-id',
      });
    } catch (err) {
      alert('❌ Erro ao criar transação. Verifique o console.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Tem certeza que deseja deletar esta transação?')) {
      return;
    }

    try {
      await deleteTransaction(id);
      alert('✅ Transação deletada com sucesso!');
    } catch (err) {
      alert('❌ Erro ao deletar transação');
    }
  };

  if (loading && transactions.length === 0) {
    return (
      <div className="p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#009900] border-t-transparent mx-auto"></div>
        <p className="mt-4 text-[#006600]">Carregando transações...</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-[#003300]">
          Exemplo de Uso da API
        </h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-gradient-to-r from-[#009900] to-[#006600] text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all"
        >
          {showForm ? 'Cancelar' : '+ Nova Transação'}
        </button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 font-medium">❌ Erro: {error}</p>
        </div>
      )}

      {/* Formulário de Nova Transação */}
      {showForm && (
        <form onSubmit={handleSubmit} className="mb-6 p-6 bg-[#ccffcc]/20 rounded-xl border border-[#66cc66]/30">
          <h3 className="text-lg font-bold text-[#003300] mb-4">Nova Transação</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#006600] mb-1">
                Tipo
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                className="w-full px-4 py-2 border border-[#66cc66] rounded-lg focus:ring-2 focus:ring-[#009900] focus:border-transparent"
              >
                <option value="expense">Despesa</option>
                <option value="income">Receita</option>
                <option value="transfer">Transferência</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#006600] mb-1">
                Valor (R$)
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
                className="w-full px-4 py-2 border border-[#66cc66] rounded-lg focus:ring-2 focus:ring-[#009900] focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#006600] mb-1">
                Categoria
              </label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 border border-[#66cc66] rounded-lg focus:ring-2 focus:ring-[#009900] focus:border-transparent"
                placeholder="Ex: Alimentação, Salário..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#006600] mb-1">
                Data
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-4 py-2 border border-[#66cc66] rounded-lg focus:ring-2 focus:ring-[#009900] focus:border-transparent"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-[#006600] mb-1">
                Descrição
              </label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 border border-[#66cc66] rounded-lg focus:ring-2 focus:ring-[#009900] focus:border-transparent"
                placeholder="Descreva a transação..."
                required
              />
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-[#009900] to-[#006600] text-white px-6 py-2 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all disabled:opacity-50"
            >
              {loading ? 'Criando...' : 'Criar Transação'}
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-all"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

      {/* Lista de Transações */}
      <div className="space-y-3">
        {transactions.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-[#ccffcc]/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-[#006600]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <p className="text-[#006600] font-medium">Nenhuma transação encontrada</p>
            <p className="text-[#66cc66] text-sm mt-1">
              {error 
                ? 'Erro ao conectar com a API. Verifique se o backend está rodando.' 
                : 'Crie sua primeira transação clicando no botão acima'}
            </p>
            <button
              onClick={loadTransactions}
              className="mt-4 text-[#009900] font-semibold hover:underline"
            >
              🔄 Recarregar
            </button>
          </div>
        ) : (
          transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 bg-gradient-to-r from-[#ccffcc]/30 to-transparent rounded-xl border border-[#66cc66]/30 hover:border-[#66cc66]/50 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  transaction.type === 'income' 
                    ? 'bg-green-500' 
                    : transaction.type === 'expense' 
                    ? 'bg-red-500' 
                    : 'bg-blue-500'
                }`}>
                  {transaction.type === 'income' && (
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  )}
                  {transaction.type === 'expense' && (
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                    </svg>
                  )}
                  {transaction.type === 'transfer' && (
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                  )}
                </div>
                
                <div>
                  <h3 className="font-bold text-[#003300]">{transaction.description}</h3>
                  <p className="text-sm text-[#006600]">
                    {transaction.category} • {new Date(transaction.date).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <p className={`text-xl font-bold ${
                  transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction.type === 'income' ? '+' : '-'} R$ {transaction.amount.toFixed(2)}
                </p>
                
                <button
                  onClick={() => transaction.id && handleDelete(transaction.id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  title="Deletar transação"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Info de Debug */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="font-bold text-blue-900 mb-2">ℹ️ Informações de Debug</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Total de transações: {transactions.length}</li>
          <li>• Estado de loading: {loading ? 'Sim' : 'Não'}</li>
          <li>• Erro: {error || 'Nenhum'}</li>
          <li>• URL da API: {import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'}</li>
        </ul>
        <p className="text-xs text-blue-600 mt-2">
          💡 Dica: Abra o console do navegador (F12) para ver os logs detalhados de token e requisições.
        </p>
      </div>
    </div>
  );
};
