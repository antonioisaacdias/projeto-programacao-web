import axios, { AxiosRequestConfig } from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para tratar erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log de erros para desenvolvimento
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Serviço genérico
const apiService = {
  get: async <T>(url: string): Promise<T> => {
    const { data } = await api.get<T>(url);
    return data;
  },

  post: async <T>(url: string, body?: any): Promise<T> => {
    const { data } = await api.post<T>(url, body);
    return data;
  },

  put: async <T>(url: string, body?: any): Promise<T> => {
    const { data } = await api.put<T>(url, body);
    return data;
  },

  patch: async <T>(url: string, body?: any): Promise<T> => {
    const { data } = await api.patch<T>(url, body);
    return data;
  },

  delete: async <T = void>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const { data } = await api.delete<T>(url, config);
    return data;
  },
};

export default apiService;