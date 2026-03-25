import { create } from 'zustand';
import { Job } from '@/types/job';
import { mockJobs } from '@/lib/mockJobs';

interface JobState {
    jobs: Job[];
    search: string;
    setSearch: (value: string) => void;
    filteredJobs: () => Job[];
}

export const useJobStore = create<JobState>((set, get) => ({
    jobs: mockJobs,
    search: '',
    setSearch: (value: string) => set({ search: value }),
    filteredJobs: () => {
        const { jobs, search } = get();
        const lowerSearch = search.toLowerCase();
        return jobs.filter((job) =>
            job.title.toLowerCase().includes(lowerSearch) ||
            job.company.toLowerCase().includes(lowerSearch) ||
            job.location.toLowerCase().includes(lowerSearch)
        );
    },
}));
