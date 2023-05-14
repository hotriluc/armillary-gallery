import { extend, useFrame, useLoader } from "@react-three/fiber";
import { useRef, useState } from "react";
import { useProjectStore } from "../../store/projectStore";
import { damp, lerp } from "three/src/math/MathUtils";
import Constellation from "./Constellation";

import projectVertexShader from "../../shaders/project/vertex.glsl";
import projectFragmentShader from "../../shaders/project/fragment.glsl";
import { Text, shaderMaterial } from "@react-three/drei";
import { useControls } from "leva";
import { TextureLoader } from "three";

const ProjectMaterial = new shaderMaterial(
  {
    uTime: 0.0,
    uImage: null,
    uNoise: null,
    uProgress: 0,
  },
  projectVertexShader,
  projectFragmentShader
);

extend({ ProjectMaterial });

const Project = ({ data, noiseMap, rotation, ...props }) => {
  const ref = useRef();
  const materialRef = useRef();
  const textRef = useRef();

  const { id: projectID, imgUrl, title } = data;
  const [hovered, setHover] = useState(false);
  const activeID = useProjectStore((state) => state.activeID);
  const setActiveID = useProjectStore((state) => state.setActiveID);

  const imgMap = useLoader(TextureLoader, imgUrl ? imgUrl : "/default.png");

  const { progress } = useControls({
    progress: { min: 0, max: 1, value: 0, step: 0.05 },
  });

  // Animate Click and Hover
  useFrame((state, delta) => {
    const et = state.clock.getElapsedTime();

    materialRef.current.uTime = et;

    ref.current.rotation.y = damp(
      ref.current.rotation.y,
      hovered || activeID === projectID
        ? rotation[1] - Math.PI / 5.5
        : rotation[1],
      6,
      delta
    );

    materialRef.current.uProgress = lerp(
      materialRef.current.uProgress,
      hovered ? 1 : 0,
      0.02
    );

    textRef.current.fillOpacity = lerp(
      materialRef.current.uProgress,
      hovered ? 1 : 0,
      0.05
    );
  });

  // Event Handlers
  const onMouseEnterHandler = (e) => {
    e.stopPropagation();
    setHover(true);
  };

  const onMouseClickHandler = (e) => {
    e.stopPropagation();
    setActiveID(projectID);
  };

  return (
    <group ref={ref} {...props}>
      <mesh
        position={[0, 0, 0.1]}
        onPointerEnter={onMouseEnterHandler}
        onPointerLeave={() => setHover(false)}
        onClick={onMouseClickHandler}
      >
        <planeGeometry args={[1.5, 2.5]} />
        <projectMaterial
          ref={materialRef}
          uImage={imgMap}
          uNoise={noiseMap}
          uProgress={progress}
          transparent
        />
      </mesh>
      <Text ref={textRef} fontSize={0.2} position={[0, 0, 0.2]}>
        {title}
      </Text>

      <Constellation hovered={hovered} />
    </group>
  );
};

export default Project;
