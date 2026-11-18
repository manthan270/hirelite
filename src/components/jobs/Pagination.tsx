import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    if (totalPages <= 1) return null;

    return (
        <nav aria-label="Pagination" className="flex items-center justify-center gap-2 mt-8">
            <button
                type="button"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Go to previous page"
                className="p-2 rounded-xl border border-black/[0.06] dark:border-white/[0.06] text-[#6B6B73] dark:text-[#8A8A90] hover:bg-[#F1EFE6] dark:hover:bg-white/[0.06] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
                <ChevronLeft className="w-4 h-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                    type="button"
                    key={page}
                    onClick={() => onPageChange(page)}
                    aria-label={`Go to page ${page}`}
                    aria-current={page === currentPage ? 'page' : undefined}
                    className={`w-10 h-10 rounded-xl text-sm font-semibold transition-all ${
                        page === currentPage
                            ? 'bg-primary text-white shadow-md shadow-primary/30'
                            : 'border border-black/[0.06] dark:border-white/[0.06] text-[#6B6B73] dark:text-[#8A8A90] hover:bg-[#F1EFE6] dark:hover:bg-white/[0.06]'
                    }`}
                >
                    {page}
                </button>
            ))}
            <button
                type="button"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Go to next page"
                className="p-2 rounded-xl border border-black/[0.06] dark:border-white/[0.06] text-[#6B6B73] dark:text-[#8A8A90] hover:bg-[#F1EFE6] dark:hover:bg-white/[0.06] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
                <ChevronRight className="w-4 h-4" />
            </button>
        </nav>
    );
}
