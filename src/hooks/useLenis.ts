import { useEffect, useRef, useCallback } from 'react';
import Lenis from 'lenis';

// singleton — only one Lenis instance across the whole app
let globalLenis: Lenis | null = null;

export function getLenis(): Lenis | null {
    return globalLenis;
}

// call this once in your root layout. don't mount it in multiple places
// or you'll get duplicate RAF loops fighting each other
export function useLenis() {
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        // bail if user prefers reduced motion — don't fight the OS
        const prefersReducedMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches;

        if (prefersReducedMotion) return;

        const lenis = new Lenis({
            duration: 1.2,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            touchMultiplier: 2,
            infinite: false,
        });

        lenisRef.current = lenis;
        globalLenis = lenis;

        let frameId: number;

        function raf(time: number) {
            lenis.raf(time);
            frameId = requestAnimationFrame(raf);
        }

        frameId = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(frameId);
            lenis.destroy();
            lenisRef.current = null;
            globalLenis = null;
        };
    }, []);

    const scrollTo = useCallback(
        (target: number | string | HTMLElement, options?: { offset?: number; duration?: number; immediate?: boolean }) => {
            if (lenisRef.current) {
                lenisRef.current.scrollTo(target, options);
            } else {
                window.scrollTo({ top: typeof target === 'number' ? target : 0, behavior: 'instant' });
            }
        },
        []
    );

    return { lenis: lenisRef, scrollTo };
}
