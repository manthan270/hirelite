import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { formatSalary } from '@/lib/constants';
import type { Job } from '@/types/job';

interface JobListingCardProps {
    job: Job;
    isSaved: boolean;
    onSaveToggle: (jobId: string) => void;
    viewMode: 'list' | 'grid';
}

export const JobListingCard = React.memo(function JobListingCard({ job, isSaved, onSaveToggle, viewMode }: JobListingCardProps) {
    return (
        <article className={`surface-panel group transition-colors duration-200 hover:border-primary/25 hover:shadow-md dark:hover:border-primary/35 ${viewMode === 'list' ? 'flex flex-col gap-5 p-4 sm:p-5 md:flex-row md:items-center md:justify-between md:p-6' : 'flex flex-col p-4 sm:p-5 md:p-6'}`}>
            <div className={`flex min-w-0 gap-4 ${viewMode === 'grid' ? 'flex-col' : ''}`}>
                <div aria-hidden="true" className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-primary/10 bg-primary/[0.06] text-lg font-bold text-primary dark:border-primary/20 dark:bg-primary/[0.12]">
                    {job.company.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                    <div className="mb-1.5 flex flex-wrap items-center gap-2">
                        <Link to={`/jobs/${job.id}`} className="rounded-sm font-semibold text-[#1A211D] transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:text-white">
                            {job.title}
                        </Link>
                    </div>
                    <p className="text-sm text-[#6B6B73] dark:text-[#8A8A90] font-medium truncate">{job.company}</p>

                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#62626B] dark:text-[#A0A0A8]">
                        <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4 text-[#85858D]" aria-hidden="true" />{job.location}</span>
                        <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4 text-[#85858D]" aria-hidden="true" />{job.type}</span>
                        <span>{job.experienceLevel}</span>
                    </div>
                </div>
            </div>

            <div className={`flex items-center gap-3 ${viewMode === 'list' ? 'justify-between border-t border-black/[0.05] pt-4 dark:border-white/[0.07] md:shrink-0 md:justify-end md:border-0 md:pt-0' : 'mt-4 justify-between border-t border-black/[0.05] pt-4 dark:border-white/[0.07] sm:mt-5'}`}>
                <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#6B6B73] dark:text-[#A0A0A8]">Example salary</p>
                    <p className="mt-0.5 whitespace-nowrap text-sm font-semibold tabular-nums text-[#282832] dark:text-[#E7E7EA]">{formatSalary(job.salary)}</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        asChild
                        size="sm"
                        className="rounded-lg bg-primary text-white hover:bg-primary-dark"
                    >
                        <Link to={`/jobs/${job.id}`}>View role</Link>
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => onSaveToggle(job.id)}
                        aria-label={isSaved ? `Remove ${job.title} from saved jobs` : `Save ${job.title}`}
                        aria-pressed={isSaved}
                        className={`h-9 w-9 rounded-xl border-black/[0.07] dark:border-white/[0.08] ${isSaved ? 'text-primary dark:text-[#B7DED5]' : 'text-[#62626B] dark:text-[#A0A0A8] hover:text-primary'} transition-colors`}
                    >
                        <Bookmark className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} aria-hidden="true" />
                    </Button>
                </div>
            </div>
        </article>
    );
});
