import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Add a request interceptor to attach token dynamically
api.interceptors.request.use(
  (config) => {
    // Determine which token to use based on URL path
    let token;
    if (config.url.startsWith('/admin')) {
      token = localStorage.getItem('admin_token');
    } else {
      token = localStorage.getItem('customer_token');
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
