import { create } from "zustand";

export const useUIStore = create((set) => ({
  scrollSpeed: 0,
  setScrollSpeed: (speed) => set(() => ({ scrollSpeed: speed })),

  isLoaded: false,
  setIsLoaded: (value) => set(() => ({ isLoaded: value })),

  destination: null,
  setDestination: (value) => set(() => ({ destination: value })),
}));
