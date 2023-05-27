import * as THREE from "three";
import { damp } from "three/src/math/MathUtils";

import { useRef } from "react";
import { useProjectStore } from "../../store/projectStore";

import { useScroll } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";

const material = new THREE.LineBasicMaterial({
  color: "#ABEA9A",
  toneMapped: false,
});
const geometry = new THREE.BufferGeometry().setFromPoints([
  new THREE.Vector3(0, -0.5, 0),
  new THREE.Vector3(0, 0.5, 0),
]);

const Minimap = () => {
  const ref = useRef();
  const scroll = useScroll();
  const projects = useProjectStore((state) => state.projects);

  const { height } = useThree((state) => state.viewport);
  useFrame((state, delta) => {
    ref.current.children.forEach((child, index) => {
      // Give me a value between 0 and 1
      //   starting at the position of my item
      //   ranging across 4 / total length
      //   make it a sine, so the value goes from 0 to 1 to 0.
      const y = scroll.curve(
        index / projects.length - 1.5 / projects.length,
        4 / projects.length
      );
      child.scale.y = damp(child.scale.y, 0.2 + y / 3, 8, 8, delta);
    });
  });
  return (
    <group ref={ref}>
      {projects.map((_, i) => (
        <line
          key={i}
          geometry={geometry}
          material={material}
          position={[i * 0.1 - projects.length * 0.03, -height / 2 - 0.5, 0]}
        />
      ))}
    </group>
  );
};

export default Minimap;
