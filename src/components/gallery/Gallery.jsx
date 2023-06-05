import * as THREE from "three";
import { damp } from "three/src/math/MathUtils";

import { useMemo, useRef } from "react";
import { useProjectStore } from "../../store/projectStore";

import { useFrame, useThree } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";

import GalleryItem from "./GalleryItem";

const Gallery = () => {
  const ref = useRef();
  const { width } = useThree((state) => state.viewport);
  const projects = useProjectStore((state) => state.projects);

  // for circular (desktop) we reverse in order to do correct rotation
  // but keep indexes the same
  const displayedProjects = [...projects].reverse();

  const radius = width > 7 ? 2.8 : 1.8;

  const interval = useMemo(() => (Math.PI * 2) / projects.length, [projects]);

  const { scroll } = useScroll();

  useFrame((state, delta) => {
    ref.current.rotation.y = damp(
      ref.current.rotation.y,
      Math.PI + 0.15 - scroll.current * Math.PI * 2,
      2,
      delta
    );
  });

  // const scrollSpeed = useUIStore((state) => state.scrollSpeed);
  // const setScrollSpeed = useUIStore((state) => state.setScrollSpeed);
  // // scroll target state for projects group
  // const [scrollTarget, setScrollTarget] = useState(0);

  // const scrollHandler = useCallback(
  //   (event) => {
  //     // convert deltaY to radians (because we scroll circular)
  //     setScrollSpeed(event.deltaY * (Math.PI / 180));
  //     // set activeid null
  //   },
  //   [setScrollSpeed]
  // );

  // // Add event listener on first render
  // useEffect(() => {
  //   // Throttling to mouse wheel
  //   window.addEventListener("wheel", scrollHandler);
  //   return () => {
  //     window.removeEventListener("wheel", scrollHandler);
  //   };
  // }, [scrollHandler]);

  // // Updating scroll target state (on scrollSpeed change)
  // useEffect(() => {
  //   // set scroll target (new rotation value)
  //   setScrollTarget(ref.current.rotation.y - 1.0 * scrollSpeed);
  // }, [scrollSpeed]);

  // // Animation
  // useFrame(() => {
  //   // lerping from old to new rotation
  //   ref.current.rotation.y = lerp(ref.current.rotation.y, scrollTarget, 0.04);
  // });

  return (
    <group ref={ref}>
      {displayedProjects.map((projectData, i) => (
        // position  using sin and cos we can place our objects on the circle
        // rotation (1st term - we rotate i-th plane to make its side to look into the center)
        // 2nd term - control how much spin you add to your cards (if multiply it by  0.5 it will look like N-gon)
        <GalleryItem
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

export default Gallery;
