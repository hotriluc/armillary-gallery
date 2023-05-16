import { create } from "zustand";

export const useUIStore = create((set) => ({
  scrollSpeed: 0,
  setScrollSpeed: (speed) => set(() => ({ scrollSpeed: speed })),
}));
