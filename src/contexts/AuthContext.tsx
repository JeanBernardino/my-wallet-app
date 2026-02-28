import { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';
const TOKEN_KEY = 'mywallet_token';
const USER_KEY = 'mywallet_user';

export interface AuthUser {
  username: string;
}

interface LoginApiResponse {
  success: boolean;
  data: {
    token: string;
    type: string;
    username: string;
    expiresIn: number;
  } | null;
  error: string | null;
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
  signIn: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    const stored = localStorage.getItem(USER_KEY);
    if (token && stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
      }
    }
    setLoading(false);
  }, []);

  const signIn = async (username: string, password: string): Promise<void> => {
    try {
      setError(null);
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const body: LoginApiResponse = await response.json().catch(() => ({ success: false, data: null, error: 'Erro inesperado' }));

      if (!response.ok || !body.success || !body.data) {
        throw new Error(body.error || 'Credenciais inválidas');
      }

      const { token, username: loggedUsername } = body.data;
      const user: AuthUser = { username: loggedUsername };

      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(USER_KEY, JSON.stringify(user));
      setUser(user);
      console.log('✅ Login bem-sucedido:', loggedUsername);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Credenciais inválidas';
      setError(message);
      console.error('❌ Erro no login:', message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setUser(null);
    console.log('✅ Logout realizado');
  };

  const value: AuthContextType = useMemo(() => ({
    user,
    loading,
    error,
    signIn,
    logout,
  }), [user, loading, error]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook customizado para usar o contexto de autenticação
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuthContext deve ser usado dentro de um AuthProvider');
  }
  
  return context;
};
