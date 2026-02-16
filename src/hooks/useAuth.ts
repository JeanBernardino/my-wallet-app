import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { firebaseAuthService } from '../services';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = firebaseAuthService.onAuthStateChange((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      setError(null);
      setLoading(true);
      await firebaseAuthService.signInWithGoogle();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao fazer login');
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setError(null);
      await firebaseAuthService.signOut();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao fazer logout');
    }
  };

  return {
    user,
    loading,
    error,
    signInWithGoogle,
    logout,
  };
};
