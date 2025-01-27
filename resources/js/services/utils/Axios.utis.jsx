// services/utils/Axios.utis.js
import axios from 'axios';

export const AxiosRouter = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

// Interceptor para agregar el token
AxiosRouter.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para manejar errores
AxiosRouter.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      
    }
    return Promise.reject(error);
  }
);