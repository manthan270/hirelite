import { motion } from 'framer-motion';
import { TRUSTED_COMPANIES } from '@/lib/constants';

export function TrustedBySection() {
    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-[#F8F7F2] dark:bg-[#121713] py-10 md:py-12 border-y border-black/[0.05] dark:border-white/[0.06] transition-colors duration-500"
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-6 flex items-center gap-4 md:mb-7">
                    <span className="h-px flex-1 bg-black/[0.08] dark:bg-white/[0.1]" aria-hidden="true" />
                    <p className="eyebrow-label shrink-0 text-center text-[#6B6B73] dark:text-[#A0A0A8] transition-colors duration-500">Sample companies in this preview</p>
                    <span className="h-px flex-1 bg-black/[0.08] dark:bg-white/[0.1]" aria-hidden="true" />
                </div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5" aria-label="Sample companies">
                    {TRUSTED_COMPANIES.map((c) => (
                        <div key={c.label} className="group flex min-h-16 items-center justify-center gap-3 rounded-xl border border-black/[0.06] bg-white/80 px-3 py-3 transition-colors duration-200 hover:border-primary/25 hover:bg-white dark:border-white/[0.08] dark:bg-white/[0.025] dark:hover:border-primary/30 dark:hover:bg-white/[0.05] last:col-span-2 sm:last:col-span-1">
                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#F1EFE6] transition-colors duration-200 group-hover:bg-primary/[0.08] dark:bg-white/[0.06] dark:group-hover:bg-primary/15">
                                <c.icon className={`h-5 w-5 ${c.color}`} aria-hidden="true" />
                            </span>
                            <span className="text-sm font-semibold text-[#3D4942] transition-colors duration-200 group-hover:text-[#1A211D] dark:text-[#C7CCC8] dark:group-hover:text-white font-display">{c.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </motion.section>
    );
}
