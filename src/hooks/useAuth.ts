import { useAuthContext } from '../contexts';

// Hook simplificado que usa o contexto de autenticação
export const useAuth = () => {
  return useAuthContext();
};
