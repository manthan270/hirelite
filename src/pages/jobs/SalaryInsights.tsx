import { useState } from 'react';
import { Briefcase, Building2, MapPin, Search, TrendingUp } from 'lucide-react';

const MARKET_DATA = [
    { id: 1, role: 'Senior Software Engineer', location: 'Bangalore, KA', avg: 2800000, min: 2000000, max: 3500000 },
    { id: 2, role: 'Product Designer', location: 'Remote (India)', avg: 2200000, min: 1500000, max: 2800000 },
    { id: 3, role: 'Product Manager', location: 'Mumbai, MH', avg: 2500000, min: 1800000, max: 3200000 },
    { id: 4, role: 'Data Scientist', location: 'Hyderabad, TS', avg: 2400000, min: 1600000, max: 3000000 },
    { id: 5, role: 'DevOps Engineer', location: 'Pune, MH', avg: 2000000, min: 1400000, max: 2600000 },
    { id: 6, role: 'Frontend Developer', location: 'Gurgaon, HR', avg: 1800000, min: 1200000, max: 2200000 },
];

const formatCurrency = (value: number) => {
    const lakhs = value / 100000;
    return `₹${Number.isInteger(lakhs) ? lakhs.toFixed(0) : lakhs.toFixed(1)}L`;
};

