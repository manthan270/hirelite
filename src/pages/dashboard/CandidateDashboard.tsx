import { useJobStore } from '@/store/useJobStore';
import { JobCard } from '@/components/jobs/JobCard';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Search } from 'lucide-react';

export default function CandidateDashboard() {
    const { search, setSearch, filteredJobs } = useJobStore();
    const jobs = filteredJobs();

    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Find your next role</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">Browse and apply to the best opportunities in India.</p>
                </div>
                <div className="relative w-full md:w-80">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input
                        placeholder="Search jobs, companies..."
                        className="pl-9 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border border-slate-200 dark:border-slate-700/50 rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-300 shadow-sm hover:shadow-md dark:text-white"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            <div className="grid gap-4">
                {jobs.length > 0 ? (
                    jobs.map((job) => (
                        <JobCard key={job.id} job={job} />
                    ))
                ) : (
                    <div className="text-center py-16 glass-card border-2 border-dashed border-slate-200 dark:border-slate-700/50 flex flex-col items-center justify-center">
                        <div className="w-16 h-16 bg-white/50 dark:bg-slate-800/80 backdrop-blur-sm rounded-full flex items-center justify-center mb-4 shadow-sm relative overflow-hidden">
                            <Search className="w-8 h-8 text-slate-400 dark:text-slate-500 relative z-10" />
                        </div>
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">No matching jobs found</h3>
                        <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto">Try adjusting your search terms or filters to find what you're looking for.</p>
                        <Button variant="outline" className="mt-4" onClick={() => setSearch('')}>
                            Clear Search
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
