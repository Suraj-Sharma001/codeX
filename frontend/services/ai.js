import { apiClient } from './api';
export const aiService = {
    summarize: async (problemId) => {
        const res = await apiClient.post('/ai/summarize', { problemId });
        return res.data.data.text;
    },
    approachToCode: async (problemId, language = 'typescript') => {
        const res = await apiClient.post('/ai/approach-to-code', {
            problemId,
            language,
        });
        return res.data.data.text;
    },
    improvements: async (problemId) => {
        const res = await apiClient.post('/ai/improvements', { problemId });
        return res.data.data.text;
    },
    interviewExplain: async (problemId) => {
        const res = await apiClient.post('/ai/interview-explain', { problemId });
        return res.data.data.text;
    },
    missingEdges: async (problemId) => {
        const res = await apiClient.post('/ai/missing-edges', { problemId });
        return res.data.data.text;
    },
};
