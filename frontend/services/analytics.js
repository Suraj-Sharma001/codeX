import { apiClient } from './api';
export const analyticsService = {
    getDashboardStats: async () => {
        const response = await apiClient.get('/analytics/dashboard');
        return response.data.data;
    },
    getTopicWiseStats: async () => {
        const response = await apiClient.get('/analytics/topic-wise');
        return response.data.data;
    },
    getDailyActivity: async (days = 30) => {
        const response = await apiClient.get(`/analytics/daily-activity?days=${days}`);
        return response.data.data;
    },
};
