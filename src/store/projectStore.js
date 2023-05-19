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
    id: "some",
    title: "Something.",
  },
  {
    id: "hello",
    title: "Hello.",
  },
  { id: "box_out", title: "Box out." },
  {
    id: "world",
    title: "World.",
  },
  {
    id: "box",
    title: "Box.",
  },
];

export const useProjectStore = create((set) => ({
  activeID: null,
  projects: projects,

  setActiveID: (id) => set(() => ({ activeID: id })),
}));
