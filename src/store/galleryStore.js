import { create } from "zustand";

export const useGalleryStore = create(() => ({
  itemGap: 0.5,
  itemWidth: 1.5,
  radius: 2.8,
}));
