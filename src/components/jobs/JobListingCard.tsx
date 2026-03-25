import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, DollarSign, Clock, Bookmark, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { getMatchScore } from '@/lib/constants';
import type { Job } from '@/types/job';

interface JobListingCardProps {
    job: Job;
    isSaved: boolean;
    onSaveToggle: (jobId: string) => void;
    viewMode: 'list' | 'grid';
}

export const JobListingCard = React.memo(function JobListingCard({ job, isSaved, onSaveToggle, viewMode }: JobListingCardProps) {
    const matchScore = getMatchScore(job.id + job.title);
    const isHighMatch = matchScore >= 90;

    return (
        <div className={`group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-primary/30 dark:hover:border-primary/40 hover:shadow-lg transition-all duration-300 ${viewMode === 'list' ? 'flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-5' : 'flex flex-col p-6'}`}>
            <div className={`flex gap-4 ${viewMode === 'grid' ? 'flex-col' : ''}`}>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-purple-500/10 dark:from-primary/20 dark:to-purple-500/20 flex items-center justify-center text-lg font-bold text-primary dark:text-indigo-400 shrink-0 border border-primary/10 dark:border-primary/20">
                    {job.company.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <Link to={`/jobs/${job.id}`} className="font-bold text-slate-900 dark:text-white hover:text-primary dark:hover:text-indigo-400 transition-colors truncate">
                            {job.title}
                        </Link>
                        {job.verified && (
                            <span className="flex items-center text-primary text-[10px] bg-primary/5 dark:bg-primary/10 px-1.5 py-0.5 rounded-full font-semibold shrink-0">✓ Verified</span>
                        )}
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium truncate">{job.company}</p>

                    <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-slate-500 dark:text-slate-400">
                        <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {job.location}</span>
                        <span className="flex items-center gap-1"><DollarSign className="w-3.5 h-3.5" /> {job.salary}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {job.type}</span>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-3">
                        <Badge variant="secondary" className="text-[11px]">{job.type}</Badge>
                        <div className={`flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full ${isHighMatch ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'}`}>
                            <TrendingUp className="w-3 h-3" /> {matchScore}% Match
                        </div>
                    </div>
                </div>
            </div>

            <div className={`flex items-center gap-2 ${viewMode === 'list' ? 'shrink-0' : 'mt-4 pt-4 border-t border-slate-100 dark:border-slate-800'}`}>
                <Button
                    asChild
                    size="sm"
                    className="bg-primary hover:bg-primary/90 text-white rounded-xl flex-1 sm:flex-none"
                >
                    <Link to={`/jobs/${job.id}`}>View Details</Link>
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => onSaveToggle(job.id)}
                    className={`rounded-xl border-slate-200 dark:border-slate-700 ${isSaved ? 'text-primary dark:text-indigo-400' : 'text-slate-400 hover:text-primary dark:hover:text-indigo-400'} transition-colors`}
                >
                    <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                </Button>
            </div>
        </div>
    );
});
