import { useState } from 'react';
import { useAuth } from '../hooks';
import { Button } from './Button';

export const Login = () => {
  const { signIn, loading, error } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn(username, password);
    } catch {
      // error is handled by the context
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#003300] via-[#006600] to-[#009900] relative overflow-hidden">
      {/* Elementos decorativos de fundo */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#66cc66] rounded-full opacity-20 blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#009900] rounded-full opacity-20 blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#66cc66] rounded-full opacity-10 blur-3xl"></div>
      </div>

      <div className="relative z-10 bg-white/95 backdrop-blur-sm p-10 rounded-3xl shadow-2xl max-w-md w-full mx-4 border border-[#ccffcc]/30">
        <div className="text-center mb-10">
          {/* Logo com ícone de carteira */}
          <div className="mb-6 relative">
            <div className="w-16 h-16 bg-gradient-to-br from-[#009900] to-[#006600] rounded-2xl mx-auto flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-300">
              <svg
                className="w-8 h-8 text-[#ccffcc]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>
            </div>
            {/* Círculo decorativo atrás do logo */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#66cc66] to-[#009900] rounded-2xl blur-xl opacity-30 transform scale-110"></div>
          </div>
          
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#003300] to-[#006600] bg-clip-text text-transparent mb-3">
            MyWallet
          </h1>
          <p className="text-[#006600] text-lg font-medium">
            Gerencie suas finanças com segurança
          </p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#66cc66] to-transparent rounded-full"></div>
            <div className="w-2 h-2 bg-[#009900] rounded-full"></div>
            <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#66cc66] to-transparent rounded-full"></div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Mensagem de boas-vindas */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-[#003300] mb-1.5">
                Usuário
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="seu usuário/email"
                className="w-full px-4 py-3 rounded-xl border-2 border-[#66cc66]/40 focus:border-[#009900] focus:outline-none bg-white text-[#003300] placeholder-[#006600]/40 transition-colors"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-[#003300] mb-1.5">
                Senha
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-12 rounded-xl border-2 border-[#66cc66]/40 focus:border-[#009900] focus:outline-none bg-white text-[#003300] placeholder-[#006600]/40 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#006600] hover:text-[#003300] transition-colors"
                  aria-label={showPassword ? 'Esconder senha' : 'Mostrar senha'}
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-50 border-2 border-red-200 rounded-xl">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-red-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm text-red-600 font-medium">{error}</p>
                </div>
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-[#009900] to-[#006600] hover:from-[#006600] hover:to-[#003300] text-white py-4 px-6 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>

          {/* Features */}
          <div className="grid grid-cols-3 gap-3 pt-4">
            <div className="text-center p-3 bg-gradient-to-br from-[#ccffcc] to-white rounded-xl border border-[#66cc66]/20 hover:shadow-md transition-shadow">
              <div className="w-7 h-7 bg-gradient-to-br from-[#009900] to-[#006600] rounded-lg mx-auto flex items-center justify-center mb-2">
                <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <p className="text-xs font-semibold text-[#003300]">Seguro</p>
            </div>
            <div className="text-center p-3 bg-gradient-to-br from-[#ccffcc] to-white rounded-xl border border-[#66cc66]/20 hover:shadow-md transition-shadow">
              <div className="w-7 h-7 bg-gradient-to-br from-[#009900] to-[#006600] rounded-lg mx-auto flex items-center justify-center mb-2">
                <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <p className="text-xs font-semibold text-[#003300]">Rápido</p>
            </div>
            <div className="text-center p-3 bg-gradient-to-br from-[#ccffcc] to-white rounded-xl border border-[#66cc66]/20 hover:shadow-md transition-shadow">
              <div className="w-7 h-7 bg-gradient-to-br from-[#009900] to-[#006600] rounded-lg mx-auto flex items-center justify-center mb-2">
                <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-xs font-semibold text-[#003300]">Fácil</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
