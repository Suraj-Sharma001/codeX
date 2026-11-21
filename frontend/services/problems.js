import { apiClient } from './api';
export const problemsService = {
    createProblem: async (data) => {
        const response = await apiClient.post('/problems', data);
        return response.data.data;
    },
    getProblems: async (query) => {
        const params = new URLSearchParams();
        if (query) {
            Object.entries(query).forEach(([key, value]) => {
                if (value !== undefined && value !== null && value !== '') {
                    params.append(key, String(value));
                }
            });
        }
        const response = await apiClient.get(`/problems?${params.toString()}`);
        return response.data.data;
    },
    getProblemById: async (id) => {
        const response = await apiClient.get(`/problems/${id}`);
        return response.data.data;
    },
    updateProblem: async (id, data) => {
        const response = await apiClient.put(`/problems/${id}`, data);
        return response.data.data;
    },
    deleteProblem: async (id) => {
        await apiClient.delete(`/problems/${id}`);
    },
    toggleFavorite: async (id) => {
        const response = await apiClient.post(`/problems/${id}/toggle-favorite`);
        return response.data.data;
    },
    markForRevision: async (id, confidenceLevel) => {
        const response = await apiClient.post(`/problems/${id}/mark-for-revision`, { confidenceLevel });
        return response.data.data;
    },
};
