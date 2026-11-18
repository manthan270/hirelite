import { create } from 'zustand';

export type UserRole = 'candidate' | 'employer';

interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string, role: UserRole, name?: string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isAuthenticated: false,
    login: (email, role, name) => {
        // This store is only a local development preview; production auth must be server-backed.
        const mockUser: User = {
            id: '1',
            name: name?.trim() || email.split('@')[0] || 'User',
            email,
            role,
        };
        set({ user: mockUser, isAuthenticated: true });
    },
    logout: () => set({ user: null, isAuthenticated: false }),
}));
