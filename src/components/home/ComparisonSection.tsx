import { motion } from 'framer-motion';
import { X, Sparkles, CheckCircle2, XCircle } from 'lucide-react';

/* ── Animation variants ──────────────────────────────────────── */
const fadeUp = {
    hidden: { opacity: 0, y: 32 },
    visible: (delay = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94], delay },
    }),
};

const scaleIn = {
    hidden: { opacity: 0, scale: 0.92 },
    visible: (delay = 0) => ({
        opacity: 1,
        scale: 1,
        transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay },
    }),
};

/* ── Pain points / benefits list ────────────────────────────── */
const beforePoints = [
    'Ghosted by recruiters',
    'Endless job board scrolling',
    'No salary transparency',
    'One-size-fits-all applications',
    'Weeks of uncertainty',
];

const afterPoints = [
    'Direct employer connections',
    'AI-matched opportunities',
    'Transparent salary ranges',
    'Personalised fit scores',
    'Fast-tracked interviews',
];

export function ComparisonSection() {
    return (
        <section className="relative py-24 overflow-hidden bg-[#F7F6F3] dark:bg-[#0A0A0F] transition-colors duration-500">

            {/* ── Subtle divider gradient ─────────────────────────── */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-black/[0.08] dark:via-white/[0.06] to-transparent" />

            {/* ── Ambient blobs ───────────────────────────────────── */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-red-400/5 dark:bg-red-400/4 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-[#5B4CDB]/8 dark:bg-[#5B4CDB]/6 rounded-full blur-3xl pointer-events-none" />

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                {/* ── Section header ──────────────────────────────── */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-60px' }}
                    custom={0}
                    className="text-center mb-16"
                >
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-[#5B4CDB]/[0.07] dark:bg-[#5B4CDB]/[0.12] text-[#5B4CDB] dark:text-[#8B7EF8] border border-[#5B4CDB]/[0.12] dark:border-[#5B4CDB]/[0.2] mb-5">
                        <Sparkles className="w-3.5 h-3.5" />
                        See the difference
                    </span>
                    <h2 className="editorial-headline text-4xl sm:text-5xl font-bold text-[#1A1A1F] dark:text-white tracking-tight">
                        Two paths.{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5B4CDB] via-[#8B7EF8] to-[#D4A04A] dark:from-[#8B7EF8] dark:via-[#B4AAFF] dark:to-[#E8C97A]">
                            One clear winner.
                        </span>
                    </h2>
                    <p className="mt-4 text-base text-[#6B6B73] dark:text-[#8A8A90] max-w-xl mx-auto">
                        The traditional job hunt is a maze. HireLite is the direct flight.
                    </p>
                </motion.div>

                {/* ── Two-column comparison ────────────────────────── */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">

                    {/* ── LEFT: The Usual Way ─────────────────────── */}
                    <motion.div
                        variants={scaleIn}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-60px' }}
                        custom={0.1}
                        className="group relative rounded-2xl overflow-hidden border border-black/[0.06] dark:border-white/[0.06] bg-white/60 dark:bg-white/[0.02] backdrop-blur-sm hover:border-red-300/40 dark:hover:border-red-400/20 transition-all duration-300 shadow-sm hover:shadow-md"
                    >
                        {/* Top label bar */}
                        <div className="flex items-center gap-2.5 px-6 py-4 border-b border-black/[0.05] dark:border-white/[0.05] bg-red-50/60 dark:bg-red-950/20">
                            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30 ring-1 ring-red-200 dark:ring-red-700/30">
                                <X className="w-3.5 h-3.5 text-red-500 dark:text-red-400" />
                            </div>
                            <span className="font-semibold text-sm text-red-600 dark:text-red-400 tracking-wide">The Usual Way</span>
                            <span className="ml-auto text-[10px] font-medium uppercase tracking-widest text-red-400/70 dark:text-red-500/60 border border-red-200/60 dark:border-red-700/30 px-2 py-0.5 rounded-full">Chaotic</span>
                        </div>

                        {/* Illustration */}
                        <div className="relative flex items-center justify-center px-6 pt-8 pb-4 bg-gradient-to-b from-red-50/30 dark:from-red-950/10 to-transparent">
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.3 }}
                                className="relative inline-flex items-center justify-center rounded-2xl bg-white ring-1 ring-black/[0.06] shadow-sm p-4"
                            >
                                <img
                                    src="/before_image.webp"
                                    alt="The usual job hunt — a chaotic maze of job boards, social networks, and recruitment consultants"
                                    className="w-full max-w-[300px] h-auto mx-auto"
                                    loading="lazy"
                                />
                            </motion.div>
                        </div>

                        {/* Pain points */}
                        <div className="px-6 pb-8 pt-2">
                            <p className="text-[11px] font-semibold uppercase tracking-widest text-[#9A9A9F] dark:text-[#5A5A62] mb-3">What you deal with:</p>
                            <ul className="space-y-2">
                                {beforePoints.map((point, i) => (
                                    <motion.li
                                        key={point}
                                        initial={{ opacity: 0, x: -12 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3 + i * 0.07, duration: 0.35 }}
                                        viewport={{ once: true }}
                                        className="flex items-center gap-2.5 text-sm text-[#6B6B73] dark:text-[#8A8A90]"
                                    >
                                        <XCircle className="w-4 h-4 text-red-400 dark:text-red-500 shrink-0" />
                                        {point}
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>

                    {/* ── RIGHT: The HireLite Way ─────────────────── */}
                    <motion.div
                        variants={scaleIn}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-60px' }}
                        custom={0.2}
                        className="group relative rounded-2xl overflow-hidden border border-[#5B4CDB]/15 dark:border-[#5B4CDB]/20 bg-white/60 dark:bg-white/[0.02] backdrop-blur-sm hover:border-[#5B4CDB]/30 dark:hover:border-[#8B7EF8]/30 transition-all duration-300 shadow-sm hover:shadow-[0_8px_30px_rgba(91,76,219,0.10)] dark:hover:shadow-[0_8px_30px_rgba(139,126,248,0.08)]"
                    >
                        {/* Top label bar */}
                        <div className="flex items-center gap-2.5 px-6 py-4 border-b border-[#5B4CDB]/[0.08] dark:border-[#5B4CDB]/[0.12] bg-[#5B4CDB]/[0.04] dark:bg-[#5B4CDB]/[0.08]">
                            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#5B4CDB]/[0.10] dark:bg-[#5B4CDB]/[0.18] ring-1 ring-[#5B4CDB]/[0.18] dark:ring-[#5B4CDB]/[0.25]">
                                <Sparkles className="w-3.5 h-3.5 text-[#5B4CDB] dark:text-[#8B7EF8]" />
                            </div>
                            <span className="font-semibold text-sm text-[#5B4CDB] dark:text-[#8B7EF8] tracking-wide">The HireLite Way</span>
                            <span className="ml-auto text-[10px] font-medium uppercase tracking-widest text-[#5B4CDB]/60 dark:text-[#8B7EF8]/50 border border-[#5B4CDB]/20 dark:border-[#5B4CDB]/25 px-2 py-0.5 rounded-full">Smart</span>
                        </div>

                        {/* Illustration */}
                        <div className="relative flex items-center justify-center px-6 pt-8 pb-4 bg-gradient-to-b from-[#5B4CDB]/[0.03] dark:from-[#5B4CDB]/[0.06] to-transparent">
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.3 }}
                                className="relative inline-flex items-center justify-center rounded-2xl bg-white ring-1 ring-[#5B4CDB]/[0.10] shadow-sm p-4"
                            >
                                <img
                                    src="/after_image.webp"
                                    alt="The HireLite way — a direct, clean flight path from you to the right job"
                                    className="w-full max-w-[300px] h-auto mx-auto"
                                    loading="lazy"
                                />
                            </motion.div>
                        </div>

                        {/* Benefits */}
                        <div className="px-6 pb-8 pt-2">
                            <p className="text-[11px] font-semibold uppercase tracking-widest text-[#9A9A9F] dark:text-[#5A5A62] mb-3">What you get:</p>
                            <ul className="space-y-2">
                                {afterPoints.map((point, i) => (
                                    <motion.li
                                        key={point}
                                        initial={{ opacity: 0, x: 12 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3 + i * 0.07, duration: 0.35 }}
                                        viewport={{ once: true }}
                                        className="flex items-center gap-2.5 text-sm text-[#1A1A1F] dark:text-[#EAEAE8] font-medium"
                                    >
                                        <CheckCircle2 className="w-4 h-4 text-[#3DAA8F] dark:text-[#4DC4A8] shrink-0" />
                                        {point}
                                    </motion.li>
                                ))}
                            </ul>
                        </div>

                        {/* Glow accent */}
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-[#5B4CDB]/30 dark:via-[#8B7EF8]/20 to-transparent" />
                    </motion.div>

                </div>

                {/* ── Bottom CTA nudge ─────────────────────────────── */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={0.35}
                    className="mt-12 text-center"
                >
                    <p className="text-[#6B6B73] dark:text-[#8A8A90] text-sm">
                        Ready to ditch the maze?{' '}
                        <a
                            href="/jobs"
                            className="font-semibold text-[#5B4CDB] dark:text-[#8B7EF8] hover:underline underline-offset-2 transition-colors"
                        >
                            Find your next role →
                        </a>
                    </p>
                </motion.div>

            </div>
        </section>
    );
}
