import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { CATEGORIES } from '@/lib/constants';

export function CategoriesSection() {
    return (
        <section className="py-16 md:py-24 bg-[#F0EFEC] dark:bg-[#111116] transition-colors duration-500">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4"
                >
                    <div>
                        <h2 className="editorial-headline text-3xl font-semibold text-[#1A1A1F] dark:text-white tracking-tight transition-colors duration-500">Explore Categories</h2>
                        <p className="mt-2 text-[#6B6B73] dark:text-[#8A8A90] transition-colors duration-500">Browse opportunities by your area of expertise.</p>
                    </div>
                    <Link to="/jobs" className="group flex items-center gap-1 text-sm font-semibold text-primary dark:text-[#8B7EF8] overflow-hidden">
                        <span className="relative">
                            View all categories
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary dark:bg-[#8B7EF8] transition-all duration-300 group-hover:w-full" />
                        </span>
                        <ArrowRight className="w-[18px] h-[18px] transition-transform group-hover:translate-x-1" />
                    </Link>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {CATEGORIES.map((cat, i) => (
                        <motion.div
                            key={cat.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: 0.08 * (i + 1) }}
                        >
                            <Link
                                to={cat.link}
                                className="group relative flex flex-col justify-between overflow-hidden rounded-xl bg-white dark:bg-white/[0.04] p-6 hover:-translate-y-0.5 transition-all duration-200 h-full border border-black/[0.04] dark:border-white/[0.06] hover:border-black/[0.08] dark:hover:border-white/[0.1]"
                            >
                                <div>
                                    <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[#F7F6F3] dark:bg-white/[0.06] border border-black/[0.04] dark:border-white/[0.06] ${cat.iconColor} group-hover:scale-105 ${cat.hoverBg} group-hover:text-white group-hover:border-transparent transition-all duration-200`}>
                                        <cat.icon className="w-5 h-5" />
                                    </div>
                                    <h3 className="text-[17px] font-semibold text-[#1A1A1F] dark:text-white transition-colors duration-500 font-display">{cat.label}</h3>
                                    <p className="mt-1 text-sm text-[#6B6B73] dark:text-[#8A8A90]">{cat.sub}</p>
                                </div>
                                <div className="mt-5 flex items-center justify-between">
                                    <span className="text-xs font-medium text-[#6B6B73] dark:text-[#8A8A90]">{cat.count}</span>
                                    <div className={`h-6 w-6 rounded-md bg-[#F0EFEC] dark:bg-white/[0.06] flex items-center justify-center text-[#6B6B73] dark:text-[#8A8A90] ${cat.arrowHover} transition-colors`}>
                                        <ChevronRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
