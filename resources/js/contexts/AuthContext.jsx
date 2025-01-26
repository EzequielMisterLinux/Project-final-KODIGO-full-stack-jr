import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { AxiosRouter } from '../services/utils/Axios.utis';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const checkAuthStatus = useCallback(async () => {
    try {
      const { data } = await AxiosRouter.get('/api/me');
      setUser(data);
    } catch (error) {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  const value = {
    user,
    isLoading,
    login: async (credentials) => {
      try {
        const { data } = await AxiosRouter.post('/api/login', credentials);
        localStorage.setItem('authToken', data.token);
        setUser(data.user);
        return { success: true };
      } catch (error) {
        return { 
          success: false, 
          error: error.response?.data?.error || 'Login failed' 
        };
      }
    },
    logout: () => {
      localStorage.removeItem('authToken');
      setUser(null);
      navigate('/');
    }
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('Component must be wrapped within AuthProvider');
  }
  return context;
};