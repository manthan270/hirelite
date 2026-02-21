import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { Menu, X, LogOut } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';

export function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { user, isAuthenticated, logout } = useAuthStore();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    const isEmployer = user?.role === 'employer';

    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location.pathname]);

    return (
        <nav className="sticky top-0 z-50 w-full glass-morphism transition-all duration-500">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center space-x-2 group">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-xl group-hover:rotate-12 group-hover:scale-110 transition-all shadow-glow">
                                E
                            </div>
                            <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Elite<span className="text-primary">Hire</span></span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex ml-12 space-x-8">
                            <Link to="/jobs" className="text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary font-medium transition-colors">
                                Find Jobs
                            </Link>
                            <Link to="/about" className="text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary font-medium transition-colors">
                                About Us
                            </Link>
                            <Link to="/contact" className="text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary font-medium transition-colors">
                                Contact
                            </Link>
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className="flex items-center space-x-4">
                        <ThemeToggle />

                        {!isAuthenticated ? (
                            <div className="hidden md:flex items-center space-x-4">
                                <Link to="/login" className="text-slate-900 dark:text-white font-semibold hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                    Login
                                </Link>
                                <Link to="/register" className="bg-gradient-to-b from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 hover:shadow-[0_6px_20px_rgba(59,130,246,0.23)] hover:-translate-y-0.5 text-white px-6 py-2.5 rounded-full font-medium transition-all shadow-[0_4px_14px_0_rgba(59,130,246,0.39)] border border-blue-400/20">
                                    Register
                                </Link>
                            </div>
                        ) : (
                            <div className="flex items-center gap-4">
                                <Link to={isEmployer ? "/dashboard/employer" : "/dashboard/candidate"} className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors">
                                    Dashboard
                                </Link>
                                <Button variant="ghost" size="sm" onClick={handleLogout} className="text-slate-500 hover:text-red-500" title="Sign out">
                                    <LogOut className="w-5 h-5" />
                                </Button>
                            </div>
                        )}

                        {/* Mobile Menu Button */}
                        <div className="md:hidden flex items-center">
                            <button
                                type="button"
                                onClick={toggleMobileMenu}
                                className="text-slate-600 dark:text-slate-300 hover:text-primary focus:outline-none"
                                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                            >
                                {isMobileMenuOpen ? (
                                    <X className="h-6 w-6" />
                                ) : (
                                    <Menu className="h-6 w-6" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            <div className={`md:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-t border-slate-100/50 dark:border-slate-800/50 shadow-2xl overflow-hidden transition-all duration-300 ease-in-out absolute w-full left-0 z-40 ${isMobileMenuOpen ? "max-h-[32rem] opacity-100" : "max-h-0 opacity-0"}`}>
                <div className="px-6 py-6 space-y-4">
                    <Link to="/jobs" onClick={toggleMobileMenu} className="block text-slate-600 dark:text-slate-300 font-medium hover:text-primary dark:hover:text-primary">
                        Find Jobs
                    </Link>
                    <Link to="/about" onClick={toggleMobileMenu} className="block text-slate-600 dark:text-slate-300 font-medium hover:text-primary dark:hover:text-primary">
                        About Us
                    </Link>
                    <Link to="/contact" onClick={toggleMobileMenu} className="block text-slate-600 dark:text-slate-300 font-medium hover:text-primary dark:hover:text-primary">
                        Contact
                    </Link>

                    {isAuthenticated && (
                        <Link
                            to={isEmployer ? "/dashboard/employer" : "/dashboard/candidate"}
                            onClick={toggleMobileMenu}
                            className="block text-slate-600 dark:text-slate-300 font-medium hover:text-primary dark:hover:text-primary"
                        >
                            Dashboard
                        </Link>
                    )}

                    <div className="border-t border-slate-100 dark:border-slate-800 pt-4 mt-4">
                        {isAuthenticated ? (
                            <Button
                                variant="ghost"
                                onClick={() => { handleLogout(); toggleMobileMenu(); }}
                                className="w-full justify-start text-red-600 dark:text-red-400 font-medium pl-0 hover:bg-transparent"
                            >
                                <LogOut className="w-4 h-4 mr-2" />
                                Sign Out
                            </Button>
                        ) : (
                            <div className="flex flex-col gap-3">
                                <Button asChild variant="outline" className="w-full justify-center border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-bold hover:dark:bg-slate-800">
                                    <Link to="/login" onClick={toggleMobileMenu}>Sign In</Link>
                                </Button>
                                <Button asChild className="w-full bg-gradient-to-b from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 shadow-[0_4px_14px_0_rgba(59,130,246,0.39)] text-white hover:shadow-[0_6px_20px_rgba(59,130,246,0.23)] border border-blue-400/20">
                                    <Link to="/register" onClick={toggleMobileMenu}>
                                        Register
                                    </Link>
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
