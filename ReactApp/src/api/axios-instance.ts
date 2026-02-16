import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';

import { CONFIG } from 'src/config-global';
import { authService } from 'src/services/auth-service';

// ----------------------------------------------------------------------

// Create axios instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL: CONFIG.apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add auth token to all requests (except login)
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Skip token for login endpoint
    if (config.url?.includes('/api/auth/login')) {
      return config;
    }

    const token = authService.getToken();

    // Add Authorization header if token exists
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// Response interceptor - Handle errors globally
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    // Handle 401 Unauthorized - token expired or invalid
    if (error.response?.status === 401) {
      authService.signOut();
      // Optionally redirect to login page
      // window.location.href = '/sign-in';
    }

    // Return error to be handled by the calling function
    return Promise.reject(error);
  }
);

export default axiosInstance;
