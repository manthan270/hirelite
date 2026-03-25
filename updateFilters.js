const fs = require('fs');
const path = 'c:/Users/ASUS/OneDrive/Desktop/pro/src/pages/candidate/Jobs.tsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
    "const [savedJobIds, setSavedJobIds] = useState<string[]>([]);",
    "const [savedJobIds, setSavedJobIds] = useState<string[]>([]);\n    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);"
);

const filterStart = `                        {/* Category */}`;
const filterEnd = `                        </div>\n\n                    </div>\n                </aside>`;

const startIdx = content.indexOf(filterStart);
const endIdx = content.indexOf(filterEnd);
const filtersContent = content.substring(startIdx, endIdx);

const filterOptionsVar = `
    const filterOptions = (
        <>
${filtersContent}        </>
    );

    return (`;

content = content.replace("    return (", filterOptionsVar);

const oldAsideReplacement = `                    {/* Search Button */}
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
                </div>`;

const searchToAsideToken1 = `                    {/* Search Button */}`;
const searchToAsideToken2 = filterEnd;

const sIdx = content.indexOf(searchToAsideToken1);
const eIdx = content.indexOf(searchToAsideToken2) + searchToAsideToken2.length;
const searchToAside = content.substring(sIdx, eIdx);

content = content.replace(searchToAside, oldAsideReplacement);

const modalCode = `
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
}`;

const lastDivIdx = content.lastIndexOf('        </div>');
content = content.substring(0, lastDivIdx) + modalCode;

fs.writeFileSync(path, content);
console.log('Script completed successfully.');
