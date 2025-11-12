import React, { createContext, useState, useContext, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext(null);

// API Base URL from environment variable
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is logged in on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const storedUser = authService.getStoredUser();
      const token = authService.getToken();

      if (token && storedUser) {
        // Verify token is still valid by fetching current user
        const response = await authService.getCurrentUser();
        if (response.success) {
          setUser(response.user);
          setIsAuthenticated(true);
          // Skip CSRF fetch in development since backend bypasses it
          const isDevelopment = import.meta.env.MODE === 'development' || import.meta.env.DEV;
          if (!isDevelopment) {
            // Only fetch CSRF token in production
            try {
              const res = await fetch(`${API_BASE_URL}/csrf-token`, {
                credentials: 'include',
                headers: {
                  Authorization: `Bearer ${authService.getToken() || ''}`,
                },
              });
              const data = await res.json();
              if (data?.success && data?.data) {
                localStorage.setItem('csrfToken', data.data.csrfToken);
                localStorage.setItem('sessionId', data.data.sessionId);
              }
            } catch (e) {
              console.warn('CSRF fetch on restore skipped:', e?.message || e);
            }
          }
        } else {
          authService.clearAuthData();
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      authService.clearAuthData();
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      const response = await authService.login(credentials);
      if (response.success) {
        setUser(response.user);
        setIsAuthenticated(true);
        // Skip CSRF fetch in development since backend bypasses it
        const isDevelopment = import.meta.env.MODE === 'development' || import.meta.env.DEV;
        if (!isDevelopment) {
          // Only fetch CSRF token in production
          try {
            const res = await fetch(`${API_BASE_URL}/csrf-token`, {
              credentials: 'include',
              headers: {
                Authorization: `Bearer ${authService.getToken() || ''}`,
              },
            });
            const data = await res.json();
            if (data?.success && data?.data) {
              localStorage.setItem('csrfToken', data.data.csrfToken);
              localStorage.setItem('sessionId', data.data.sessionId);
            }
          } catch (e) {
            if (import.meta.env.DEV) {
              console.warn('CSRF fetch skipped:', e?.message || e);
            }
          }
        }
        return { success: true, user: response.user };
      }
      return { success: false, message: response.message };
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Login failed:', error);
      }
      return {
        success: false,
        message: error.message || 'Login failed. Please try again.'
      };
    }
  };

  const register = async (userData) => {
    try {
      const response = await authService.register(userData);
      if (response.success) {
        setUser(response.user);
        setIsAuthenticated(true);
        return { success: true, user: response.user };
      }
      return { success: false, message: response.message };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Registration failed. Please try again.'
      };
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Logout error:', error);
      }
    } finally {
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
    updateUser,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;