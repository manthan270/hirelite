// keep this tight — if you add a new job type, add it here
export type JobType =
    | 'Full-time'
    | 'Internship'
    | 'Freelance'
    | 'Volunteer'
    | 'Contract'
    | 'Permanent';

export type ExperienceLevel = 'Entry level' | 'Intermediate' | 'Expert';

export interface Job {
    id: string;
    title: string;
    company: string;
    location: string;
    salary: string; // e.g. "₹18–25 LPA"
    type: JobType;
    experienceLevel: ExperienceLevel;
    verified: boolean;
}
