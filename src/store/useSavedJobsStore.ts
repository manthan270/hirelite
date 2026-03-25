import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SavedJobsState {
    savedJobIds: string[];
    toggleSave: (jobId: string) => void;
    isSaved: (jobId: string) => boolean;
    clearAll: () => void;
}

export const useSavedJobsStore = create<SavedJobsState>()(
    persist(
        (set, get) => ({
            savedJobIds: [],
            toggleSave: (jobId) => {
                set((state) => ({
                    savedJobIds: state.savedJobIds.includes(jobId)
                        ? state.savedJobIds.filter((id) => id !== jobId)
                        : [...state.savedJobIds, jobId],
                }));
            },
            isSaved: (jobId) => get().savedJobIds.includes(jobId),
            clearAll: () => set({ savedJobIds: [] }),
        }),
        { name: 'elitehire-saved-jobs' }
    )
);
