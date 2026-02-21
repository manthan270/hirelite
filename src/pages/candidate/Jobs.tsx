import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useJobStore } from '@/store/useJobStore';

const PAGE_SIZE = 4;

function parseSalaryRange(salary: string): { min: number, max: number } {
    const values = salary.match(/\d+/g)?.map(Number) ?? [];
    if (values.length === 0) return { min: 0, max: 0 };
    if (values.length === 1) return { min: values[0], max: values[0] };
    return { min: Math.min(...values), max: Math.max(...values) };
}

function getMatchScore(seed: string) {
    return 80 + (seed.length % 20);
}

export function Jobs() {
    const { jobs, search, setSearch } = useJobStore();

    // Component State
    const [view, setView] = useState<'list' | 'grid'>('list');
    const [currentPage, setCurrentPage] = useState(1);
    const [savedJobIds, setSavedJobIds] = useState<string[]>([]);
    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

    // Search State
    const [roleQuery, setRoleQuery] = useState(search);
    const [locationQuery, setLocationQuery] = useState('');
    const [activeLocationFilter, setActiveLocationFilter] = useState('');

    // Filter State
    const [sortBy, setSortBy] = useState('Most Relevant');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [experienceLevels, setExperienceLevels] = useState<string[]>([]);
    const [selectedSalaryRanges, setSelectedSalaryRanges] = useState<string[]>([]);
    const [salarySliderValue, setSalarySliderValue] = useState(10);

    // Removed useEffect for searchParams

    const filteredJobs = useMemo(() => {
        return jobs.filter(job => {
            // Apply store search query (Role/Keywords)
            if (search && !job.title.toLowerCase().includes(search.toLowerCase()) &&
                !job.company.toLowerCase().includes(search.toLowerCase())) return false;

            // Apply location filter
            if (activeLocationFilter && !job.location.toLowerCase().includes(activeLocationFilter.toLowerCase())) return false;

            // Category Filter (Time)
            if (categoryFilter) {
                const ageHours = (job.title.length * job.company.length) % 720; // Fake age calculation
                if (categoryFilter === 'today' && ageHours > 24) return false;
                if (categoryFilter === 'week' && ageHours > 168) return false;
                if (categoryFilter === 'month' && ageHours > 720) return false;
            }

            // Job Type Filter
            if (selectedTypes.length > 0) {
                const matchesType = selectedTypes.some(type => {
                    if (type.toLowerCase() === 'full-time' && job.type.toLowerCase().includes('full')) return true;
                    if (type.toLowerCase() === 'freelance' && job.type.toLowerCase().includes('contract')) return true;
                    return job.type.toLowerCase() === type.toLowerCase();
                });
                if (!matchesType) return false;
            }

            // Experience Level Filter
            if (experienceLevels.length > 0) {
                const title = job.title.toLowerCase();
                let jobLevel = 'Intermediate';
                if (title.includes('senior') || title.includes('lead') || title.includes('principal') || title.includes('manager')) {
                    jobLevel = 'Expert';
                } else if (title.includes('junior') || title.includes('intern') || title.includes('trainee')) {
                    jobLevel = 'Entry level';
                }
                const match = experienceLevels.some(l => l.toLowerCase() === jobLevel.toLowerCase());
                if (!match) return false;
            }

            // Expected Salary Checkboxes Filter
            const jobSalary = parseSalaryRange(job.salary); // { min, max } in LPA
            if (selectedSalaryRanges.length > 0) {
                const matchesRange = selectedSalaryRanges.some(range => {
                    if (range === 'Under ₹15L' && jobSalary.max < 15) return true;
                    if (range === '₹15L to ₹25L' && jobSalary.max >= 15 && jobSalary.max <= 25) return true;
                    if (range === '₹25L+' && jobSalary.max > 25) return true;
                    if (range === 'Contract' && job.type.toLowerCase() === 'contract') return true;
                    return false;
                });
                if (!matchesRange) return false;
            }

            // Salary Slider filter
            if (jobSalary.max < salarySliderValue) return false;

            return true;
        });
    }, [jobs, search, activeLocationFilter, selectedTypes, experienceLevels, selectedSalaryRanges, salarySliderValue, categoryFilter]);

    const sortedJobs = useMemo(() => {
        const sorted = [...filteredJobs];

        if (sortBy === 'Highest Salary') {
            sorted.sort((a, b) => parseSalaryRange(b.salary).max - parseSalaryRange(a.salary).max);
        } else if (sortBy === 'Newest First') {
            sorted.sort((a, b) => b.id.localeCompare(a.id));
        } else if (sortBy === 'Match Score') {
            sorted.sort((a, b) => getMatchScore(b.id) - getMatchScore(a.id));
        }

        return sorted;
    }, [filteredJobs, sortBy]);

    const totalPages = Math.max(1, Math.ceil(sortedJobs.length / PAGE_SIZE));

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [currentPage, totalPages]);

    const paginatedJobs = useMemo(() => {
        const start = (currentPage - 1) * PAGE_SIZE;
        return sortedJobs.slice(start, start + PAGE_SIZE);
    }, [currentPage, sortedJobs]);

    const pageNumbers = useMemo(() => {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }, [totalPages]);

    const handleTypeToggle = (type: string) => {
        setSelectedTypes((prev) => prev.includes(type) ? prev.filter((item) => item !== type) : [...prev, type]);
        setCurrentPage(1);
    };

    const handleExpToggle = (level: string) => {
        setExperienceLevels((prev) => prev.includes(level) ? prev.filter((item) => item !== level) : [...prev, level]);
        setCurrentPage(1);
    };

    const handleSalaryToggle = (range: string) => {
        setSelectedSalaryRanges((prev) => prev.includes(range) ? prev.filter((item) => item !== range) : [...prev, range]);
        setCurrentPage(1);
    };

    // Removed handleSearchSubmit

    const handleClearAll = () => {
        setRoleQuery('');
        setLocationQuery('');
        setActiveLocationFilter('');
        setSearch('');
        setSelectedTypes([]);
        setExperienceLevels([]);
        setSelectedSalaryRanges([]);
        setSalarySliderValue(10);
        setCategoryFilter('');
        setCurrentPage(1);
    };

    const handleSearch = () => {
        setSearch(roleQuery);
        setActiveLocationFilter(locationQuery);
        setCurrentPage(1);
    };

    const handleSaveToggle = (jobId: string) => {
        setSavedJobIds((prev) => {
            const alreadySaved = prev.includes(jobId);
            const next = alreadySaved ? prev.filter((id) => id !== jobId) : [...prev, jobId];
            toast.success(alreadySaved ? 'Removed from saved jobs.' : 'Job saved successfully.');
            return next;
        });
    };

    const filterOptions = (
        <>
            {/* Category */}
            <div className="space-y-3 mb-6">
                <h3 className="text-[14.5px] font-bold text-slate-800 dark:text-slate-200 transition-colors">Category</h3>
                <div className="relative">
                    <select
                        className="w-full bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-[14px] px-4 py-3 outline-none cursor-pointer pr-10 hover:border-[#4F46E5]/40 focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] shadow-sm transition-all appearance-none"
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                    >
                        <option value="">Anytime</option>
                        <option value="today">Past 24 hours</option>
                        <option value="week">Past week</option>
                        <option value="month">Past month</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-[20px]">expand_more</span>
                </div>
            </div>

            {/* Job Type */}
            <div className="space-y-3 mb-6">
                <h3 className="text-[14.5px] font-bold text-slate-800 dark:text-slate-200">Job Type</h3>
                <div className="border border-slate-200/80 dark:border-slate-700/80 bg-slate-50/50 dark:bg-slate-900/30 rounded-xl p-4 shadow-inner">
                    <div className="grid grid-cols-2 gap-y-4 gap-x-2">
                        {['Full-time', 'Internship', 'Freelance', 'Volunteer'].map(type => {
                            const isSelected = selectedTypes.includes(type);
                            return (
                                <label key={type} className="flex items-center gap-2 cursor-pointer group">
                                    <div className={`w-[17px] h-[17px] shrink-0 flex items-center justify-center rounded-[4px] shadow-sm transition-all duration-200 ${isSelected ? 'bg-[#3b82f6] border-[#3b82f6] scale-105' : 'border-slate-300 dark:border-slate-600 border bg-white dark:bg-slate-900 group-hover:border-[#3b82f6] dark:group-hover:border-[#3b82f6]'}`}>
                                        {isSelected && <span className="material-symbols-outlined text-white text-[13px] font-bold" style={{ fontVariationSettings: "'wght' 700" }}>check</span>}
                                    </div>
                                    <span className="text-[13px] text-slate-600 dark:text-slate-300 truncate pt-[1px]">{type}</span>
                                    <input type="checkbox" checked={isSelected} onChange={() => handleTypeToggle(type)} className="hidden" />
                                </label>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Experience level */}
            <div className="space-y-3 mb-6">
                <h3 className="text-[14.5px] font-bold text-slate-800 dark:text-slate-200">Experience level</h3>
                <div className="border border-slate-200/80 dark:border-slate-700/80 bg-slate-50/50 dark:bg-slate-900/30 rounded-xl p-4 shadow-inner">
                    <div className="grid grid-cols-2 gap-y-4 gap-x-2">
                        {['Entry level', 'Intermediate', 'Expert'].map(level => {
                            const isSelected = experienceLevels.includes(level);
                            return (
                                <label key={level} className="flex items-center gap-2 cursor-pointer group">
                                    <div className={`w-[17px] h-[17px] shrink-0 flex items-center justify-center rounded-[4px] shadow-sm transition-all duration-200 ${isSelected ? 'bg-[#3b82f6] border-[#3b82f6] scale-105' : 'border-slate-300 dark:border-slate-600 border bg-white dark:bg-slate-900 group-hover:border-[#3b82f6] dark:group-hover:border-[#3b82f6]'}`}>
                                        {isSelected && <span className="material-symbols-outlined text-white text-[13px] font-bold" style={{ fontVariationSettings: "'wght' 700" }}>check</span>}
                                    </div>
                                    <span className="text-[13px] text-slate-600 dark:text-slate-300 truncate pt-[1px]">{level}</span>
                                    <input type="checkbox" checked={isSelected} onChange={() => handleExpToggle(level)} className="hidden" />
                                </label>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Expected salary */}
            <div className="space-y-3 mb-6">
                <h3 className="text-[14.5px] font-bold text-slate-800 dark:text-slate-200">Expected salary</h3>
                <div className="border border-slate-200/80 dark:border-slate-700/80 bg-slate-50/50 dark:bg-slate-900/30 rounded-xl p-4 shadow-inner">
                    <div className="grid grid-cols-2 gap-y-4 gap-x-2 mb-7">
                        {['Under ₹15L', '₹15L to ₹25L', '₹25L+', 'Contract'].map(sal => {
                            const isSelected = selectedSalaryRanges.includes(sal);
                            return (
                                <label key={sal} className="flex items-center gap-2 cursor-pointer group">
                                    <div className={`w-[17px] h-[17px] shrink-0 flex items-center justify-center rounded-[4px] shadow-sm transition-all duration-200 ${isSelected ? 'bg-[#3b82f6] border-[#3b82f6] scale-105' : 'border-slate-300 dark:border-slate-600 border bg-white dark:bg-slate-900 group-hover:border-[#3b82f6] dark:group-hover:border-[#3b82f6]'}`}>
                                        {isSelected && <span className="material-symbols-outlined text-white text-[13px] font-bold" style={{ fontVariationSettings: "'wght' 700" }}>check</span>}
                                    </div>
                                    <span className="text-[13px] text-slate-600 dark:text-slate-300 truncate pt-[1px]">{sal}</span>
                                    <input type="checkbox" checked={isSelected} onChange={() => handleSalaryToggle(sal)} className="hidden" />
                                </label>
                            );
                        })}
                    </div>

                    {/* Range Slider */}
                    <div className="pt-2 pb-2 relative px-1">
                        <div className="h-[5px] bg-slate-200 dark:bg-slate-700 rounded-full w-full"></div>
                        <div className="h-[5px] bg-[#3b82f6] rounded-full absolute top-2.5 pointer-events-none" style={{ left: '0%', right: `${100 - ((salarySliderValue - 5) / 45 * 100)}%` }}></div>
                        <input
                            type="range"
                            min={5}
                            max={50}
                            step={1}
                            value={salarySliderValue}
                            onChange={(e) => {
                                setSalarySliderValue(Number(e.target.value));
                                setCurrentPage(1);
                            }}
                            className="absolute top-1/2 -translate-y-1/2 w-full h-[5px] appearance-none bg-transparent cursor-pointer rounded-full outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:bg-[#3b82f6] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white dark:[&::-webkit-slider-thumb]:border-slate-800 [&::-webkit-slider-thumb]:shadow-[0_0_0_1px_rgba(59,130,246,0.3)]"
                        />
                        <div className="absolute top-5 left-0 w-full pointer-events-none">
                            <div className="relative w-full h-full">
                                <div className="absolute -ml-3 left-0 transition-all" style={{ left: `${((salarySliderValue - 5) / 45 * 100)}%` }}>
                                    <div className="bg-[#3b82f6] text-white text-[11px] font-medium px-2 py-0.5 rounded-[4px] relative inline-block mt-1 min-w-[34px] text-center">
                                        <div className="absolute -top-[3px] left-1/2 -translate-x-1/2 w-2 h-2 bg-[#3b82f6] rotate-45 rounded-[1px]"></div>
                                        <span className="relative z-10">₹{salarySliderValue}L</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between items-center text-[12px] text-slate-500 dark:text-slate-400 mt-7 px-0">
                            <span>₹5L</span>
                            <span>₹50L</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

    return (
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 bg-[#F8FAFC] dark:bg-slate-900 min-h-screen font-sans text-slate-900 dark:text-slate-100 transition-colors">
            {/* Removed Breadcrumbs */}
            {/* Removed old header search */}

            {/* New Dual-Field Search Card */}
            <div className="bg-white/90 backdrop-blur-xl dark:bg-slate-800/90 rounded-2xl border border-slate-200/60 dark:border-slate-700/50 shadow-sm hover:shadow-md p-6 mb-8 mt-2 transition-all duration-300">
                <div className="flex flex-col lg:flex-row gap-4">
                    {/* Job Role Input */}
                    <div className="flex-1 relative">
                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                        <input
                            type="text"
                            placeholder="Job title, keywords, or company"
                            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50 pl-11 pr-4 py-3.5 text-[15px] focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] transition-colors placeholder:text-slate-400 dark:placeholder:text-slate-500 text-slate-900 dark:text-slate-100"
                            value={roleQuery}
                            onChange={(e) => setRoleQuery(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        />
                    </div>

                    {/* Location Input */}
                    <div className="flex-1 relative">
                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">location_on</span>
                        <input
                            type="text"
                            placeholder="City, state, or zip code"
                            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50 pl-11 pr-4 py-3.5 text-[15px] focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] transition-colors placeholder:text-slate-400 dark:placeholder:text-slate-500 text-slate-900 dark:text-slate-100"
                            value={locationQuery}
                            onChange={(e) => setLocationQuery(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        />
                    </div>

                    {/* Search Button */}
                    <button
                        type="button"
                        onClick={handleSearch}
                        className="px-8 py-3.5 rounded-xl bg-[#4F46E5] text-white font-bold text-[15px] hover:bg-indigo-700 transition-colors shadow-sm flex items-center justify-center gap-2 whitespace-nowrap"
                    >
                        Search Jobs
                    </button>
                </div>
            </div>

            {/* Mobile Filters Button */}
            <div className="lg:hidden mb-6">
                <button
                    onClick={() => setIsMobileFiltersOpen(true)}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/90 text-slate-700 dark:text-slate-200 font-bold shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                >
                    <span className="material-symbols-outlined text-[20px]">tune</span>
                    Filters
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10 items-start">
                <div className="hidden lg:block w-[280px] shrink-0">
                    <aside className="bg-white/90 backdrop-blur-xl dark:bg-slate-800/90 rounded-[24px] p-6 shadow-sm border border-slate-200/60 dark:border-slate-700 sticky top-28 h-fit transition-colors">
                        {/* Filters Header */}
                        <div className="pb-5 border-b border-slate-100 dark:border-slate-700/70 mb-6 flex items-center justify-between transition-colors">
                            <h2 className="text-[17px] font-bold text-slate-800 dark:text-slate-100 transition-colors">
                                Filter
                            </h2>
                            <button
                                type="button"
                                onClick={handleClearAll}
                                className="text-[13px] font-medium text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                            >
                                Clear all
                            </button>
                        </div>

                        {filterOptions}
                    </aside>
                </div>

                <div className="flex-1 space-y-6">
                    {/* Search Results Header */}
                    <div className="flex items-center justify-between mb-2">
                        <div className="text-[14px] font-medium text-slate-500 dark:text-slate-400">
                            Showing <span className="font-bold text-slate-900 dark:text-slate-100">{filteredJobs.length}</span> results
                            {activeLocationFilter && (
                                <span> near <span className="font-bold text-slate-900 dark:text-slate-100">"{activeLocationFilter}"</span></span>
                            )}
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 shrink-0">
                                <span className="text-[13px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">Sort by:</span>
                                <select
                                    value={sortBy}
                                    onChange={(e) => {
                                        setSortBy(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                    className="bg-transparent text-slate-700 dark:text-slate-200 font-bold text-[13px] outline-none cursor-pointer hover:text-[#4F46E5] dark:hover:text-blue-400 transition-colors appearance-none pr-4 relative"
                                >
                                    <option>Most Relevant</option>
                                    <option>Newest First</option>
                                    <option>Highest Salary</option>
                                    <option>Match Score</option>
                                </select>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mr-2">View:</span>
                                <button
                                    type="button"
                                    onClick={() => setView('grid')}
                                    className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors ${view === 'grid' ? 'bg-[#4F46E5] text-white shadow-sm' : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-600 dark:hover:text-slate-300'}`}
                                    aria-label="Grid view"
                                >
                                    <span className="material-symbols-outlined text-[18px]">grid_view</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setView('list')}
                                    className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors ${view === 'list' ? 'bg-[#4F46E5] text-white shadow-sm' : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-600 dark:hover:text-slate-300'}`}
                                    aria-label="List view"
                                >
                                    <span className="material-symbols-outlined text-[18px]">list</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="min-h-[500px]">
                        {paginatedJobs.length > 0 ? (
                            <div className={view === 'grid' ? 'grid md:grid-cols-2 gap-5' : 'space-y-5'}>
                                {paginatedJobs.map((job) => {
                                    const isSaved = savedJobIds.includes(job.id);
                                    const matchScore = getMatchScore(job.id);

                                    return (
                                        <div key={job.id} className="bg-white/90 backdrop-blur-sm dark:bg-slate-800/90 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 p-6 hover:border-[#4F46E5]/30 dark:hover:border-indigo-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)] transition-all duration-300 group relative">
                                            <div className={`flex flex-col ${view === 'list' ? 'sm:flex-row' : ''} gap-5 sm:gap-6`}>
                                                <div className="flex-shrink-0">
                                                    <div className="w-14 h-14 bg-white/50 dark:bg-slate-800 rounded-[14px] flex items-center justify-center text-xl font-bold text-slate-400 dark:text-slate-500 shadow-sm border border-slate-100 dark:border-slate-700/50 group-hover:scale-105 group-hover:shadow-md group-hover:border-indigo-100 dark:group-hover:border-indigo-500/30 transition-all duration-300">
                                                        {job.company.charAt(0)}
                                                    </div>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className={`flex flex-col ${view === 'list' ? 'sm:flex-row sm:items-start' : ''} justify-between gap-3 mb-1`}>
                                                        <div>
                                                            <h3 className="text-[17px] font-bold text-slate-900 dark:text-slate-100 group-hover:text-[#4F46E5] dark:group-hover:text-blue-400 transition-colors truncate">
                                                                <Link to={`/jobs/${job.id}`}>{job.title}</Link>
                                                            </h3>
                                                            <div className="flex flex-wrap items-center gap-2 text-[13px] text-slate-500 dark:text-slate-400 font-medium mt-1 tracking-tight">
                                                                <span className="text-slate-700 dark:text-slate-300">{job.company}</span> &bull; {job.location}
                                                                {job.verified && (
                                                                    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold tracking-wide uppercase bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 ml-1">
                                                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5"></span> Verified
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-col sm:items-end">
                                                            <div className="inline-flex items-center gap-1.5 bg-[#EEF2FF] dark:bg-indigo-900/30 text-[#4F46E5] dark:text-indigo-400 px-3 py-1.5 rounded-full transition-colors">
                                                                <span className="material-symbols-outlined text-[14px]">bolt</span>
                                                                <span className="text-[12px] font-bold tracking-wide">{matchScore}% Match</span>
                                                            </div>
                                                            <span className="text-[11px] text-slate-400 dark:text-slate-500 mt-2.5 font-medium tracking-tight">Posted 2 hours ago</span>
                                                        </div>
                                                    </div>

                                                    <div className="mt-6 mb-6">
                                                        <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3 ml-1">Key Responsibilities</h4>
                                                        <ul className={`grid grid-cols-1 ${view === 'list' ? 'sm:grid-cols-2' : ''} gap-x-6 gap-y-2 text-[13px] text-slate-600 dark:text-slate-300 font-medium`}>
                                                            <li className="flex items-start gap-2.5"><span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600 mt-2 shrink-0"></span> <span className="leading-snug">Lead complex design systems</span></li>
                                                            <li className="flex items-start gap-2.5"><span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600 mt-2 shrink-0"></span> <span className="leading-snug">Mentor junior design team members</span></li>
                                                            <li className="flex items-start gap-2.5"><span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600 mt-2 shrink-0"></span> <span className="leading-snug">Collaborate with cross-functional leads</span></li>
                                                            <li className="flex items-start gap-2.5"><span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600 mt-2 shrink-0"></span> <span className="leading-snug">Drive UI/UX strategy across mobile</span></li>
                                                        </ul>
                                                    </div>

                                                    <div className="flex flex-wrap items-center justify-between gap-4">
                                                        <div className="flex flex-wrap items-center gap-2">
                                                            <span className="px-3 py-1 bg-white dark:bg-slate-700/50 border border-slate-200/60 dark:border-transparent rounded-md text-[11px] font-bold text-slate-600 dark:text-slate-300 shadow-sm hover:border-slate-300 transition-colors">Figma</span>
                                                            <span className="px-3 py-1 bg-white dark:bg-slate-700/50 border border-slate-200/60 dark:border-transparent rounded-md text-[11px] font-bold text-slate-600 dark:text-slate-300 shadow-sm hover:border-slate-300 transition-colors">Prototyping</span>
                                                            <span className="px-3 py-1 bg-white dark:bg-slate-700/50 border border-slate-200/60 dark:border-transparent rounded-md text-[11px] font-bold text-slate-600 dark:text-slate-300 shadow-sm hover:border-slate-300 transition-colors">System Design</span>
                                                            <span className="pl-3 text-[#4F46E5] dark:text-blue-400 text-[12px] font-black tracking-tight">{job.salary} / yr</span>
                                                        </div>
                                                        <div className="flex items-center gap-3">
                                                            <button
                                                                type="button"
                                                                onClick={() => handleSaveToggle(job.id)}
                                                                className={`p-2 rounded-lg transition-colors ${isSaved ? 'text-[#4F46E5] dark:text-blue-400 bg-[#EEF2FF] dark:bg-indigo-900/40' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
                                                                aria-label={isSaved ? 'Remove saved job' : 'Save job'}
                                                            >
                                                                <span className="material-symbols-outlined text-[20px] block">{isSaved ? 'bookmark_added' : 'bookmark'}</span>
                                                            </button>
                                                            <Link to={`/jobs/${job.id}`} className="bg-[#4F46E5] hover:bg-indigo-700 text-white px-6 py-2.5 rounded-[10px] text-[13px] font-bold transition-all shadow-sm">
                                                                Quick Apply
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center text-center py-24 min-h-[600px] h-full bg-white/50 backdrop-blur-sm dark:bg-slate-800/50 rounded-3xl border border-slate-200/50 dark:border-slate-700/50 shadow-sm">
                                <div className="max-w-md mx-auto">
                                    <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center justify-center mb-6 mx-auto rotate-3 hover:rotate-6 transition-transform">
                                        <span className="material-symbols-outlined text-slate-400 dark:text-slate-500 text-3xl">search_off</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">No matching jobs found</h3>
                                    <p className="text-[13px] text-slate-500 dark:text-slate-400 font-medium max-w-sm mx-auto mb-6">Try adjusting your search terms or clearing your filters to see more results.</p>
                                    <button
                                        type="button"
                                        className="h-[46px] px-6 bg-[#3b82f6] hover:bg-blue-600 text-white rounded-xl text-[14px] font-bold transition-colors shadow-sm inline-flex items-center justify-center min-w-[160px]"
                                        onClick={handleClearAll}
                                    >
                                        Clear all filters
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center justify-between pt-10 mt-6 relative before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-slate-200 dark:before:via-slate-700 before:to-transparent">
                        <button
                            type="button"
                            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-[10px] text-[13px] font-bold text-slate-600 dark:text-slate-300 hover:text-[#4F46E5] dark:hover:text-blue-400 hover:border-[#4F46E5]/30 hover:shadow-sm transition-all disabled:opacity-50 disabled:hover:border-slate-200 dark:disabled:hover:border-slate-700 disabled:hover:shadow-none"
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage((prev) => prev - 1)}
                        >
                            <span className="material-symbols-outlined text-[18px]">west</span> Previous
                        </button>
                        <div className="flex items-center gap-2">
                            {pageNumbers.map((page) => (
                                <button
                                    key={page}
                                    type="button"
                                    onClick={() => setCurrentPage(page)}
                                    className={`w-9 h-9 rounded-[10px] text-[13px] font-bold transition-all border ${page === currentPage ? 'bg-[#4F46E5] text-white border-[#4F46E5] shadow-[0_4px_12px_rgba(79,70,229,0.25)] scale-105' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700/50 shadow-sm'}`}
                                >
                                    {page}
                                </button>
                            ))}
                        </div>
                        <button
                            type="button"
                            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-[10px] text-[13px] font-bold text-slate-600 dark:text-slate-300 hover:text-[#4F46E5] dark:hover:text-blue-400 hover:border-[#4F46E5]/30 hover:shadow-sm transition-all disabled:opacity-50 disabled:hover:border-slate-200 dark:disabled:hover:border-slate-700 disabled:hover:shadow-none"
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage((prev) => prev + 1)}
                        >
                            Next <span className="material-symbols-outlined text-[18px]">east</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Filter Modal */}
            {isMobileFiltersOpen && (
                <div
                    className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px] transition-opacity lg:hidden"
                    onClick={() => setIsMobileFiltersOpen(false)}
                >
                    <div
                        className="absolute bottom-0 w-full bg-white dark:bg-slate-900 rounded-t-3xl p-6 max-h-[85vh] overflow-y-auto shadow-2xl flex flex-col transition-transform transform translate-y-0"
                        onClick={(e) => e.stopPropagation()}
                        style={{ maxHeight: '85vh' }}
                    >
                        <div className="flex justify-between items-center mb-6 py-2 border-b border-slate-100 dark:border-slate-800">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Filters</h2>
                            <button
                                onClick={() => setIsMobileFiltersOpen(false)}
                                className="text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full w-8 h-8 flex items-center justify-center transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                            >
                                <span className="material-symbols-outlined text-[20px]">close</span>
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                            {filterOptions}
                        </div>

                        <div className="flex gap-4 mt-6 pt-6 border-t border-slate-200 dark:border-slate-800 pb-2">
                            <button
                                onClick={() => { handleClearAll(); setIsMobileFiltersOpen(false); }}
                                className="flex-1 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                            >
                                Clear All
                            </button>
                            <button
                                onClick={() => setIsMobileFiltersOpen(false)}
                                className="flex-1 py-3.5 rounded-xl bg-[#4F46E5] text-white font-bold hover:bg-indigo-700 shadow-sm transition-colors"
                            >
                                Apply Filters
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
