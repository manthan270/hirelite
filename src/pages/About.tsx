import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Handshake, Lightbulb, Star } from 'lucide-react';

export function About() {
    return (
        <div className="flex-grow bg-[#F8F6EE] dark:bg-[#101310] transition-colors duration-500 py-16 relative overflow-hidden">
            <div className="absolute top-0 -left-40 w-96 h-96 bg-[#1F766A]/20 dark:bg-[#1F766A]/10 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] animate-blob pointer-events-none"></div>
            <div className="absolute top-0 -right-40 w-96 h-96 bg-[#55A697]/20 dark:bg-[#55A697]/10 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] animate-blob pointer-events-none" style={{ animationDelay: '2s' }}></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center max-w-3xl mx-auto mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-[#1A211D] dark:text-white mb-6 font-display">About <span className="text-gradient">EliteHire</span></h1>
                    <p className="text-lg text-[#6B6B73] dark:text-[#8A8A90]">We are on a mission to connect top-tier talent with world-class companies, making the hiring process seamless, transparent, and enjoyable for everyone.</p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8">
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.5 }} className="glass-card relative flex items-center justify-center overflow-hidden p-6 group">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 to-[#55A697]/8 group-hover:scale-105 transition-transform duration-500"></div>
                        <div className="text-center relative z-10">
                            <div className="w-20 h-20 bg-gradient-to-br from-primary to-[#55A697] rounded-xl mx-auto flex items-center justify-center text-white text-3xl font-bold shadow-glow mb-6 group-hover:rotate-6 transition-transform duration-500 font-display">E</div>
                            <h3 className="text-2xl font-semibold text-[#1A211D] dark:text-white mb-2 font-display">Our Story</h3>
                            <p className="text-[#6B6B73] dark:text-[#8A8A90] max-w-sm mx-auto">Founded in 2026, EliteHire was built to bridge the gap between potential and opportunity, focusing on quality matching over quantity.</p>
                        </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 0.5 }} className="space-y-4">
                        <div className="glass-card p-6 border-l-[3px] border-l-primary hover:shadow-glow transition-all duration-300">
                            <h3 className="text-xl font-semibold text-[#1A211D] dark:text-white mb-4 font-display">Core Values</h3>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3"><Star aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-primary" /><span className="text-[#6B6B73] dark:text-[#EAEAE8]/80 font-medium">Excellence in everything we do.</span></li>
                                <li className="flex items-start gap-3"><Handshake aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-primary" /><span className="text-[#6B6B73] dark:text-[#EAEAE8]/80 font-medium">Transparency and mutual trust.</span></li>
                                <li className="flex items-start gap-3"><Lightbulb aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-primary" /><span className="text-[#6B6B73] dark:text-[#EAEAE8]/80 font-medium">Continuous innovation in tech.</span></li>
                            </ul>
                        </div>
                        <div className="glass-card p-6 bg-gradient-to-br from-primary/[0.03] to-[#55A697]/[0.03] hover:shadow-soft transition-all duration-300">
                            <h3 className="text-xl font-semibold text-[#1A211D] dark:text-white mb-3 font-display">Join Our Team</h3>
                            <p className="text-[#6B6B73] dark:text-[#8A8A90] mb-4">We are always looking for passionate individuals to join our journey and reshape the future of work.</p>
                            <Link to="/jobs" className="inline-flex items-center gap-1 text-primary font-semibold hover:underline dark:text-[#55A697] group">View open roles <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
