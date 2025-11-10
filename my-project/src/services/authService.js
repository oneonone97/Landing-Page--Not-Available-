import api from './api';

class AuthService {
  // Register new user
  async register(userData) {
    try {
      const response = await api.post('/users/register', userData);
      const body = response?.data || {};
      const payload = body?.data ?? body;
      const normalized = {
        success: !!body?.success,
        message: body?.message,
        user: payload?.user ?? null,
        token: payload?.accessToken ?? payload?.token ?? null,
        refreshToken: payload?.refreshToken ?? null,
      };
      if (normalized.success) {
        this.setAuthData(response);
      }
      return normalized;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Login user
  async login(credentials) {
    try {
      const response = await api.post('/users/login', credentials);
      const body = response?.data || {};
      const payload = body?.data ?? body;
      const normalized = {
        success: !!body?.success,
        message: body?.message,
        user: payload?.user ?? null,
        token: payload?.accessToken ?? payload?.token ?? null,
        refreshToken: payload?.refreshToken ?? null,
      };
      if (normalized.success) {
        this.setAuthData(response);
      }
      return normalized;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Logout user
  async logout() {
    try {
      await api.post('/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      this.clearAuthData();
    }
  }

  // Get current user
  async getCurrentUser() {
    try {
      const response = await api.get('/users/me');
      const body = response?.data || {};
      return {
        success: !!body?.success,
        message: body?.message,
        user: body?.data ?? null,
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Refresh token
  async refreshToken() {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      const response = await api.post('/users/refresh-token', { refreshToken });
      this.setAuthData(response);
      const body = response?.data || {};
      const payload = body?.data ?? body;
      return {
        success: !!body?.success,
        message: body?.message,
        user: payload?.user ?? null,
        token: payload?.accessToken ?? payload?.token ?? null,
        refreshToken: payload?.refreshToken ?? null,
      };
    } catch (error) {
      this.clearAuthData();
      throw this.handleError(error);
    }
  }

  // Set authentication data in localStorage
  setAuthData(response) {
    const body = response?.data || {};
    const payload = body?.data?.data ?? body?.data ?? body;
    const token = payload?.accessToken ?? payload?.token ?? null;
    const refreshToken = payload?.refreshToken ?? null;
    const user = payload?.user ?? null;
    const csrfToken = payload?.csrfToken ?? null;
    const sessionId = payload?.sessionId ?? null;

    if (token) localStorage.setItem('token', token);
    if (refreshToken) localStorage.setItem('refreshToken', refreshToken);
    if (user) localStorage.setItem('user', JSON.stringify(user));
    if (csrfToken) localStorage.setItem('csrfToken', csrfToken);
    if (sessionId) localStorage.setItem('sessionId', sessionId);
  }

  // Clear authentication data
  clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    localStorage.removeItem('csrfToken');
    localStorage.removeItem('sessionId');
  }

  // Check if user is authenticated
  isAuthenticated() {
    return !!localStorage.getItem('token');
  }

  // Get stored user
  getStoredUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  // Get token
  getToken() {
    return localStorage.getItem('token');
  }

  // Handle API errors
  handleError(error) {
    if (error.response) {
      return {
        message: error.response.data.message || 'An error occurred',
        status: error.response.status,
        data: error.response.data,
      };
    } else if (error.request) {
      return {
        message: 'No response from server. Please check your connection.',
        status: 0,
      };
    } else {
      return {
        message: error.message || 'An error occurred',
        status: 0,
      };
    }
  }
}

export default new AuthService();
