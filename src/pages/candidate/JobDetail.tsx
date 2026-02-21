import { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useJobStore } from '@/store/useJobStore';
import { useAuthStore } from '@/store/useAuthStore';
import { useApplicationStore } from '@/store/useApplicationStore';
import toast from 'react-hot-toast';

export function JobDetail() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { jobs } = useJobStore();
    const { user } = useAuthStore();
    const { apply, hasApplied } = useApplicationStore();
    const [isSaved, setIsSaved] = useState(false);

    const job = jobs.find((j) => j.id === id);
    const similarJobs = jobs.filter((j) => j.id !== id).slice(0, 3);

    if (!job) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-20 text-center">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Job not found</h2>
                <Link to="/jobs" className="text-primary hover:underline mt-4 inline-block">Back to Jobs</Link>
            </div>
        );
    }

    const isCandidate = user?.role === 'candidate';
    const applied = isCandidate && user ? hasApplied(job.id, user.name) : false;

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
        setIsSaved((prev) => !prev);
        toast.success(isSaved ? 'Job removed from saved list.' : 'Job saved successfully.');
    };

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <nav className="flex mb-8 text-sm font-medium text-slate-500 dark:text-slate-400">
                <Link to="/" className="hover:text-primary">Home</Link>
                <span className="mx-2">/</span>
                <Link to="/jobs" className="hover:text-primary">Jobs</Link>
                <span className="mx-2">/</span>
                <span className="text-slate-900 dark:text-white">{job.title}</span>
            </nav>

            <div className="glass-card p-8 border border-white/40 dark:border-slate-700/50 mb-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full filter blur-[80px] pointer-events-none"></div>
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                    <div className="flex items-center gap-6">
                        <div className="w-20 h-20 bg-slate-50 dark:bg-slate-900 rounded-2xl flex items-center justify-center p-4 border border-gray-100 dark:border-gray-700 text-3xl font-bold text-primary">
                            {job.company.charAt(0)}
                        </div>
                        <div>
                            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">{job.title}</h1>
                            <div className="flex flex-wrap items-center gap-4 text-slate-600 dark:text-slate-400">
                                <span className="flex items-center gap-1.5 font-medium">
                                    <span className="material-symbols-outlined text-primary text-xl">business</span>
                                    {job.company}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <span className="material-symbols-outlined text-slate-400 text-xl">location_on</span>
                                    {job.location}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <span className="material-symbols-outlined text-slate-400 text-xl">schedule</span>
                                    {job.type}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 w-full lg:w-auto">
                        <button
                            type="button"
                            onClick={handleSaveToggle}
                            className="flex-1 lg:flex-none border border-slate-200 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-white px-6 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 hover:shadow-sm"
                        >
                            <span className="material-symbols-outlined text-xl">{isSaved ? 'bookmark_added' : 'bookmark'}</span>
                            {isSaved ? 'Saved' : 'Save'}
                        </button>
                        <button
                            type="button"
                            onClick={handleApply}
                            disabled={applied}
                            className="flex-1 lg:flex-none bg-gradient-to-r from-primary to-purple-600 hover:from-primaryHover hover:to-purple-700 disabled:opacity-60 disabled:cursor-not-allowed text-white px-8 py-3 rounded-xl font-semibold transition-all shadow-lg shadow-primary/30 flex items-center justify-center gap-2 hover:shadow-glow hover:scale-105"
                        >
                            {applied ? 'Applied' : 'Apply Now'}
                            <span className="material-symbols-outlined text-xl">arrow_forward</span>
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-gray-100 dark:border-gray-800">
                    <div>
                        <p className="text-sm text-slate-500 mb-1">Offered Salary</p>
                        <p className="font-bold text-slate-900 dark:text-white">{job.salary}</p>
                    </div>
                    <div>
                        <p className="text-sm text-slate-500 mb-1">Experience</p>
                        <p className="font-bold text-slate-900 dark:text-white">3-5 Years</p>
                    </div>
                    <div>
                        <p className="text-sm text-slate-500 mb-1">Gender</p>
                        <p className="font-bold text-slate-900 dark:text-white">Any</p>
                    </div>
                    <div>
                        <p className="text-sm text-slate-500 mb-1">Qualification</p>
                        <p className="font-bold text-slate-900 dark:text-white">Bachelor's Degree</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <section className="glass-card p-8 border-t-[3px] border-t-primary/50 relative overflow-hidden">
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-500/5 rounded-full filter blur-[40px] pointer-events-none"></div>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">About the Role</h2>
                        <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-300">
                            <p className="mb-4">We are seeking a highly creative and strategic {job.title} to join {job.company}'s core product team. You will be responsible for leading the design of critical user journeys and contributing to our evolving design system. The ideal candidate has a deep understanding of user-centered design principles and a passion for creating intuitive, delightful digital experiences.</p>
                            <p>In this role, you will collaborate closely with product managers, engineers, and researchers to translate complex problems into elegant design solutions that balance user needs with business objectives.</p>
                        </div>
                    </section>

                    <section className="glass-card p-8 border-t-[3px] border-t-orange-500/50 relative overflow-hidden">
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-500/5 rounded-full filter blur-[40px] pointer-events-none"></div>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Responsibilities</h2>
                        <ul className="space-y-4">
                            {[
                                'Lead the end-to-end design process for new features, from initial research and wireframing to high-fidelity prototyping and testing.',
                                'Maintain and expand our global design system, ensuring consistency across web and mobile platforms.',
                                'Conduct user research and usability testing to gather insights and validate design decisions.',
                                'Partner with engineering to ensure high-quality implementation of designs and provide necessary assets and documentation.'
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <span className="material-symbols-outlined text-primary mt-0.5">check_circle</span>
                                    <span className="text-slate-600 dark:text-slate-300">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section className="glass-card p-8 border-t-[3px] border-t-emerald-500/50 relative overflow-hidden">
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/5 rounded-full filter blur-[40px] pointer-events-none"></div>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Requirements</h2>
                        <ul className="space-y-4">
                            {[
                                `3+ years of experience as a ${job.title} or similar role at a tech-led company.`,
                                'A strong portfolio demonstrating expert-level visual design skills and deep systems thinking.',
                                'Proficiency in modern tools like Figma, Sketch, and Adobe Creative Suite.',
                                'Excellent communication and storytelling skills to articulate design rationale to stakeholders.',
                                'Experience working in Agile/Scrum environments.'
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-slate-600 dark:text-slate-300">
                                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2.5 flex-shrink-0"></span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>

                <div className="space-y-8">
                    <section className="glass-card p-6 border border-white/40 dark:border-slate-700/50">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Company Profile</h3>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 bg-slate-50 dark:bg-slate-900 rounded-xl flex items-center justify-center p-2 border border-gray-100 dark:border-gray-700 text-xl font-bold text-primary">
                                {job.company.charAt(0)}
                            </div>
                            <div>
                                <p className="font-bold text-slate-900 dark:text-white">{job.company}</p>
                                <p className="text-sm text-slate-500">Founded in 2012</p>
                            </div>
                        </div>
                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Industry</span>
                                <span className="font-medium text-slate-900 dark:text-white">Technology</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Company size</span>
                                <span className="font-medium text-slate-900 dark:text-white">501-1,000 employees</span>
                            </div>
                        </div>
                        <Link
                            to="/coming-soon?feature=Company%20Profile"
                            className="block w-full text-center py-3 bg-slate-50 dark:bg-slate-800 text-primary font-bold rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                        >
                            View Profile
                        </Link>
                    </section>

                    <section className="glass-card p-6 border border-white/40 dark:border-slate-700/50">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Similar Jobs</h3>
                        <div className="space-y-6">
                            {similarJobs.map((simJob) => (
                                <div key={simJob.id} className="group block">
                                    <Link to={`/jobs/${simJob.id}`} className="flex gap-4 mb-2 group/link">
                                        <div className="w-10 h-10 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-lg flex items-center justify-center p-2 font-bold text-primary shadow-sm group-hover/link:shadow-glow group-hover/link:bg-white dark:group-hover/link:bg-slate-800 transition-all duration-300">
                                            {simJob.company.charAt(0)}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">{simJob.title}</h4>
                                            <p className="text-xs text-slate-500">{simJob.company} | {simJob.location}</p>
                                        </div>
                                    </Link>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-primary font-medium">{simJob.salary}</span>
                                        <span className="text-slate-400">2 days ago</span>
                                    </div>
                                    <div className="h-px bg-gray-100 dark:border-gray-800 mt-4"></div>
                                </div>
                            ))}
                            <Link to="/jobs" className="block w-full text-center py-2 text-slate-500 dark:text-slate-400 text-sm font-medium hover:text-primary transition-colors">
                                Browse All Similar Jobs
                            </Link>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}
