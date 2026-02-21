import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
    Search, MapPin, Code2, Palette, TrendingUp, Headphones,
    ArrowRight, ChevronRight, DollarSign, Clock, Building2, Users, Globe,
    Briefcase, Zap, Rocket, Diamond, Leaf, Bookmark
} from 'lucide-react';
import toast from 'react-hot-toast';

export function Home() {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState('');
    const [location, setLocation] = useState('');
    const [savedFeaturedJobs, setSavedFeaturedJobs] = useState<string[]>([]);

    const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const params = new URLSearchParams();
        if (keyword.trim()) {
            params.set('q', keyword.trim());
        }
        if (location.trim()) {
            params.set('location', location.trim());
        }

        const queryString = params.toString();
        navigate(queryString ? `/jobs?${queryString}` : '/jobs');
    };

    const toggleFeaturedSave = (jobId: string, label: string) => {
        setSavedFeaturedJobs((prev) => {
            const isSaved = prev.includes(jobId);
            const next = isSaved ? prev.filter((id) => id !== jobId) : [...prev, jobId];
            toast.success(isSaved ? `${label} removed from saved jobs.` : `${label} saved.`);
            return next;
        });
    };

    const handlePreviewBookmark = (label: string) => {
        toast.success(`${label} saved to favorites.`);
    };

    return (
        <div className="flex-grow bg-background-light dark:bg-background-dark transition-colors duration-500">
            <section className="relative overflow-hidden bg-gradient-to-br from-[#F8FAFC] via-white to-[#EEF2FF] dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950/20 transition-colors duration-500 border-b border-slate-200/50 dark:border-white/5 pb-10">
                {/* Background Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] pointer-events-none"></div>

                {/* Animated Background Orbs */}
                <div className="absolute top-0 -left-40 w-96 h-96 bg-indigo-400/20 dark:bg-indigo-600/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] animate-blob pointer-events-none"></div>
                <div className="absolute top-0 -right-40 w-96 h-96 bg-purple-400/20 dark:bg-purple-600/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] animate-blob pointer-events-none" style={{ animationDelay: '2s' }}></div>
                <div className="absolute -bottom-40 left-1/2 w-96 h-96 bg-pink-300/20 dark:bg-pink-500/10 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] animate-blob pointer-events-none" style={{ animationDelay: '4s' }}></div>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 py-12 lg:py-20">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            className="lg:col-span-7 flex flex-col justify-center"
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1, duration: 0.5 }}
                                className="inline-flex items-center gap-2 rounded-full border border-indigo-200/50 dark:border-indigo-500/20 bg-indigo-50/50 dark:bg-indigo-500/10 backdrop-blur-md px-4 py-1.5 text-xs font-bold text-indigo-700 dark:text-indigo-300 mb-6 w-fit shadow-sm hover:shadow-md transition-all duration-300"
                            >
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                                </span>
                                Over 12,000 active listings
                            </motion.div>
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                                className="text-4xl font-black tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-[64px] mb-6 leading-[1.1]"
                            >
                                Find Your Path <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] to-[#EC4899] dark:from-indigo-400 dark:to-pink-400">Build Your Future</span>
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                                className="text-lg text-slate-600 dark:text-slate-400 mb-10 max-w-xl leading-relaxed"
                            >
                                Discover your next career move with our data-driven matching system. Salary transparency and direct employer connections included.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.5 }}
                                className="w-full max-w-2xl bg-white/70 dark:bg-slate-800/60 backdrop-blur-xl border border-white/60 dark:border-slate-700/50 rounded-[20px] p-2.5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:border-white/80 dark:hover:border-slate-600 transition-all duration-500 mb-8"
                            >
                                <form className="flex flex-col md:flex-row md:items-center gap-2" onSubmit={handleSearchSubmit}>
                                    <div className="flex-1 relative group px-2">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-purple-600 dark:group-focus-within:text-purple-400 transition-colors">
                                            <Search className="w-[22px] h-[22px]" />
                                        </div>
                                        <input
                                            className="w-full border-none bg-transparent py-3.5 pl-10 pr-4 text-base text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-0 focus:outline-none"
                                            placeholder="Job title, keywords, or company"
                                            type="text"
                                            value={keyword}
                                            onChange={(e) => setKeyword(e.target.value)}
                                        />
                                    </div>
                                    <div className="h-px w-full md:h-10 md:w-px bg-slate-100 dark:bg-slate-800 my-2 md:my-0"></div>
                                    <div className="flex-1 relative group px-2">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-purple-600 dark:group-focus-within:text-purple-400 transition-colors">
                                            <MapPin className="w-[22px] h-[22px]" />
                                        </div>
                                        <input
                                            className="w-full border-none bg-transparent py-3.5 pl-10 pr-4 text-base text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-0 focus:outline-none"
                                            placeholder="City, state, or zip code"
                                            type="text"
                                            value={location}
                                            onChange={(e) => setLocation(e.target.value)}
                                        />
                                    </div>
                                    <Button type="submit" className="h-[52px] px-10 rounded-xl bg-gradient-to-b from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 text-white font-bold shadow-[0_4px_14px_0_rgba(59,130,246,0.39)] hover:shadow-[0_6px_20px_rgba(59,130,246,0.23)] hover:-translate-y-0.5 transition-all duration-300 border border-blue-400/20 flex items-center justify-center gap-2">
                                        <Search className="w-5 h-5" /> Search
                                    </Button>
                                </form>
                            </motion.div>

                            <div className="flex flex-wrap gap-3 text-sm text-slate-500 items-center">
                                <span className="font-medium text-slate-400">Popular:</span>
                                {['Product Design', 'Engineering', 'Remote'].map((tag) => (
                                    <Link key={tag} to={`/jobs?q=${encodeURIComponent(tag)}`} className="px-3 py-1 rounded-full bg-white/60 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-primary/50 hover:text-primary transition-all text-xs font-medium">
                                        {tag}
                                    </Link>
                                ))}
                            </div>
                        </motion.div>

                        {/* Right Content - Scrolling Cards */}
                        <div className="lg:col-span-5 relative flex items-center mt-10 lg:mt-0">
                            <div className="absolute -right-10 top-10 -z-10 h-[110%] w-[110%] rounded-full bg-gradient-to-tr from-indigo-300/30 via-purple-300/30 to-pink-300/30 dark:from-indigo-900/40 dark:via-purple-900/40 dark:to-pink-900/30 blur-3xl animate-pulse-slow"></div>
                            <div className="relative w-full h-full max-h-[650px] flex flex-col bg-white/40 dark:bg-slate-800/40 backdrop-blur-xl border border-white/60 dark:border-slate-700/50 rounded-[24px] shadow-lg overflow-hidden">
                                <div className="flex items-center justify-between border-b border-white/40 dark:border-slate-700/50 bg-white/50 dark:bg-slate-800/50 px-6 py-4 backdrop-blur-md">
                                    <div className="flex items-center gap-2">
                                        <div className="relative flex h-2.5 w-2.5">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                                        </div>
                                        <h3 className="font-bold text-slate-800 dark:text-slate-200 tracking-tight">Latest Postings</h3>
                                    </div>
                                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md">Updated 2m ago</span>
                                </div>
                                <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
                                    {/* Job Card 1 */}
                                    <div onClick={() => navigate('/jobs/techcorp-frontend')} className="group flex flex-col gap-3 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 border-l-[4px] border-l-indigo-500 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:bg-white dark:hover:bg-slate-800 cursor-pointer relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handlePreviewBookmark('Senior React Developer');
                                                }}
                                                className="text-slate-300 hover:text-indigo-500 transition-colors"
                                                aria-label="Save Senior React Developer"
                                            >
                                                <Bookmark className="w-5 h-5" />
                                            </button>
                                        </div>
                                        <div className="flex justify-between items-start">
                                            <div className="flex gap-4 items-center w-full">
                                                <div className="h-12 w-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 shadow-sm border border-indigo-100 shrink-0">
                                                    <Code2 className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <h4 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors text-lg">Senior React Developer</h4>
                                                        <div className="h-5 w-5 rounded bg-slate-900 flex items-center justify-center text-[10px] font-bold text-white shadow-sm" title="TechFlow Inc.">TF</div>
                                                    </div>
                                                    <p className="text-sm text-slate-500 font-medium">TechFlow Inc.</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            <span className="inline-flex items-center gap-1.5 rounded-md bg-indigo-50/50 border border-indigo-100 px-2.5 py-1 text-xs font-semibold text-indigo-700">
                                                <DollarSign className="w-3.5 h-3.5" />
                                                ₹18L - ₹25L
                                            </span>
                                            <span className="inline-flex items-center gap-1.5 rounded-md bg-slate-50 border border-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                                                <Briefcase className="w-3.5 h-3.5" />
                                                3-5 Years
                                            </span>
                                            <span className="inline-flex items-center gap-1.5 rounded-md bg-slate-50 border border-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                                                <Globe className="w-3.5 h-3.5" />
                                                Remote India
                                            </span>
                                        </div>
                                        <div className="mt-3 pt-3 border-t border-slate-50 flex justify-between items-center">
                                            <span className="text-xs text-slate-400 font-medium">Posted 1h ago</span>
                                            <Link to="/jobs/techcorp-frontend" className="text-xs font-bold text-primary flex items-center gap-1 group-hover:gap-2 transition-all">Apply Now <ArrowRight className="w-3.5 h-3.5" /></Link>
                                        </div>
                                    </div>

                                    {/* Job Card 2 */}
                                    <div onClick={() => navigate('/jobs/edtech-ux')} className="group flex flex-col gap-3 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 border-l-[4px] border-l-orange-500 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:bg-white dark:hover:bg-slate-800 cursor-pointer relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handlePreviewBookmark('Product Designer');
                                                }}
                                                className="text-slate-300 hover:text-orange-500 transition-colors"
                                                aria-label="Save Product Designer"
                                            >
                                                <Bookmark className="w-5 h-5" />
                                            </button>
                                        </div>
                                        <div className="flex justify-between items-start">
                                            <div className="flex gap-4 items-center w-full">
                                                <div className="h-12 w-12 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600 shadow-sm border border-orange-100 shrink-0">
                                                    <Palette className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <h4 className="font-bold text-slate-900 group-hover:text-orange-600 transition-colors text-lg">Product Designer</h4>
                                                        <div className="h-5 w-5 rounded bg-orange-600 flex items-center justify-center text-[10px] font-bold text-white shadow-sm" title="Creative Solutions">CS</div>
                                                    </div>
                                                    <p className="text-sm text-slate-500 font-medium">Creative Solutions</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            <span className="inline-flex items-center gap-1.5 rounded-md bg-orange-50/50 border border-orange-100 px-2.5 py-1 text-xs font-semibold text-orange-700">
                                                <DollarSign className="w-3.5 h-3.5" />
                                                ₹12L - ₹18L
                                            </span>
                                            <span className="inline-flex items-center gap-1.5 rounded-md bg-slate-50 border border-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                                                <Briefcase className="w-3.5 h-3.5" />
                                                2-4 Years
                                            </span>
                                            <span className="inline-flex items-center gap-1.5 rounded-md bg-slate-50 border border-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                                                <MapPin className="w-3.5 h-3.5" />
                                                Mumbai, MH
                                            </span>
                                        </div>
                                        <div className="mt-3 pt-3 border-t border-slate-50 flex justify-between items-center">
                                            <span className="text-xs text-slate-400 font-medium">Posted 3h ago</span>
                                            <Link to="/jobs/edtech-ux" className="text-xs font-bold text-orange-500 flex items-center gap-1 group-hover:gap-2 transition-all">Apply Now <ArrowRight className="w-3.5 h-3.5" /></Link>
                                        </div>
                                    </div>

                                    {/* Job Card 3 */}
                                    <div onClick={() => navigate('/jobs/health-data')} className="group flex flex-col gap-3 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 border-l-[4px] border-l-emerald-500 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:bg-white dark:hover:bg-slate-800 cursor-pointer relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handlePreviewBookmark('Data Scientist');
                                                }}
                                                className="text-slate-300 hover:text-emerald-500 transition-colors"
                                                aria-label="Save Data Scientist"
                                            >
                                                <Bookmark className="w-5 h-5" />
                                            </button>
                                        </div>
                                        <div className="flex justify-between items-start">
                                            <div className="flex gap-4 items-center w-full">
                                                <div className="h-12 w-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 shadow-sm border border-emerald-100 shrink-0">
                                                    <TrendingUp className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <h4 className="font-bold text-slate-900 group-hover:text-emerald-600 transition-colors text-lg">Data Scientist</h4>
                                                        <div className="h-5 w-5 rounded bg-emerald-600 flex items-center justify-center text-[10px] font-bold text-white shadow-sm" title="DataCorp">DC</div>
                                                    </div>
                                                    <p className="text-sm text-slate-500 font-medium">DataCorp</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            <span className="inline-flex items-center gap-1.5 rounded-md bg-emerald-50/50 border border-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                                                <DollarSign className="w-3.5 h-3.5" />
                                                ₹25L - ₹35L
                                            </span>
                                            <span className="inline-flex items-center gap-1.5 rounded-md bg-slate-50 border border-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                                                <Briefcase className="w-3.5 h-3.5" />
                                                4+ Years
                                            </span>
                                            <span className="inline-flex items-center gap-1.5 rounded-md bg-slate-50 border border-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                                                <Globe className="w-3.5 h-3.5" />
                                                Hybrid
                                            </span>
                                        </div>
                                        <div className="mt-3 pt-3 border-t border-slate-50 flex justify-between items-center">
                                            <span className="text-xs text-slate-400 font-medium">Posted 5h ago</span>
                                            <Link to="/jobs/health-data" className="text-xs font-bold text-emerald-500 flex items-center gap-1 group-hover:gap-2 transition-all">Apply Now <ArrowRight className="w-3.5 h-3.5" /></Link>
                                        </div>
                                    </div>

                                    {/* Job Card 4 */}
                                    <div onClick={() => navigate('/jobs/saas-product')} className="group flex flex-col gap-3 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 border-l-[4px] border-l-purple-500 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:bg-white dark:hover:bg-slate-800 cursor-pointer relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handlePreviewBookmark('Marketing Manager');
                                                }}
                                                className="text-slate-300 hover:text-purple-500 transition-colors"
                                                aria-label="Save Marketing Manager"
                                            >
                                                <Bookmark className="w-5 h-5" />
                                            </button>
                                        </div>
                                        <div className="flex justify-between items-start">
                                            <div className="flex gap-4 items-center w-full">
                                                <div className="h-12 w-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 shadow-sm border border-purple-100 shrink-0">
                                                    <Headphones className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <h4 className="font-bold text-slate-900 group-hover:text-purple-600 transition-colors text-lg">Marketing Manager</h4>
                                                        <div className="h-5 w-5 rounded bg-purple-600 flex items-center justify-center text-[10px] font-bold text-white shadow-sm" title="GrowthBox">GB</div>
                                                    </div>
                                                    <p className="text-sm text-slate-500 font-medium">GrowthBox</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            <span className="inline-flex items-center gap-1.5 rounded-md bg-purple-50/50 border border-purple-100 px-2.5 py-1 text-xs font-semibold text-purple-700">
                                                <DollarSign className="w-3.5 h-3.5" />
                                                ₹10L - ₹15L
                                            </span>
                                            <span className="inline-flex items-center gap-1.5 rounded-md bg-slate-50 border border-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                                                <Briefcase className="w-3.5 h-3.5" />
                                                5+ Years
                                            </span>
                                            <span className="inline-flex items-center gap-1.5 rounded-md bg-slate-50 border border-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                                                <MapPin className="w-3.5 h-3.5" />
                                                Pune, MH
                                            </span>
                                        </div>
                                        <div className="mt-3 pt-3 border-t border-slate-50 flex justify-between items-center">
                                            <span className="text-xs text-slate-400 font-medium">Posted 6h ago</span>
                                            <Link to="/jobs/saas-product" className="text-xs font-bold text-purple-500 flex items-center gap-1 group-hover:gap-2 transition-all">Apply Now <ArrowRight className="w-3.5 h-3.5" /></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-background-light dark:from-background-dark to-transparent"></div>
                        </div>
                    </div>
                </div>
            </section >

            <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-10 transition-colors duration-300"
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <p className="text-center text-xs font-bold tracking-widest text-slate-400 dark:text-slate-500 mb-8 uppercase">Trusted by innovative teams</p>
                    <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
                        <div className="flex items-center gap-2 text-xl font-bold text-slate-800 dark:text-slate-200"><Diamond className="w-6 h-6 text-blue-600 dark:text-blue-400" /> Acme Corp</div>
                        <div className="flex items-center gap-2 text-xl font-bold text-slate-800 dark:text-slate-200"><Zap className="w-6 h-6 text-green-600 dark:text-green-400" /> EnergyInc</div>
                        <div className="flex items-center gap-2 text-xl font-bold text-slate-800 dark:text-slate-200"><Code2 className="w-6 h-6 text-purple-600 dark:text-purple-400" /> DevSpace</div>
                        <div className="flex items-center gap-2 text-xl font-bold text-slate-800 dark:text-slate-200"><Rocket className="w-6 h-6 text-red-500 dark:text-red-400" /> RocketLab</div>
                        <div className="flex items-center gap-2 text-xl font-bold text-slate-800 dark:text-slate-200"><Leaf className="w-6 h-6 text-emerald-600 dark:text-emerald-400" /> GreenTech</div>
                    </div>
                </div>
            </motion.section>

            <section className="py-16 md:py-24 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4"
                    >
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Explore Categories</h2>
                            <p className="mt-2 text-slate-600 dark:text-slate-400">Browse opportunities by your area of expertise.</p>
                        </div>
                        <Link to="/jobs" className="group flex items-center gap-1 text-sm font-semibold text-primary overflow-hidden">
                            <span className="relative">
                                View all categories
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                            </span>
                            <ArrowRight className="w-[18px] h-[18px] transition-transform group-hover:translate-x-1" />
                        </Link>
                    </motion.div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Category 1 */}
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
                            <Link to="/jobs?q=Development" className="group relative flex flex-col justify-between overflow-hidden rounded-[24px] border border-slate-200/60 dark:border-slate-700/50 bg-white/70 dark:bg-slate-800/70 backdrop-blur-md p-6 hover:border-blue-300/50 dark:hover:border-blue-500/50 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:-translate-y-1 transition-all duration-300 h-full">
                                <div>
                                    <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-700 text-blue-600 dark:text-blue-400 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                                        <Code2 className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Development</h3>
                                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Software, Data, AI</p>
                                </div>
                                <div className="mt-6 flex items-center justify-between">
                                    <span className="text-xs font-medium text-slate-400 dark:text-slate-500">1,204 jobs</span>
                                    <div className="h-6 w-6 rounded-full bg-slate-50 dark:bg-slate-700/50 flex items-center justify-center text-slate-400 dark:text-slate-500 group-hover:bg-blue-600/10 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                        <ChevronRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>

                        {/* Category 2 */}
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
                            <Link to="/jobs?q=Design" className="group relative flex flex-col justify-between overflow-hidden rounded-[24px] border border-slate-200/60 dark:border-slate-700/50 bg-white/70 dark:bg-slate-800/70 backdrop-blur-md p-6 hover:border-orange-300/50 dark:hover:border-orange-500/50 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:-translate-y-1 transition-all duration-300 h-full">
                                <div>
                                    <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-700 text-orange-600 dark:text-orange-400 group-hover:scale-110 group-hover:bg-orange-600 group-hover:text-white transition-all duration-300">
                                        <Palette className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Design</h3>
                                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">UI/UX, Graphic, Brand</p>
                                </div>
                                <div className="mt-6 flex items-center justify-between">
                                    <span className="text-xs font-medium text-slate-400 dark:text-slate-500">842 jobs</span>
                                    <div className="h-6 w-6 rounded-full bg-slate-50 dark:bg-slate-700/50 flex items-center justify-center text-slate-400 dark:text-slate-500 group-hover:bg-orange-600/10 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                                        <ChevronRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>

                        {/* Category 3 */}
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}>
                            <Link to="/jobs?q=Marketing" className="group relative flex flex-col justify-between overflow-hidden rounded-[24px] border border-slate-200/60 dark:border-slate-700/50 bg-white/70 dark:bg-slate-800/70 backdrop-blur-md p-6 hover:border-emerald-300/50 dark:hover:border-emerald-500/50 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:-translate-y-1 transition-all duration-300 h-full">
                                <div>
                                    <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-700 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                                        <TrendingUp className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Sales & Marketing</h3>
                                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Account Exec, SEO</p>
                                </div>
                                <div className="mt-6 flex items-center justify-between">
                                    <span className="text-xs font-medium text-slate-400 dark:text-slate-500">2,100 jobs</span>
                                    <div className="h-6 w-6 rounded-full bg-slate-50 dark:bg-slate-700/50 flex items-center justify-center text-slate-400 dark:text-slate-500 group-hover:bg-emerald-600/10 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                                        <ChevronRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>

                        {/* Category 4 */}
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 }}>
                            <Link to="/jobs?q=Customer%20Success" className="group relative flex flex-col justify-between overflow-hidden rounded-[24px] border border-slate-200/60 dark:border-slate-700/50 bg-white/70 dark:bg-slate-800/70 backdrop-blur-md p-6 hover:border-purple-300/50 dark:hover:border-purple-500/50 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:-translate-y-1 transition-all duration-300 h-full">
                                <div>
                                    <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-700 text-purple-600 dark:text-purple-400 group-hover:scale-110 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300">
                                        <Headphones className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Customer Success</h3>
                                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Support, Success, Ops</p>
                                </div>
                                <div className="mt-6 flex items-center justify-between">
                                    <span className="text-xs font-medium text-slate-400 dark:text-slate-500">540 jobs</span>
                                    <div className="h-6 w-6 rounded-full bg-slate-50 dark:bg-slate-700/50 flex items-center justify-center text-slate-400 dark:text-slate-500 group-hover:bg-purple-600/10 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                                        <ChevronRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 transition-colors duration-300">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-8"
                    >
                        Featured Opportunities
                    </motion.h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Feature 1 */}
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="flex flex-col justify-between bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[28px] p-7 shadow-sm border border-slate-200/60 dark:border-slate-700/50 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:border-indigo-500/30 dark:hover:border-indigo-500/50 hover:-translate-y-1 transition-all duration-300 h-full relative group">
                            <div>
                                <div className="flex justify-between items-start mb-4">
                                    <div className="h-12 w-12 rounded-xl bg-slate-900 dark:bg-slate-800 dark:border dark:border-slate-700 text-white flex items-center justify-center text-xl font-bold">U</div>
                                    <Badge className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30 border-green-200 dark:border-green-800 px-2.5 py-0.5 pointer-events-none">New</Badge>
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Staff Software Engineer</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Uber | Bangalore, KA</p>
                                <div className="mt-4 grid grid-cols-2 gap-y-2 text-sm text-slate-600 dark:text-slate-300">
                                    <div className="flex items-center gap-1.5"><DollarSign className="w-4 h-4 text-slate-400 dark:text-slate-500" /> ₹35L - ₹50L</div>
                                    <div className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-slate-400 dark:text-slate-500" /> Full-time</div>
                                    <div className="flex items-center gap-1.5"><Building2 className="w-4 h-4 text-slate-400 dark:text-slate-500" /> On-site</div>
                                    <div className="flex items-center gap-1.5"><Users className="w-4 h-4 text-slate-400 dark:text-slate-500" /> 500+ employees</div>
                                </div>
                            </div>
                            <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 flex gap-3">
                                <Button asChild className="flex-1 rounded-xl bg-slate-900 dark:bg-blue-600 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 dark:hover:bg-blue-700 transition-colors h-auto">
                                    <Link to="/jobs/techcorp-frontend">Apply Now</Link>
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => toggleFeaturedSave('featured-uber', 'Staff Software Engineer')}
                                    className="rounded-xl border border-slate-200 dark:border-slate-700 px-3 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors h-auto"
                                >
                                    <Bookmark className={`w-5 h-5 ${savedFeaturedJobs.includes('featured-uber') ? 'text-primary fill-current' : ''}`} />
                                </Button>
                            </div>
                        </motion.div>

                        {/* Feature 2 */}
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} className="flex flex-col justify-between bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[28px] p-7 shadow-sm border border-slate-200/60 dark:border-slate-700/50 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:border-indigo-500/30 dark:hover:border-indigo-500/50 hover:-translate-y-1 transition-all duration-300 h-full relative group">
                            <div>
                                <div className="flex justify-between items-start mb-4">
                                    <div className="h-12 w-12 rounded-xl bg-blue-600 text-white flex items-center justify-center text-xl font-bold">A</div>
                                    <Badge className="bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/30 border-purple-200 dark:border-purple-800 px-2.5 py-0.5 pointer-events-none">Hot</Badge>
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Lead Product Designer</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Airbnb | Remote (India)</p>
                                <div className="mt-4 grid grid-cols-2 gap-y-2 text-sm text-slate-600 dark:text-slate-300">
                                    <div className="flex items-center gap-1.5"><DollarSign className="w-4 h-4 text-slate-400 dark:text-slate-500" /> ₹30L - ₹40L</div>
                                    <div className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-slate-400 dark:text-slate-500" /> Full-time</div>
                                    <div className="flex items-center gap-1.5"><Globe className="w-4 h-4 text-slate-400 dark:text-slate-500" /> Remote</div>
                                    <div className="flex items-center gap-1.5"><Users className="w-4 h-4 text-slate-400 dark:text-slate-500" /> 1k+ employees</div>
                                </div>
                            </div>
                            <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 flex gap-3">
                                <Button asChild className="flex-1 rounded-xl bg-slate-900 dark:bg-blue-600 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 dark:hover:bg-blue-700 transition-colors h-auto">
                                    <Link to="/jobs/edtech-ux">Apply Now</Link>
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => toggleFeaturedSave('featured-airbnb', 'Lead Product Designer')}
                                    className="rounded-xl border border-slate-200 dark:border-slate-700 px-3 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors h-auto"
                                >
                                    <Bookmark className={`w-5 h-5 ${savedFeaturedJobs.includes('featured-airbnb') ? 'text-primary fill-current' : ''}`} />
                                </Button>
                            </div>
                        </motion.div>

                        {/* Feature 3 */}
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }} className="flex flex-col justify-between bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[28px] p-7 shadow-sm border border-slate-200/60 dark:border-slate-700/50 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:border-indigo-500/30 dark:hover:border-indigo-500/50 hover:-translate-y-1 transition-all duration-300 h-full relative group">
                            <div>
                                <div className="flex justify-between items-start mb-4">
                                    <div className="h-12 w-12 rounded-xl bg-red-500 text-white flex items-center justify-center text-xl font-bold">N</div>
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Backend Engineer</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Netflix | Hyderabad, TS</p>
                                <div className="mt-4 grid grid-cols-2 gap-y-2 text-sm text-slate-600 dark:text-slate-300">
                                    <div className="flex items-center gap-1.5"><DollarSign className="w-4 h-4 text-slate-400 dark:text-slate-500" /> ₹40L+</div>
                                    <div className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-slate-400 dark:text-slate-500" /> Full-time</div>
                                    <div className="flex items-center gap-1.5"><Building2 className="w-4 h-4 text-slate-400 dark:text-slate-500" /> Hybrid</div>
                                    <div className="flex items-center gap-1.5"><Users className="w-4 h-4 text-slate-400 dark:text-slate-500" /> 5k+ employees</div>
                                </div>
                            </div>
                            <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 flex gap-3">
                                <Button asChild className="flex-1 rounded-xl bg-slate-900 dark:bg-blue-600 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 dark:hover:bg-blue-700 transition-colors h-auto">
                                    <Link to="/jobs/fintech-backend">Apply Now</Link>
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => toggleFeaturedSave('featured-netflix', 'Backend Engineer')}
                                    className="rounded-xl border border-slate-200 dark:border-slate-700 px-3 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors h-auto"
                                >
                                    <Bookmark className={`w-5 h-5 ${savedFeaturedJobs.includes('featured-netflix') ? 'text-primary fill-current' : ''}`} />
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                    <div className="mt-12 text-center">
                        <Button asChild variant="outline" className="inline-flex items-center justify-center rounded-[16px] border border-primary/20 dark:border-primary/30 bg-white/50 dark:bg-slate-800/50 backdrop-blur-md px-10 py-4 text-[15px] font-bold text-primary dark:text-indigo-400 shadow-sm hover:shadow-[0_8px_30px_rgba(79,70,229,0.15)] hover:bg-primary hover:text-white hover:border-transparent hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 h-auto">
                            <Link to="/jobs">Load More Jobs</Link>
                        </Button>
                    </div>
                </div>
            </section>
        </div >
    );
}

