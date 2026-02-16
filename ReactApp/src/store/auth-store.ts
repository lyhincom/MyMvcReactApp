import { create } from 'zustand';

import { authService } from 'src/services/auth-service';

// ----------------------------------------------------------------------

interface AuthState {
  isAuthenticated: boolean;
  checkAuth: () => void;
  setAuthenticated: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: authService.isAuthenticated(),
  checkAuth: () => set({ isAuthenticated: authService.isAuthenticated() }),
  setAuthenticated: (value: boolean) => set({ isAuthenticated: value }),
}));
