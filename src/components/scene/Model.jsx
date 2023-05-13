/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import { useGLTF } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { lerp } from "three/src/math/MathUtils";
import { useProjectStore } from "../../store/projectStore";

const Model = (props) => {
  const eclipticRef = useRef();
  const planetRef = useRef();
  const horizonRef = useRef();
  const meridianRef = useRef();

  const { nodes } = useGLTF("/arm.glb");

  const scrollSpeed = useProjectStore((state) => state.scrollSpeed);

  const [scrollTarget, setScrollTarget] = useState(0);

  useEffect(() => {
    // set scroll target (new rotation value)
    setScrollTarget(eclipticRef.current.rotation.y - 1.0 * scrollSpeed);
  }, [scrollSpeed]);

  // Animations
  useFrame(() => {
    eclipticRef.current.rotation.y = lerp(
      eclipticRef.current.rotation.y,
      scrollTarget,
      0.04
    );
    planetRef.current.rotation.y = lerp(
      planetRef.current.rotation.y,
      scrollTarget,
      0.04
    );

    horizonRef.current.rotation.x = lerp(
      horizonRef.current.rotation.x,
      scrollTarget,
      0.04
    );

    meridianRef.current.rotation.y = lerp(
      meridianRef.current.rotation.y,
      scrollTarget,
      0.04
    );
  });

  return (
    <group {...props} dispose={null} scale={0.3}>
      <group rotation={[0, 0, -Math.PI / 3]}>
        <mesh
          ref={planetRef}
          castShadow
          receiveShadow
          geometry={nodes.Cube.geometry}
          material={nodes.Cube.material}
          rotation={[0, 0, Math.PI / 3]}
        />
        <mesh
          ref={eclipticRef}
          castShadow
          receiveShadow
          geometry={nodes.Ecliptic.geometry}
          material={nodes.Ecliptic.material}
          rotation={[0, 0, Math.PI / 3]}
        />
      </group>
      <mesh
        ref={meridianRef}
        castShadow
        receiveShadow
        geometry={nodes.Meridian.geometry}
        material={nodes.Meridian.material}
      />
      <mesh
        ref={horizonRef}
        castShadow
        receiveShadow
        geometry={nodes.Horizon.geometry}
        material={nodes.Horizon.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Holder.geometry}
        material={nodes.Holder.material}
      />
    </group>
  );
};

useGLTF.preload("/arm.glb");

export default Model;
