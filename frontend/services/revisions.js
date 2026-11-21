import { apiClient } from './api';
export const revisionsService = {
    getPending: async (limit) => {
        const q = limit ? `?limit=${limit}` : '';
        const response = await apiClient.get(`/revisions/pending${q}`);
        return response.data.data;
    },
    getStats: async () => {
        const response = await apiClient.get('/revisions/stats');
        return response.data.data;
    },
    complete: async (problemId, body) => {
        const response = await apiClient.post(`/revisions/${problemId}/complete`, body);
        return response.data.data;
    },
};
