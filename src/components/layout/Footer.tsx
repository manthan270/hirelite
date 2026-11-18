import { Link } from 'react-router-dom';
import { Briefcase, Globe, Mail, Rss } from 'lucide-react';

export function Footer() {
    return (
        <footer className="bg-white dark:bg-gradient-to-b dark:from-[#101310] dark:to-[#0B0F0C] border-t border-black/[0.04] dark:border-white/[0.06] pt-16 pb-8 transition-colors duration-500">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Main grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
                    {/* Brand */}
                    <div className="col-span-2 lg:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="flex h-7 w-7 items-center justify-center rounded-md gradient-cta text-white shadow-md">
                                <Briefcase className="w-4 h-4" />
                            </div>
                            <span className="text-lg font-bold text-[#1A211D] dark:text-white transition-colors duration-500 font-display">
                                Elite<span className="text-primary dark:text-[#55A697]">Hire</span>
                            </span>
                        </div>
                        <p className="text-sm text-[#6B6B73] dark:text-[#8A8A90] max-w-xs mb-6 leading-relaxed">
                            Connecting the world's best talent with the most innovative companies. Find your path today.
                        </p>
                        <div className="flex gap-4">
                            <Link to="/about" className="text-[#6B6B73] dark:text-[#8A8A90] hover:text-primary dark:hover:text-[#55A697] transition-colors" aria-label="About EliteHire">
                                <Globe className="w-5 h-5" />
                            </Link>
                            <Link to="/contact" className="text-[#6B6B73] dark:text-[#8A8A90] hover:text-primary dark:hover:text-[#55A697] transition-colors" aria-label="Contact EliteHire">
                                <Mail className="w-5 h-5" />
                            </Link>
                            <Link to="/coming-soon?feature=Newsfeed" className="text-[#6B6B73] dark:text-[#8A8A90] hover:text-primary dark:hover:text-[#55A697] transition-colors" aria-label="Newsfeed">
                                <Rss className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>

                    {/* For Candidates */}
                    <div>
                        <h4 className="font-bold text-[#1A211D] dark:text-white mb-4 text-sm transition-colors duration-500 font-display">For Candidates</h4>
                        <ul className="space-y-3 text-sm text-[#6B6B73] dark:text-[#8A8A90]">
                            <li><Link to="/jobs" className="hover:text-[#1A211D] dark:hover:text-white transition-colors">Browse Jobs</Link></li>
                            <li><Link to="/coming-soon?feature=Salary%20Calculator" className="hover:text-[#1A211D] dark:hover:text-white transition-colors">Salary Calculator</Link></li>
                            <li><Link to="/coming-soon?feature=Career%20Advice" className="hover:text-[#1A211D] dark:hover:text-white transition-colors">Career Advice</Link></li>
                            <li><Link to="/coming-soon?feature=Resume%20Builder" className="hover:text-[#1A211D] dark:hover:text-white transition-colors">Resume Builder</Link></li>
                        </ul>
                    </div>

                    {/* For Employers */}
                    <div>
                        <h4 className="font-bold text-[#1A211D] dark:text-white mb-4 text-sm transition-colors duration-500 font-display">For Employers</h4>
                        <ul className="space-y-3 text-sm text-[#6B6B73] dark:text-[#8A8A90]">
                            <li><Link to="/post-job" className="hover:text-[#1A211D] dark:hover:text-white transition-colors">Post a Job</Link></li>
                            <li><Link to="/coming-soon?feature=Talent%20Solutions" className="hover:text-[#1A211D] dark:hover:text-white transition-colors">Talent Solutions</Link></li>
                            <li><Link to="/coming-soon?feature=Pricing" className="hover:text-[#1A211D] dark:hover:text-white transition-colors">Pricing</Link></li>
                            <li><Link to="/coming-soon?feature=Employer%20Resources" className="hover:text-[#1A211D] dark:hover:text-white transition-colors">Resources</Link></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="font-bold text-[#1A211D] dark:text-white mb-4 text-sm transition-colors duration-500 font-display">Company</h4>
                        <ul className="space-y-3 text-sm text-[#6B6B73] dark:text-[#8A8A90]">
                            <li><Link to="/about" className="hover:text-[#1A211D] dark:hover:text-white transition-colors">About Us</Link></li>
                            <li><Link to="/contact" className="hover:text-[#1A211D] dark:hover:text-white transition-colors">Contact</Link></li>
                            <li><Link to="/coming-soon?feature=Privacy%20Policy" className="hover:text-[#1A211D] dark:hover:text-white transition-colors">Privacy Policy</Link></li>
                            <li><Link to="/coming-soon?feature=Terms%20of%20Service" className="hover:text-[#1A211D] dark:hover:text-white transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="border-t border-black/[0.04] dark:border-white/[0.06] pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[#6B6B73] transition-colors duration-500">
                    <p>© 2026 EliteHire Inc. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link to="/coming-soon?feature=Privacy" className="hover:text-[#1A211D] dark:hover:text-[#EAEAE8] transition-colors">Privacy</Link>
                        <Link to="/coming-soon?feature=Terms" className="hover:text-[#1A211D] dark:hover:text-[#EAEAE8] transition-colors">Terms</Link>
                        <Link to="/coming-soon?feature=Sitemap" className="hover:text-[#1A211D] dark:hover:text-[#EAEAE8] transition-colors">Sitemap</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
