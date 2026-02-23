export const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-[#ccffcc]/30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#009900] to-[#006600] rounded-xl flex items-center justify-center shadow-md">
            <svg className="w-5 h-5 text-[#ccffcc]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-[#003300] to-[#009900] bg-clip-text text-transparent">
              Bem-vindo de volta!
            </h1>
            <p className="text-[#006600] text-sm">
              Gerencie suas finanças de forma inteligente
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Saldo Total */}
        <div className="bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-[#ccffcc]/30 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-[#006600] uppercase tracking-wide">Saldo Total</h3>
            <div className="w-10 h-10 bg-gradient-to-br from-[#009900] to-[#006600] rounded-lg flex items-center justify-center shadow-md">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <p className="text-3xl font-bold text-[#003300] mb-2">R$ 0,00</p>
          <p className="text-sm text-[#009900] font-medium flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            +0% este mês
          </p>
        </div>

        {/* Receitas */}
        <div className="bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-[#ccffcc]/30 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-[#006600] uppercase tracking-wide">Receitas</h3>
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center shadow-md">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>
          <p className="text-3xl font-bold text-[#003300] mb-2">R$ 0,00</p>
          <p className="text-sm text-green-600 font-medium">Este mês</p>
        </div>

        {/* Despesas */}
        <div className="bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-[#ccffcc]/30 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-[#006600] uppercase tracking-wide">Despesas</h3>
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center shadow-md">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
              </svg>
            </div>
          </div>
          <p className="text-3xl font-bold text-[#003300] mb-2">R$ 0,00</p>
          <p className="text-sm text-red-600 font-medium">Este mês</p>
        </div>

        {/* Investimentos */}
        <div className="bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-[#ccffcc]/30 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-[#006600] uppercase tracking-wide">Investimentos</h3>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-md">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
              </svg>
            </div>
          </div>
          <p className="text-3xl font-bold text-[#003300] mb-2">R$ 0,00</p>
          <p className="text-sm text-blue-600 font-medium">Total investido</p>
        </div>
      </div>

      {/* Charts and Recent Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Transactions */}
        <div className="lg:col-span-2 bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-[#ccffcc]/30">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-[#003300]">Transações Recentes</h2>
            <button className="text-[#009900] text-sm font-semibold hover:underline">
              Ver todas
            </button>
          </div>
          
          <div className="space-y-4">
            {/* Empty State */}
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-[#ccffcc]/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#006600]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <p className="text-[#006600] font-medium">Nenhuma transação ainda</p>
              <p className="text-[#66cc66] text-sm mt-1">Adicione sua primeira transação</p>
              <button className="mt-4 bg-gradient-to-r from-[#009900] to-[#006600] text-white px-6 py-2.5 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                + Nova Transação
              </button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-[#ccffcc]/30">
          <h2 className="text-xl font-bold text-[#003300] mb-6">Ações Rápidas</h2>
          
          <div className="space-y-3">
            <button className="w-full flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 rounded-xl transition-all duration-200 group">
              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <span className="font-semibold text-green-700">Adicionar Receita</span>
            </button>

            <button className="w-full flex items-center gap-3 p-4 bg-gradient-to-r from-red-50 to-red-100 hover:from-red-100 hover:to-red-200 rounded-xl transition-all duration-200 group">
              <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                </svg>
              </div>
              <span className="font-semibold text-red-700">Adicionar Despesa</span>
            </button>

            <button className="w-full flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 rounded-xl transition-all duration-200 group">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <span className="font-semibold text-blue-700">Transferência</span>
            </button>

            <button className="w-full flex items-center gap-3 p-4 bg-gradient-to-r from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 rounded-xl transition-all duration-200 group">
              <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <span className="font-semibold text-purple-700">Ver Relatório</span>
            </button>
          </div>
        </div>
      </div>

      {/* Financial Goals */}
      <div className="bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-[#ccffcc]/30">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-[#003300]">Metas Financeiras</h2>
          <button className="text-[#009900] text-sm font-semibold hover:underline">
            + Nova Meta
          </button>
        </div>
        
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-[#ccffcc]/50 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-[#006600]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          </div>
          <p className="text-[#006600] font-medium">Nenhuma meta definida</p>
          <p className="text-[#66cc66] text-sm mt-1">Defina suas metas financeiras e acompanhe o progresso</p>
        </div>
      </div>
    </div>
  );
};
