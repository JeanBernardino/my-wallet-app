import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosError } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';
const TOKEN_KEY = 'mywallet_token';

// Cria instância do axios
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor de Request - Adiciona o JWT token em todas as requisições
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// Interceptor de Response - Trata erros globalmente
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      const { status } = error.response;
      // Token expirado ou inválido - limpa sessão e redireciona para login
      if (status === 401) {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem('mywallet_user');
        window.location.href = '/';
      }
      if (status >= 500) {
        console.error('Erro do servidor:', error.response.data);
      }
    } else if (error.request) {
      console.error('Erro de rede:', error.message);
    }
    return Promise.reject(error);
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

  // Verificar se o usuário está autenticado
  isAuthenticated: (): boolean => {
    return localStorage.getItem(TOKEN_KEY) !== null;
  },

  // Obter token atual (útil para debug)
  getCurrentToken: (): string | null => {
    return localStorage.getItem(TOKEN_KEY);
  },
};

// Exporta também a instância do axios para uso avançado
export { apiClient };
export default apiService;
