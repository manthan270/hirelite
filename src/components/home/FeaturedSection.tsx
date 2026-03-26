import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { DollarSign, Clock, Building2, Users, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { FEATURED_JOBS } from '@/lib/constants';
import { useSavedJobsStore } from '@/store/useSavedJobsStore';
import toast from 'react-hot-toast';

export function FeaturedSection() {
    const toggleSave = useSavedJobsStore((state) => state.toggleSave);
    const savedJobIds = useSavedJobsStore((state) => state.savedJobIds);
    const isSaved = useCallback((jobId: string) => savedJobIds.includes(jobId), [savedJobIds]);

    const handleToggleSave = useCallback((jobId: string, label: string) => {
        const wasSaved = savedJobIds.includes(jobId);
        toggleSave(jobId);
        toast.success(wasSaved ? `${label} removed from saved jobs.` : `${label} saved.`);
    }, [toggleSave, savedJobIds]);

    return (
        <section className="py-16 bg-white dark:bg-gradient-to-b dark:from-[#0A0A0F] dark:to-[#0D0D14] border-t border-black/[0.04] dark:border-transparent transition-colors duration-500">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="editorial-headline text-3xl font-semibold text-[#1A1A1F] dark:text-white tracking-tight mb-8 transition-colors duration-500"
                >
                    Featured Opportunities
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {FEATURED_JOBS.map((job, i) => (
                        <motion.div
                            key={job.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: 0.08 * (i + 1) }}
                            className="flex flex-col justify-between bg-white dark:bg-white/[0.04] rounded-xl p-7 hover:-translate-y-0.5 transition-all duration-200 h-full relative group border border-black/[0.04] dark:border-white/[0.06] hover:border-black/[0.08] dark:hover:border-white/[0.1]"
                        >
                            <div>
                                <div className="flex justify-between items-start mb-4">
                                    <div className={`h-11 w-11 rounded-lg ${job.bg} text-white flex items-center justify-center text-lg font-bold font-display`}>{job.initial}</div>
                                    {job.badge && (
                                        <Badge className={`${job.badgeColor} border px-2.5 py-0.5 pointer-events-none text-[11px] font-semibold`}>{job.badge}</Badge>
                                    )}
                                </div>
                                <h3 className="text-[17px] font-semibold text-[#1A1A1F] dark:text-white transition-colors duration-500 font-display">{job.title}</h3>
                                <p className="text-sm text-[#6B6B73] dark:text-[#8A8A90] font-medium">{job.company}</p>
                                <div className="mt-4 grid grid-cols-2 gap-y-2 text-sm text-[#1A1A1F]/70 dark:text-[#EAEAE8]/70 transition-colors duration-500">
                                    <div className="flex items-center gap-1.5"><DollarSign className="w-4 h-4 text-[#6B6B73]" /> {job.salary}</div>
                                    <div className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-[#6B6B73]" /> {job.type}</div>
                                    <div className="flex items-center gap-1.5"><Building2 className="w-4 h-4 text-[#6B6B73]" /> {job.location}</div>
                                    <div className="flex items-center gap-1.5"><Users className="w-4 h-4 text-[#6B6B73]" /> {job.employees}</div>
                                </div>
                            </div>
                            <div className="mt-6 pt-6 flex gap-3 border-t border-black/[0.04] dark:border-white/[0.06] transition-colors duration-500">
                                <Button asChild className="flex-1 rounded-lg gradient-cta py-2.5 text-sm font-semibold text-white transition-all h-auto border-0 hover:brightness-108">
                                    <Link to={job.link}>Apply Now</Link>
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => handleToggleSave(job.id, job.title)}
                                    className="rounded-lg border-black/[0.06] dark:border-white/[0.08] px-3 py-2 text-[#6B6B73] dark:text-[#8A8A90] hover:bg-[#F0EFEC] dark:hover:bg-white/[0.06] hover:text-[#1A1A1F] dark:hover:text-white transition-colors h-auto"
                                >
                                    <Bookmark className={`w-5 h-5 ${isSaved(job.id) ? 'text-primary dark:text-[#8B7EF8] fill-current' : ''}`} />
                                </Button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
