import { Search, MapPin } from 'lucide-react';

interface JobSearchBarProps {
    search: string;
    onSearchChange: (value: string) => void;
    locationSearch: string;
    onLocationChange: (value: string) => void;
}

export function JobSearchBar({ search, onSearchChange, locationSearch, onLocationChange }: JobSearchBarProps) {
    return (
        <div role="search" aria-label="Find sample jobs" className="surface-panel grid gap-2 p-2 transition-colors md:grid-cols-[1fr_1fr] md:gap-0">
            <div className="group relative min-w-0 px-3 py-2">
                <label htmlFor="job-search-keyword" className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.1em] text-[#6B6B73] dark:text-[#A0A0A8]">Role title or company</label>
                <div className="relative">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B6B73] transition-colors group-focus-within:text-primary dark:text-[#A0A0A8] dark:group-focus-within:text-[#8BC6B9]" aria-hidden="true" />
                    <input
                        id="job-search-keyword"
                        type="search"
                        aria-label="Search sample roles by title or company"
                        placeholder="e.g. Product Manager"
                        className="h-10 w-full rounded-md border-0 bg-transparent py-2 pl-10 pr-2 text-sm text-[#1A211D] placeholder:text-[#8A8A90] focus:outline-none focus:ring-2 focus:ring-primary/40 dark:text-white"
                        value={search}
                        onChange={(e) => onSearchChange(e.target.value)}
                    />
                </div>
            </div>
            <div className="group relative min-w-0 border-t border-black/[0.06] px-3 py-2 dark:border-white/[0.08] md:border-l md:border-t-0">
                <label htmlFor="job-search-location" className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.1em] text-[#6B6B73] dark:text-[#A0A0A8]">Location</label>
                <div className="relative">
                    <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B6B73] transition-colors group-focus-within:text-primary dark:text-[#A0A0A8] dark:group-focus-within:text-[#8BC6B9]" aria-hidden="true" />
                    <input
                        id="job-search-location"
                        type="text"
                        aria-label="Filter sample roles by location"
                        placeholder="City or remote"
                        className="h-10 w-full rounded-md border-0 bg-transparent py-2 pl-10 pr-2 text-sm text-[#1A211D] placeholder:text-[#8A8A90] focus:outline-none focus:ring-2 focus:ring-primary/40 dark:text-white"
                        value={locationSearch}
                        onChange={(e) => onLocationChange(e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
}
