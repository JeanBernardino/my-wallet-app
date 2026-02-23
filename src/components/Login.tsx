import { useAuth } from '../hooks';
import { Button } from './Button';

export const Login = () => {
  const { signInWithGoogle, loading, error } = useAuth();

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
          <div className="bg-gradient-to-r from-[#ccffcc] to-[#66cc66]/20 p-4 rounded-xl border border-[#66cc66]/30">
            <div className="flex items-start gap-3">
              <svg className="w-4 h-4 text-[#006600] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <div>
                <h3 className="font-semibold text-[#003300] mb-1">Controle Total</h3>
                <p className="text-sm text-[#006600]">
                  Entre com sua conta Google para começar a gerenciar suas finanças de forma inteligente.
                </p>
              </div>
            </div>
          </div>

          {/* Botão de login */}
          <Button
            onClick={signInWithGoogle}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-[#ccffcc] text-[#003300] border-2 border-[#009900] py-4 px-6 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 group"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span className="group-hover:translate-x-1 transition-transform duration-300">
              {loading ? 'Entrando...' : 'Entrar com Google'}
            </span>
          </Button>

          {error && (
            <div className="p-4 bg-red-50 border-2 border-red-200 rounded-xl animate-shake">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <p className="text-sm text-red-600 font-medium">{error}</p>
              </div>
            </div>
          )}

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
