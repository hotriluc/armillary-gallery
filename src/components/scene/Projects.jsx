import { useEffect, useRef, useState } from "react";
import Project from "./Project";

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
    id: "hollow",
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

const Projects = () => {
  const ref = useRef();
  const radius = 2.5;
  const interval = (Math.PI * 2) / projects.length;

  const [scrollSpeed, setScrollSpeed] = useState(0);

  const scrollHandler = (event) => {
    setScrollSpeed(event.deltaY * (Math.PI / 180) * 0.2);
  };

  useEffect(() => {
    window.addEventListener("wheel", scrollHandler);

    return () => {
      window.removeEventListener("wheel", scrollHandler);
    };
  }, []);

  useEffect(() => {
    ref.current.rotation.y += -1.0 * scrollSpeed;
  }, [scrollSpeed]);

  return (
    <group ref={ref}>
      {projects.map((el, i) => (
        // position  using sin and cos we can place our objects on the circle
        // rotation (1st term - we rotate i-th plane to make its side to look into the center)
        // 2nd term - control how much spin you add to your cards (if multiply it by  0.5 it will look like N-gon)
        <Project
          key={i}
          position={[
            Math.cos(interval * i) * radius,
            0,
            Math.sin(interval * i) * radius,
          ]}
          rotation={[
            0,
            (-2 * i * Math.PI) / projects.length +
              (Math.PI * projects.length) / projects.length,
            0,
          ]}
        />
      ))}
    </group>
  );
};

export default Projects;
