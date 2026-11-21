import { apiClient } from './api';
export const authService = {
    register: async (credentials) => {
        const response = await apiClient.post('/auth/register', credentials);
        return response.data.data;
    },
    login: async (credentials) => {
        const response = await apiClient.post('/auth/login', credentials);
        return response.data.data;
    },
    refresh: async (refreshToken) => {
        const response = await apiClient.post('/auth/refresh', refreshToken ? { refreshToken } : {});
        return response.data.data;
    },
    getMe: async () => {
        const response = await apiClient.get('/auth/me');
        return response.data.data;
    },
    logout: async () => {
        await apiClient.post('/auth/logout');
    },
};
