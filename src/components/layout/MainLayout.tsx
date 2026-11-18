import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import { useLenis } from '@/hooks/useLenis';

export function MainLayout() {
    useScrollToTop();
    useLenis();

    return (
        <div className="min-h-screen flex flex-col bg-[#F8F6EE] dark:bg-[#101310] font-sans text-[#1A211D] dark:text-[#EAEAE8] transition-colors duration-500">

            <Navbar />
            <main className="flex-1 flex flex-col">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
