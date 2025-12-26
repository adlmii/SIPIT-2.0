import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'; // 1. Import Middleware

export type UserRole = 'super_admin' | 'viewer';

interface User {
  id: string;
  name: string;
  role: UserRole;
  avatar: string;
}

interface AuthState {
  user: User | null;
  login: (role: UserRole) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: {
        id: 'u-1',
        name: 'Admin EBook',
        role: 'super_admin',
        avatar: 'AE'
      },
      
      login: (role) => set({
        user: {
          id: 'u-1',
          name: role === 'super_admin' ? 'Admin EBook' : 'Pengunjung',
          role: role,
          avatar: role === 'super_admin' ? 'AE' : 'VP'
        }
      }),

      logout: () => set({ user: null }),
    }),
    {
      name: 'sipit-auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);