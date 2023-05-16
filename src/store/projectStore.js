import { create } from "zustand";

// later fetch it from backend
const projects = [
  {
    id: "clip_the_street",
    title: "Clip the street.",
    imgUrl: "/pic.jpg",
  },
  {
    id: "bgr",
    title: "BGR.",
    imgUrl: "/pic.jpg",
  },
  {
    id: "hollow",
    title: "Project 1.",
  },
  {
    id: "hollow1",
    title: "Project 2.",
  },
  {
    id: "hollow2",
    title: "Project 3.",
  },
  {
    id: "hollow3",
    title: "HolProject 4.",
  },
  {
    id: "hollow4",
    title: "Project 5.",
  },
  {
    id: "hollow5",
    title: "Project 6.",
  },
];

export const useProjectStore = create((set) => ({
  scrollSpeed: 0,
  activeID: null,
  projects: projects,

  setScrollSpeed: (speed) => set(() => ({ scrollSpeed: speed })),
  setActiveID: (id) => set(() => ({ activeID: id })),
}));
