import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { USER_ROLES } from '../lib/constants';
import type { UserRole } from '../features/users/types';

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
      // INITIAL STATE
      user: {
        id: 'u-1',
        name: 'Admin Ganteng',
        role: USER_ROLES.SUPER_ADMIN,
        avatar: 'AG'
      },
      
      // ACTIONS
      login: (role) => set({
        user: {
          id: 'u-1',
          name: role === USER_ROLES.SUPER_ADMIN ? 'Admin Ganteng' : 'Pengunjung',
          role: role,
          avatar: role === USER_ROLES.SUPER_ADMIN ? 'AG' : 'VP'
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