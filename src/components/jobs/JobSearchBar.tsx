import { Search, MapPin } from 'lucide-react';

interface JobSearchBarProps {
    search: string;
    onSearchChange: (value: string) => void;
    locationSearch: string;
    onLocationChange: (value: string) => void;
}

export function JobSearchBar({ search, onSearchChange, locationSearch, onLocationChange }: JobSearchBarProps) {
    return (
        <div className="flex flex-col sm:flex-row items-center gap-0 border border-slate-200 dark:border-slate-700/50 rounded-2xl bg-white dark:bg-slate-900 shadow-md p-1.5 transition-colors">
            <div className="flex-1 relative w-full group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                <input
                    type="text"
                    placeholder="Search by role, keyword, or company..."
                    className="w-full pl-12 pr-4 py-3 bg-transparent text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none"
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
            </div>
            <div className="h-px w-full sm:h-8 sm:w-px bg-slate-200 dark:bg-slate-700/50" />
            <div className="flex-1 relative w-full group">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                <input
                    type="text"
                    placeholder="City, state, or 'Remote'..."
                    className="w-full pl-12 pr-4 py-3 bg-transparent text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none"
                    value={locationSearch}
                    onChange={(e) => onLocationChange(e.target.value)}
                />
            </div>
        </div>
    );
}
