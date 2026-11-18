import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Briefcase, CheckCircle2, Search, X, XCircle } from 'lucide-react';

// animations
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

// comparison data
const beforePoints = [
    'Role details spread across tabs',
    'Salary ranges hard to compare',
    'Long lists with little context',
    'Few ways to narrow a search',
    'Promising roles easy to lose',
];

const afterPoints = [
    'Browse sample roles together',
    'See example salary ranges',
    'Filter by role, location, and level',
    'Save interesting roles for later',
    'Open a clear role overview',
];

export function ComparisonSection() {
    return (
        <section id="comparison" aria-labelledby="comparison-heading" className="relative py-20 overflow-hidden bg-[#F8F6EE] dark:bg-[#101310] transition-colors duration-500">

            {/* top divider */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-black/[0.08] dark:via-white/[0.06] to-transparent" />

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                {/* heading */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-60px' }}
                    custom={0}
                    className="text-center mb-12"
                >
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-[#1F766A]/[0.07] dark:bg-[#1F766A]/[0.12] text-[#1F766A] dark:text-[#55A697] border border-[#1F766A]/[0.12] dark:border-[#1F766A]/[0.2] mb-5">
                        <Search className="w-3.5 h-3.5" aria-hidden="true" />
                        A simpler search flow
                    </span>
                    <h2 id="comparison-heading" className="editorial-headline text-4xl sm:text-5xl font-bold text-[#1A211D] dark:text-white tracking-tight">
                        The details you need,{' '}
                        <span className="text-[#1F766A] dark:text-[#A8D9CE]">
                            together.
                        </span>
                    </h2>
                    <p className="mt-4 text-base text-[#6B6B73] dark:text-[#8A8A90] max-w-xl mx-auto">
                        Browse sample roles, compare salary examples, and keep promising options in one place.
                    </p>
                </motion.div>

                {/* columns */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">

                    {/* left: usual way */}
                    <motion.div
                        variants={scaleIn}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-60px' }}
                        custom={0.1}
                        className="group relative rounded-2xl overflow-hidden border border-black/[0.06] dark:border-white/[0.06] bg-white/60 dark:bg-white/[0.02] backdrop-blur-sm hover:border-[#B8786F]/35 dark:hover:border-[#D2A096]/25 transition-all duration-300 shadow-sm hover:shadow-md"
                    >
                        {/* Top label bar */}
                        <div className="flex items-center gap-2.5 px-6 py-4 border-b border-[#E9DDDA] dark:border-white/[0.06] bg-[#F7F1EF] dark:bg-[#211A19]">
                            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F1E3DF] dark:bg-[#A65A4E]/15 ring-1 ring-[#E2C7C1] dark:ring-[#A65A4E]/30">
                                <X className="w-3.5 h-3.5 text-[#A65A4E] dark:text-[#D2A096]" />
                            </div>
                            <span className="font-semibold text-sm text-[#92564E] dark:text-[#D2A096] tracking-wide">Scattered search</span>
                            <span className="ml-auto text-[11px] font-medium uppercase tracking-widest text-[#92564E]/85 dark:text-[#D2A096]/85 border border-[#D9C0BA] dark:border-[#A65A4E]/35 px-2 py-0.5 rounded-full">Hard to compare</span>
                        </div>

                        <div className="relative flex h-[280px] items-center justify-center overflow-hidden bg-[#F8F6EE] px-6 py-4 dark:bg-[#F8F6EE] sm:h-[320px]">
                            <motion.img
                                src="/before_image.webp"
                                alt="A hand-drawn, winding job search route passing a house, red doors, social networks, and a cactus"
                                className="relative z-10 h-full w-full max-w-[320px] object-contain"
                                loading="lazy"
                                decoding="async"
                            />
                        </div>

                        {/* Pain points */}
                        <div className="px-6 pb-7 pt-5">
                            <p className="text-[11px] font-semibold uppercase tracking-widest text-[#6B6B73] dark:text-[#A0A0A8] mb-3">What makes comparison harder:</p>
                            <ul className="space-y-2">
                                {beforePoints.map((point, i) => (
                                    <motion.li
                                        key={point}
                                        initial={{ opacity: 0, x: -12 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3 + i * 0.07, duration: 0.35 }}
                                        viewport={{ once: true }}
                                        className="flex items-center gap-2.5 text-sm text-[#62626B] dark:text-[#B7B7BE]"
                                    >
                                        <XCircle className="w-4 h-4 text-[#B8786F] dark:text-[#D2A096] shrink-0" />
                                        {point}
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>

                    {/* right: the hirelite way */}
                    <motion.div
                        variants={scaleIn}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-60px' }}
                        custom={0.2}
                        className="group relative rounded-2xl overflow-hidden border border-primary/20 dark:border-primary/25 bg-white/60 dark:bg-white/[0.02] backdrop-blur-sm hover:border-primary/40 dark:hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-[0_8px_30px_rgba(31,118,106,0.10)] dark:hover:shadow-[0_8px_30px_rgba(85,166,151,0.08)]"
                    >
                        {/* Top label bar */}
                        <div className="flex items-center gap-2.5 px-6 py-4 border-b border-primary/[0.10] dark:border-primary/[0.16] bg-primary/[0.05] dark:bg-primary/[0.10]">
                            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/[0.10] dark:bg-primary/[0.18] ring-1 ring-primary/[0.18] dark:ring-primary/[0.25]">
                                <Briefcase className="w-3.5 h-3.5 text-primary dark:text-[#8BC6B9]" />
                            </div>
                            <span className="font-semibold text-sm text-primary dark:text-[#8BC6B9] tracking-wide">HireLite preview</span>
                            <span className="ml-auto text-[11px] font-medium uppercase tracking-widest text-primary/75 dark:text-[#8BC6B9]/75 border border-primary/25 dark:border-[#8BC6B9]/35 px-2 py-0.5 rounded-full">One place to explore</span>
                        </div>

                        <div className="relative flex h-[280px] items-center justify-center overflow-hidden bg-[#F8F6EE] px-6 py-4 dark:bg-[#F8F6EE] sm:h-[320px]">
                            <motion.img
                                src="/after_image.webp"
                                alt="A hand-drawn airplane following a clearer route through a field with small plants and a flower"
                                className="relative z-10 h-full w-full max-w-[320px] object-contain"
                                loading="lazy"
                                decoding="async"
                            />
                        </div>

                        {/* Benefits */}
                        <div className="px-6 pb-7 pt-5">
                            <p className="text-[11px] font-semibold uppercase tracking-widest text-[#6B6B73] dark:text-[#A0A0A8] mb-3">In this preview:</p>
                            <ul className="space-y-2">
                                {afterPoints.map((point, i) => (
                                    <motion.li
                                        key={point}
                                        initial={{ opacity: 0, x: 12 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3 + i * 0.07, duration: 0.35 }}
                                        viewport={{ once: true }}
                                        className="flex items-center gap-2.5 text-sm text-[#1A211D] dark:text-[#EAEAE8] font-medium"
                                    >
                                        <CheckCircle2 className="w-4 h-4 text-primary dark:text-[#8BC6B9] shrink-0" />
                                        {point}
                                    </motion.li>
                                ))}
                            </ul>
                        </div>

                        {/* Glow accent */}
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-primary/35 dark:via-[#55A697]/30 to-transparent" />
                    </motion.div>

                </div>

                {/* cta */}
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
                        <Link
                            to="/jobs"
                            className="font-semibold text-[#1F766A] dark:text-[#55A697] hover:underline underline-offset-2 transition-colors"
                        >
                            Find your next role →
                        </Link>
                    </p>
                </motion.div>

            </div>
        </section>
    );
}
