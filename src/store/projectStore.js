import { create } from "zustand";

// later fetch it from backend
const projects = [
  {
    id: "clip_the_street",
    title: "Clip the street.",
  },
  {
    id: "bgr",
    title: "BGR.",
  },
  {
    id: "hollow",
    title: "Hollow.",
  },
  {
    id: "hollow1",
    title: "Hollow.",
  },
  {
    id: "hollow2",
    title: "Hollow.",
  },
  {
    id: "hollow3",
    title: "Hollow.",
  },
  {
    id: "hollow4",
    title: "Hollow.",
  },
  {
    id: "hollow5",
    title: "Hollow.",
  },
];

export const useProjectStore = create((set) => ({
  // FOR UI PURPOSES
  activeID: null,
  setActiveID: (id) => set(() => ({ activeID: id })),

  projects: projects,
}));
