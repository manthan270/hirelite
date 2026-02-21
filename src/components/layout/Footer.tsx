import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Globe, Mail, Rss, Send } from 'lucide-react';
import toast from 'react-hot-toast';

export function Footer() {
    const [email, setEmail] = useState('');

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.includes('@')) {
            toast.error('Please enter a valid email address.');
            return;
        }

        toast.success('Thanks! You are subscribed to product updates.');
        setEmail('');
    };

    return (
        <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 pt-16 pb-8 transition-colors">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-12 rounded-2xl border border-slate-200 dark:border-slate-700 bg-gradient-to-r from-white to-indigo-50/60 dark:from-slate-900 dark:to-slate-800/80 p-6 md:p-8">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">New</p>
                            <h3 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">Weekly Career Signal</h3>
                            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                                Get curated openings, salary trends, and interview tips every Friday.
                            </p>
                        </div>
                        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row w-full lg:w-auto gap-3">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="h-11 min-w-[250px] rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary/40"
                            />
                            <button
                                type="submit"
                                className="inline-flex h-11 items-center justify-center rounded-xl bg-primary px-5 text-sm font-semibold text-white hover:bg-primary-dark transition-colors"
                            >
                                Subscribe
                                <Send className="ml-2 h-4 w-4" />
                            </button>
                        </form>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
                    <div className="col-span-2 lg:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-purple-600 text-white shadow-md">
                                <Briefcase className="w-4 h-4" />
                            </div>
                            <span className="text-lg font-bold text-slate-900 dark:text-white">Elite<span className="text-primary">Hire</span></span>
                        </div>
                        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs mb-6">
                            Connecting the world's best talent with the most innovative companies. Find your path today.
                        </p>
                        <div className="flex gap-4">
                            <Link to="/about" className="text-slate-400 hover:text-primary dark:hover:text-primary transition-colors" aria-label="About EliteHire"><Globe className="w-5 h-5" /></Link>
                            <Link to="/contact" className="text-slate-400 hover:text-primary dark:hover:text-primary transition-colors" aria-label="Contact EliteHire"><Mail className="w-5 h-5" /></Link>
                            <Link to="/coming-soon?feature=Newsfeed" className="text-slate-400 hover:text-primary dark:hover:text-primary transition-colors" aria-label="Newsfeed"><Rss className="w-5 h-5" /></Link>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-4">For Candidates</h4>
                        <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                            <li><Link to="/jobs" className="hover:text-primary dark:hover:text-primary transition-colors">Browse Jobs</Link></li>
                            <li><Link to="/coming-soon?feature=Salary%20Calculator" className="hover:text-primary dark:hover:text-primary transition-colors">Salary Calculator</Link></li>
                            <li><Link to="/coming-soon?feature=Career%20Advice" className="hover:text-primary dark:hover:text-primary transition-colors">Career Advice</Link></li>
                            <li><Link to="/coming-soon?feature=Resume%20Builder" className="hover:text-primary dark:hover:text-primary transition-colors">Resume Builder</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-4">For Employers</h4>
                        <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                            <li><Link to="/post-job" className="hover:text-primary dark:hover:text-primary transition-colors">Post a Job</Link></li>
                            <li><Link to="/coming-soon?feature=Talent%20Solutions" className="hover:text-primary dark:hover:text-primary transition-colors">Talent Solutions</Link></li>
                            <li><Link to="/coming-soon?feature=Pricing" className="hover:text-primary dark:hover:text-primary transition-colors">Pricing</Link></li>
                            <li><Link to="/coming-soon?feature=Employer%20Resources" className="hover:text-primary dark:hover:text-primary transition-colors">Resources</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-4">Company</h4>
                        <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                            <li><Link to="/about" className="hover:text-primary dark:hover:text-primary transition-colors">About Us</Link></li>
                            <li><Link to="/contact" className="hover:text-primary dark:hover:text-primary transition-colors">Contact</Link></li>
                            <li><Link to="/coming-soon?feature=Privacy%20Policy" className="hover:text-primary dark:hover:text-primary transition-colors">Privacy Policy</Link></li>
                            <li><Link to="/coming-soon?feature=Terms%20of%20Service" className="hover:text-primary dark:hover:text-primary transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-slate-100 dark:border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500 dark:text-slate-500">
                    <p>(c) 2026 EliteHire Inc. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link to="/coming-soon?feature=Privacy" className="hover:text-slate-900 dark:hover:text-slate-300">Privacy</Link>
                        <Link to="/coming-soon?feature=Terms" className="hover:text-slate-900 dark:hover:text-slate-300">Terms</Link>
                        <Link to="/coming-soon?feature=Sitemap" className="hover:text-slate-900 dark:hover:text-slate-300">Sitemap</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
