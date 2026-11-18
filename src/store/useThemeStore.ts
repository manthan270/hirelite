import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'light' | 'dark' | 'system';

interface ThemeState {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

// this was copy-pasted in two places before — now it's one function
function applyThemeToDOM(theme: Theme) {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');

    if (theme === 'system') {
        const resolved = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        root.classList.add(resolved);
    } else {
        root.classList.add(theme);
    }
}

export const useThemeStore = create<ThemeState>()(
    persist(
        (set) => ({
            theme: 'system',
            setTheme: (theme) => {
                set({ theme });
                applyThemeToDOM(theme);
            },
        }),
        {
            name: 'bg-theme-storage',
            onRehydrateStorage: () => (state) => {
                if (state) applyThemeToDOM(state.theme);
            }
        }
    )
);
