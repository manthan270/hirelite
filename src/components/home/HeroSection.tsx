import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Briefcase, IndianRupee, ListFilter, MapPin, Search } from 'lucide-react';
import { mockJobs } from '@/lib/mockJobs';
import { formatSalary } from '@/lib/constants';

const QUICK_SEARCHES = ['Frontend', 'Product', 'Data Scientist'];

export function HeroSection() {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState('');
    const [location, setLocation] = useState('');

    const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const params = new URLSearchParams();
        if (keyword.trim()) params.set('q', keyword.trim());
        if (location.trim()) params.set('location', location.trim());
        const query = params.toString();
        navigate(query ? `/jobs?${query}` : '/jobs');
    };

    const searchFor = (term: string) => navigate(`/jobs?q=${encodeURIComponent(term)}`);

    return (
        <section className="relative isolate overflow-hidden bg-[#F8F6EE] dark:bg-[#101310] transition-colors duration-300">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-80 dark:opacity-100"
                style={{
                    backgroundImage: `
                        radial-gradient(ellipse at 12% 8%, rgba(31,118,106,0.12), transparent 36%),
                        radial-gradient(ellipse at 88% 72%, rgba(61,170,143,0.08), transparent 32%)
                    `,
                }}
            />

            <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
                <div className="grid items-center gap-8 sm:gap-10 lg:grid-cols-[1.04fr_0.96fr] lg:items-start lg:gap-16">
                    <motion.div
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, ease: 'easeOut' }}
                        className="max-w-2xl"
                    >
                        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white/70 px-3.5 py-1.5 text-xs font-semibold text-primary shadow-sm dark:border-primary/25 dark:bg-white/[0.04] dark:text-[#B7DED5]">
                            <Search className="h-3.5 w-3.5" aria-hidden="true" />
                            A clearer way to explore your next role
                        </div>

                        <h1 className="editorial-headline max-w-xl text-4xl font-bold tracking-tight text-[#1A211D] dark:text-white sm:text-5xl lg:text-[3.65rem]">
                            Find your next role with{' '}
                            <span className="text-[#1F766A] dark:text-[#A8D9CE]">
                                more clarity.
                            </span>
                        </h1>
                        <p className="mt-5 max-w-xl text-base leading-7 text-[#62626B] dark:text-[#AAAAB2] sm:text-lg">
                            Explore sample openings, compare salary ranges, and see how the search experience works.
                        </p>

                        <form
                            onSubmit={handleSearchSubmit}
                            role="search"
                            aria-label="Search sample jobs"
                            className="glass-card mt-8 grid gap-0 bg-white/75 p-2.5 backdrop-blur-xl dark:bg-[#171B18]/80 md:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)_auto] md:items-center md:p-3"
                        >
                            <div className="min-w-0 px-3 py-1.5 md:px-4">
                                <label htmlFor="hero-search-keyword" className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6B6B73] dark:text-[#A0A0A8]">
                                    Role or skill
                                </label>
                                <div className="flex items-center gap-2.5 border-b border-transparent transition-colors focus-within:border-primary/50 dark:focus-within:border-[#A8D9CE]/50">
                                    <Search className="h-4 w-4 shrink-0 text-primary dark:text-[#8BC6B9]" aria-hidden="true" />
                                    <input
                                        id="hero-search-keyword"
                                        className="h-9 w-full min-w-0 border-0 bg-transparent p-0 text-sm text-[#1A211D] !outline-none placeholder:text-[#8A8A90] focus:ring-0 focus-visible:!outline-none focus-visible:ring-0 dark:text-white"
                                        placeholder="e.g. Designer"
                                        type="search"
                                        value={keyword}
                                        onChange={(event) => setKeyword(event.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="min-w-0 border-t border-black/[0.06] px-3 py-3 dark:border-white/[0.08] md:border-l md:border-t-0 md:px-4 md:py-1.5">
                                <label htmlFor="hero-search-location" className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6B6B73] dark:text-[#A0A0A8]">
                                    Location
                                </label>
                                <div className="flex items-center gap-2.5 border-b border-transparent transition-colors focus-within:border-primary/50 dark:focus-within:border-[#A8D9CE]/50">
                                    <MapPin className="h-4 w-4 shrink-0 text-primary dark:text-[#8BC6B9]" aria-hidden="true" />
                                    <input
                                        id="hero-search-location"
                                        className="h-9 w-full min-w-0 border-0 bg-transparent p-0 text-sm text-[#1A211D] !outline-none placeholder:text-[#8A8A90] focus:ring-0 focus-visible:!outline-none focus-visible:ring-0 dark:text-white"
                                        placeholder="City or remote"
                                        type="text"
                                        value={location}
                                        onChange={(event) => setLocation(event.target.value)}
                                    />
                                </div>
                            </div>

                            <button
                                id="hero-search-submit"
                                type="submit"
                                className="gradient-cta inline-flex h-12 items-center justify-center gap-2 rounded-xl px-5 text-sm font-semibold text-white shadow-[0_5px_16px_rgba(31,118,106,0.25)] transition hover:-translate-y-0.5 hover:shadow-[0_8px_22px_rgba(31,118,106,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#171B18]"
                            >
                                <Search className="h-4 w-4" aria-hidden="true" />
                                Search roles
                            </button>
                        </form>

                        <div className="mt-4 flex flex-wrap items-center gap-2" aria-label="Quick searches">
                            <span className="mr-1 text-xs font-medium text-[#6B6B73] dark:text-[#A0A0A8]">Try:</span>
                            {QUICK_SEARCHES.map((term) => (
                                <button
                                    key={term}
                                    type="button"
                                    onClick={() => searchFor(term)}
                                    className="rounded-full border border-black/[0.07] bg-white/65 px-3 py-1.5 text-xs font-medium text-[#555560] transition hover:border-primary/30 hover:bg-primary/[0.06] hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:border-white/[0.09] dark:bg-white/[0.04] dark:text-[#C4C4CB] dark:hover:bg-primary/10 dark:hover:text-[#B7DED5]"
                                >
                                    {term}
                                </button>
                            ))}
                        </div>

                        <p className="mt-6 flex items-center gap-2 text-xs text-[#6B6B73] dark:text-[#A0A0A8]">
                            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" aria-hidden="true" />
                            Preview experience · listings and salary details are sample data
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.08, ease: 'easeOut' }}
                        className="relative mx-auto w-full max-w-xl"
                    >
                        <div className="glass-card relative overflow-hidden rounded-[1.5rem] shadow-[0_24px_64px_-42px_rgba(20,20,35,0.35)]">
                            <div className="relative h-40 overflow-hidden sm:h-44">
                                <img
                                    src="/hirelite-workplace-hero.png"
                                    alt="Two colleagues reviewing a laptop in a bright collaborative workspace"
                                    className="absolute inset-0 h-full w-full object-cover object-center"
                                    loading="eager"
                                    decoding="async"
                                />
                                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#101310]/95 via-[#101310]/30 to-[#101310]/5" />
                                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 sm:p-5">
                                    <div>
                                        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/80">Role spotlight</p>
                                        <h2 className="mt-1 text-lg font-semibold tracking-tight text-white sm:text-xl">A few roles to explore</h2>
                                    </div>
                                    <span className="shrink-0 rounded-full border border-white/25 bg-[#101310]/45 px-3 py-1.5 text-[11px] font-semibold text-white shadow-sm backdrop-blur-md">
                                        {mockJobs.length} sample roles
                                    </span>
                                </div>
                            </div>

                            <div className="px-4 pb-4 pt-3 sm:px-5 sm:pb-5">
                                <div className="space-y-2.5">
                                    {mockJobs.slice(0, 2).map((job) => (
                                        <Link
                                            key={job.id}
                                            to={`/jobs/${job.id}`}
                                            className="group flex min-h-[5.5rem] items-center gap-3 rounded-xl border border-black/[0.07] bg-white p-3.5 transition duration-200 hover:border-primary/30 hover:bg-primary/[0.02] hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:border-white/[0.08] dark:bg-white/[0.025] dark:hover:border-primary/35 dark:hover:bg-white/[0.045] sm:gap-4 sm:p-4"
                                        >
                                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-primary/10 bg-primary/[0.06] text-sm font-bold text-primary dark:border-[#A8D9CE]/15 dark:bg-[#A8D9CE]/[0.08] dark:text-[#B7DED5]">
                                                {job.company.charAt(0)}
                                            </span>
                                            <span className="min-w-0 flex-1">
                                                <span className="mb-1 block min-w-0">
                                                    <span className="block truncate text-sm font-semibold text-[#1A211D] transition-colors group-hover:text-primary dark:text-white dark:group-hover:text-[#B7DED5]">{job.title}</span>
                                                </span>
                                                <span className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#6B6B73] dark:text-[#A0A0A8]">
                                                    <span className="truncate">{job.company}</span>
                                                    <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" aria-hidden="true" />{job.location}</span>
                                                </span>
                                                <span className="mt-1 block text-[11px] font-semibold text-[#32323A] dark:text-[#E7E7EA] sm:hidden">{formatSalary(job.salary)}</span>
                                            </span>
                                            <span className="hidden shrink-0 text-right sm:block">
                                                <span className="block text-xs font-semibold text-[#32323A] dark:text-[#E7E7EA]">{formatSalary(job.salary)}</span>
                                                <span className="mt-1 block text-[11px] text-[#6B6B73] dark:text-[#A0A0A8]">{job.type}</span>
                                            </span>
                                            <ArrowRight className="h-4 w-4 shrink-0 text-[#8A8A90] transition group-hover:translate-x-0.5 group-hover:text-primary dark:group-hover:text-[#B7DED5]" aria-hidden="true" />
                                        </Link>
                                    ))}
                                </div>

                                <div className="mt-3 flex items-center justify-between gap-3 border-t border-black/[0.06] pt-3 dark:border-white/[0.08]">
                                    <span className="inline-flex items-center gap-2 text-xs text-[#6B6B73] dark:text-[#A0A0A8]">
                                        <Briefcase className="h-3.5 w-3.5" aria-hidden="true" />
                                        Sample roles · salary and location shown
                                    </span>
                                    <Link to="/jobs" className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-primary transition hover:gap-2 dark:text-[#A8D9CE]">
                                        View all <ArrowRight className="h-4 w-4" aria-hidden="true" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <div className="glass-card mt-10 grid divide-y divide-black/[0.06] overflow-hidden px-4 py-2 dark:divide-white/[0.08] sm:mt-12 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:px-3 sm:py-3">
                    {[
                        { title: `${mockJobs.length} sample roles`, detail: 'Explore the demo listings', Icon: Briefcase },
                        { title: 'Salary ranges shown', detail: 'Compare example compensation', Icon: IndianRupee },
                        { title: 'Search + filters', detail: 'Narrow by role, place, and level', Icon: ListFilter },
                    ].map((item) => (
                        <div key={item.title} className="flex min-h-[4.5rem] items-center gap-3 px-2 py-3 sm:px-4 md:px-5">
                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-primary/10 bg-primary/[0.07] text-primary dark:border-[#A8D9CE]/15 dark:bg-[#A8D9CE]/10 dark:text-[#A8D9CE]">
                                <item.Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                            </span>
                            <div>
                                <p className="text-sm font-semibold leading-5 text-[#32323A] dark:text-[#E7E7EA]">{item.title}</p>
                                <p className="mt-0.5 text-xs leading-5 text-[#6B6B73] dark:text-[#A0A0A8]">{item.detail}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
