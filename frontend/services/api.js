import axios from 'axios';
import { authService } from './auth';
const API_URL = process.env.NEXT_PUBLIC_API_URL ||
    'http://localhost:5000/api';
class ApiClient {
    constructor() {
        this.client = axios.create({
            baseURL: API_URL,
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        // Response interceptor to handle 401 and token refresh
        this.client.interceptors.response.use((response) => response, async (error) => {
            const originalRequest = error.config;
            const requestUrl = String(originalRequest?.url || '');
            const isAuthEndpoint = requestUrl.includes('/auth/me') ||
                requestUrl.includes('/auth/login') ||
                requestUrl.includes('/auth/register') ||
                requestUrl.includes('/auth/refresh') ||
                requestUrl.includes('/auth/logout');
            if (error.response?.status === 401 &&
                !isAuthEndpoint &&
                !originalRequest._retry) {
                originalRequest._retry = true;
                try {
                    // Refresh token
                    await authService.refresh();
                    // Retry original request
                    return this.client(originalRequest);
                }
                catch (refreshError) {
                    // Redirect to login if refresh fails
                    if (typeof window !== 'undefined') {
                        localStorage.removeItem('user');
                        window.location.href = '/login';
                    }
                    return Promise.reject(refreshError);
                }
            }
            return Promise.reject(error);
        });
    }
    get(url, config) {
        return this.client.get(url, config);
    }
    post(url, data, config) {
        return this.client.post(url, data, config);
    }
    put(url, data, config) {
        return this.client.put(url, data, config);
    }
    delete(url, config) {
        return this.client.delete(url, config);
    }
}
export const apiClient = new ApiClient();
