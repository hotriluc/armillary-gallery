import { create } from "zustand";

// later fetch it from backend
const projects = [
  {
    id: "clip_the_street",
    title: "Clip the street.",
    date: "20/04/2023",
    url: "https://codesandbox.io/s/clip-the-street-0wctol",

    description:
      "Indeed I clip the street (with stencil mask). Inspired by Lisbon's trams.",
    technologies:
      "For this I used r3f. To achieve the grain effect on meshes I used soft shadows with small samples and correct lights setup.",

    thumbImgUrl: "/clip-the-street-thumb.png",
    leftImgUrl: "/clip-the-street-1.png",
    centerImgUrl: "/clip-the-street-2.png",
    rightImgUrl: "/clip-the-street-3.png",
  },
  {
    id: "bgr",
    title: "BGR.",
    date: "26/04/2023",
    url: "https://codesandbox.io/s/bgr-irxk3u",

    description:
      "Keep the memories was the original title of this work. But when I colored it I came up with the name above.",
    technologies: "A little bit of blender and r3f.",

    thumbImgUrl: "/bgr-2.png",
    leftImgUrl: "/bgr-1.png",
    centerImgUrl: "/bgr-2.png",
    rightImgUrl: "/bgr-3.png",
  },
  {
    id: "hollow",
    title: "Hollow.",
  },
  {
    id: "placeholder_1",
  },
  {
    id: "placeholder_2",
  },
  {
    id: "placeholder_3",
  },
  {
    id: "placeholder_4",
  },
  {
    id: "placeholder_5",
  },
];

export const useProjectStore = create((set) => ({
  activeID: null,
  projects: projects,

  setActiveID: (id) => set(() => ({ activeID: id })),
}));
