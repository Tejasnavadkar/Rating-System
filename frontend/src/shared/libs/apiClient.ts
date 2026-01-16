// services/api.ts
import axios from 'axios';
import type { AxiosInstance } from 'axios'

// Create an Axios instance with base URL
const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Request interceptor to add the token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token') || ''; // or use a state management solution
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;   