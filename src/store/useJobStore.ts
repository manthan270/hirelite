import { create } from 'zustand';
import { Job } from '@/types/job';
import { mockJobs } from '@/lib/mockJobs';

interface JobState {
    jobs: Job[];
}

export const useJobStore = create<JobState>(() => ({
    jobs: mockJobs,
}));
