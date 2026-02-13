import { create } from 'zustand';

// ----------------------------------------------------------------------

interface CardMessageState {
  message: string;
  sendMessage: (message: string) => void;
  clearMessage: () => void;
}

export const useCardMessageStore = create<CardMessageState>((set) => ({
  message: '',
  sendMessage: (message: string) => set({ message }),
  clearMessage: () => set({ message: '' }),
}));

