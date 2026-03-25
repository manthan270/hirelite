import { motion } from 'framer-motion';
import { TRUSTED_COMPANIES } from '@/lib/constants';

export function TrustedBySection() {
    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-[#0A0A0F] py-10 border-y border-black/[0.04] dark:border-white/[0.06] transition-colors duration-500"
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <p className="eyebrow-label text-center text-[#6B6B73] dark:text-[#8A8A90] mb-8 transition-colors duration-500">Trusted by innovative teams</p>
                <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-40 hover:opacity-80 grayscale hover:grayscale-0 transition-all duration-700">
                    {TRUSTED_COMPANIES.map((c) => (
                        <div key={c.label} className="flex items-center gap-2 text-lg font-bold text-[#1A1A1F] dark:text-[#EAEAE8] transition-colors duration-500 font-display">
                            <c.icon className={`w-5 h-5 ${c.color}`} /> {c.label}
                        </div>
                    ))}
                </div>
            </div>
        </motion.section>
    );
}
