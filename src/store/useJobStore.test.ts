import { describe, it, expect, beforeEach } from 'vitest';
import { useJobStore } from './useJobStore';

describe('useJobStore', () => {
    // Reset store before each test if needed
    beforeEach(() => {
        useJobStore.setState({ search: '' });
    });

    it('should initialize with an empty search string', () => {
        const { search } = useJobStore.getState();
        expect(search).toBe('');
    });

    it('should update the search string when setSearch is called', () => {
        useJobStore.getState().setSearch('React developer');
        const { search } = useJobStore.getState();
        expect(search).toBe('React developer');
    });

    it('should filter jobs based on the search string (title match)', () => {
        // Assuming mockJobs has at least one job with "developer" or something in it.
        // We test the logic of the filter function itself.
        useJobStore.setState({
            jobs: [
                { id: '1', title: 'Frontend Developer', company: 'Tech Inc', location: 'NY', type: 'Full-time', salary: '100k' },
                { id: '2', title: 'Backend Engineer', company: 'Data Corp', location: 'SF', type: 'Full-time', salary: '120k' },
            ],
            search: 'frontend'
        });

        const filtered = useJobStore.getState().filteredJobs();
        expect(filtered).toHaveLength(1);
        expect(filtered[0].title).toBe('Frontend Developer');
    });

    it('should filter jobs based on location', () => {
        useJobStore.setState({
            jobs: [
                { id: '1', title: 'Developer', company: 'Tech Inc', location: 'Remote', type: 'Full-time', salary: '100k' },
                { id: '2', title: 'Engineer', company: 'Data Corp', location: 'San Francisco', type: 'Full-time', salary: '120k' },
            ],
            search: 'san francisco'
        });

        const filtered = useJobStore.getState().filteredJobs();
        expect(filtered).toHaveLength(1);
        expect(filtered[0].company).toBe('Data Corp');
    });
});
