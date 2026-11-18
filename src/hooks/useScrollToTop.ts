import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getLenis } from './useLenis';

// scroll to top on route change — uses Lenis when active, falls back to native
export function useScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        const lenis = getLenis();
        if (lenis) {
            lenis.scrollTo(0, { immediate: true });
        } else {
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        }
    }, [pathname]);
}
