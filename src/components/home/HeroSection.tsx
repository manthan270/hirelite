import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Search, MapPin, ArrowRight,
    Users, Building2, Trophy, TrendingUp,
} from 'lucide-react';

/* ── Stat pill data ─────────────────────────────────────────── */
const STATS = [
    { icon: Building2, value: '2,500+', label: 'Companies', color: 'text-[#5B4CDB]' },
    { icon: Users, value: '50K+', label: 'Active Users', color: 'text-[#7B6CE0]' },
    { icon: Trophy, value: '12K+', label: 'Jobs Filled', color: 'text-[#D4A04A]' },
    { icon: TrendingUp, value: '95%', label: 'Match Rate', color: 'text-[#3DAA8F]' },
];

/* ── Floating tag data ──────────────────────────────────────── */
const TAGS = [
    'React', 'Python', 'AI/ML', 'Product Design',
    'DevOps', 'Data Science', 'Full Stack', 'Cloud',
];

/* ── Animation variants ─────────────────────────────────────── */
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.08, delayChildren: 0.15 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export function HeroSection() {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState('');
    const [location, setLocation] = useState('');

    const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (keyword.trim()) params.set('q', keyword.trim());
        if (location.trim()) params.set('location', location.trim());
        const qs = params.toString();
        navigate(qs ? `/jobs?${qs}` : '/jobs');
    };

    return (
        <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-[#F7F6F3] dark:bg-[#0A0A0F] transition-colors duration-500">

            {/* ── Ambient background layers ──────────────────────── */}
            {/* Mesh gradient - light */}
            <div className="absolute inset-0 dark:opacity-0 opacity-80 pointer-events-none transition-opacity duration-500"
                style={{
                    backgroundImage: `
                        radial-gradient(at 0% 0%, rgba(91,76,219,0.10) 0px, transparent 60%),
                        radial-gradient(at 60% 0%, rgba(139,126,248,0.08) 0px, transparent 50%),
                        radial-gradient(at 100% 100%, rgba(212,160,74,0.06) 0px, transparent 50%),
                        radial-gradient(at 0% 100%, rgba(61,170,143,0.05) 0px, transparent 50%)
                    `,
                }}
            />

            {/* Mesh gradient - dark */}
            <div className="absolute inset-0 opacity-0 dark:opacity-100 pointer-events-none transition-opacity duration-500"
                style={{
                    backgroundImage: `
                        radial-gradient(at 15% 20%, rgba(91,76,219,0.16) 0px, transparent 55%),
                        radial-gradient(at 75% 10%, rgba(139,126,248,0.12) 0px, transparent 50%),
                        radial-gradient(at 85% 80%, rgba(61,170,143,0.08) 0px, transparent 50%),
                        radial-gradient(at 20% 90%, rgba(91,76,219,0.06) 0px, transparent 50%)
                    `,
                }}
            />

            {/* Floating animated orb */}
            <motion.div
                animate={{ x: [0, 30, -20, 0], y: [0, -40, 20, 0], scale: [1, 1.08, 0.95, 1] }}
                transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-16 right-[15%] w-72 h-72 bg-gradient-to-br from-[#5B4CDB]/15 to-[#8B7EF8]/15 dark:from-[#5B4CDB]/8 dark:to-[#8B7EF8]/8 rounded-full blur-3xl pointer-events-none"
            />
            <motion.div
                animate={{ x: [0, -25, 15, 0], y: [0, 30, -25, 0], scale: [1, 0.92, 1.06, 1] }}
                transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute bottom-20 left-[10%] w-64 h-64 bg-gradient-to-tr from-[#D4A04A]/10 to-[#3DAA8F]/10 dark:from-[#D4A04A]/5 dark:to-[#3DAA8F]/5 rounded-full blur-3xl pointer-events-none"
            />

            {/* Dot grid pattern */}
            <div className="absolute inset-0 opacity-[0.25] dark:opacity-[0.04] pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(circle, #6B6B73 0.6px, transparent 0.6px)',
                    backgroundSize: '32px 32px',
                }}
            />

            {/* Starfield — dark mode */}
            <div className="absolute inset-0 starfield constellation-lines opacity-0 dark:opacity-50 pointer-events-none transition-opacity duration-500" />


            {/* ── Main content ───────────────────────────────────── */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 w-full py-16 lg:py-0">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-center max-w-4xl mx-auto"
                >
                    {/* Headline */}
                    <motion.h1
                        variants={itemVariants}
                        className="editorial-headline text-5xl sm:text-6xl lg:text-[72px] font-bold text-[#1A1A1F] dark:text-white mb-7 tracking-tight transition-colors duration-500"
                    >
                        Your Next Career
                        <br />
                        <span className="relative inline-block">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5B4CDB] via-[#8B7EF8] to-[#D4A04A] dark:from-[#8B7EF8] dark:via-[#B4AAFF] dark:to-[#E8C97A]">
                                Starts Here
                            </span>
                            {/* underline sweep */}
                            <motion.span
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ delay: 0.8, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                                className="absolute -bottom-2 left-0 right-0 h-[4px] origin-left rounded-full bg-gradient-to-r from-[#5B4CDB] via-[#8B7EF8] to-[#D4A04A] opacity-60 dark:opacity-40"
                            />
                        </span>
                    </motion.h1>

                    {/* Subheadline */}
                    <motion.p
                        variants={itemVariants}
                        className="text-lg lg:text-xl text-[#6B6B73] dark:text-[#8A8A90] mb-12 max-w-2xl mx-auto leading-relaxed transition-colors duration-500"
                    >
                        Join <span className="font-semibold text-[#1A1A1F] dark:text-[#EAEAE8]">50,000+</span> professionals who found their dream job through our intelligent matching platform. Salary transparency &amp; direct employer connections.
                    </motion.p>

                    {/* ── Search bar ─────────────────────────────── */}
                    <motion.div variants={itemVariants} className="w-full max-w-2xl mx-auto mb-14">
                        <form
                            onSubmit={handleSearchSubmit}
                            className="relative flex flex-col sm:flex-row sm:items-center gap-0 bg-white/90 dark:bg-white/[0.05] backdrop-blur-2xl rounded-xl p-1.5 border border-black/[0.06] dark:border-white/[0.07] shadow-[0_8px_40px_-12px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_40px_-12px_rgba(0,0,0,0.3)] focus-within:border-[#5B4CDB]/30 dark:focus-within:border-[#5B4CDB]/40 focus-within:shadow-[0_8px_40px_-12px_rgba(91,76,219,0.12)] dark:focus-within:shadow-[0_8px_40px_-12px_rgba(91,76,219,0.15)] transition-all duration-200"
                        >
                            {/* Keyword */}
                            <div className="flex-1 relative group px-2">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B6B73] group-focus-within:text-[#5B4CDB] transition-colors">
                                    <Search className="w-5 h-5" />
                                </div>
                                <input
                                    id="hero-search-keyword"
                                    className="w-full border-none bg-transparent py-3.5 pl-10 pr-4 text-sm text-[#1A1A1F] dark:text-white placeholder:text-[#6B6B73] dark:placeholder:text-[#8A8A90] focus:ring-0 focus:outline-none"
                                    placeholder="Job title, skill, or company..."
                                    type="text"
                                    value={keyword}
                                    onChange={(e) => setKeyword(e.target.value)}
                                />
                            </div>

                            {/* Divider */}
                            <div className="h-px w-full sm:h-8 sm:w-px bg-black/[0.06] dark:bg-white/[0.08] my-1 sm:my-0" />

                            {/* Location */}
                            <div className="flex-1 relative group px-2">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B6B73] group-focus-within:text-[#5B4CDB] transition-colors">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <input
                                    id="hero-search-location"
                                    className="w-full border-none bg-transparent py-3.5 pl-10 pr-4 text-sm text-[#1A1A1F] dark:text-white placeholder:text-[#6B6B73] dark:placeholder:text-[#8A8A90] focus:ring-0 focus:outline-none"
                                    placeholder="City, state, or remote..."
                                    type="text"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                />
                            </div>

                            {/* Submit */}
                            <button
                                id="hero-search-submit"
                                type="submit"
                                className="gradient-cta h-[46px] px-7 rounded-lg text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 shrink-0 shadow-[0_4px_14px_0_rgba(91,76,219,0.3)] hover:shadow-[0_6px_20px_rgba(91,76,219,0.35)] hover:brightness-108 active:scale-[0.98]"
                            >
                                <Search className="w-4 h-4" /> Search
                            </button>
                        </form>

                        {/* Quick links */}
                        <div className="flex flex-wrap justify-center gap-2 mt-4">
                            <span className="text-xs text-[#6B6B73] dark:text-[#8A8A90] py-1">Trending:</span>
                            {['React Developer', 'Product Designer', 'Data Scientist'].map((tag) => (
                                <button
                                    key={tag}
                                    type="button"
                                    onClick={() => { setKeyword(tag); }}
                                    className="text-xs px-3 py-1 rounded-md bg-black/[0.03] dark:bg-white/[0.04] hover:bg-[#5B4CDB]/[0.06] dark:hover:bg-[#5B4CDB]/[0.1] text-[#6B6B73] dark:text-[#8A8A90] hover:text-[#5B4CDB] dark:hover:text-[#8B7EF8] border border-transparent hover:border-[#5B4CDB]/20 dark:hover:border-[#5B4CDB]/20 transition-all duration-200 cursor-pointer"
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </motion.div>

                    {/* ── Stat pills ─────────────────────────────── */}
                    <motion.div
                        variants={itemVariants}
                        className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto mb-16"
                    >
                        {STATS.map((s) => (
                            <div
                                key={s.label}
                                className="group relative flex flex-col items-center gap-1.5 py-5 px-4 rounded-xl bg-white/70 dark:bg-white/[0.03] border border-black/[0.04] dark:border-white/[0.06] hover:border-black/[0.08] dark:hover:border-white/[0.1] transition-all duration-200 cursor-default"
                            >
                                <s.icon className={`w-5 h-5 ${s.color} opacity-60 group-hover:opacity-100 transition-opacity duration-200`} />
                                <span className="text-xl font-bold text-[#1A1A1F] dark:text-white tracking-tight transition-colors duration-500 font-display">{s.value}</span>
                                <span className="text-[11px] font-medium text-[#6B6B73] dark:text-[#8A8A90] uppercase tracking-wider">{s.label}</span>
                            </div>
                        ))}
                    </motion.div>

                    {/* ── Floating skill tags ────────────────────── */}
                    <motion.div
                        variants={itemVariants}
                        className="flex flex-wrap justify-center gap-2.5 max-w-2xl mx-auto"
                    >
                        {TAGS.map((tag, i) => (
                            <motion.span
                                key={tag}
                                initial={{ opacity: 0, scale: 0.85 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 1 + i * 0.05, duration: 0.3 }}
                                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs font-medium bg-white/80 dark:bg-white/[0.04] border border-black/[0.05] dark:border-white/[0.06] text-[#6B6B73] dark:text-[#8A8A90] backdrop-blur-md hover:bg-[#5B4CDB]/[0.05] dark:hover:bg-[#5B4CDB]/[0.1] hover:text-[#5B4CDB] dark:hover:text-[#8B7EF8] hover:border-[#5B4CDB]/20 dark:hover:border-[#5B4CDB]/20 transition-all duration-200 cursor-default select-none"
                            >
                                {tag}
                            </motion.span>
                        ))}
                    </motion.div>

                    {/* Browse all CTA */}
                    <motion.div variants={itemVariants} className="mt-10 flex justify-center">
                        <button
                            type="button"
                            onClick={() => navigate('/jobs')}
                            className="group inline-flex items-center gap-2 text-sm font-semibold text-[#5B4CDB] dark:text-[#8B7EF8] hover:text-[#4A3BBF] dark:hover:text-[#B4AAFF] transition-colors duration-200"
                        >
                            Browse All Opportunities
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                        </button>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
