import { motion } from 'framer-motion';
import { TRUSTED_COMPANIES } from '@/lib/constants';

export function TrustedBySection() {
    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="border-y border-black/[0.05] bg-[#F8F7F2] py-8 transition-colors duration-500 dark:border-white/[0.06] dark:bg-[#121713] md:py-10"
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-5 text-center md:mb-6">
                    <p className="eyebrow-label text-[#6B6B73] transition-colors duration-500 dark:text-[#A0A0A8]">Example company names in this preview</p>
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-3 lg:grid-cols-5" aria-label="Example companies shown in the preview">
                    {TRUSTED_COMPANIES.map((c) => (
                        <div key={c.label} className="group flex min-h-10 items-center justify-center gap-2.5 text-[#777B77] transition-colors duration-200 hover:text-primary dark:text-[#9DA49F] dark:hover:text-[#A8D9CE] last:col-span-2 sm:last:col-span-1">
                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-black/[0.035] transition-colors duration-200 group-hover:bg-primary/[0.08] dark:bg-white/[0.04] dark:group-hover:bg-[#A8D9CE]/10">
                                <c.icon className="h-4 w-4" aria-hidden="true" />
                            </span>
                            <span className="font-display text-sm font-semibold tracking-tight">{c.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </motion.section>
    );
}
