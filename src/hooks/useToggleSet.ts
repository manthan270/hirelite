import { useState, useCallback } from 'react';

/**
 * Generic hook for toggling items in a set.
 * Replaces duplicate toggle patterns (job types, experience, salary ranges, etc.)
 */
export function useToggleSet<T>(initial: T[] = []) {
    const [items, setItems] = useState<T[]>(initial);

    const toggle = useCallback((item: T) => {
        setItems((prev) =>
            prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
        );
    }, []);

    const clear = useCallback(() => setItems([]), []);

    return { items, toggle, clear, setItems } as const;
}
