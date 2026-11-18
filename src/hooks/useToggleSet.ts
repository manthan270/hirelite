import { useState, useCallback } from 'react';

// toggle items in/out of an array — used for filter chips on the jobs page
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
