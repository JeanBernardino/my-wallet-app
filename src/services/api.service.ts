import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosError } from 'axios';
import { auth } from '../config/firebase.config';

// Configuração base da API
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

// Cria instância do axios
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor de Request - Adiciona o token em todas as requisições
apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    try {
      const currentUser = auth.currentUser;
      
      if (currentUser) {
        // Obtém o ID Token do Firebase
        const token = await currentUser.getIdToken();
        
        // Adiciona o token no header Authorization
        if (config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
      
      return config;
    } catch (error) {
      console.error('Erro ao obter token:', error);
      throw error;
    }
  },
  (error: AxiosError) => {
    throw error;
  }
);

// Interceptor de Response - Trata erros globalmente
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    if (error.response) {
      const { status } = error.response;
      
      // Token expirado ou inválido
      if (status === 401) {
        try {
          const currentUser = auth.currentUser;
          
          if (currentUser) {
            // Força refresh do token
            await currentUser.getIdToken(true);
            
            // Retentar a requisição original
            if (error.config) {
              const newToken = await currentUser.getIdToken();
              if (error.config.headers) {
                error.config.headers.Authorization = `Bearer ${newToken}`;
              }
              return apiClient.request(error.config);
            }
          } else {
            // Usuário não autenticado, redirecionar para login
            console.error('Usuário não autenticado');
            // Você pode disparar um evento ou usar um state management aqui
          }
        } catch (refreshError) {
          console.error('Erro ao renovar token:', refreshError);
          // Fazer logout do usuário
          await auth.signOut();
        }
      }
      
      // Outros erros de servidor
      if (status >= 500) {
        console.error('Erro do servidor:', error.response.data);
      }
    } else if (error.request) {
      // Erro de rede
      console.error('Erro de rede:', error.message);
    }
    
    throw error;
  }
);

// Serviço de API com métodos helper
export const apiService = {
  // GET request
  get: async <T = any>(url: string, config = {}) => {
    const response = await apiClient.get<T>(url, config);
    return response.data;
  },

  // POST request
  post: async <T = any>(url: string, data?: any, config = {}) => {
    const response = await apiClient.post<T>(url, data, config);
    return response.data;
  },

  // PUT request
  put: async <T = any>(url: string, data?: any, config = {}) => {
    const response = await apiClient.put<T>(url, data, config);
    return response.data;
  },

  // PATCH request
  patch: async <T = any>(url: string, data?: any, config = {}) => {
    const response = await apiClient.patch<T>(url, data, config);
    return response.data;
  },

  // DELETE request
  delete: async <T = any>(url: string, config = {}) => {
    const response = await apiClient.delete<T>(url, config);
    return response.data;
  },

  // Obter token atual (útil para debug ou uso manual)
  getCurrentToken: async (): Promise<string | null> => {
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        return await currentUser.getIdToken();
      }
      return null;
    } catch (error) {
      console.error('Erro ao obter token:', error);
      return null;
    }
  },

  // Verificar se o usuário está autenticado
  isAuthenticated: (): boolean => {
    return auth.currentUser !== null;
  },
};

// Exporta também a instância do axios para uso avançado
export { apiClient };
export default apiService;
