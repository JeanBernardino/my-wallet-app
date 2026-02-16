import { useAuth } from './hooks';
import { Login, Button } from './components';

function App() {
  const { user, loading, logout } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#003300] to-[#006600]">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#ccffcc] border-t-[#009900] mx-auto"></div>
            <div className="absolute inset-0 rounded-full bg-[#66cc66] opacity-20 blur-xl"></div>
          </div>
          <p className="mt-6 text-[#ccffcc] font-semibold text-lg">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#003300] via-[#006600] to-[#009900]">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm shadow-lg border-b-4 border-[#009900]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {user.photoURL && (
              <div className="relative">
                <img
                  src={user.photoURL}
                  alt={user.displayName || 'User'}
                  className="w-12 h-12 rounded-full ring-4 ring-[#66cc66] shadow-lg"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#009900] rounded-full border-2 border-white"></div>
              </div>
            )}
            <div>
              <h2 className="text-lg font-bold text-[#003300]">
                {user.displayName || 'Usuário'}
              </h2>
              <p className="text-sm text-[#006600] font-medium">{user.email}</p>
            </div>
          </div>
          <Button
            onClick={logout}
            className="bg-gradient-to-r from-[#006600] to-[#003300] hover:from-[#003300] hover:to-[#006600] text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            Sair
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white/95 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-[#ccffcc]/30">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-[#009900] to-[#006600] rounded-xl flex items-center justify-center shadow-md">
                <svg className="w-4 h-4 text-[#ccffcc]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-[#003300] to-[#009900] bg-clip-text text-transparent">
                MyWallet
              </h1>
            </div>
            <p className="text-xl text-[#006600] font-medium">
              Bem-vindo ao seu gerenciador de finanças pessoais! 💰
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-[#ccffcc] to-white p-6 rounded-2xl border-2 border-[#66cc66] shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-[#006600] uppercase tracking-wide">Saldo Total</h3>
                <div className="w-8 h-8 bg-gradient-to-br from-[#009900] to-[#006600] rounded-lg flex items-center justify-center shadow-md">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <p className="text-3xl font-bold text-[#003300]">R$ 0,00</p>
              <p className="text-sm text-[#009900] font-medium mt-1">+0% este mês</p>
            </div>

            <div className="bg-gradient-to-br from-[#ccffcc] to-white p-6 rounded-2xl border-2 border-[#66cc66] shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-[#006600] uppercase tracking-wide">Receitas</h3>
                <div className="w-8 h-8 bg-gradient-to-br from-[#009900] to-[#006600] rounded-lg flex items-center justify-center shadow-md">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
              </div>
              <p className="text-3xl font-bold text-[#003300]">R$ 0,00</p>
              <p className="text-sm text-[#009900] font-medium mt-1">Nenhuma receita</p>
            </div>

            <div className="bg-gradient-to-br from-[#ccffcc] to-white p-6 rounded-2xl border-2 border-[#66cc66] shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-[#006600] uppercase tracking-wide">Despesas</h3>
                <div className="w-8 h-8 bg-gradient-to-br from-[#009900] to-[#006600] rounded-lg flex items-center justify-center shadow-md">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                  </svg>
                </div>
              </div>
              <p className="text-3xl font-bold text-[#003300]">R$ 0,00</p>
              <p className="text-sm text-[#009900] font-medium mt-1">Nenhuma despesa</p>
            </div>
          </div>

          {/* Features Section */}
          <div className="border-t-2 border-[#ccffcc] pt-8">
            <h2 className="text-2xl font-bold text-[#003300] mb-6">Recursos Disponíveis</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-[#ccffcc]/50 to-transparent rounded-xl border border-[#66cc66]/30 hover:border-[#66cc66]/50 transition-colors">
                <div className="w-7 h-7 bg-[#009900] rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                  <span className="text-sm text-white font-bold">✓</span>
                </div>
                <div>
                  <h3 className="font-bold text-[#003300]">React 19</h3>
                  <p className="text-sm text-[#006600]">Última versão do React com melhorias de performance</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-[#ccffcc]/50 to-transparent rounded-xl border border-[#66cc66]/30 hover:border-[#66cc66]/50 transition-colors">
                <div className="w-7 h-7 bg-[#009900] rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                  <span className="text-sm text-white font-bold">✓</span>
                </div>
                <div>
                  <h3 className="font-bold text-[#003300]">TypeScript</h3>
                  <p className="text-sm text-[#006600]">Desenvolvimento type-safe e produtivo</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-[#ccffcc]/50 to-transparent rounded-xl border border-[#66cc66]/30 hover:border-[#66cc66]/50 transition-colors">
                <div className="w-7 h-7 bg-[#009900] rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                  <span className="text-sm text-white font-bold">✓</span>
                </div>
                <div>
                  <h3 className="font-bold text-[#003300]">Tailwind CSS</h3>
                  <p className="text-sm text-[#006600]">Estilização moderna e responsiva</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-[#ccffcc]/50 to-transparent rounded-xl border border-[#66cc66]/30 hover:border-[#66cc66]/50 transition-colors">
                <div className="w-7 h-7 bg-[#009900] rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                  <span className="text-sm text-white font-bold">✓</span>
                </div>
                <div>
                  <h3 className="font-bold text-[#003300]">Firebase Auth</h3>
                  <p className="text-sm text-[#006600]">Autenticação segura com Google</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
