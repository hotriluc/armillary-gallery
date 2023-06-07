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
      "the grain effect on meshes was achieved by using soft shadows with small sampling rate and correct lights setup. r3f make it easy to do this.",

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
    technologies:
      "3 different scenes were made in blender and R3F to tie them together. Characters' models and poses are from Mixamo.",

    thumbImgUrl: "/bgr-2.png",
    leftImgUrl: "/bgr-1.png",
    centerImgUrl: "/bgr-2.png",
    rightImgUrl: "/bgr-3.png",
  },
  {
    id: "hollow",
    title: "Hollow.",
    date: "02/05/2023",
    url: "https://dragon-five.vercel.app/",

    description:
      "Inspired by colors of South Korea. Dragon's curve formed the letter ㅎ – hieut. that is where the name came from.",
    technologies:
      "Both dragon and animations were done in blender. to make it reusable on web and easy to maintain i use gltfjsx.",

    thumbImgUrl: "/hollow-thumb.png",
    leftImgUrl: "/hollow-1.png",
    centerImgUrl: "/hollow-2.png",
    rightImgUrl: "/hollow-3.png",
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
