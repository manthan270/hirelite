import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FileText, MapPin, Clock, ExternalLink, Briefcase } from 'lucide-react';
import { useApplicationStore } from '@/store/useApplicationStore';
import { useAuthStore } from '@/store/useAuthStore';
import { useJobStore } from '@/store/useJobStore';
import { Button } from '@/components/ui/Button';
import { formatSalary } from '@/lib/constants';

export default function MyApplications() {
    const user = useAuthStore((state) => state.user);
    const applications = useApplicationStore((state) => state.applications);
    const jobs = useJobStore((state) => state.jobs);

    const userName = user?.name ?? '';

    const myApplications = useMemo(() => {
        return applications
            .filter((app) => app.candidateName === userName)
            .map((app) => ({ ...app, job: jobs.find((j) => j.id === app.jobId) }))
            .reverse();
    }, [applications, userName, jobs]);

    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            <div>
                <h1 className="editorial-headline text-3xl font-bold tracking-tight text-[#1A211D] dark:text-white">My Applications</h1>
                <p className="text-[#62626B] dark:text-[#B5B5BD] mt-1">Your submitted applications in this local preview.</p>
            </div>

            <div className="flex items-start gap-3 rounded-xl border border-black/[0.07] bg-white p-4 shadow-sm dark:border-white/[0.09] dark:bg-[#171B18]">
                <FileText className="mt-0.5 h-5 w-5 shrink-0 text-primary dark:text-[#B7DED5]" aria-hidden="true" />
                <div>
                    <p className="font-semibold text-[#1A211D] dark:text-white">{myApplications.length} {myApplications.length === 1 ? 'application submitted' : 'applications submitted'}</p>
                    <p className="mt-0.5 text-sm text-[#62626B] dark:text-[#B5B5BD]">Employer review statuses are not part of this demo.</p>
                </div>
            </div>

            {/* list */}
            {myApplications.length > 0 ? (
                <div className="space-y-4">
                    {myApplications.map((app) => (
                        <div
                            key={`${app.jobId}-${app.appliedAt}`}
                            className="rounded-2xl border border-black/[0.07] bg-white p-5 shadow-sm transition-colors hover:border-primary/25 hover:shadow-md dark:border-white/[0.09] dark:bg-[#171B18] dark:hover:border-primary/35"
                        >
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-primary/[0.06] dark:bg-primary/[0.12] flex items-center justify-center text-lg font-bold text-primary shrink-0 border border-primary/10 dark:border-primary/20">
                                        {app.job?.company.charAt(0) ?? '?'}
                                    </div>
                                    <div className="min-w-0">
                                        <h3 className="font-bold text-[#1A211D] dark:text-white truncate">
                                            {app.job?.title ?? 'Unknown Position'}
                                        </h3>
                                        <p className="text-sm text-[#6B6B73] dark:text-[#8A8A90] font-medium">
                                            {app.job?.company ?? 'Unknown Company'}
                                        </p>
                                        {app.job && (
                                            <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-[#6B6B73] dark:text-[#8A8A90]">
                                                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {app.job.location}</span>
                                                <span className="flex items-center gap-1">{formatSalary(app.job.salary)}</span>
                                                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {app.job.type}</span>
                                            </div>
                                        )}
                                        <div className="mt-3">
                                            <span className="inline-flex min-h-7 items-center rounded-lg border border-primary/15 bg-primary/[0.06] px-2.5 text-xs font-medium text-primary dark:border-primary/25 dark:bg-primary/10 dark:text-[#B7DED5]">
                                                Submitted {app.appliedAt}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 shrink-0">
                                    {app.job && (
                                        <Button asChild size="sm" variant="outline" className="rounded-xl border-black/[0.06] dark:border-white/[0.06]">
                                            <Link to={`/jobs/${app.job.id}`}>
                                                <ExternalLink className="w-4 h-4 mr-1" /> View role
                                            </Link>
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-14 bg-white dark:bg-white/[0.04] rounded-2xl border-2 border-dashed border-black/[0.06] dark:border-white/[0.06] flex flex-col items-center justify-center">
                    <div className="w-16 h-16 bg-[#F1EFE6] dark:bg-white/[0.06] rounded-full flex items-center justify-center mb-4">
                        <FileText className="w-8 h-8 text-[#6B6B73]/50" />
                    </div>
                    <h3 className="text-lg font-bold text-[#1A211D] dark:text-white mb-1">No applications yet</h3>
                    <p className="text-[#6B6B73] dark:text-[#8A8A90] max-w-sm mx-auto mb-6">
                        Browse the sample roles and submit an application to see it listed here.
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
