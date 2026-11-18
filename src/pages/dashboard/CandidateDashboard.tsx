import { useState, useMemo } from 'react';
import { useJobStore } from '@/store/useJobStore';
import { JobCard } from '@/components/jobs/JobCard';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Search } from 'lucide-react';

export default function CandidateDashboard() {
    const [search, setSearch] = useState('');
    const jobs = useJobStore((state) => state.jobs);

    const filtered = useMemo(() => {
        if (!search.trim()) return jobs;
        const q = search.toLowerCase();
        return jobs.filter(
            (j) => j.title.toLowerCase().includes(q) || j.company.toLowerCase().includes(q) || j.location.toLowerCase().includes(q)
        );
    }, [jobs, search]);

    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="editorial-headline text-3xl font-bold tracking-tight text-[#1A211D] dark:text-white">Browse sample roles</h1>
                    <p className="mt-1 text-[#62626B] dark:text-[#B5B5BD]">Compare example listings and salary ranges in this preview.</p>
                </div>
                <div role="search" aria-label="Search sample roles" className="relative w-full md:w-80">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B6B73] w-4 h-4" aria-hidden="true" />
                    <Input
                        type="search"
                        aria-label="Search by role, company, or location"
                        placeholder="Search jobs, companies..."
                        className="pl-9 bg-white dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.06] rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-300 shadow-sm hover:shadow-md dark:text-white"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            <p aria-live="polite" className="text-sm text-[#62626B] dark:text-[#B5B5BD]">
                {filtered.length} {filtered.length === 1 ? 'role' : 'roles'}
            </p>

            <div className="grid gap-4">
                {filtered.length > 0 ? (
                    filtered.map((job) => (
                        <JobCard key={job.id} job={job} />
                    ))
                ) : (
                    <div className="text-center py-14 bg-white dark:bg-white/[0.04] rounded-2xl border-2 border-dashed border-black/[0.06] dark:border-white/[0.06] flex flex-col items-center justify-center">
                        <div className="w-16 h-16 bg-[#F1EFE6] dark:bg-white/[0.06] rounded-full flex items-center justify-center mb-4 shadow-sm">
                            <Search className="w-8 h-8 text-[#6B6B73] dark:text-[#8A8A90]" />
                        </div>
                        <h3 className="text-lg font-semibold text-[#1A211D] dark:text-white mb-1">No matching jobs found</h3>
                        <p className="text-[#6B6B73] dark:text-[#8A8A90] max-w-sm mx-auto">Try adjusting your search terms or filters to find what you're looking for.</p>
                        <Button variant="outline" className="mt-4" onClick={() => setSearch('')}>
                            Clear Search
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
