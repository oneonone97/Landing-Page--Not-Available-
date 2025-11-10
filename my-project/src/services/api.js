import axios from 'axios';

// API Base URL - backend runs on port 5000
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10s timeout to avoid hanging requests
  withCredentials: true, // Important for cookies/sessions
});

// Request interceptor to add auth and CSRF tokens
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    const method = (config.method || 'get').toLowerCase();
    if (method === 'post' || method === 'put' || method === 'delete' || method === 'patch') {
      const csrfToken = localStorage.getItem('csrfToken');
      const sessionId = localStorage.getItem('sessionId');
      if (csrfToken) {
        config.headers['X-CSRF-Token'] = csrfToken;
      }
      if (sessionId) {
        config.headers['X-Session-Id'] = sessionId;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle CSRF token errors (403)
    if (error.response?.status === 403 && 
        (error.response?.data?.errorCode === 'CSRF_TOKEN_INVALID' || 
         error.response?.data?.errorCode === 'CSRF_TOKEN_MISSING') &&
        !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Fetch a fresh CSRF token
        const csrfResponse = await axios.get(`${API_BASE_URL}/csrf-token`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token') || ''}`
          },
          withCredentials: true
        });
        
        if (csrfResponse.data?.success && csrfResponse.data?.data) {
          localStorage.setItem('csrfToken', csrfResponse.data.data.csrfToken);
          localStorage.setItem('sessionId', csrfResponse.data.data.sessionId);
          
          // Retry the original request with new CSRF token
          originalRequest.headers['X-CSRF-Token'] = csrfResponse.data.data.csrfToken;
          if (csrfResponse.data.data.sessionId) {
            originalRequest.headers['X-Session-Id'] = csrfResponse.data.data.sessionId;
          }
          return api(originalRequest);
        }
      } catch (csrfError) {
        console.error('Failed to refresh CSRF token:', csrfError);
        return Promise.reject(error);
      }
    }

    // Handle token expiration (401)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          const response = await axios.post(`${API_BASE_URL}/users/refresh-token`, { refreshToken });
          const { token } = response.data;
          localStorage.setItem('token', token);
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        localStorage.removeItem('csrfToken');
        localStorage.removeItem('sessionId');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
