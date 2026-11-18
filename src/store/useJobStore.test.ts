import { describe, it, expect } from 'vitest';
import { useJobStore } from './useJobStore';

describe('useJobStore', () => {
    it('should initialize with a non-empty jobs array from mockJobs', () => {
        const { jobs } = useJobStore.getState();
        expect(Array.isArray(jobs)).toBe(true);
        expect(jobs.length).toBeGreaterThan(0);
    });

    it('should have jobs with required fields', () => {
        const { jobs } = useJobStore.getState();
        for (const job of jobs) {
            expect(job).toHaveProperty('id');
            expect(job).toHaveProperty('title');
            expect(job).toHaveProperty('company');
            expect(job).toHaveProperty('location');
            expect(job).toHaveProperty('salary');
            expect(job).toHaveProperty('type');
        }
    });

    it('should have unique job ids', () => {
        const { jobs } = useJobStore.getState();
        const ids = jobs.map((j) => j.id);
        const uniqueIds = new Set(ids);
        expect(uniqueIds.size).toBe(ids.length);
    });
});
