import { damp } from "three/src/math/MathUtils";

import { useMemo, useRef } from "react";
import { useProjectStore } from "../../store/projectStore";

import { useFrame, useThree } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";

import GalleryItem from "./GalleryItem";
import { useGalleryStore } from "../../store/galleryStore";

const Gallery = () => {
  const ref = useRef();

  const { scroll } = useScroll();
  // Check if mobile device
  const { width } = useThree((state) => state.viewport);
  const isMobile = width < 7;

  const projects = useProjectStore((state) => state.projects);
  const { radius, itemGap, itemWidth } = useGalleryStore((state) => state);

  // for circular (desktop) we reverse in order to do correct rotation
  // but keep indexes the same
  const displayedProjects = isMobile ? projects : [...projects].reverse();
  const interval = useMemo(() => (Math.PI * 2) / projects.length, [projects]);

  useFrame((state, delta) => {
    if (isMobile) return;

    ref.current.rotation.y = damp(
      ref.current.rotation.y,
      Math.PI + 0.15 - scroll.current * Math.PI * 2,
      2,
      delta
    );
  });

  return (
    <group ref={ref}>
      {displayedProjects.map((projectData, i) => (
        // position  using sin and cos we can place our objects on the circle
        // rotation (1st term - we rotate i-th plane to make its side to look into the center)
        // 2nd term - control how much spin you add to your cards (if multiply it by  0.5 it will look like N-gon)

        // until our ig + iw is equal to number where we position our item 2 * i

        <GalleryItem
          key={i}
          data={projectData}
          position={
            isMobile
              ? [(itemGap + itemWidth) * i, 0.5, 2]
              : [
                  Math.cos(interval * i) * radius,
                  0,
                  Math.sin(interval * i) * radius,
                ]
          }
          rotation={
            isMobile
              ? [0, 0, 0]
              : [
                  0,
                  (-2 * i * Math.PI) / projects.length +
                    (Math.PI * projects.length) / projects.length,
                  0,
                ]
          }
        />
      ))}
    </group>
  );
};

export default Gallery;
