import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FileText, MapPin, DollarSign, Clock, ExternalLink, Briefcase } from 'lucide-react';
import { useApplicationStore } from '@/store/useApplicationStore';
import { useAuthStore } from '@/store/useAuthStore';
import { useJobStore } from '@/store/useJobStore';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export default function MyApplications() {
    const user = useAuthStore((state) => state.user);
    const applications = useApplicationStore((state) => state.applications);
    const jobs = useJobStore((state) => state.jobs);

    const userName = user?.name ?? '';

    const myApplications = useMemo(() => {
        return applications
            .filter((app) => app.candidateName === userName)
            .map((app) => {
                const job = jobs.find((j) => j.id === app.jobId);
                return { ...app, job };
            })
            .reverse(); // newest first
    }, [applications, userName, jobs]);

    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">My Applications</h1>
                <p className="text-slate-500 dark:text-slate-400 mt-1">
                    Track the status of the jobs you've applied to.
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                    { label: 'Total Applied', value: myApplications.length, color: 'text-primary dark:text-indigo-400', bg: 'bg-primary/5 dark:bg-primary/10' },
                    { label: 'In Review', value: myApplications.length > 0 ? Math.ceil(myApplications.length * 0.6) : 0, color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-500/10' },
                    { label: 'Shortlisted', value: myApplications.length > 0 ? Math.floor(myApplications.length * 0.3) : 0, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-500/10' },
                ].map((stat) => (
                    <div key={stat.label} className={`${stat.bg} rounded-2xl p-5 border border-slate-100 dark:border-slate-800 transition-colors`}>
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{stat.label}</p>
                        <p className={`text-3xl font-bold mt-1 ${stat.color}`}>{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Applications List */}
            {myApplications.length > 0 ? (
                <div className="space-y-4">
                    {myApplications.map((app) => (
                        <div
                            key={`${app.jobId}-${app.appliedAt}`}
                            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 hover:border-primary/30 dark:hover:border-primary/40 hover:shadow-md transition-all duration-300"
                        >
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-purple-500/10 dark:from-primary/20 dark:to-purple-500/20 flex items-center justify-center text-lg font-bold text-primary dark:text-indigo-400 shrink-0 border border-primary/10 dark:border-primary/20">
                                        {app.job?.company.charAt(0) ?? '?'}
                                    </div>
                                    <div className="min-w-0">
                                        <h3 className="font-bold text-slate-900 dark:text-white truncate">
                                            {app.job?.title ?? 'Unknown Position'}
                                        </h3>
                                        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                                            {app.job?.company ?? 'Unknown Company'}
                                        </p>
                                        {app.job && (
                                            <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-slate-500 dark:text-slate-400">
                                                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {app.job.location}</span>
                                                <span className="flex items-center gap-1"><DollarSign className="w-3.5 h-3.5" /> {app.job.salary}</span>
                                                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {app.job.type}</span>
                                            </div>
                                        )}
                                        <div className="flex flex-wrap items-center gap-2 mt-3">
                                            <Badge variant="blue" className="text-[11px]">Applied {app.appliedAt}</Badge>
                                            <Badge variant="warning" className="text-[11px]">In Review</Badge>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 shrink-0">
                                    {app.job && (
                                        <Button asChild size="sm" variant="outline" className="rounded-xl border-slate-200 dark:border-slate-700">
                                            <Link to={`/jobs/${app.job.id}`}>
                                                <ExternalLink className="w-4 h-4 mr-1" /> View Job
                                            </Link>
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center">
                    <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                        <FileText className="w-8 h-8 text-slate-300 dark:text-slate-600" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">No applications yet</h3>
                    <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-6">
                        Start exploring jobs and apply to positions that match your skills.
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
