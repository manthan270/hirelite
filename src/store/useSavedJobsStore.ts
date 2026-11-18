import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SavedJobsState {
    savedJobIds: string[];
    toggleSave: (jobId: string) => void;
    clearAll: () => void;
}

export const useSavedJobsStore = create<SavedJobsState>()(
    persist(
        (set) => ({
            savedJobIds: [],
            toggleSave: (jobId) => {
                set((state) => ({
                    savedJobIds: state.savedJobIds.includes(jobId)
                        ? state.savedJobIds.filter((id) => id !== jobId)
                        : [...state.savedJobIds, jobId],
                }));
            },
            clearAll: () => set({ savedJobIds: [] }),
        }),
        { name: 'elitehire-saved-jobs' }
    )
);
