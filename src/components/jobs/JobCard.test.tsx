import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { JobCard } from './JobCard';
import { useAuthStore } from '@/store/useAuthStore';
import { useApplicationStore } from '@/store/useApplicationStore';

// Mock the react-hot-toast module
vi.mock('react-hot-toast', () => ({
    default: { success: vi.fn(), error: vi.fn() }
}));

const mockJob: import('@/types/job').Job = {
    id: 'test-job-1',
    title: 'Senior Frontend Engineer',
    company: 'Tech Innovators',
    location: 'Remote',
    type: 'Full-time',
    salary: '$130k - $160k',
    verified: true
};

describe('JobCard Component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        // Reset stores to default state
        useAuthStore.setState({ user: null, isAuthenticated: false });
        useApplicationStore.setState({
            applications: []
        });
    });

    const renderCard = () => render(
        <BrowserRouter>
            <JobCard job={mockJob} />
        </BrowserRouter>
    );

    it('renders job details correctly', () => {
        renderCard();

        expect(screen.getByText('Senior Frontend Engineer')).toBeInTheDocument();
        expect(screen.getByText('Tech Innovators')).toBeInTheDocument();
        expect(screen.getByText('Remote')).toBeInTheDocument();
        expect(screen.getByText('$130k - $160k')).toBeInTheDocument();
        expect(screen.getByText('Full-time')).toBeInTheDocument();
        expect(screen.getByText('Verified')).toBeInTheDocument(); // Verified Badge
    });

    it('shows applicant count when viewed by an employer', () => {
        // Setup employer state
        useAuthStore.setState({
            user: { id: 'employer-1', name: 'Employer Name', role: 'employer', email: 'emp@test.com' },
            isAuthenticated: true
        });

        useApplicationStore.setState({
            applications: [
                { jobId: 'test-job-1', candidateName: 'Alice', appliedAt: 'today' },
                { jobId: 'test-job-1', candidateName: 'Bob', appliedAt: 'today' },
            ]
        });

        renderCard();

        expect(screen.getByText('2 Applicants')).toBeInTheDocument();
    });

    it('hides apply button to non-candidates', () => {
        renderCard(); // Unauthenticated defaults to no apply button
        expect(screen.queryByRole('button', { name: /Apply Now/i })).not.toBeInTheDocument();
    });

    it('allows a candidate to apply for a job', async () => {
        const user = userEvent.setup();
        useAuthStore.setState({
            user: { id: 'candidate-1', name: 'John Doe', role: 'candidate', email: 'john@test.com' },
            isAuthenticated: true
        });

        renderCard();

        const applyButton = screen.getByRole('button', { name: /Apply Now/i });
        expect(applyButton).toBeInTheDocument();

        await user.click(applyButton);

        // Check if the store updated the state visually (applied button)
        expect(screen.getByRole('button', { name: /Applied/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Applied/i })).toBeDisabled();
    });
});
