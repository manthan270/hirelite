import { ChevronDown, ChevronUp, X } from 'lucide-react';
import { useId, useState } from 'react';
import { JOB_TYPES, EXPERIENCE_LEVELS, SALARY_RANGES } from '@/lib/constants';

interface JobFiltersProps {
    compact?: boolean;
    selectedTypes: string[];
    onTypeToggle: (type: string) => void;
    selectedExp: string[];
    onExpToggle: (exp: string) => void;
    selectedSalary: string[];
    onSalaryToggle: (salary: string) => void;
    salarySlider: number;
    onSalarySliderChange: (value: number) => void;
    onClearAll: () => void;
    hasActiveFilters: boolean;
}

function FilterGroup({ title, children, initialOpen = true }: { title: string; children: React.ReactNode; initialOpen?: boolean }) {
    const [open, setOpen] = useState(initialOpen);
    const contentId = useId();
    return (
        <div className="border-b border-black/[0.07] py-2.5 last:border-b-0 dark:border-white/[0.09]">
            <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                aria-expanded={open}
                aria-controls={contentId}
                className="flex min-h-9 w-full items-center justify-between rounded-md text-left text-sm font-semibold text-[#1A211D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 dark:text-[#EAEAE8]"
            >
                {title}
                {open ? <ChevronUp className="w-4 h-4 text-[#6B6B73]" /> : <ChevronDown className="w-4 h-4 text-[#6B6B73]" />}
            </button>
            <div id={contentId} hidden={!open} className="pt-1">
                {children}
            </div>
        </div>
    );
}

function Checkbox({ label, checked, onChange, compact }: { label: string; checked: boolean; onChange: () => void; compact: boolean }) {
    return (
        <label className={`group flex cursor-pointer items-center gap-3 ${compact ? 'min-h-11' : 'min-h-10'}`}>
            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
                className="w-4 h-4 rounded border-black/[0.12] dark:border-white/[0.12] text-primary focus:ring-primary/30 dark:bg-white/[0.06] cursor-pointer"
            />
            <span className={`flex flex-1 items-center text-sm text-[#62626B] transition-colors group-hover:text-primary dark:text-[#B5B5BD] select-none ${compact ? 'min-h-11' : 'min-h-10'}`}>{label}</span>
        </label>
    );
}

export function JobFilters({
    compact = false,
    selectedTypes, onTypeToggle,
    selectedExp, onExpToggle,
    selectedSalary, onSalaryToggle,
    salarySlider, onSalarySliderChange,
    onClearAll, hasActiveFilters,
}: JobFiltersProps) {
    return (
        <aside className={`transition-colors ${compact ? 'rounded-none border-0 bg-transparent p-0 shadow-none' : 'surface-panel sticky top-24 p-5'}`}>
            <div className={`flex items-center justify-between ${compact ? 'pb-1' : 'border-b border-black/[0.04] pb-3 dark:border-white/[0.06]'}`}>
                {!compact && <h3 className="font-bold text-[#1A211D] dark:text-white text-base">Filters</h3>}
                {hasActiveFilters && (
                    <button
                        type="button"
                        onClick={onClearAll}
                        className={`inline-flex min-h-10 items-center gap-1 rounded-md px-2 text-xs font-medium text-[#62626B] transition-colors hover:text-red-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:text-[#A0A0A8] ${compact ? 'ml-auto' : ''}`}
                    >
                        <X className="w-3 h-3" /> Clear all
                    </button>
                )}
            </div>

            <FilterGroup title="Job Type">
                <div className="space-y-0.5">
                    {JOB_TYPES.map((type) => (
                        <Checkbox key={type} label={type} checked={selectedTypes.includes(type)} onChange={() => onTypeToggle(type)} compact={compact} />
                    ))}
                </div>
            </FilterGroup>

            <FilterGroup title="Experience Level">
                <div className="space-y-0.5">
                    {EXPERIENCE_LEVELS.map((exp) => (
                        <Checkbox key={exp} label={exp} checked={selectedExp.includes(exp)} onChange={() => onExpToggle(exp)} compact={compact} />
                    ))}
                </div>
            </FilterGroup>

            <FilterGroup title="Expected Salary" initialOpen={false}>
                <div className="space-y-2">
                    <div className="space-y-0.5">
                        {SALARY_RANGES.map((s) => (
                        <Checkbox key={s} label={s} checked={selectedSalary.includes(s)} onChange={() => onSalaryToggle(s)} compact={compact} />
                        ))}
                    </div>
                    <div className="pt-1">
                        <label htmlFor="minimum-salary" className="text-xs text-[#6B6B73] dark:text-[#8A8A90] block mb-2">Minimum salary (₹ lakh)</label>
                        <input
                            id="minimum-salary"
                            type="range"
                            min={0}
                            max={50}
                            step={5}
                            value={salarySlider}
                            onChange={(e) => onSalarySliderChange(Number(e.target.value))}
                            className="w-full accent-primary"
                        />
                        <div className="flex justify-between text-xs text-[#6B6B73] dark:text-[#8A8A90] mt-1">
                            <span>₹0L</span>
                            <span className="font-semibold text-primary">₹{salarySlider}L</span>
                            <span>₹50L+</span>
                        </div>
                    </div>
                </div>
            </FilterGroup>
        </aside>
    );
}
