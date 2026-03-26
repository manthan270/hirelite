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

    /* ─── Search State ─────────────────── */
    const [search, setSearch] = useState(searchParams.get('q') ?? '');
    const [locationSearch, setLocationSearch] = useState(searchParams.get('location') ?? '');

    /* ─── Filter State (DRY toggle hook) ─ */
    const { items: selectedTypes, toggle: toggleType, clear: clearTypes } = useToggleSet<string>();
    const { items: selectedExp, toggle: toggleExp, clear: clearExp } = useToggleSet<string>();
    const { items: selectedSalary, toggle: toggleSalary, clear: clearSalary } = useToggleSet<string>();
    const [salarySlider, setSalarySlider] = useState(0);

    /* ─── UI State ─────────────────────── */
    const [sortBy, setSortBy] = useState<string>(SORT_OPTIONS[0]);
    const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
    const [page, setPage] = useState(1);
    const [showMobileFilters, setShowMobileFilters] = useState(false);

    /* ─── Global saved jobs store ──────── */
    const toggleSave = useSavedJobsStore((state) => state.toggleSave);
    const savedJobIds = useSavedJobsStore((state) => state.savedJobIds);
    const isSaved = useCallback((jobId: string) => savedJobIds.includes(jobId), [savedJobIds]);

    /* ─── Derived: has active filters ──── */
    const hasActiveFilters = selectedTypes.length > 0 || selectedExp.length > 0 || selectedSalary.length > 0 || salarySlider > 0;

    const clearAllFilters = useCallback(() => {
        clearTypes();
        clearExp();
        clearSalary();
        setSalarySlider(0);
        setPage(1);
    }, [clearTypes, clearExp, clearSalary]);

    /* ─── Job save toggle ──────────────── */
    const handleSaveToggle = useCallback((jobId: string) => {
        const wasSaved = isSaved(jobId);
        toggleSave(jobId);
        toast.success(wasSaved ? 'Removed from saved jobs.' : 'Job saved!');
    }, [toggleSave, isSaved]);

    /* ─── Filtered + sorted + paginated ── */
    const filteredJobs = useMemo(() => {
        let result = [...jobs];

        // Text search
        const q = search.toLowerCase().trim();
        if (q) {
            result = result.filter(
                (j) => j.title.toLowerCase().includes(q) || j.company.toLowerCase().includes(q)
            );
        }

        // Location search
        const loc = locationSearch.toLowerCase().trim();
        if (loc) {
            result = result.filter((j) => j.location.toLowerCase().includes(loc));
        }

        // Type filter
        if (selectedTypes.length > 0) {
            result = result.filter((j) => selectedTypes.includes(j.type));
        }

        // Salary slider
        if (salarySlider > 0) {
            result = result.filter((j) => {
                const parsed = parseSalaryRange(j.salary);
                return parsed.max >= salarySlider;
            });
        }

        // Sort
        if (sortBy === 'Newest First') {
            result.reverse();
        } else if (sortBy === 'Highest Salary') {
            result.sort((a, b) => parseSalaryRange(b.salary).max - parseSalaryRange(a.salary).max);
        }

        return result;
    }, [jobs, search, locationSearch, selectedTypes, salarySlider, sortBy]);

    const totalPages = Math.ceil(filteredJobs.length / PAGE_SIZE);
    const paginatedJobs = filteredJobs.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
            {/* Hero / Search Header */}
            <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Find your next role</h1>
                    <JobSearchBar
                        search={search}
                        onSearchChange={(v) => { setSearch(v); setPage(1); }}
                        locationSearch={locationSearch}
                        onLocationChange={(v) => { setLocationSearch(v); setPage(1); }}
                    />
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Filters — Desktop Sidebar */}
                    <div className="hidden lg:block w-72 shrink-0">
                        <JobFilters
                            selectedTypes={selectedTypes}
                            onTypeToggle={toggleType}
                            selectedExp={selectedExp}
                            onExpToggle={toggleExp}
                            selectedSalary={selectedSalary}
                            onSalaryToggle={toggleSalary}
                            salarySlider={salarySlider}
                            onSalarySliderChange={setSalarySlider}
                            onClearAll={clearAllFilters}
                            hasActiveFilters={hasActiveFilters}
                        />
                    </div>

                    {/* Main Job List */}
                    <div className="flex-1 min-w-0">
                        {/* Toolbar */}
                        <div className="flex items-center justify-between mb-6">
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                <span className="font-semibold text-slate-900 dark:text-white">{filteredJobs.length}</span> jobs found
                            </p>
                            <div className="flex items-center gap-2">
                                {/* Mobile Filter Button */}
                                <button
                                    type="button"
                                    className="lg:hidden flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                                    onClick={() => setShowMobileFilters(true)}
                                >
                                    <SlidersHorizontal className="w-4 h-4" />
                                    Filters
                                    {hasActiveFilters && (
                                        <span className="ml-1 w-5 h-5 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center">
                                            {selectedTypes.length + selectedExp.length + selectedSalary.length}
                                        </span>
                                    )}
                                </button>

                                {/* Sort Dropdown */}
                                <div className="relative">
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="appearance-none pl-8 pr-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-colors cursor-pointer"
                                    >
                                        {SORT_OPTIONS.map((opt) => (
                                            <option key={opt} value={opt}>{opt}</option>
                                        ))}
                                    </select>
                                    <ArrowUpDown className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                                </div>

                                {/* View Toggle */}
                                <div className="hidden sm:flex border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
                                    <button
                                        type="button"
                                        onClick={() => setViewMode('list')}
                                        className={`p-2 transition-colors ${viewMode === 'list' ? 'bg-primary text-white' : 'bg-white dark:bg-slate-900 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}
                                    >
                                        <LayoutList className="w-4 h-4" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setViewMode('grid')}
                                        className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-primary text-white' : 'bg-white dark:bg-slate-900 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}
                                    >
                                        <LayoutGrid className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Job Cards */}
                        {paginatedJobs.length > 0 ? (
                            <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : 'space-y-4'}>
                                {paginatedJobs.map((job) => (
                                    <JobListingCard
                                        key={job.id}
                                        job={job}
                                        isSaved={isSaved(job.id)}
                                        onSaveToggle={handleSaveToggle}
                                        viewMode={viewMode}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700">
                                <Search className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">No jobs found</h3>
                                <p className="text-slate-500 dark:text-slate-400">Try adjusting your search or filters.</p>
                                <button
                                    type="button"
                                    className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                                    onClick={() => { setSearch(''); setLocationSearch(''); clearAllFilters(); }}
                                >
                                    <X className="w-3.5 h-3.5" /> Reset everything
                                </button>
                            </div>
                        )}

                        {/* Pagination */}
                        <Pagination
                            currentPage={page}
                            totalPages={totalPages}
                            onPageChange={setPage}
                        />
                    </div>
                </div>
            </div>

            {/* Mobile Filter Modal */}
            <Modal
                isOpen={showMobileFilters}
                onClose={() => setShowMobileFilters(false)}
                title="Filters"
            >
                <JobFilters
                    selectedTypes={selectedTypes}
                    onTypeToggle={toggleType}
                    selectedExp={selectedExp}
                    onExpToggle={toggleExp}
                    selectedSalary={selectedSalary}
                    onSalaryToggle={toggleSalary}
                    salarySlider={salarySlider}
                    onSalarySliderChange={setSalarySlider}
                    onClearAll={clearAllFilters}
                    hasActiveFilters={hasActiveFilters}
                />
            </Modal>
        </div>
    );
}
