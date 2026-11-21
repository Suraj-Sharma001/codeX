import { create } from 'zustand';
import { problemsService } from '@/services/problems';
export const useProblemsStore = create((set) => ({
    problems: [],
    currentProblem: null,
    total: 0,
    page: 1,
    limit: 20,
    isLoading: false,
    error: null,
    setProblems: (problems) => set({ problems }),
    setCurrentProblem: (problem) => set({ currentProblem: problem }),
    getProblems: async (query) => {
        set({ isLoading: true, error: null });
        try {
            const result = await problemsService.getProblems(query);
            set({
                problems: result.data,
                total: result.total,
                page: result.page,
                limit: result.limit,
                isLoading: false,
            });
        }
        catch (error) {
            const message = error?.response?.data?.message || 'Failed to fetch problems';
            set({ error: message, isLoading: false });
        }
    },
    getProblemById: async (id) => {
        set({ isLoading: true, error: null });
        try {
            const problem = await problemsService.getProblemById(id);
            set({
                currentProblem: problem,
                isLoading: false,
            });
        }
        catch (error) {
            const message = error?.response?.data?.message || 'Failed to fetch problem';
            set({ error: message, isLoading: false });
        }
    },
    createProblem: async (data) => {
        set({ isLoading: true, error: null });
        try {
            const problem = await problemsService.createProblem(data);
            set((state) => ({
                problems: [problem, ...state.problems],
                total: state.total + 1,
                isLoading: false,
            }));
        }
        catch (error) {
            const message = error?.response?.data?.message || 'Failed to create problem';
            set({ error: message, isLoading: false });
            throw error;
        }
    },
    updateProblem: async (id, data) => {
        set({ isLoading: true, error: null });
        try {
            const updated = await problemsService.updateProblem(id, data);
            set((state) => ({
                problems: state.problems.map((p) => (p._id === id ? updated : p)),
                currentProblem: state.currentProblem?._id === id ? updated : state.currentProblem,
                isLoading: false,
            }));
        }
        catch (error) {
            const message = error?.response?.data?.message || 'Failed to update problem';
            set({ error: message, isLoading: false });
            throw error;
        }
    },
    deleteProblem: async (id) => {
        set({ isLoading: true, error: null });
        try {
            await problemsService.deleteProblem(id);
            const result = await problemsService.getProblems();
            set((state) => ({
                problems: result.data,
                total: result.total,
                page: result.page,
                limit: result.limit,
                isLoading: false,
            }));
        }
        catch (error) {
            const message = error?.response?.data?.message || 'Failed to delete problem';
            set({ error: message, isLoading: false });
            throw error;
        }
    },
    toggleFavorite: async (id) => {
        try {
            const updated = await problemsService.toggleFavorite(id);
            set((state) => ({
                problems: state.problems.map((p) => (p._id === id ? updated : p)),
                currentProblem: state.currentProblem?._id === id ? updated : state.currentProblem,
            }));
        }
        catch (error) {
            const message = error?.response?.data?.message || 'Failed to toggle favorite';
            set({ error: message });
        }
    },
    markForRevision: async (id, confidenceLevel) => {
        try {
            const updated = await problemsService.markForRevision(id, confidenceLevel);
            set((state) => ({
                problems: state.problems.map((p) => (p._id === id ? updated : p)),
                currentProblem: state.currentProblem?._id === id ? updated : state.currentProblem,
            }));
        }
        catch (error) {
            const message = error?.response?.data?.message || 'Failed to mark for revision';
            set({ error: message });
            throw error;
        }
    },
    clearError: () => set({ error: null }),
}));
