import * as THREE from "three";
import { damp } from "three/src/math/MathUtils";

import { useMemo, useRef } from "react";
import { extend, useFrame, useThree } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";

import constellationVertexShader from "../../shaders/constellation/vertex.glsl";
import constellationFragmentShader from "../../shaders/constellation/fragment.glsl";

import constellationLineVertexShader from "../../shaders/constellation-line/vertex.glsl";
import constellationLineFragmentShader from "../../shaders/constellation-line/fragment.glsl";

const ConstellationMaterial = new shaderMaterial(
  {
    uSize: 2.0,
    uTime: 0.0,
    uColorBase: new THREE.Color("#000000"),
    uColorMix: new THREE.Color("#ffffff"),
  },
  constellationVertexShader,
  constellationFragmentShader
);
extend({ ConstellationMaterial });

const ConstellationLineMaterial = new shaderMaterial(
  {
    uSize: 2.0,
    uTime: 0.0,
    uColorBase: new THREE.Color("#ABEA9A"),
  },
  constellationLineVertexShader,
  constellationLineFragmentShader
);
extend({ ConstellationLineMaterial });

const particlesCount = 5;

const Constellation = ({ hovered }) => {
  const constellationRef = useRef();
  const pointsMaterialRef = useRef();
  const linesMaterialRef = useRef();

  const { gl } = useThree();

  // Preparing attributes for particles
  const particlesPosition = useMemo(() => {
    const position = new Float32Array(particlesCount * 3);

    // Setting x,y,z for particle
    for (let i = 0; i < particlesCount * 3; i++) {
      position[i * 3] = -0.5 + Math.random();
      position[i * 3 + 1] = -0.5 + Math.random();
      position[i * 3 + 2] = -1 + Math.random();
    }

    return position;
  }, []);

  useFrame((state, delta) => {
    const et = state.clock.getElapsedTime();
    pointsMaterialRef.current.uTime = et;
    linesMaterialRef.current.uTime = et;

    // if project is hovered
    constellationRef.current.scale.y = damp(
      constellationRef.current.scale.y,
      hovered ? 1.8 : 0.6,
      3,
      delta
    );
    constellationRef.current.scale.x = damp(
      constellationRef.current.scale.x,
      hovered ? 1.8 : 0.6,
      3,
      delta
    );
  });

  return (
    <group ref={constellationRef} scale={[0.6, 0.6, 0.7]}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach={"attributes-position"}
            array={particlesPosition}
            count={particlesPosition.length / 3}
            itemSize={3}
          />
        </bufferGeometry>
        <constellationMaterial
          ref={pointsMaterialRef}
          uSize={gl.getPixelRatio() * 8.0}
          blending={THREE.AdditiveBlending}
          transparent
        />
      </points>
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach={"attributes-position"}
            array={particlesPosition}
            count={particlesPosition.length / 3}
            itemSize={3}
          />
        </bufferGeometry>
        <constellationLineMaterial ref={linesMaterialRef} />
      </line>
    </group>
  );
};

export default Constellation;
