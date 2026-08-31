import axios from 'axios';
import useAuthStore from '../stores/authStore';

const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  console.error('[Config Error] VITE_API_URL is not defined. Check your .env file.');
}

const api = axios.create({
  baseURL: API_URL || 'http://localhost:8000/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Attach token from auth store
api.interceptors.request.use(
  (config) => {
    const { adminToken, customerToken } = useAuthStore.getState();
    const isAdminRequest = config.url?.startsWith('/admin');
    const token = isAdminRequest ? adminToken : customerToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor — handle 401 and 403
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { status, config } = error.response ?? {};
    const isAdminRequest = config?.url?.startsWith('/admin');

    if (status === 401) {
      if (isAdminRequest) {
        useAuthStore.getState().clearAdminAuth();
        if (window.location.pathname !== '/admin/login') {
          window.location.href = '/admin/login';
        }
      } else {
        useAuthStore.getState().clearCustomerAuth();
        if (window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
      }
    }

    if (status === 403) {
      // Don't log out — user is authenticated but lacks permission
      console.warn('[API] 403 Forbidden:', config?.url);
      // Optionally dispatch a UI notification here
    }

    if (status === 0 || !error.response) {
      console.error('[API] Network error or timeout. Please check your connection.');
    }

    return Promise.reject(error);
  }
);

export default api;
