import { extend, useFrame, useLoader } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import { useProjectStore } from "../../store/projectStore";
import { damp, lerp } from "three/src/math/MathUtils";
import Constellation from "./Constellation";

import projectVertexShader from "../../shaders/project/vertex.glsl";
import projectFragmentShader from "../../shaders/project/fragment.glsl";
import { Text, shaderMaterial } from "@react-three/drei";
import { useControls } from "leva";
import { TextureLoader, Vector3 } from "three";

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
  const { id: projectID, imgUrl, title } = data;

  const ref = useRef();
  const materialRef = useRef();
  const textRef = useRef();

  const [hovered, setHover] = useState(false);
  const activeID = useProjectStore((state) => state.activeID);
  const setActiveID = useProjectStore((state) => state.setActiveID);

  const imgMap = useLoader(TextureLoader, imgUrl ? imgUrl : "/default.png");

  const { progress } = useControls({
    progress: { min: 0, max: 1, value: 0, step: 0.05 },
  });

  // It holds new pos when rotating
  const target = useMemo(() => {
    return new Vector3(0, 0, 0);
  }, []);

  // Initial vector to calculate the angle between
  const initialVector = useMemo(() => {
    return new Vector3(1, 0, 0);
  }, []);

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

    textRef.current.fontSize = lerp(
      textRef.current.fontSize,
      hovered ? 0.2 : 0.1,
      0.05
    );

    // In order to hide only half text we need to calculate new object position
    // by having 2 vectors we can calculate the angle between them
    // in order to hide the ones that have angle bigger then PI /2
    ref.current.getWorldPosition(target);
    const angle = initialVector.angleTo(target);

    textRef.current.fillOpacity = lerp(
      textRef.current.fillOpacity,
      angle > Math.PI / 2 || hovered ? (hovered ? 1 : 0.5) : 0,
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
      <Text ref={textRef} fillOpacity={0} fontSize={0.1} position={[0, 0, 0.2]}>
        {title}
      </Text>

      <Constellation hovered={hovered} />
    </group>
  );
};

export default Project;
