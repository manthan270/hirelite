import { create } from 'zustand';

interface User {
    id: string;
    name: string;
    email: string;
    role: 'candidate' | 'employer';
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string, role: 'candidate' | 'employer') => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isAuthenticated: false,
    login: (email, role) => {
        // Mock login logic
        const mockUser: User = {
            id: '1',
            name: email.split('@')[0] || 'User', // Use email prefix as name
            email,
            role,
        };
        set({ user: mockUser, isAuthenticated: true });
    },
    logout: () => set({ user: null, isAuthenticated: false }),
}));
