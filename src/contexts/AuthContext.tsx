import { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import { User } from 'firebase/auth';
import { firebaseAuthService } from '../services';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  getToken: () => Promise<string | null>;
  refreshToken: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Observa mudanças no estado de autenticação
    const unsubscribe = firebaseAuthService.onAuthStateChange(async (user) => {
      setUser(user);
      setLoading(false);
      
      // Log do token para debug (remover em produção)
      if (user) {
        try {
          const token = await user.getIdToken();
          console.log('✅ Usuário autenticado:', user.email);
          console.log('🔑 Token obtido:', token.substring(0, 20) + '...');
        } catch (err) {
          console.error('❌ Erro ao obter token:', err);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      setError(null);
      setLoading(true);
      const result = await firebaseAuthService.signInWithGoogle();
      
      // Obtém o token após o login
      const token = await result.user.getIdToken();
      console.log('✅ Login bem-sucedido!');
      console.log('🔑 Token ID:', token.substring(0, 20) + '...');
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao fazer login';
      setError(errorMessage);
      console.error('❌ Erro no login:', errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setError(null);
      await firebaseAuthService.signOut();
      console.log('✅ Logout realizado');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao fazer logout';
      setError(errorMessage);
      console.error('❌ Erro no logout:', errorMessage);
      throw err;
    }
  };

  const getToken = async (): Promise<string | null> => {
    try {
      if (!user) {
        console.warn('⚠️  Nenhum usuário autenticado');
        return null;
      }
      
      const token = await user.getIdToken();
      return token;
    } catch (err) {
      console.error('❌ Erro ao obter token:', err);
      setError(err instanceof Error ? err.message : 'Erro ao obter token');
      return null;
    }
  };

  const refreshToken = async (): Promise<string | null> => {
    try {
      if (!user) {
        console.warn('⚠️  Nenhum usuário autenticado');
        return null;
      }
      
      // Força refresh do token (true = forceRefresh)
      const token = await user.getIdToken(true);
      console.log('🔄 Token atualizado:', token.substring(0, 20) + '...');
      return token;
    } catch (err) {
      console.error('❌ Erro ao atualizar token:', err);
      setError(err instanceof Error ? err.message : 'Erro ao atualizar token');
      return null;
    }
  };

  const value: AuthContextType = useMemo(() => ({
    user,
    loading,
    error,
    signInWithGoogle,
    logout,
    getToken,
    refreshToken,
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
