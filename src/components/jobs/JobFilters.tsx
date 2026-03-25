import { ChevronDown, ChevronUp, X } from 'lucide-react';
import { useState } from 'react';
import { JOB_TYPES, EXPERIENCE_LEVELS, SALARY_RANGES } from '@/lib/constants';

interface JobFiltersProps {
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

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
    const [open, setOpen] = useState(true);
    return (
        <div className="py-4 border-b border-slate-100 dark:border-slate-800/50">
            <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                className="flex items-center justify-between w-full text-left font-semibold text-slate-800 dark:text-slate-200 text-sm mb-3"
            >
                {title}
                {open ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
            </button>
            {open && children}
        </div>
    );
}

function Checkbox({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
    return (
        <label className="flex items-center gap-3 py-1.5 cursor-pointer group">
            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
                className="w-4 h-4 rounded border-slate-300 dark:border-slate-600 text-primary focus:ring-primary/30 dark:bg-slate-800 cursor-pointer"
            />
            <span className="text-sm text-slate-700 dark:text-slate-300 group-hover:text-primary transition-colors select-none">{label}</span>
        </label>
    );
}

export function JobFilters({
    selectedTypes,
    onTypeToggle,
    selectedExp,
    onExpToggle,
    selectedSalary,
    onSalaryToggle,
    salarySlider,
    onSalarySliderChange,
    onClearAll,
    hasActiveFilters,
}: JobFiltersProps) {
    return (
        <aside className="sticky top-24 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <h3 className="font-bold text-slate-900 dark:text-white text-base">Filters</h3>
                {hasActiveFilters && (
                    <button
                        type="button"
                        onClick={onClearAll}
                        className="text-xs font-medium text-slate-500 hover:text-red-500 transition-colors flex items-center gap-1"
                    >
                        <X className="w-3 h-3" /> Clear all
                    </button>
                )}
            </div>

            <FilterGroup title="Job Type">
                <div className="space-y-1">
                    {JOB_TYPES.map((type) => (
                        <Checkbox key={type} label={type} checked={selectedTypes.includes(type)} onChange={() => onTypeToggle(type)} />
                    ))}
                </div>
            </FilterGroup>

            <FilterGroup title="Experience Level">
                <div className="space-y-1">
                    {EXPERIENCE_LEVELS.map((exp) => (
                        <Checkbox key={exp} label={exp} checked={selectedExp.includes(exp)} onChange={() => onExpToggle(exp)} />
                    ))}
                </div>
            </FilterGroup>

            <FilterGroup title="Expected Salary">
                <div className="space-y-3">
                    <div className="space-y-1">
                        {SALARY_RANGES.map((s) => (
                            <Checkbox key={s} label={s} checked={selectedSalary.includes(s)} onChange={() => onSalaryToggle(s)} />
                        ))}
                    </div>
                    <div className="pt-2">
                        <label className="text-xs text-slate-500 dark:text-slate-400 block mb-2">Minimum (₹L)</label>
                        <input
                            type="range"
                            min={0}
                            max={50}
                            step={5}
                            value={salarySlider}
                            onChange={(e) => onSalarySliderChange(Number(e.target.value))}
                            className="w-full accent-primary"
                        />
                        <div className="flex justify-between text-xs text-slate-400 dark:text-slate-500 mt-1">
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
