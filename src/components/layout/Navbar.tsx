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
                <div className="flex justify-between items-center h-[72px]">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center space-x-2.5 group">
                            <div className="w-9 h-9 gradient-cta rounded-lg flex items-center justify-center text-white font-bold text-lg font-display group-hover:scale-105 transition-transform duration-200 shadow-glow">
                                E
                            </div>
                            <span className="text-xl font-bold tracking-tight text-[#1A1A1F] dark:text-white font-display">
                                Elite<span className="text-primary dark:text-[#8B7EF8]">Hire</span>
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex ml-12 space-x-8">
                            <Link to="/jobs" className="text-[#6B6B73] dark:text-[#8A8A90] hover:text-[#1A1A1F] dark:hover:text-white font-medium transition-colors duration-200 text-[15px]">
                                Find Jobs
                            </Link>
                            <Link to="/about" className="text-[#6B6B73] dark:text-[#8A8A90] hover:text-[#1A1A1F] dark:hover:text-white font-medium transition-colors duration-200 text-[15px]">
                                About Us
                            </Link>
                            <Link to="/contact" className="text-[#6B6B73] dark:text-[#8A8A90] hover:text-[#1A1A1F] dark:hover:text-white font-medium transition-colors duration-200 text-[15px]">
                                Contact
                            </Link>
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className="flex items-center space-x-4">
                        <ThemeToggle />

                        {!isAuthenticated ? (
                            <div className="hidden md:flex items-center space-x-4">
                                <Link to="/login" className="text-[#1A1A1F] dark:text-[#EAEAE8] font-semibold hover:text-primary dark:hover:text-[#8B7EF8] transition-colors duration-200 text-[15px]">
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="gradient-cta text-white px-5 py-2 rounded-lg font-medium transition-all shadow-glow hover:shadow-[0_0_28px_rgba(91,76,219,0.45)] hover:-translate-y-0.5 text-[15px]"
                                >
                                    Register
                                </Link>
                            </div>
                        ) : (
                            <div className="flex items-center gap-4">
                                <Link to={isEmployer ? "/dashboard/employer" : "/dashboard/candidate"} className="text-sm font-medium text-[#6B6B73] dark:text-[#8A8A90] hover:text-primary dark:hover:text-[#8B7EF8] transition-colors duration-200">
                                    Dashboard
                                </Link>
                                <Button variant="ghost" size="sm" onClick={handleLogout} className="text-[#6B6B73] hover:text-red-500" title="Sign out">
                                    <LogOut className="w-5 h-5" />
                                </Button>
                            </div>
                        )}

                        {/* Mobile Menu Button */}
                        <div className="md:hidden flex items-center">
                            <button
                                type="button"
                                onClick={toggleMobileMenu}
                                className="text-[#6B6B73] dark:text-[#8A8A90] hover:text-primary focus:outline-none"
                                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                            >
                                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            <div className={`md:hidden bg-[#F7F6F3]/95 dark:bg-[#0A0A0F]/95 backdrop-blur-xl overflow-hidden transition-all duration-300 ease-in-out absolute w-full left-0 z-40 ${isMobileMenuOpen ? "max-h-[32rem] opacity-100" : "max-h-0 opacity-0"}`}
                style={{ borderTop: '1px solid rgba(0,0,0,0.04)' }}
            >
                <div className="px-6 py-6 space-y-4">
                    <Link to="/jobs" onClick={toggleMobileMenu} className="block text-[#6B6B73] dark:text-[#8A8A90] font-medium hover:text-[#1A1A1F] dark:hover:text-white">
                        Find Jobs
                    </Link>
                    <Link to="/about" onClick={toggleMobileMenu} className="block text-[#6B6B73] dark:text-[#8A8A90] font-medium hover:text-[#1A1A1F] dark:hover:text-white">
                        About Us
                    </Link>
                    <Link to="/contact" onClick={toggleMobileMenu} className="block text-[#6B6B73] dark:text-[#8A8A90] font-medium hover:text-[#1A1A1F] dark:hover:text-white">
                        Contact
                    </Link>

                    {isAuthenticated && (
                        <Link
                            to={isEmployer ? "/dashboard/employer" : "/dashboard/candidate"}
                            onClick={toggleMobileMenu}
                            className="block text-[#6B6B73] dark:text-[#8A8A90] font-medium hover:text-[#1A1A1F] dark:hover:text-white"
                        >
                            Dashboard
                        </Link>
                    )}

                    <div className="pt-4 mt-4 border-t border-black/[0.06] dark:border-white/[0.06]">
                        {isAuthenticated ? (
                            <Button
                                variant="ghost"
                                onClick={() => { handleLogout(); toggleMobileMenu(); }}
                                className="w-full justify-start text-red-500 font-medium pl-0 hover:bg-transparent"
                            >
                                <LogOut className="w-4 h-4 mr-2" />
                                Sign Out
                            </Button>
                        ) : (
                            <div className="flex flex-col gap-3">
                                <Button asChild variant="outline" className="w-full justify-center border-black/[0.08] dark:border-white/[0.08] text-[#1A1A1F] dark:text-white font-bold hover:dark:bg-white/[0.06]">
                                    <Link to="/login" onClick={toggleMobileMenu}>Sign In</Link>
                                </Button>
                                <Button asChild className="w-full gradient-cta text-white shadow-glow border-0">
                                    <Link to="/register" onClick={toggleMobileMenu}>Register</Link>
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
