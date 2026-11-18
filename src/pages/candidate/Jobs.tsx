import { useState, useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { LayoutList, LayoutGrid, SlidersHorizontal, ArrowUpDown, Search, X } from 'lucide-react';
import { useJobStore } from '@/store/useJobStore';
import { useSavedJobsStore } from '@/store/useSavedJobsStore';
import { useToggleSet } from '@/hooks/useToggleSet';
import { JobSearchBar } from '@/components/jobs/JobSearchBar';
import { JobFilters } from '@/components/jobs/JobFilters';
import { JobListingCard } from '@/components/jobs/JobListingCard';
import { Pagination } from '@/components/jobs/Pagination';
import { Modal } from '@/components/ui/Modal';
import { parseSalaryRange, SORT_OPTIONS, PAGE_SIZE } from '@/lib/constants';
import toast from 'react-hot-toast';

export default function Jobs() {
    const [searchParams] = useSearchParams();
    const jobs = useJobStore((state) => state.jobs);

    // search
    const [search, setSearch] = useState(searchParams.get('q') ?? '');
    const [locationSearch, setLocationSearch] = useState(searchParams.get('location') ?? '');

    // filters
    const { items: selectedTypes, toggle: toggleType, clear: clearTypes } = useToggleSet<string>();
    const { items: selectedExp, toggle: toggleExp, clear: clearExp } = useToggleSet<string>();
    const { items: selectedSalary, toggle: toggleSalary, clear: clearSalary } = useToggleSet<string>();
    const [salarySlider, setSalarySlider] = useState(0);

    // ui
    const [sortBy, setSortBy] = useState<string>(SORT_OPTIONS[0]);
    const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
    const [page, setPage] = useState(1);
    const [showMobileFilters, setShowMobileFilters] = useState(false);

    // saved jobs
    const toggleSave = useSavedJobsStore((state) => state.toggleSave);
    const savedJobIds = useSavedJobsStore((state) => state.savedJobIds);

    const hasActiveFilters = selectedTypes.length > 0 || selectedExp.length > 0 || selectedSalary.length > 0 || salarySlider > 0;

    const clearAllFilters = useCallback(() => {
        clearTypes();
        clearExp();
        clearSalary();
        setSalarySlider(0);
        setPage(1);
    }, [clearTypes, clearExp, clearSalary]);

    const handleTypeToggle = useCallback((type: string) => {
        toggleType(type);
        setPage(1);
    }, [toggleType]);

    const handleExperienceToggle = useCallback((experience: string) => {
        toggleExp(experience);
        setPage(1);
    }, [toggleExp]);

    const handleSalaryToggle = useCallback((salary: string) => {
        toggleSalary(salary);
        setPage(1);
    }, [toggleSalary]);

    const handleSalarySliderChange = useCallback((value: number) => {
        setSalarySlider(value);
        setPage(1);
    }, []);

    const handleSaveToggle = useCallback((jobId: string) => {
        const wasSaved = useSavedJobsStore.getState().savedJobIds.includes(jobId);
        toggleSave(jobId);
        toast.success(wasSaved ? 'Removed from saved jobs.' : 'Job saved!');
    }, [toggleSave]);

    // filter + sort pipeline
    const filteredJobs = useMemo(() => {
        let result = [...jobs];

        const q = search.toLowerCase().trim();
        if (q) {
            const queryTerms = q.split(',').map((term) => term.trim()).filter(Boolean);
            result = result.filter(
                (j) => queryTerms.some((term) =>
                    j.title.toLowerCase().includes(term) || j.company.toLowerCase().includes(term)
                )
            );
        }

        const loc = locationSearch.toLowerCase().trim();
        if (loc) {
            result = result.filter((j) => j.location.toLowerCase().includes(loc));
        }

        if (selectedTypes.length > 0) {
            result = result.filter((j) => selectedTypes.includes(j.type));
        }

        if (selectedExp.length > 0) {
            result = result.filter((j) => selectedExp.includes(j.experienceLevel));
        }

        if (selectedSalary.length > 0) {
            result = result.filter((job) => {
                const salary = parseSalaryRange(job.salary);
                return selectedSalary.some((range) => {
                    if (range === 'Under ₹15L') return salary.min < 15;
                    if (range === '₹15L to ₹25L') return salary.max >= 15 && salary.min <= 25;
                    if (range === '₹25L+') return salary.max >= 25;
                    return false;
                });
            });
        }

        if (salarySlider > 0) {
            result = result.filter((j) => {
                const parsed = parseSalaryRange(j.salary);
                return parsed.max >= salarySlider;
            });
        }

        if (sortBy === 'Role A–Z') {
            result.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortBy === 'Highest Salary') {
            result.sort((a, b) => parseSalaryRange(b.salary).max - parseSalaryRange(a.salary).max);
        }

        return result;
    }, [jobs, search, locationSearch, selectedTypes, selectedExp, selectedSalary, salarySlider, sortBy]);

    const activeFilterCount = selectedTypes.length + selectedExp.length + selectedSalary.length + Number(salarySlider > 0);
    const activeFilters = [
        ...selectedTypes.map((type) => ({ label: type, clear: () => handleTypeToggle(type) })),
        ...selectedExp.map((level) => ({ label: level, clear: () => handleExperienceToggle(level) })),
        ...selectedSalary.map((range) => ({ label: range, clear: () => handleSalaryToggle(range) })),
        ...(salarySlider > 0 ? [{ label: `₹${salarySlider}L+`, clear: () => setSalarySlider(0) }] : []),
    ];

    const totalPages = Math.ceil(filteredJobs.length / PAGE_SIZE);
    const paginatedJobs = filteredJobs.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    return (
        <div className="flex-1 bg-[#F8F6EE] dark:bg-[#101310] transition-colors duration-500">
            {/* search header */}
            <div className="bg-white dark:bg-[#1A211D] border-b border-black/[0.04] dark:border-white/[0.06] transition-colors duration-500">
                <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 sm:py-7 lg:px-8">
                    <h1 className="editorial-headline text-3xl font-bold text-[#1A211D] dark:text-white mb-6">Find your next role</h1>
                    <JobSearchBar
                        search={search}
                        onSearchChange={(v) => { setSearch(v); setPage(1); }}
                        locationSearch={locationSearch}
                        onLocationChange={(v) => { setLocationSearch(v); setPage(1); }}
                    />
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 sm:py-7 lg:px-8">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:gap-6 xl:gap-7">
                    {/* desktop filters */}
                    <div className="hidden shrink-0 lg:block lg:w-64 xl:w-72">
                        <JobFilters
                            selectedTypes={selectedTypes}
                            onTypeToggle={handleTypeToggle}
                            selectedExp={selectedExp}
                            onExpToggle={handleExperienceToggle}
                            selectedSalary={selectedSalary}
                            onSalaryToggle={handleSalaryToggle}
                            salarySlider={salarySlider}
                            onSalarySliderChange={handleSalarySliderChange}
                            onClearAll={clearAllFilters}
                            hasActiveFilters={hasActiveFilters}
                        />
                    </div>

                    {/* main list */}
                    <div className="flex-1 min-w-0">
                        {/* toolbar */}
                        <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                            <div>
                                <p aria-live="polite" className="text-sm font-semibold text-[#1A211D] dark:text-white">
                                    {filteredJobs.length} {filteredJobs.length === 1 ? 'sample role' : 'sample roles'}
                                </p>
                                <p className="mt-0.5 text-xs text-[#6B6B73] dark:text-[#A0A0A8]">Example listings with illustrative details</p>
                            </div>
                            <div className="flex items-center gap-2">
                                {/* mobile filter btn */}
                                <button
                                    type="button"
                                    aria-haspopup="dialog"
                                    aria-expanded={showMobileFilters}
                                    className="flex min-h-11 items-center gap-1.5 rounded-xl border border-black/[0.08] bg-white px-3 py-2 text-sm font-medium text-[#555560] transition-colors hover:bg-[#F1EFE6] dark:border-white/[0.09] dark:bg-[#171B18] dark:text-[#C4C4CB] dark:hover:bg-white/[0.06] lg:hidden"
                                    onClick={() => setShowMobileFilters(true)}
                                >
                                    <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
                                    Filters
                                    {hasActiveFilters && (
                                        <span className="ml-1 w-5 h-5 rounded-full bg-primary text-white text-[11px] font-semibold flex items-center justify-center">
                                            {activeFilterCount}
                                        </span>
                                    )}
                                </button>

                                {/* sort */}
                                <div className="relative">
                                    <select
                                        value={sortBy}
                                        onChange={(e) => { setSortBy(e.target.value); setPage(1); }}
                                        aria-label="Sort job results"
                                        className="min-h-11 appearance-none rounded-xl border border-black/[0.06] bg-white py-2 pl-8 pr-4 text-sm font-medium text-[#6B6B73] transition-colors hover:bg-[#F1EFE6] focus:outline-none focus:ring-2 focus:ring-primary/30 dark:border-white/[0.06] dark:bg-white/[0.04] dark:text-[#8A8A90] dark:hover:bg-white/[0.06]"
                                    >
                                        {SORT_OPTIONS.map((opt) => (
                                            <option key={opt} value={opt}>{opt}</option>
                                        ))}
                                    </select>
                                    <ArrowUpDown aria-hidden="true" className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B6B73]" />
                                </div>

                                {/* view toggle */}
                                <div className="hidden sm:flex border border-black/[0.06] dark:border-white/[0.06] rounded-xl overflow-hidden">
                                    <button
                                        type="button"
                                        onClick={() => setViewMode('list')}
                                        aria-label="List view"
                                        aria-pressed={viewMode === 'list'}
                                        className={`flex h-11 w-11 items-center justify-center transition-colors ${viewMode === 'list' ? 'bg-primary text-white' : 'bg-white text-[#6B6B73] hover:text-[#1A211D] dark:bg-white/[0.04] dark:text-[#8A8A90] dark:hover:text-white'}`}
                                    >
                                        <LayoutList className="h-4 w-4" aria-hidden="true" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setViewMode('grid')}
                                        aria-label="Grid view"
                                        aria-pressed={viewMode === 'grid'}
                                        className={`flex h-11 w-11 items-center justify-center transition-colors ${viewMode === 'grid' ? 'bg-primary text-white' : 'bg-white text-[#6B6B73] hover:text-[#1A211D] dark:bg-white/[0.04] dark:text-[#8A8A90] dark:hover:text-white'}`}
                                    >
                                        <LayoutGrid className="h-4 w-4" aria-hidden="true" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {activeFilters.length > 0 && (
                            <div aria-label="Active filters" className="mb-5 flex flex-wrap items-center gap-2">
                                <span className="mr-1 text-xs font-medium text-[#6B6B73] dark:text-[#A0A0A8]">Filters:</span>
                                {activeFilters.map((filter) => (
                                    <button
                                        key={filter.label}
                                        type="button"
                                        onClick={filter.clear}
                                        aria-label={`Remove ${filter.label} filter`}
                                        className="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-black/[0.08] bg-white px-2.5 text-xs font-medium text-[#45454E] transition-colors hover:border-primary/30 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 dark:border-white/[0.1] dark:bg-[#171B18] dark:text-[#D1D1D7] dark:hover:text-[#B7DED5]"
                                    >
                                        {filter.label}<X className="h-3.5 w-3.5" aria-hidden="true" />
                                    </button>
                                ))}
                                <button
                                    type="button"
                                    onClick={clearAllFilters}
                                    className="min-h-9 rounded-lg px-2 text-xs font-semibold text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 dark:text-[#B7DED5]"
                                >
                                    Clear filters
                                </button>
                            </div>
                        )}

                        {/* cards */}
                        {paginatedJobs.length > 0 ? (
                            <div className={viewMode === 'grid' ? 'grid grid-cols-1 gap-4 md:grid-cols-2' : 'space-y-4'}>
                                {paginatedJobs.map((job) => (
                                    <JobListingCard
                                        key={job.id}
                                        job={job}
                                        isSaved={savedJobIds.includes(job.id)}
                                        onSaveToggle={handleSaveToggle}
                                        viewMode={viewMode}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-14 bg-white dark:bg-white/[0.04] rounded-2xl border-2 border-dashed border-black/[0.06] dark:border-white/[0.06]">
                                <Search className="w-12 h-12 text-[#6B6B73]/40 mx-auto mb-4" />
                                <h3 className="text-lg font-bold text-[#1A211D] dark:text-white mb-1">No sample roles match</h3>
                                <p className="text-[#6B6B73] dark:text-[#8A8A90]">Try another title, location, or filter.</p>
                                <button
                                    type="button"
                                    className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                                    onClick={() => { setSearch(''); setLocationSearch(''); clearAllFilters(); }}
                                >
                                    <X className="w-3.5 h-3.5" /> Reset everything
                                </button>
                            </div>
                        )}

                        <Pagination
                            currentPage={page}
                            totalPages={totalPages}
                            onPageChange={setPage}
                        />
                    </div>
                </div>
            </div>

            {/* mobile filter modal */}
            <Modal
                isOpen={showMobileFilters}
                onClose={() => setShowMobileFilters(false)}
                title="Filter roles"
                footer={(
                    <div className="p-4">
                        <p role="status" className="mb-3 text-center text-sm text-[#62626B] dark:text-[#B5B5BD]">
                            {filteredJobs.length} {filteredJobs.length === 1 ? 'role' : 'roles'} match these filters
                        </p>
                        <button
                            type="button"
                            onClick={() => setShowMobileFilters(false)}
                            className="min-h-11 w-full rounded-lg bg-primary px-4 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#1A211D]"
                        >
                            Show {filteredJobs.length} {filteredJobs.length === 1 ? 'role' : 'roles'}
                        </button>
                    </div>
                )}
            >
                <JobFilters
                    compact
                    selectedTypes={selectedTypes}
                    onTypeToggle={handleTypeToggle}
                    selectedExp={selectedExp}
                    onExpToggle={handleExperienceToggle}
                    selectedSalary={selectedSalary}
                    onSalaryToggle={handleSalaryToggle}
                    salarySlider={salarySlider}
                    onSalarySliderChange={handleSalarySliderChange}
                    onClearAll={clearAllFilters}
                    hasActiveFilters={hasActiveFilters}
                />
            </Modal>
        </div>
    );
}
