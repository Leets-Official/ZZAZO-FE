import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  userId: number | null;
  email: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  hasHydrated: boolean;
  setAuth: (data: {
    userId: number;
    email: string;
    accessToken: string;
    refreshToken: string;
  }) => void;
  clearAuth: () => void;
  setHydrated: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      userId: null,
      email: null,
      accessToken: null,
      refreshToken: null,
      hasHydrated: false,
      setAuth: (data) => set(data),
      clearAuth: () => set({ userId: null, email: null, accessToken: null, refreshToken: null }),
      setHydrated: () => set({ hasHydrated: true }),
    }),
    {
      name: 'zzazo-auth',
      partialize: (s) => ({
        userId: s.userId,
        email: s.email,
        accessToken: s.accessToken,
        refreshToken: s.refreshToken,
      }),
      onRehydrateStorage: () => (state) => state?.setHydrated(),
    }
  )
);
