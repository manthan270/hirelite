import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function DashboardLayout() {
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
    const location = useLocation();

    // Close the mobile sidebar when the route changes
    useEffect(() => {
        setIsMobileSidebarOpen(false);
    }, [location.pathname]);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col transition-colors">
            {/* Navbar is sticky at top */}
            <div className="sticky top-0 z-50">
                <Navbar />
            </div>

            <div className="flex flex-1 pt-0 relative">
                {/* Mobile sidebar overlay */}
                {isMobileSidebarOpen && (
                    <div
                        className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden backdrop-blur-sm"
                        onClick={() => setIsMobileSidebarOpen(false)}
                    />
                )}

                {/* Sidebar - sliding on mobile, visible on lg screens */}
                <aside className={`w-64 fixed left-0 top-20 bottom-0 z-50 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-transform duration-300 ease-in-out lg:translate-x-0 ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    <div className="flex items-center justify-between p-4 lg:hidden border-b border-slate-100 dark:border-slate-800">
                        <span className="font-semibold text-slate-900 dark:text-white">Dashboard Menu</span>
                        <Button variant="ghost" size="icon" onClick={() => setIsMobileSidebarOpen(false)} className="h-8 w-8 text-slate-500">
                            <X className="h-5 w-5" />
                        </Button>
                    </div>
                    <div className="h-full overflow-y-auto pb-24 lg:pb-0">
                        <Sidebar className="h-full border-none" />
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 lg:pl-64 p-4 sm:p-6 bg-slate-50 dark:bg-slate-950 transition-colors w-full min-w-0">
                    {/* Mobile Menu Toggle Button */}
                    <div className="lg:hidden mb-6">
                        <Button
                            variant="outline"
                            onClick={() => setIsMobileSidebarOpen(true)}
                            className="w-full flex items-center justify-center gap-2 bg-white dark:bg-slate-900/50 shadow-sm border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
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
