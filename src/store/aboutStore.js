import { create } from "zustand";

export const useAboutStore = create((set) => ({
  activeContentID: 1,

  setActiveContentID: (id) => set(() => ({ activeContentID: id })),
}));
