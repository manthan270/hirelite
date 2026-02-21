import { create } from 'zustand';

export interface Application {
    jobId: string;
    candidateName: string;
    appliedAt: string;
}

interface ApplicationState {
    applications: Application[];
    apply: (jobId: string, candidateName: string) => void;
    hasApplied: (jobId: string, candidateName: string) => boolean;
    getJobApplications: (jobId: string) => Application[];
}

export const useApplicationStore = create<ApplicationState>((set, get) => ({
    applications: [],
    apply: (jobId, candidateName) => {
        const alreadyApplied = get().applications.some(
            app => app.jobId === jobId && app.candidateName === candidateName
        );

        if (!alreadyApplied) {
            set((state) => ({
                applications: [
                    ...state.applications,
                    {
                        jobId,
                        candidateName,
                        appliedAt: new Date().toLocaleDateString('en-IN')
                    }
                ]
            }));
        }
    },
    hasApplied: (jobId, candidateName) => {
        return get().applications.some(
            app => app.jobId === jobId && app.candidateName === candidateName
        );
    },
    getJobApplications: (jobId) => {
        return get().applications.filter(app => app.jobId === jobId);
    }
}));
