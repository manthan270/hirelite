import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, MapPin, DollarSign, Clock, Trash2, Briefcase } from 'lucide-react';
import { useSavedJobsStore } from '@/store/useSavedJobsStore';
import { useJobStore } from '@/store/useJobStore';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import toast from 'react-hot-toast';

export default function SavedJobs() {
    const savedJobIds = useSavedJobsStore((state) => state.savedJobIds);
    const toggleSave = useSavedJobsStore((state) => state.toggleSave);
    const clearAll = useSavedJobsStore((state) => state.clearAll);
    const jobs = useJobStore((state) => state.jobs);

    const savedJobs = useMemo(() => {
        return savedJobIds
            .map((id) => jobs.find((j) => j.id === id))
            .filter(Boolean)
            .reverse(); // newest saved first
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
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Saved Jobs</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">
                        Jobs you've bookmarked for later. {savedJobs.length > 0 && <span className="font-semibold text-slate-700 dark:text-slate-300">{savedJobs.length} saved</span>}
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

            {/* Saved Jobs List */}
            {savedJobs.length > 0 ? (
                <div className="space-y-4">
                    {savedJobs.map((job) => job && (
                        <div
                            key={job.id}
                            className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-primary/30 dark:hover:border-primary/40 hover:shadow-md p-5 transition-all duration-300"
                        >
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-purple-500/10 dark:from-primary/20 dark:to-purple-500/20 flex items-center justify-center text-lg font-bold text-primary dark:text-indigo-400 shrink-0 border border-primary/10 dark:border-primary/20">
                                        {job.company.charAt(0)}
                                    </div>
                                    <div className="min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <Link
                                                to={`/jobs/${job.id}`}
                                                className="font-bold text-slate-900 dark:text-white hover:text-primary dark:hover:text-indigo-400 transition-colors truncate"
                                            >
                                                {job.title}
                                            </Link>
                                            {job.verified && (
                                                <span className="flex items-center text-primary text-[10px] bg-primary/5 dark:bg-primary/10 px-1.5 py-0.5 rounded-full font-semibold shrink-0">✓ Verified</span>
                                            )}
                                        </div>
                                        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{job.company}</p>
                                        <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-slate-500 dark:text-slate-400">
                                            <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {job.location}</span>
                                            <span className="flex items-center gap-1"><DollarSign className="w-3.5 h-3.5" /> {job.salary}</span>
                                            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {job.type}</span>
                                        </div>
                                        <div className="mt-3">
                                            <Badge variant="secondary" className="text-[11px]">{job.type}</Badge>
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
                                        className="rounded-xl border-slate-200 dark:border-slate-700 text-red-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                                        title="Remove from saved"
                                    >
                                        <Bookmark className="w-4 h-4 fill-current" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center">
                    <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                        <Bookmark className="w-8 h-8 text-slate-300 dark:text-slate-600" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">No saved jobs yet</h3>
                    <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-6">
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
