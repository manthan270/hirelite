import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { Menu, X, LogOut } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';

export function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const menuButtonRef = useRef<HTMLButtonElement>(null);
    const mobileMenuRef = useRef<HTMLDivElement>(null);
    const user = useAuthStore((state) => state.user);
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const logout = useAuthStore((state) => state.logout);
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

    useEffect(() => {
        const updateScrollState = () => setIsScrolled(window.scrollY > 8);
        updateScrollState();
        window.addEventListener('scroll', updateScrollState, { passive: true });
        return () => window.removeEventListener('scroll', updateScrollState);
    }, []);

    useEffect(() => {
        if (!isMobileMenuOpen) return;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        mobileMenuRef.current?.querySelector<HTMLElement>('a, button')?.focus();

        const handleMenuKeydown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsMobileMenuOpen(false);
                menuButtonRef.current?.focus();
                return;
            }

            if (event.key !== 'Tab' || !mobileMenuRef.current) return;
            const focusableElements = mobileMenuRef.current.querySelectorAll<HTMLElement>(
                'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
            );
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (event.shiftKey && document.activeElement === firstElement) {
                event.preventDefault();
                lastElement?.focus();
            } else if (!event.shiftKey && document.activeElement === lastElement) {
                event.preventDefault();
                firstElement?.focus();
            }
        };

        window.addEventListener('keydown', handleMenuKeydown);
        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener('keydown', handleMenuKeydown);
        };
    }, [isMobileMenuOpen]);

    return (
        <nav aria-label="Primary navigation" className={`sticky top-0 z-50 w-full glass-morphism transition-all duration-300 ${isScrolled ? 'is-scrolled' : ''}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-[72px]">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link to="/" aria-label="EliteHire home" className="flex items-center space-x-2.5 rounded-lg group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#101310]">
                            <div aria-hidden="true" className="w-9 h-9 gradient-cta rounded-lg flex items-center justify-center text-white font-bold text-lg font-display transition-transform duration-200 group-hover:scale-[1.02]">
                                E
                            </div>
                            <span className="text-xl font-bold tracking-tight text-[#1A211D] dark:text-white font-display">
                                Elite<span className="text-primary dark:text-[#55A697]">Hire</span>
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex ml-12 items-center gap-2">
                            <NavLink to="/jobs" className={({ isActive }) => `rounded-lg px-3 py-2 font-medium transition-colors duration-200 text-[14px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${isActive ? 'bg-primary/[0.07] text-primary dark:bg-primary/10 dark:text-[#B7DED5]' : 'text-[#62626B] hover:bg-black/[0.035] hover:text-[#1A211D] dark:text-[#A0A0A8] dark:hover:bg-white/[0.05] dark:hover:text-white'}`}>
                                Find Jobs
                            </NavLink>
                            <NavLink to="/about" className={({ isActive }) => `rounded-lg px-3 py-2 font-medium transition-colors duration-200 text-[14px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${isActive ? 'bg-primary/[0.07] text-primary dark:bg-primary/10 dark:text-[#B7DED5]' : 'text-[#62626B] hover:bg-black/[0.035] hover:text-[#1A211D] dark:text-[#A0A0A8] dark:hover:bg-white/[0.05] dark:hover:text-white'}`}>
                                About Us
                            </NavLink>
                            <NavLink to="/contact" className={({ isActive }) => `rounded-lg px-3 py-2 font-medium transition-colors duration-200 text-[14px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${isActive ? 'bg-primary/[0.07] text-primary dark:bg-primary/10 dark:text-[#B7DED5]' : 'text-[#62626B] hover:bg-black/[0.035] hover:text-[#1A211D] dark:text-[#A0A0A8] dark:hover:bg-white/[0.05] dark:hover:text-white'}`}>
                                Contact
                            </NavLink>
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className="flex items-center space-x-4">
                        <ThemeToggle />

                        {!isAuthenticated ? (
                            <div className="hidden md:flex items-center space-x-4">
                                <Link to="/login" className="rounded-md px-2 py-2 text-[#1A211D] dark:text-[#EAEAE8] font-semibold hover:text-primary dark:hover:text-[#55A697] transition-colors duration-200 text-[14px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="gradient-cta text-white px-5 py-2.5 rounded-lg font-semibold transition-shadow shadow-sm hover:shadow-md text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#101310]"
                                >
                                    Register
                                </Link>
                            </div>
                        ) : (
                            <div className="flex items-center gap-4">
                                <Link to={isEmployer ? "/dashboard/employer" : "/dashboard/candidate"} className="rounded-md px-2 py-2 text-sm font-medium text-[#6B6B73] dark:text-[#8A8A90] hover:text-primary dark:hover:text-[#55A697] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
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
                                ref={menuButtonRef}
                                aria-expanded={isMobileMenuOpen}
                                aria-controls="mobile-navigation"
                                className="flex h-10 w-10 items-center justify-center rounded-lg text-[#62626B] transition hover:bg-black/[0.04] hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:text-[#A0A0A8] dark:hover:bg-white/[0.06] dark:hover:text-[#B7DED5]"
                                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                            >
                                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            {isMobileMenuOpen && (
                <>
                <div
                    className="fixed inset-x-0 bottom-0 top-[72px] z-30 bg-black/25 md:hidden"
                    aria-hidden="true"
                    onClick={() => { setIsMobileMenuOpen(false); menuButtonRef.current?.focus(); }}
                />
                <div
                    id="mobile-navigation"
                    ref={mobileMenuRef}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Mobile navigation"
                    className="absolute left-0 z-40 w-full border-t border-black/[0.06] bg-[#F8F6EE] shadow-lg dark:border-white/[0.08] dark:bg-[#141916] md:hidden"
                >
                    <div className="space-y-1 px-4 py-4 sm:px-6">
                    <NavLink to="/jobs" onClick={() => setIsMobileMenuOpen(false)} className={({ isActive }) => `block min-h-11 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors ${isActive ? 'bg-primary/[0.07] text-primary dark:bg-primary/10 dark:text-[#B7DED5]' : 'text-[#62626B] hover:bg-black/[0.035] hover:text-[#1A211D] dark:text-[#A0A0A8] dark:hover:bg-white/[0.05] dark:hover:text-white'}`}>
                        Find Jobs
                    </NavLink>
                    <NavLink to="/about" onClick={() => setIsMobileMenuOpen(false)} className={({ isActive }) => `block min-h-11 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors ${isActive ? 'bg-primary/[0.07] text-primary dark:bg-primary/10 dark:text-[#B7DED5]' : 'text-[#62626B] hover:bg-black/[0.035] hover:text-[#1A211D] dark:text-[#A0A0A8] dark:hover:bg-white/[0.05] dark:hover:text-white'}`}>
                        About Us
                    </NavLink>
                    <NavLink to="/contact" onClick={() => setIsMobileMenuOpen(false)} className={({ isActive }) => `block min-h-11 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors ${isActive ? 'bg-primary/[0.07] text-primary dark:bg-primary/10 dark:text-[#B7DED5]' : 'text-[#62626B] hover:bg-black/[0.035] hover:text-[#1A211D] dark:text-[#A0A0A8] dark:hover:bg-white/[0.05] dark:hover:text-white'}`}>
                        Contact
                    </NavLink>

                    {isAuthenticated && (
                        <Link
                            to={isEmployer ? "/dashboard/employer" : "/dashboard/candidate"}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block min-h-11 rounded-lg px-3 py-2.5 text-sm font-semibold text-[#62626B] hover:bg-black/[0.035] hover:text-[#1A211D] dark:text-[#A0A0A8] dark:hover:bg-white/[0.05] dark:hover:text-white"
                        >
                            Dashboard
                        </Link>
                    )}

                    <div className="mt-3 border-t border-black/[0.06] pt-4 dark:border-white/[0.08]">
                        {isAuthenticated ? (
                            <Button
                                variant="ghost"
                                onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
                                className="w-full justify-start text-red-500 font-medium"
                            >
                                <LogOut className="w-4 h-4 mr-2" />
                                Sign Out
                            </Button>
                        ) : (
                            <div className="flex flex-col gap-3">
                                <Button asChild variant="outline" className="w-full justify-center border-black/[0.08] dark:border-white/[0.08] text-[#1A211D] dark:text-white font-bold hover:dark:bg-white/[0.06]">
                                    <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>Sign In</Link>
                                </Button>
                                <Button asChild className="w-full gradient-cta text-white border-0 shadow-sm">
                                    <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>Create account</Link>
                                </Button>
                            </div>
                        )}
                    </div>
                    </div>
                </div>
                </>
            )}
        </nav>
    );
}
