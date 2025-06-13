import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AuthState {
  isLoggedIn: boolean;
  userId: number | null;
  authId: string | null;
  login: (auth_id: string, user_id: number) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      userId: null,
      authId: null,
      login: (auth_id: string, user_id: number) =>
        set({ isLoggedIn: true, userId: user_id, authId: auth_id }),
      logout: () => set({ isLoggedIn: false, userId: null, authId: null }),
    }),
    {
      name: 'auth-storage',
      storage: typeof window !== 'undefined' ? createJSONStorage(() => localStorage) : undefined,
    },
  ),
);
