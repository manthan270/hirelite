import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, MapPin, Clock, Trash2, Briefcase } from 'lucide-react';
import { useSavedJobsStore } from '@/store/useSavedJobsStore';
import { useJobStore } from '@/store/useJobStore';
import { Button } from '@/components/ui/Button';
import toast from 'react-hot-toast';
import { formatSalary } from '@/lib/constants';

export default function SavedJobs() {
    const savedJobIds = useSavedJobsStore((state) => state.savedJobIds);
    const toggleSave = useSavedJobsStore((state) => state.toggleSave);
    const clearAll = useSavedJobsStore((state) => state.clearAll);
    const jobs = useJobStore((state) => state.jobs);

    const savedJobs = useMemo(() => {
        return savedJobIds
            .map((id) => jobs.find((j) => j.id === id))
            .filter(Boolean)
            .reverse();
    }, [savedJobIds, jobs]);

    const handleRemove = (jobId: string, title: string) => {
        toggleSave(jobId);
        toast.success(`"${title}" removed from saved jobs.`);
    };

    const handleClearAll = () => {
        clearAll();
        toast.success('All saved jobs cleared.');
    };

    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="editorial-headline text-3xl font-bold tracking-tight text-[#1A211D] dark:text-white">Saved Jobs</h1>
                    <p className="text-[#6B6B73] dark:text-[#8A8A90] mt-1">
                        Jobs you've bookmarked for later. {savedJobs.length > 0 && <span className="font-semibold text-[#1A211D] dark:text-[#EAEAE8]">{savedJobs.length} saved</span>}
                    </p>
                </div>
                {savedJobs.length > 0 && (
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleClearAll}
                        className="rounded-xl border-red-200 dark:border-red-500/20 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors self-start"
                    >
                        <Trash2 className="w-4 h-4 mr-1.5" /> Clear All
                    </Button>
                )}
            </div>

            {savedJobs.length > 0 ? (
                <div className="space-y-4">
                    {savedJobs.map((job) => job && (
                        <div
                            key={job.id}
                            className="group rounded-2xl border border-black/[0.07] bg-white p-5 shadow-sm transition-colors hover:border-primary/25 hover:shadow-md dark:border-white/[0.09] dark:bg-[#171B18] dark:hover:border-primary/35"
                        >
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-primary/[0.06] dark:bg-primary/[0.12] flex items-center justify-center text-lg font-bold text-primary shrink-0 border border-primary/10 dark:border-primary/20">
                                        {job.company.charAt(0)}
                                    </div>
                                    <div className="min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <Link
                                                to={`/jobs/${job.id}`}
                                                className="rounded-sm font-semibold text-[#1A211D] transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:text-white"
                                            >
                                                {job.title}
                                            </Link>
                                            {job.verified && (
                                                <span className="flex items-center text-primary text-[11px] bg-primary/5 dark:bg-primary/10 px-1.5 py-0.5 rounded-full font-semibold shrink-0">✓ Verified</span>
                                            )}
                                        </div>
                                        <p className="text-sm text-[#6B6B73] dark:text-[#8A8A90] font-medium">{job.company}</p>
                                        <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-[#6B6B73] dark:text-[#8A8A90]">
                                            <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {job.location}</span>
                                            <span className="flex items-center gap-1">{formatSalary(job.salary)}</span>
                                            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {job.type}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 shrink-0">
                                    <Button asChild size="sm" className="bg-primary hover:bg-primary/90 text-white rounded-xl">
                                        <Link to={`/jobs/${job.id}`}>View Details</Link>
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleRemove(job.id, job.title)}
                                        aria-label={`Remove ${job.title} from saved jobs`}
                                        className="rounded-lg border-black/[0.08] dark:border-white/[0.1] text-[#62626B] hover:text-red-600 hover:bg-red-50 dark:text-[#B5B5BD] dark:hover:bg-red-500/10 transition-colors"
                                    >
                                        <Bookmark className="w-4 h-4 fill-current" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-14 bg-white dark:bg-white/[0.04] rounded-2xl border-2 border-dashed border-black/[0.06] dark:border-white/[0.06] flex flex-col items-center justify-center">
                    <div className="w-16 h-16 bg-[#F1EFE6] dark:bg-white/[0.06] rounded-full flex items-center justify-center mb-4">
                        <Bookmark className="w-8 h-8 text-[#6B6B73]/50" />
                    </div>
                    <h3 className="text-lg font-bold text-[#1A211D] dark:text-white mb-1">No saved jobs yet</h3>
                    <p className="text-[#6B6B73] dark:text-[#8A8A90] max-w-sm mx-auto mb-6">
                        Browse jobs and click the bookmark icon to save positions you're interested in.
                    </p>
                    <Button asChild className="bg-primary hover:bg-primary/90 text-white rounded-xl">
                        <Link to="/jobs">
                            <Briefcase className="w-4 h-4 mr-2" /> Browse Jobs
                        </Link>
                    </Button>
                </div>
            )}
        </div>
    );
}
