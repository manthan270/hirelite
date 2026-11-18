import { useNavigate, useParams, Link } from 'react-router-dom';
import { useJobStore } from '@/store/useJobStore';
import { useAuthStore } from '@/store/useAuthStore';
import { useApplicationStore } from '@/store/useApplicationStore';
import { useSavedJobsStore } from '@/store/useSavedJobsStore';
import { formatSalary } from '@/lib/constants';
import { ArrowRight, Bookmark, Building2, CheckCircle2, Clock, MapPin } from 'lucide-react';
import toast from 'react-hot-toast';

const EXPERIENCE_LABELS = {
    'Entry level': '0-2 years',
    Intermediate: '3-5 years',
    Expert: '5+ years',
} as const;

export function JobDetail() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const jobs = useJobStore((state) => state.jobs);
    const user = useAuthStore((state) => state.user);
    const apply = useApplicationStore((state) => state.apply);
    const applications = useApplicationStore((state) => state.applications);
    const toggleSave = useSavedJobsStore((state) => state.toggleSave);
    const savedJobIds = useSavedJobsStore((state) => state.savedJobIds);

    const job = jobs.find((j) => j.id === id);
    const similarJobs = jobs.filter((j) => j.id !== id).slice(0, 3);
    const isCandidate = user?.role === 'candidate';
    const applied = Boolean(job && isCandidate && user && applications.some(
        (application) => application.jobId === job.id && application.candidateName === user.name
    ));
    const isSaved = Boolean(job && savedJobIds.includes(job.id));

    if (!job) {
        return (
            <div className="mx-auto max-w-7xl px-4 py-14 text-center">
                <h2 className="text-2xl font-bold text-[#1A211D] dark:text-white">Job not found</h2>
                <Link to="/jobs" className="mt-4 inline-flex min-h-11 items-center rounded-lg px-4 font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">Back to jobs</Link>
            </div>
        );
    }

    const handleApply = () => {
        if (!user) {
            toast.error('Please login as a candidate to apply.');
            navigate('/login');
            return;
        }
        if (!isCandidate) {
            toast.error('Only candidate accounts can apply to jobs.');
            return;
        }
        if (applied) {
            toast('You already applied for this role.');
            return;
        }
        apply(job.id, user.name);
        toast.success('Application submitted successfully.');
    };

    const handleSaveToggle = () => {
        if (!job) return;
        toggleSave(job.id);
        toast.success(isSaved ? 'Job removed from saved list.' : 'Job saved successfully.');
    };

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <nav aria-label="Breadcrumb" className="mb-6 overflow-x-auto text-sm font-medium text-[#62626B] dark:text-[#B5B5BD]">
                <ol className="flex min-w-max items-center">
                <li>
                <Link to="/" className="hover:text-primary">Home</Link>
                </li>
                <li aria-hidden="true"><span className="mx-2 text-[#A0A0A8]">/</span></li>
                <li>
                <Link to="/jobs" className="hover:text-primary">Jobs</Link>
                </li>
                <li aria-hidden="true"><span className="mx-2 text-[#A0A0A8]">/</span></li>
                <li aria-current="page" className="max-w-[40vw] truncate text-[#1A211D] dark:text-white">{job.title}</li>
                </ol>
            </nav>

            <div className="mb-6 rounded-2xl border border-black/[0.07] bg-white p-5 shadow-sm dark:border-white/[0.09] dark:bg-[#171B18] sm:p-7">
                <div className="flex flex-col items-start justify-between gap-5 lg:flex-row lg:items-center">
                    <div className="flex min-w-0 items-start gap-4 sm:gap-5">
                        <div aria-hidden="true" className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-primary/15 bg-primary/[0.07] text-xl font-bold text-primary dark:border-primary/25 dark:bg-primary/10 dark:text-[#B7DED5] sm:h-16 sm:w-16 sm:text-2xl">
                            {job.company.charAt(0)}
                        </div>
                        <div className="min-w-0">
                            <span className="mb-2 inline-flex items-center rounded-md border border-primary/15 bg-primary/[0.05] px-2 py-1 text-[11px] font-medium text-primary dark:border-primary/25 dark:bg-primary/10 dark:text-[#B7DED5]">Sample role</span>
                            <h1 className="text-2xl font-bold text-[#1A211D] dark:text-white sm:text-3xl">{job.title}</h1>
                            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[#62626B] dark:text-[#B5B5BD]">
                                <span className="flex items-center gap-1.5 font-medium">
                                    <Building2 className="h-4 w-4 text-primary" aria-hidden="true" />
                                    {job.company}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <MapPin className="h-4 w-4" aria-hidden="true" />
                                    {job.location}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <Clock className="h-4 w-4" aria-hidden="true" />
                                    {job.type}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex w-full gap-2.5 sm:w-auto">
                        <button
                            type="button"
                            onClick={handleSaveToggle}
                            aria-pressed={isSaved}
                            aria-label={isSaved ? `Remove ${job.title} from saved jobs` : `Save ${job.title}`}
                            className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-lg border border-black/[0.09] px-4 font-semibold text-[#292930] transition-colors hover:bg-[#F8F6EE] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:border-white/[0.1] dark:text-white dark:hover:bg-white/[0.06] sm:flex-none"
                        >
                            <Bookmark className={`h-4 w-4 ${isSaved ? 'fill-current text-primary' : ''}`} aria-hidden="true" />
                            {isSaved ? 'Saved' : 'Save'}
                        </button>
                        <button
                            type="button"
                            onClick={handleApply}
                            disabled={applied}
                            className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-5 font-semibold text-white shadow-sm transition-colors hover:bg-primary-dark hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 dark:focus-visible:ring-offset-[#171B18] sm:flex-none sm:px-7"
                        >
                            {applied ? 'Applied' : 'Apply Now'}
                            {applied ? <CheckCircle2 className="h-4 w-4" aria-hidden="true" /> : <ArrowRight className="h-4 w-4" aria-hidden="true" />}
                        </button>
                    </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3 border-t border-black/[0.07] pt-5 dark:border-white/[0.09] sm:grid-cols-4 sm:gap-4">
                    {[
                        { label: 'Example salary', value: formatSalary(job.salary) },
                        { label: 'Experience', value: EXPERIENCE_LABELS[job.experienceLevel] },
                        { label: 'Job type', value: job.type },
                        { label: 'Location', value: job.location },
                    ].map((detail) => (
                        <div key={detail.label} className="min-w-0">
                            <p className="text-xs text-[#6B6B73] dark:text-[#A0A0A8]">{detail.label}</p>
                            <p className="mt-1 break-words text-sm font-semibold text-[#1A211D] dark:text-white">{detail.value}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <p className="rounded-xl border border-primary/15 bg-primary/[0.04] px-4 py-3 text-sm text-[#45454E] dark:border-primary/20 dark:bg-primary/[0.08] dark:text-[#D3D0F2]">
                        Role descriptions in this preview are illustrative.
                    </p>
                    <section className="rounded-2xl border border-black/[0.07] bg-white p-6 shadow-sm dark:border-white/[0.09] dark:bg-[#171B18] sm:p-8">
                        <h2 className="mb-5 text-xl font-bold text-[#1A211D] dark:text-white">About the role</h2>
                        <div className="prose max-w-none text-[#6B6B73] dark:text-[#8A8A90]">
                            <p className="mb-4">{job.company} is looking for a {job.title} to contribute to team goals and deliver work that supports its products and customers.</p>
                            <p>You will collaborate with colleagues across the company, communicate progress clearly, and use role-relevant skills to solve day-to-day problems.</p>
                        </div>
                    </section>

                    <section className="rounded-2xl border border-black/[0.07] bg-white p-6 shadow-sm dark:border-white/[0.09] dark:bg-[#171B18] sm:p-8">
                        <h2 className="mb-5 text-xl font-bold text-[#1A211D] dark:text-white">Responsibilities</h2>
                        <ul className="space-y-4">
                            {[
                                `Deliver projects and priorities aligned with the ${job.title} role.`,
                                'Collaborate with teammates and communicate progress, risks, and outcomes.',
                                'Use relevant data, research, or customer feedback to guide decisions.',
                                'Document work clearly and contribute to continuous improvement.'
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary dark:text-[#B7DED5]" aria-hidden="true" />
                                    <span className="text-[#6B6B73] dark:text-[#8A8A90]">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section className="rounded-2xl border border-black/[0.07] bg-white p-6 shadow-sm dark:border-white/[0.09] dark:bg-[#171B18] sm:p-8">
                        <h2 className="mb-5 text-xl font-bold text-[#1A211D] dark:text-white">Requirements</h2>
                        <ul className="space-y-4">
                            {[
                                `${job.experienceLevel} experience in ${job.title} or a related role.`,
                                'Demonstrated skills and examples of work relevant to this role.',
                                'Clear written and verbal communication.',
                                'Ability to work collaboratively and manage priorities.'
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-[#6B6B73] dark:text-[#8A8A90]">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#6B6B73] mt-2.5 flex-shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>

                <div className="space-y-8">
                    <section className="rounded-2xl border border-black/[0.07] bg-white p-5 shadow-sm dark:border-white/[0.09] dark:bg-[#171B18] sm:p-6">
                        <h3 className="mb-4 text-lg font-bold text-[#1A211D] dark:text-white">Company</h3>
                        <div className="flex items-center gap-4 mb-4">
                            <div aria-hidden="true" className="flex h-12 w-12 items-center justify-center rounded-xl border border-primary/15 bg-primary/[0.07] p-2 text-xl font-bold text-primary dark:border-primary/25 dark:bg-primary/10 dark:text-[#B7DED5]">
                                {job.company.charAt(0)}
                            </div>
                            <div>
                                <p className="font-bold text-[#1A211D] dark:text-white">{job.company}</p>
                                <p className="text-sm text-[#62626B] dark:text-[#B5B5BD]">Sample company</p>
                            </div>
                        </div>
                        <p className="mb-5 text-sm leading-6 text-[#62626B] dark:text-[#B5B5BD]">Company details in this preview are illustrative.</p>
                        <Link
                            to={`/jobs?q=${encodeURIComponent(job.company)}`}
                            className="flex min-h-11 w-full items-center justify-center rounded-lg bg-[#F1EFE6] py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-[#E9E6DB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:bg-white/[0.06] dark:text-[#B7DED5] dark:hover:bg-white/[0.08]"
                        >
                            Browse roles from this company
                        </Link>
                    </section>

                    <section className="rounded-2xl border border-black/[0.07] bg-white p-5 shadow-sm dark:border-white/[0.09] dark:bg-[#171B18] sm:p-6">
                        <h3 className="mb-5 text-lg font-bold text-[#1A211D] dark:text-white">Similar roles</h3>
                        <div className="space-y-4">
                            {similarJobs.map((simJob) => (
                                <div key={simJob.id} className="group border-b border-black/[0.07] pb-4 last:border-0 last:pb-0 dark:border-white/[0.09]">
                                    <Link to={`/jobs/${simJob.id}`} className="mb-2 flex gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                                        <div aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/[0.07] p-2 font-bold text-primary dark:bg-primary/10 dark:text-[#B7DED5]">
                                            {simJob.company.charAt(0)}
                                        </div>
                                        <div className="min-w-0">
                                            <h4 className="font-semibold text-[#1A211D] transition-colors group-hover:text-primary dark:text-white">{simJob.title}</h4>
                                            <p className="mt-1 text-xs text-[#62626B] dark:text-[#B5B5BD]">{simJob.company} · {simJob.location}</p>
                                        </div>
                                    </Link>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="font-medium text-primary dark:text-[#B7DED5]">{formatSalary(simJob.salary)}</span>
                                        <span className="text-xs text-[#6B6B73] dark:text-[#A0A0A8]">{simJob.type}</span>
                                    </div>
                                </div>
                            ))}
                            <Link to="/jobs" className="flex min-h-10 w-full items-center justify-center rounded-lg px-2 text-sm font-semibold text-primary transition-colors hover:bg-primary/[0.06] dark:text-[#B7DED5] dark:hover:bg-primary/10">
                                Browse all roles
                            </Link>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}
