import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export function About() {
    return (
        <div className="flex-grow bg-[#F7F6F3] dark:bg-[#0A0A0F] transition-colors duration-500 py-20 relative overflow-hidden">
            <div className="absolute top-0 -left-40 w-96 h-96 bg-[#5B4CDB]/20 dark:bg-[#5B4CDB]/10 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] animate-blob pointer-events-none"></div>
            <div className="absolute top-0 -right-40 w-96 h-96 bg-[#8B7EF8]/20 dark:bg-[#8B7EF8]/10 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] animate-blob pointer-events-none" style={{ animationDelay: '2s' }}></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center max-w-3xl mx-auto mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-[#1A1A1F] dark:text-white mb-6 font-display">About <span className="text-gradient">EliteHire</span></h1>
                    <p className="text-lg text-[#6B6B73] dark:text-[#8A8A90]">We are on a mission to connect top-tier talent with world-class companies, making the hiring process seamless, transparent, and enjoyable for everyone.</p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12">
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.5 }} className="glass-card p-2 md:p-8 aspect-square md:aspect-auto flex items-center justify-center relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 to-[#8B7EF8]/8 group-hover:scale-105 transition-transform duration-500"></div>
                        <div className="text-center relative z-10">
                            <div className="w-20 h-20 bg-gradient-to-br from-primary to-[#8B7EF8] rounded-xl mx-auto flex items-center justify-center text-white text-3xl font-bold shadow-glow mb-6 group-hover:rotate-6 transition-transform duration-500 font-display">E</div>
                            <h3 className="text-2xl font-semibold text-[#1A1A1F] dark:text-white mb-2 font-display">Our Story</h3>
                            <p className="text-[#6B6B73] dark:text-[#8A8A90] max-w-sm mx-auto">Founded in 2026, EliteHire was built to bridge the gap between potential and opportunity, focusing on quality matching over quantity.</p>
                        </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 0.5 }} className="space-y-6">
                        <div className="glass-card p-8 border-l-[3px] border-l-primary hover:shadow-glow transition-all duration-300">
                            <h3 className="text-xl font-semibold text-[#1A1A1F] dark:text-white mb-4 font-display">Core Values</h3>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3"><span className="text-primary mt-0.5 material-symbols-outlined">stars</span> <span className="text-[#6B6B73] dark:text-[#EAEAE8]/80 font-medium">Excellence in everything we do.</span></li>
                                <li className="flex items-start gap-3"><span className="text-primary mt-0.5 material-symbols-outlined">handshake</span> <span className="text-[#6B6B73] dark:text-[#EAEAE8]/80 font-medium">Transparency and mutual trust.</span></li>
                                <li className="flex items-start gap-3"><span className="text-primary mt-0.5 material-symbols-outlined">lightbulb</span> <span className="text-[#6B6B73] dark:text-[#EAEAE8]/80 font-medium">Continuous innovation in tech.</span></li>
                            </ul>
                        </div>
                        <div className="glass-card p-8 bg-gradient-to-br from-primary/[0.03] to-[#8B7EF8]/[0.03] hover:shadow-soft transition-all duration-300">
                            <h3 className="text-xl font-semibold text-[#1A1A1F] dark:text-white mb-3 font-display">Join Our Team</h3>
                            <p className="text-[#6B6B73] dark:text-[#8A8A90] mb-4">We are always looking for passionate individuals to join our journey and reshape the future of work.</p>
                            <Link to="/jobs" className="inline-flex text-primary dark:text-[#8B7EF8] font-semibold hover:underline items-center gap-1 group">View open roles <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span></Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
