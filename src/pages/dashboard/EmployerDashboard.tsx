import { useJobStore } from '@/store/useJobStore';
import { useApplicationStore } from '@/store/useApplicationStore';
import { JobCard } from '@/components/jobs/JobCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Briefcase, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function EmployerDashboard() {
    const jobs = useJobStore((state) => state.jobs);
    const applications = useApplicationStore((state) => state.applications);

    // TODO: replace with actual employer filtering once auth has company association
    const companyJobs = jobs.filter(job => job.company === 'TechCorp Global');

    const totalApplicants = companyJobs.reduce((acc, job) => {
        return acc + applications.filter(app => app.jobId === job.id).length;
    }, 0);

    const companyApplications = applications.filter((application) =>
        companyJobs.some((job) => job.id === application.jobId)
    );

    const stats = [
        { title: 'Roles posted', value: companyJobs.length, icon: Briefcase, detail: 'Sample roles in this workspace' },
        { title: 'Applications received', value: totalApplicants, icon: Users, detail: 'Submitted through the local preview' },
    ];

    return (
        <div className="mx-auto max-w-6xl space-y-6">
            <div>
                <h1 className="editorial-headline text-3xl font-bold tracking-tight text-[#1A211D] dark:text-white">Employer Dashboard</h1>
                <p className="text-[#62626B] dark:text-[#B5B5BD] mt-1">TechCorp Global preview · role and application data is illustrative.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <Card key={stat.title} className="shadow-sm">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-[#62626B] dark:text-[#B5B5BD]">{stat.title}</CardTitle>
                                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/[0.08] text-primary dark:bg-primary/15 dark:text-[#B7DED5]">
                                    <Icon className="h-4 w-4" aria-hidden="true" />
                                </span>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-[#1A211D] dark:text-white">{stat.value}</div>
                                <p className="mt-1 text-xs text-[#6B6B73] dark:text-[#A0A0A8]">{stat.detail}</p>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                            <div className="flex items-center justify-between gap-3">
                                <h2 className="text-xl font-bold text-[#1A211D] dark:text-white">Your Job Postings</h2>
                                <span className="text-sm text-[#6B6B73] dark:text-[#A0A0A8]">{companyJobs.length}</span>
                            </div>
                    <div className="grid gap-4">
                        {companyJobs.length > 0 ? (
                            companyJobs.map((job) => (
                                <JobCard key={job.id} job={job} />
                            ))
                        ) : (
                            <div className="text-center py-12 bg-white dark:bg-white/[0.04] rounded-2xl border-2 border-dashed border-black/[0.06] dark:border-white/[0.06]">
                                <p className="text-[#6B6B73] dark:text-[#8A8A90] font-medium">You haven't posted any jobs yet.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* recent applicants */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between gap-3">
                        <h2 className="text-xl font-bold text-[#1A211D] dark:text-white">Recent Applicants</h2>
                        <span className="text-sm text-[#6B6B73] dark:text-[#A0A0A8]">{companyApplications.length}</span>
                    </div>
                    <Card className="shadow-sm">
                        <CardContent className="p-0">
                            {companyApplications.length > 0 ? (
                                <div className="divide-y divide-black/[0.04] dark:divide-white/[0.06]">
                                    {companyApplications.map((app) => {
                                        const job = jobs.find(j => j.id === app.jobId);
                                        if (!job) return null;
                                        return (
                                            <div key={`${app.jobId}-${app.candidateName}-${app.appliedAt}`} className="p-4 transition-colors hover:bg-[#F8F6EE] dark:hover:bg-white/[0.04]">
                                                <div className="mb-1 flex items-start justify-between gap-3">
                                                    <h4 className="font-semibold text-[#1A211D] dark:text-[#EAEAE8]">{app.candidateName}</h4>
                                                    <span className="shrink-0 text-xs text-[#62626B] dark:text-[#B5B5BD]">{app.appliedAt}</span>
                                                </div>
                                                <p className="text-sm text-[#62626B] dark:text-[#B5B5BD]">Applied for <Link to={`/jobs/${job.id}`} className="font-medium text-primary hover:underline dark:text-[#B7DED5]">{job.title}</Link></p>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="p-8 text-center text-[#6B6B73] dark:text-[#8A8A90] text-sm">
                                    No demo applications yet. When someone submits for an example role, it will appear here.
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
