import { useState, useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function DashboardLayout() {
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
    const location = useLocation();
    const menuButtonRef = useRef<HTMLButtonElement>(null);
    const sidebarRef = useRef<HTMLElement>(null);

    // close sidebar on nav
    useEffect(() => {
        setIsMobileSidebarOpen(false);
    }, [location.pathname]);

    useEffect(() => {
        if (!isMobileSidebarOpen) return;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        sidebarRef.current?.querySelector<HTMLElement>('a, button')?.focus();

        const handleSidebarKeydown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsMobileSidebarOpen(false);
                menuButtonRef.current?.focus();
                return;
            }
            if (event.key !== 'Tab' || !sidebarRef.current) return;

            const focusableElements = sidebarRef.current.querySelectorAll<HTMLElement>(
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

        window.addEventListener('keydown', handleSidebarKeydown);
        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener('keydown', handleSidebarKeydown);
        };
    }, [isMobileSidebarOpen]);

    return (
        <div className="min-h-screen bg-[#F8F6EE] dark:bg-[#101310] flex flex-col transition-colors duration-500">
            <Navbar />

            <div className="flex flex-1 pt-0 relative">
                {/* mobile overlay */}
                {isMobileSidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black/40 z-40 lg:hidden backdrop-blur-sm"
                        aria-hidden="true"
                        onClick={() => { setIsMobileSidebarOpen(false); menuButtonRef.current?.focus(); }}
                    />
                )}

                {/* sidebar */}
                <aside
                    id="dashboard-navigation"
                    ref={sidebarRef}
                    aria-label="Dashboard navigation"
                    role={isMobileSidebarOpen ? 'dialog' : undefined}
                    aria-modal={isMobileSidebarOpen ? true : undefined}
                    className={`fixed bottom-0 left-0 top-[72px] z-50 w-64 border-r border-black/[0.07] bg-white transition-transform duration-200 ease-out dark:border-white/[0.09] dark:bg-[#171B18] lg:translate-x-0 ${isMobileSidebarOpen ? 'visible translate-x-0' : 'invisible -translate-x-full lg:visible'}`}
                >
                    <div className="flex items-center justify-between p-4 lg:hidden border-b border-black/[0.04] dark:border-white/[0.06]">
                        <span className="font-semibold text-[#1A211D] dark:text-white">Dashboard Menu</span>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsMobileSidebarOpen(false)}
                            aria-label="Close sidebar"
                            className="h-8 w-8 text-[#6B6B73]"
                        >
                            <X className="h-5 w-5" />
                        </Button>
                    </div>
                    <div className="h-full overflow-y-auto pb-24 lg:pb-0">
                        <Sidebar className="h-full border-none" />
                    </div>
                </aside>

                {/* main content */}
                <main className="flex-1 p-4 sm:p-6 lg:pl-[17.5rem] bg-[#F8F6EE] dark:bg-[#101310] transition-colors duration-500 w-full min-w-0">
                    <div className="lg:hidden mb-6">
                        <Button
                            variant="outline"
                            onClick={() => setIsMobileSidebarOpen(true)}
                            ref={menuButtonRef}
                            aria-expanded={isMobileSidebarOpen}
                            aria-controls="dashboard-navigation"
                            aria-label="Open dashboard menu"
                            className="w-full min-h-11 flex items-center justify-center gap-2 bg-white dark:bg-[#171B18] shadow-sm border-black/[0.08] dark:border-white/[0.1] text-[#62626B] dark:text-[#B5B5BD] hover:bg-[#F1EFE6] dark:hover:bg-white/[0.06]"
                        >
                            <Menu className="w-5 h-5" />
                            Open Dashboard Menu
                        </Button>
                    </div>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
