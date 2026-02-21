import { Outlet } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';

export function DashboardLayout() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col transition-colors">
            {/* Navbar is sticky at top */}
            <div className="sticky top-0 z-50">
                <Navbar />
            </div>

            <div className="flex flex-1 pt-0">
                {/* Sidebar - hidden on mobile, visible on lg screens */}
                <aside className="hidden lg:block w-64 fixed left-0 top-14 bottom-0 z-40 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-colors">
                    <Sidebar className="h-full" />
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 lg:pl-64 p-6 bg-slate-50 dark:bg-slate-950 transition-colors">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
