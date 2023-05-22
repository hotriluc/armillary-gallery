import * as THREE from "three";
import { damp, lerp } from "three/src/math/MathUtils";

import { useMemo, useRef, useState } from "react";

import { extend, useFrame, useLoader } from "@react-three/fiber";
import { Text, shaderMaterial } from "@react-three/drei";
import { useControls } from "leva";

import galleryItemVertexShader from "../../shaders/gallery-item/vertex.glsl";
import galleryItemFragmentShader from "../../shaders/gallery-item/fragment.glsl";

import Constellation from "./Constellation";
import { useProjectStore } from "../../store/projectStore";
import { useLocation } from "wouter";

const GalleryItemMaterial = new shaderMaterial(
  {
    uTime: 0.0,
    uImage: null,
    uNoise: null,
    uProgress: 0,
  },
  galleryItemVertexShader,
  galleryItemFragmentShader
);

extend({ GalleryItemMaterial });

const GalleryItem = ({
  data,
  noiseMap,
  rotation,
  c = new THREE.Color(),
  ...props
}) => {
  const { id: projectID, imgUrl: projectImg, title: projectTitle } = data;

  const ref = useRef();
  const materialRef = useRef();
  const textRef = useRef();

  const [hovered, setHovered] = useState(false);
  // const [clicked, setClicked] = useState(false);

  // const activeID = useProjectStore((state) => state.activeID);
  const setActiveID = useProjectStore((state) => state.setActiveID);

  const imgMap = useLoader(
    THREE.TextureLoader,
    projectImg ? projectImg : "/default.png"
  );

  const { progress } = useControls({
    progress: { min: 0, max: 1, value: 0, step: 0.05 },
  });

  // It holds new pos when rotating
  const target = useMemo(() => {
    return new THREE.Vector3(0, 0, 0);
  }, []);

  // Initial vector to calculate the angle between
  const initialVector = useMemo(() => {
    return new THREE.Vector3(1, 0, 0);
  }, []);

  // Animate Click and Hover
  useFrame((state, delta) => {
    // const et = state.clock.getElapsedTime();
    // materialRef.current.uTime = et;

    ref.current.rotation.y = damp(
      ref.current.rotation.y,
      hovered ? rotation[1] - Math.PI / 5.5 : rotation[1],
      6,
      delta
    );

    // ref.current.position.y = damp(
    //   ref.current.position.y,
    //   clicked ? 2 : 0,
    //   6,
    //   delta
    // );

    materialRef.current.uProgress = lerp(
      materialRef.current.uProgress,
      hovered ? 1 : 0,
      0.02
    );

    textRef.current.fontSize = lerp(
      textRef.current.fontSize,
      hovered ? 0.2 : 0.1,
      0.05
    );

    textRef.current.material.color.lerp(
      c.set(hovered ? "#abea9a" : "#fefefe"),
      hovered ? 0.3 : 0.1
    );

    // In order to hide only half text we need to calculate new object position
    // by having 2 vectors we can calculate the angle between them
    // in order to hide the ones that have angle bigger then PI /2
    ref.current.getWorldPosition(target);
    const angle = initialVector.angleTo(target);

    textRef.current.fillOpacity = lerp(
      textRef.current.fillOpacity,
      angle > Math.PI / 2 + 0.1 || hovered ? (hovered ? 1 : 0.5) : 0,
      0.05
    );
  });

  // Event Handlers
  const onMouseEnterHandler = (e) => {
    e.stopPropagation();
    setHovered(true);
  };

  const onPointerUpHandler = (e) => {
    e.stopPropagation();
    setActiveID(projectID);
  };

  return (
    <group ref={ref} rotation={rotation} {...props}>
      <mesh
        position={[0, 0, 0.1]}
        onPointerEnter={onMouseEnterHandler}
        onPointerLeave={() => setHovered(false)}
        onPointerUp={onPointerUpHandler}
      >
        <planeGeometry args={[1.5, 2.5]} />
        <galleryItemMaterial
          ref={materialRef}
          uImage={imgMap}
          uNoise={noiseMap}
          uProgress={progress}
          transparent
        />
      </mesh>

      <Text
        ref={textRef}
        position={[0, 0, 0.2]}
        material-toneMapped={false}
        font={"/IBMPlexSans-Regular.woff"}
        fontSize={0.1}
        fillOpacity={0}
      >
        {projectTitle.toUpperCase()}
      </Text>

      <Constellation hovered={hovered} />
    </group>
  );
};

export default GalleryItem;
