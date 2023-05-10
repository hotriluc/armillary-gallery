import { useEffect, useRef, useState } from "react";
import Project from "./Project";
import { lerp } from "three/src/math/MathUtils";
import { useFrame } from "@react-three/fiber";
import { useProjectStore } from "../../store/projectStore";

const Projects = () => {
  const ref = useRef();
  const projects = useProjectStore((state) => state.projects);
  const radius = 2.5;
  const interval = (Math.PI * 2) / projects.length;

  const [scrollSpeed, setScrollSpeed] = useState(0);
  const [scrollTarget, setScrollTarget] = useState(0);

  const scrollHandler = (event) => {
    // convert deltaY to radians (because we scroll circular)
    setScrollSpeed(event.deltaY * (Math.PI / 180));
    // set activeid null
  };

  // add event listener to the wheel
  useEffect(() => {
    window.addEventListener("wheel", scrollHandler);

    return () => {
      window.removeEventListener("wheel", scrollHandler);
    };
  }, []);

  useEffect(() => {
    // set scroll target (new rotation value)
    setScrollTarget(ref.current.rotation.y - 1.0 * scrollSpeed);
  }, [scrollSpeed]);

  useFrame(() => {
    // lerping from old to new rotation
    ref.current.rotation.y = lerp(ref.current.rotation.y, scrollTarget, 0.07);
  });

  return (
    <group ref={ref}>
      {projects.map((projectData, i) => (
        // position  using sin and cos we can place our objects on the circle
        // rotation (1st term - we rotate i-th plane to make its side to look into the center)
        // 2nd term - control how much spin you add to your cards (if multiply it by  0.5 it will look like N-gon)
        <Project
          key={i}
          data={projectData}
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
