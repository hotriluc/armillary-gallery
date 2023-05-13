import constellationVertexShader from "../../shaders/constellation/vertex.glsl";
import constellationFragmentShader from "../../shaders/constellation/fragment.glsl";

import constellationLineVertexShader from "../../shaders/constellation-line/vertex.glsl";
import constellationLineFragmentShader from "../../shaders/constellation-line/fragment.glsl";

import { extend, useFrame, useThree } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import { useMemo, useRef } from "react";

import * as THREE from "three";

const ConstellationMaterial = new shaderMaterial(
  {
    uSize: 2.0,
    uTime: 0.0,
    uColorBase: new THREE.Color("black"),
    uColorMix: new THREE.Color("lime"),
  },
  constellationVertexShader,
  constellationFragmentShader
);

extend({ ConstellationMaterial });

const ConstellationLineMaterial = new shaderMaterial(
  { uSize: 2.0, uTime: 0.0 },
  constellationLineVertexShader,
  constellationLineFragmentShader
);

extend({ ConstellationLineMaterial });

const Constellation = () => {
  const pointsRef = useRef();
  const linesRef = useRef();

  const particlesCount = 5;

  const { gl } = useThree();

  // preparing attributes for particles
  const particlesPosition = useMemo(() => {
    const position = new Float32Array(particlesCount * 3);

    // Setting x,y,z for particle
    for (let i = 0; i < particlesCount * 3; i++) {
      position[i * 3] = -0.5 + Math.random();
      position[i * 3 + 1] = -0.5 + Math.random();
      position[i * 3 + 2] = -0.5 + Math.random();
    }

    return position;
  }, []);

  useFrame((state) => {
    const et = state.clock.getElapsedTime();
    pointsRef.current.material.uTime = et;
    linesRef.current.material.uTime = et;
  });

  return (
    <>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach={"attributes-position"}
            array={particlesPosition}
            count={particlesPosition.length / 3}
            itemSize={3}
          />
        </bufferGeometry>
        <constellationMaterial
          uSize={gl.getPixelRatio() * 8.0}
          blending={THREE.AdditiveBlending}
          transparent
        />
      </points>
      <line ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach={"attributes-position"}
            array={particlesPosition}
            count={particlesPosition.length / 3}
            itemSize={3}
          />
        </bufferGeometry>
        <constellationLineMaterial />
      </line>
    </>
  );
};

export default Constellation;
