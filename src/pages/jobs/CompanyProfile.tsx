import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Building2, ChevronRight, ArrowUpRight, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { formatSalary } from '@/lib/constants';
import { mockJobs } from '@/lib/mockJobs';

const BENEFITS = [
    "Health coverage",
    "Unlimited PTO",
    "Retirement benefits",
    "Remote Workspace Stipend",
    "Annual Learning Budget",
    "Flexible Hours"
];

const OPEN_ROLES = mockJobs.filter((job) => job.company === 'TechCorp Global');

export default function CompanyProfile() {
    return (
        <div className="flex-1 bg-[#F8F6EE] dark:bg-[#101310] transition-colors">
            <div className="relative h-32 overflow-hidden bg-[#171722] dark:bg-[#101017] sm:h-40">
                <div className="absolute inset-x-0 bottom-0 h-px bg-primary/30" />
                <div className="mx-auto max-w-6xl px-4 pt-8 sm:px-6 sm:pt-12 lg:px-8">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/65">Company profile preview</p>
                </div>
            </div>

            <div className="relative z-10 mx-auto -mt-8 max-w-6xl px-4 pb-16 sm:-mt-10 sm:px-6 lg:px-8">

                {/* company header card */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="mb-8 flex flex-col items-start gap-6 rounded-2xl border border-black/[0.07] bg-white p-5 shadow-sm transition-colors dark:border-white/[0.09] dark:bg-[#171B18] sm:p-7 md:flex-row md:gap-7"
                >
                    <div aria-hidden="true" className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary text-2xl font-bold text-white shadow-sm sm:h-20 sm:w-20 sm:text-3xl">
                        T
                    </div>

                    <div className="w-full flex-1">
                        <div className="mb-5 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                            <div>
                                <h1 className="text-2xl font-bold text-[#1A211D] dark:text-white sm:text-3xl">
                                    TechCorp Global
                                </h1>
                                <p className="mt-1 text-sm text-[#62626B] dark:text-[#B5B5BD]">Company details on this page are illustrative.</p>
                            </div>
                            <div className="flex w-full flex-col gap-2 sm:flex-row md:w-auto">
                                <Button asChild variant="outline" className="w-full md:w-auto">
                                    <Link to="/jobs">Browse jobs</Link>
                                </Button>
                                <Button asChild className="w-full md:w-auto">
                                    <a href="#open-roles">View {OPEN_ROLES.length} open {OPEN_ROLES.length === 1 ? 'role' : 'roles'} <ArrowUpRight className="ml-2 h-4 w-4" /></a>
                                </Button>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-x-6 gap-y-3 border-t border-black/[0.07] pt-4 text-sm font-medium text-[#62626B] dark:border-white/[0.09] dark:text-[#B5B5BD]">
                            <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" aria-hidden="true" /> Sample location: India</span>
                            <span className="flex items-center gap-2"><Building2 className="h-4 w-4 text-primary" aria-hidden="true" /> Technology</span>
                            <span className="flex items-center gap-2"><Briefcase className="h-4 w-4 text-primary" aria-hidden="true" /> {OPEN_ROLES.length} sample open {OPEN_ROLES.length === 1 ? 'role' : 'roles'}</span>
                        </div>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* main */}
                    <div className="lg:col-span-2 space-y-8">
                        <motion.section
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="rounded-2xl border border-black/[0.07] bg-white p-6 shadow-sm transition-colors dark:border-white/[0.09] dark:bg-[#171B18] sm:p-7"
                        >
                            <h2 className="mb-4 border-b border-black/[0.07] pb-4 text-xl font-bold text-[#1A211D] dark:border-white/[0.09] dark:text-white">About this sample profile</h2>
                            <div className="prose max-w-none text-[#6B6B73] dark:text-[#8A8A90] leading-relaxed">
                                <p>This page demonstrates how employer information and open roles can be presented to candidates.</p>
                                <p>Company description, benefits, and technology examples are sample content and have not been independently verified.</p>
                            </div>
                        </motion.section>

                        <motion.section
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            id="open-roles"
                            className="rounded-2xl border border-black/[0.07] bg-white p-6 shadow-sm transition-colors dark:border-white/[0.09] dark:bg-[#171B18] sm:p-7"
                        >
                            <div className="mb-5 flex items-center justify-between gap-3 border-b border-black/[0.07] pb-4 dark:border-white/[0.09]">
                                <h2 className="text-xl font-bold text-[#1A211D] dark:text-white">Open Roles</h2>
                                <span className="text-sm font-medium text-[#62626B] dark:text-[#B5B5BD]">{OPEN_ROLES.length} sample</span>
                            </div>
                            <div className="space-y-4">
                                {OPEN_ROLES.map((job) => (
                                    <Link key={job.id} to={`/jobs/${job.id}`} className="group flex items-center justify-between gap-4 rounded-xl border border-black/[0.08] bg-[#FBFAF8] p-4 transition-colors hover:border-primary/30 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:border-white/[0.1] dark:bg-white/[0.025] dark:hover:bg-white/[0.045] sm:p-5">
                                        <span className="min-w-0">
                                            <span className="block truncate font-semibold text-[#1A211D] transition-colors group-hover:text-primary dark:text-white">{job.title}</span>
                                            <span className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-sm text-[#62626B] dark:text-[#B5B5BD]">
                                                <span>{job.location}</span>
                                                <span>{job.type}</span>
                                                <span className="font-medium text-[#33333B] dark:text-[#E7E7EA]">{formatSalary(job.salary)}</span>
                                            </span>
                                        </span>
                                        <ChevronRight className="h-5 w-5 shrink-0 text-[#6B6B73] transition-transform group-hover:translate-x-0.5 group-hover:text-primary" aria-hidden="true" />
                                    </Link>
                                ))}
                                {OPEN_ROLES.length === 0 && <p className="text-sm text-[#62626B] dark:text-[#B5B5BD]">There are no sample openings to show right now.</p>}
                            </div>
                        </motion.section>
                    </div>

                    {/* sidebar */}
                    <div className="space-y-8">
                        <motion.section
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="rounded-2xl border border-black/[0.07] bg-white p-6 shadow-sm transition-colors dark:border-white/[0.09] dark:bg-[#171B18] sm:p-7"
                        >
                            <h2 className="mb-5 border-b border-black/[0.07] pb-4 text-lg font-bold text-[#1A211D] dark:border-white/[0.09] dark:text-white">Example benefits</h2>
                            <ul className="space-y-4">
                                {BENEFITS.map((benefit, i) => (
                                    <li key={i} className="flex items-center gap-3 text-[#1A211D] dark:text-[#EAEAE8] font-medium text-sm">
                                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/[0.08] text-primary dark:bg-primary/15 dark:text-[#B7DED5]">
                                            <span className="h-1.5 w-1.5 rounded-full bg-current" />
                                        </span>
                                        {benefit}
                                    </li>
                                ))}
                            </ul>
                        </motion.section>

                        <motion.section
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="rounded-2xl border border-black/[0.07] bg-white p-6 shadow-sm transition-colors dark:border-white/[0.09] dark:bg-[#171B18] sm:p-7"
                        >
                            <div>
                                <h3 className="mb-2 font-bold text-[#1A211D] dark:text-white">Example technologies</h3>
                                <p className="text-xs text-[#6B6B73] dark:text-[#A0A0A8]">Illustrative tools for this profile preview.</p>
                                <div className="mt-4 flex flex-wrap gap-2">
                                    {['React', 'TypeScript', 'Node.js', 'Go', 'Kubernetes', 'AWS', 'PostgreSQL'].map(tech => (
                                        <span key={tech} className="px-3 py-1.5 bg-[#F1EFE6] dark:bg-white/[0.06] text-[#6B6B73] dark:text-[#EAEAE8] rounded-lg text-xs font-semibold">{tech}</span>
                                    ))}
                                </div>
                            </div>
                        </motion.section>
                    </div>
                </div>
            </div>
        </div>
    );
}
