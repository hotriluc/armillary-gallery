import * as THREE from "three";

import { Suspense, useRef } from "react";
import CharacterModel from "../models/CharacterModel";
import { useHelper } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { damp } from "three/src/math/MathUtils";

const AboutPageScene = () => {
  const directionalLightRef = useRef();
  // useHelper(directionalLightRef, THREE.DirectionalLightHelper);

  useFrame((state, delta) => {
    directionalLightRef.current.position.x = damp(
      directionalLightRef.current.position.x,
      -3,
      2,
      delta
    );

    directionalLightRef.current.position.z = damp(
      directionalLightRef.current.position.z,
      0,
      2,
      delta
    );

    directionalLightRef.current.position.y = damp(
      directionalLightRef.current.position.y,
      -5,
      2,
      delta
    );
  });

  return (
    <>
      <ambientLight color={"#346899"} intensity={0.4} />
      <directionalLight
        ref={directionalLightRef}
        castShadow
        position={[7, 5, 5]}
        color={"#0d9600"}
        intensity={8}
        shadow-mapSize={2048}
        shadow-camera-top={10}
        shadow-camera-right={10}
        shadow-camera-bottom={-10}
        shadow-camera-left={-10}
      />
      <Suspense fallback={null}>
        <CharacterModel />
      </Suspense>
    </>
  );
};

export default AboutPageScene;
