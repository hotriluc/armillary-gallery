import { useGLTF, useHelper, useScroll } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { damp } from "three/src/math/MathUtils";

import * as THREE from "three";
import { useControls } from "leva";

const Model = (props) => {
  const eclipticRef = useRef();
  const planetRef = useRef();
  const horizonRef = useRef();
  const meridianRef = useRef();

  const { nodes } = useGLTF("/arm.glb");

  const { scroll } = useScroll();

  const directionalLightRef = useRef();
  useHelper(directionalLightRef, THREE.DirectionalLightHelper);

  const { color, intensity } = useControls("Armilary lights", {
    color: "#ffffff",
    intensity: { min: 0, max: 20, value: 2 },
  });

  const {
    metalness,
    roughness,
    color: modelColor,
  } = useControls({
    metalness: { min: 0, max: 1, value: 0 },
    roughness: { min: 0, max: 1, value: 0.45 },
    color: "#ffffff",
  });

  useFrame((state, delta) => {
    eclipticRef.current.rotation.y = damp(
      eclipticRef.current.rotation.y,
      scroll.current * Math.PI * 2,
      2,
      delta
    );

    planetRef.current.rotation.y = damp(
      planetRef.current.rotation.y,
      scroll.current * Math.PI * 2,
      2,
      delta
    );

    horizonRef.current.rotation.y = damp(
      horizonRef.current.rotation.y,
      scroll.current * Math.PI * 2,
      2,
      delta
    );

    meridianRef.current.rotation.x = damp(
      meridianRef.current.rotation.x,
      scroll.current * Math.PI * 2,
      2,
      delta
    );

    directionalLightRef.current.position.x = damp(
      directionalLightRef.current.position.x,
      -3.5 * Math.cos(2 * Math.PI * scroll.current),
      2,
      delta
    );

    directionalLightRef.current.position.z = damp(
      directionalLightRef.current.position.z,
      -3.5 * Math.sin(2 * Math.PI * scroll.current),
      2,
      delta
    );
  });

  // const scrollSpeed = useUIStore((state) => state.scrollSpeed);
  // const [scrollTarget, setScrollTarget] = useState(0);

  // useEffect(() => {
  //   // set scroll target (new rotation value)
  //   setScrollTarget(eclipticRef.current.rotation.y - 1.0 * scrollSpeed);
  // }, [scrollSpeed]);

  // // Animations
  // useFrame(() => {
  //   eclipticRef.current.rotation.y = lerp(
  //     eclipticRef.current.rotation.y,
  //     scrollTarget,
  //     0.04
  //   );

  //   planetRef.current.rotation.y = lerp(
  //     planetRef.current.rotation.y,
  //     scrollTarget,
  //     0.04
  //   );

  //   horizonRef.current.rotation.x = lerp(
  //     horizonRef.current.rotation.x,
  //     scrollTarget,
  //     0.04
  //   );

  //   meridianRef.current.rotation.y = lerp(
  //     meridianRef.current.rotation.y,
  //     scrollTarget,
  //     0.04
  //   );
  // });

  return (
    <group {...props} dispose={null} scale={0.3}>
      <group rotation={[0, 0, -Math.PI / 3]}>
        <directionalLight
          ref={directionalLightRef}
          castShadow
          position={[10, -1, 0]}
          color={color}
          intensity={intensity}
          shadow-mapSize={2048}
          shadow-camera-top={10}
          shadow-camera-right={10}
          shadow-camera-bottom={-10}
          shadow-camera-left={-10}
        />

        <mesh
          ref={planetRef}
          castShadow
          receiveShadow
          geometry={nodes.Cube.geometry}
          rotation={[0, 0, Math.PI / 3]}
        >
          <meshStandardMaterial
            metalness={metalness}
            roughness={roughness}
            color={modelColor}
          />
        </mesh>
        <mesh
          ref={eclipticRef}
          castShadow
          receiveShadow
          geometry={nodes.Ecliptic.geometry}
          rotation={[0, 0, Math.PI / 3]}
        >
          <meshStandardMaterial
            metalness={metalness}
            roughness={roughness}
            color={modelColor}
          />
        </mesh>
      </group>
      <mesh
        ref={meridianRef}
        castShadow
        receiveShadow
        geometry={nodes.Meridian.geometry}
      >
        <meshStandardMaterial
          metalness={metalness}
          roughness={roughness}
          color={modelColor}
        />
      </mesh>
      <mesh
        ref={horizonRef}
        castShadow
        receiveShadow
        geometry={nodes.Horizon.geometry}
      >
        <meshStandardMaterial
          metalness={metalness}
          roughness={roughness}
          color={modelColor}
        />
      </mesh>
      <mesh castShadow receiveShadow geometry={nodes.Holder.geometry}>
        <meshStandardMaterial
          metalness={metalness}
          roughness={roughness}
          color={modelColor}
        />
      </mesh>
    </group>
  );
};

useGLTF.preload("/arm.glb");

export default Model;