export default function SalaryInsights() {
    const [searchTerm, setSearchTerm] = useState('');
    const query = searchTerm.trim().toLowerCase();
    const filteredData = MARKET_DATA.filter(({ role, location }) =>
        role.toLowerCase().includes(query) || location.toLowerCase().includes(query),
    );

    return (
        <main className="flex-1 bg-[#F8F6EE] px-4 py-8 text-[#1A211D] transition-colors dark:bg-[#101310] dark:text-[#EAEAE8] sm:px-6 sm:py-10 lg:px-8">
            <div className="mx-auto max-w-6xl space-y-7 sm:space-y-8">
                <header className="flex flex-col gap-5 border-b border-black/[0.08] pb-6 dark:border-white/[0.09] xl:flex-row xl:items-end xl:justify-between xl:gap-8">
                    <div className="max-w-2xl">
                        <div className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                            <TrendingUp aria-hidden="true" className="h-4 w-4" />
                            Sample market data
                        </div>
                        <h1 className="editorial-headline text-3xl font-bold text-[#1A211D] dark:text-white sm:text-4xl">
                            Tech industry salary insights
                        </h1>
                        <p className="mt-3 max-w-xl text-sm leading-6 text-[#62626B] dark:text-[#B5B5BD] sm:text-base">
                            Compare illustrative annual salary ranges by role and location. These examples are demo data, not live or verified market figures.
                        </p>
                    </div>

                    <div className="w-full md:max-w-md xl:max-w-[22rem] xl:shrink-0">
                        <label htmlFor="salary-search" className="mb-1.5 block text-xs font-semibold text-[#62626B] dark:text-[#B5B5BD]">
                            Search roles or locations
                        </label>
                        <div className="relative">
                            <Search aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#777B83] dark:text-[#A5AAA7]" />
                            <input
                                id="salary-search"
                                type="search"
                                value={searchTerm}
                                onChange={(event) => setSearchTerm(event.target.value)}
                                placeholder="e.g. Product Manager, Mumbai"
                                className="h-11 w-full rounded-xl border border-black/[0.1] bg-white pl-12 pr-4 text-sm text-[#1A211D] shadow-sm outline-none transition placeholder:text-[#92949A] focus:border-primary focus:ring-2 focus:ring-primary/15 dark:border-white/[0.12] dark:bg-[#171B18] dark:text-white dark:placeholder:text-[#8A8A90]"
                            />
                        </div>
                    </div>
                </header>

                <section aria-label="Salary data summary" className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <div className="flex items-center gap-3 rounded-xl border border-black/[0.07] bg-white p-4 shadow-sm dark:border-white/[0.09] dark:bg-[#171B18]">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/[0.09] text-primary dark:bg-primary/15 dark:text-[#8BC6B9]"><Briefcase aria-hidden="true" className="h-[18px] w-[18px]" /></span>
                        <div><p className="text-lg font-semibold leading-5 tabular-nums">{MARKET_DATA.length}</p><p className="mt-1 text-xs text-[#6B6B73] dark:text-[#A5AAA7]">Sample roles</p></div>
                    </div>
                    <div className="flex items-center gap-3 rounded-xl border border-black/[0.07] bg-white p-4 shadow-sm dark:border-white/[0.09] dark:bg-[#171B18]">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/[0.09] text-primary dark:bg-primary/15 dark:text-[#8BC6B9]"><TrendingUp aria-hidden="true" className="h-[18px] w-[18px]" /></span>
                        <div><p className="text-lg font-semibold leading-5">Illustrative</p><p className="mt-1 text-xs text-[#6B6B73] dark:text-[#A5AAA7]">Not live or verified</p></div>
                    </div>
                    <div className="flex items-center gap-3 rounded-xl border border-black/[0.07] bg-white p-4 shadow-sm dark:border-white/[0.09] dark:bg-[#171B18]">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/[0.09] text-primary dark:bg-primary/15 dark:text-[#8BC6B9]"><Building2 aria-hidden="true" className="h-[18px] w-[18px]" /></span>
                        <div><p className="text-lg font-semibold leading-5 tabular-nums">₹12L–₹35L</p><p className="mt-1 text-xs text-[#6B6B73] dark:text-[#A5AAA7]">Example salary range</p></div>
                    </div>
                </section>

                <section aria-labelledby="salary-examples-heading">
                    <div className="mb-4 flex items-end justify-between gap-4">
                        <div>
                            <h2 id="salary-examples-heading" className="text-xl font-semibold text-[#1A211D] dark:text-white">Salary examples</h2>
                            <p className="mt-1 text-sm text-[#6B6B73] dark:text-[#A5AAA7]">Annual compensation shown in Indian rupees.</p>
                        </div>
                        <span aria-live="polite" className="shrink-0 text-sm text-[#6B6B73] dark:text-[#A5AAA7]">
                            {filteredData.length} {filteredData.length === 1 ? 'role' : 'roles'}
                        </span>
                    </div>

                    {filteredData.length > 0 ? (
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {filteredData.map(({ id, role, location, avg, min, max }) => {
                                const averagePosition = ((avg - min) / (max - min)) * 100;
                                return (
                                    <article key={id} className="flex min-h-[206px] flex-col rounded-xl border border-black/[0.08] bg-white p-5 shadow-sm transition-colors hover:border-primary/25 dark:border-white/[0.09] dark:bg-[#171B18] dark:hover:border-primary/40">
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="min-w-0">
                                                <h3 className="text-base font-semibold leading-snug text-[#1A211D] dark:text-white">{role}</h3>
                                                <p className="mt-1.5 flex items-center gap-1.5 text-sm text-[#6B6B73] dark:text-[#A5AAA7]">
                                                    <MapPin aria-hidden="true" className="h-4 w-4 shrink-0 text-primary" />
                                                    {location}
                                                </p>
                                            </div>
                                            <span className="shrink-0 rounded-md bg-primary/[0.08] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-primary dark:bg-primary/15 dark:text-[#A8D9CE]">Sample</span>
                                        </div>

                                        <div className="mt-auto pt-6">
                                            <div className="mb-2 flex items-end justify-between gap-3">
                                                <div>
                                                    <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-[#777B83] dark:text-[#A5AAA7]">Average annual salary</p>
                                                    <p className="mt-0.5 text-2xl font-semibold tracking-tight text-primary tabular-nums dark:text-[#8BC6B9]">{formatCurrency(avg)} <span className="text-xs font-medium tracking-normal text-[#777B83] dark:text-[#A5AAA7]">/ yr</span></p>
                                                </div>
                                            </div>
                                            <div role="img" aria-label={`Example salary range ${formatCurrency(min)} to ${formatCurrency(max)}, average ${formatCurrency(avg)}`} className="salary-range-track mt-3">
                                                <span aria-hidden="true" style={{ width: `${averagePosition}%` }} />
                                            </div>
                                            <div className="mt-2 flex justify-between text-xs font-medium text-[#777B83] tabular-nums dark:text-[#A5AAA7]">
                                                <span>{formatCurrency(min)}</span><span>{formatCurrency(max)}</span>
                                            </div>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="rounded-xl border border-dashed border-black/[0.16] bg-white/70 px-5 py-12 text-center dark:border-white/[0.16] dark:bg-[#171B18]/70">
                            <Search aria-hidden="true" className="mx-auto h-5 w-5 text-[#777B83] dark:text-[#A5AAA7]" />
                            <h3 className="mt-3 text-base font-semibold">No matching salary examples</h3>
                            <p className="mt-1 text-sm text-[#6B6B73] dark:text-[#A5AAA7]">Try another role title or location.</p>
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
}
