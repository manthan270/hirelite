import { useJobStore } from '@/store/useJobStore';
import { useApplicationStore } from '@/store/useApplicationStore';
import { JobCard } from '@/components/jobs/JobCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Briefcase, Users, TrendingUp } from 'lucide-react';

export default function EmployerDashboard() {
    const { jobs } = useJobStore();
    const { applications } = useApplicationStore();

    // Mock employer filter - assuming the logged in employer is "TechCorp Global"
    const companyJobs = jobs.filter(job => job.company === 'TechCorp Global');

    // Calculate actual active jobs and total applicants based on store (plus mocks for realism if needed, but using store for applicants now)
    const totalApplicants = companyJobs.reduce((acc, job) => {
        // Count applications for this job from the application store
        const jobApps = applications.filter(app => app.jobId === job.id);
        return acc + jobApps.length;
    }, 0); // Start with 0 real applicants from store

    // Mock stats mixed with real data
    const stats = [
        { title: 'Total Jobs', value: companyJobs.length, icon: Briefcase, gradient: 'from-blue-500 to-blue-600' },
        { title: 'Active Jobs', value: companyJobs.length, icon: TrendingUp, gradient: 'from-emerald-500 to-emerald-600' },
        { title: 'Total Applicants', value: totalApplicants, icon: Users, gradient: 'from-violet-500 to-purple-600' },
    ];

    return (
        <div className="space-y-8 max-w-6xl mx-auto py-8 px-4">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Employer Dashboard</h1>
                <p className="text-slate-500 dark:text-slate-400 mt-1">Manage your job postings and view applicant stats.</p>
            </div>

            {/* Stats Row */}
            <div className="grid gap-6 md:grid-cols-3">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <Card key={index} className="border-none shadow-soft overflow-hidden relative group hover:-translate-y-1 hover:shadow-glow transition-all duration-300">
                            <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-100`} />
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                                <CardTitle className="text-sm font-medium text-white/90">
                                    {stat.title}
                                </CardTitle>
                                <Icon className="h-5 w-5 text-white/80" />
                            </CardHeader>
                            <CardContent className="relative z-10">
                                <div className="text-3xl font-bold text-white">{stat.value}</div>
                                <p className="text-xs text-white/70 mt-1 font-medium">Updated just now</p>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Job List Section */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Your Job Postings</h2>
                    </div>

                    <div className="grid gap-4">
                        {companyJobs.length > 0 ? (
                            companyJobs.map((job) => (
                                <JobCard key={job.id} job={job} />
                            ))
                        ) : (
                            <div className="text-center py-12 glass-card border-2 border-dashed border-slate-200 dark:border-slate-700/50">
                                <p className="text-slate-500 dark:text-slate-400 font-medium">You haven't posted any jobs yet.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Recent Applicants Feed */}
                <div className="space-y-4">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">Recent Applicants</h2>
                    <Card className="glass-card border-none shadow-soft">
                        <CardContent className="p-0">
                            {applications.length > 0 ? (
                                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                                    {applications.map((app, i) => {
                                        const job = jobs.find(j => j.id === app.jobId);
                                        if (!job || job.company !== 'TechCorp Global') return null;
                                        return (
                                            <div key={i} className="p-4 hover:bg-white/50 dark:hover:bg-slate-800/50 backdrop-blur-sm transition-colors border-b border-slate-100/50 dark:border-slate-800/50 last:border-0 cursor-pointer group">
                                                <div className="flex justify-between items-start mb-1">
                                                    <h4 className="font-semibold text-slate-900 dark:text-slate-100 group-hover:text-primary transition-colors">{app.candidateName}</h4>
                                                    <span className="text-xs text-slate-400 dark:text-slate-500">{app.appliedAt}</span>
                                                </div>
                                                <p className="text-sm text-slate-600 dark:text-slate-400">Applied for <span className="text-primary">{job?.title}</span></p>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="p-8 text-center text-slate-500 dark:text-slate-400 text-sm">
                                    No applicants yet.
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
