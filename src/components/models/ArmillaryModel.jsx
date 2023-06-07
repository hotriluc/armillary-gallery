import { damp } from "three/src/math/MathUtils";

import { useGLTF, useScroll } from "@react-three/drei";
import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useUIStore } from "../../store/UIStore";

const ArmillaryModel = (props) => {
  const { width } = useThree((state) => state.viewport);
  const isLoaded = useUIStore((state) => state.isLoaded);
  const groupRef = useRef();
  const eclipticRef = useRef();
  const planetRef = useRef();
  const horizonRef = useRef();
  const meridianRef = useRef();

  const { nodes, materials } = useGLTF("/arm.glb");

  const { scroll } = useScroll();

  const directionalLightRef = useRef();
  // useHelper(directionalLightRef, THREE.DirectionalLightHelper);

  useFrame((state, delta) => {
    if (!isLoaded) return;
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

    planetRef.current.scale.x = damp(planetRef.current.scale.x, 1, 2, delta);
    planetRef.current.scale.y = damp(planetRef.current.scale.y, 1, 2, delta);
    planetRef.current.scale.z = damp(planetRef.current.scale.z, 1, 2, delta);

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
    <>
      <ambientLight intensity={0.4} color={"#346899"} />

      <group
        ref={groupRef}
        {...props}
        dispose={null}
        scale={width > 7 ? 0.3 : 0.2}
      >
        <group rotation={[0, 0, -Math.PI / 3]}>
          <directionalLight
            ref={directionalLightRef}
            castShadow
            position={[10, -1, 0]}
            color={"#0d9600"}
            intensity={8}
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
            scale={[0, 0, 0]}
            material={materials["Planet"]}
          />

          <mesh
            ref={eclipticRef}
            castShadow
            receiveShadow
            geometry={nodes.Ecliptic.geometry}
            rotation={[0, 0, Math.PI / 3]}
            material={materials["Planet"]}
          />
        </group>
        <mesh
          ref={meridianRef}
          castShadow
          receiveShadow
          geometry={nodes.Meridian.geometry}
          material={materials["Planet"]}
        />

        <mesh
          ref={horizonRef}
          castShadow
          receiveShadow
          geometry={nodes.Horizon.geometry}
          material={materials["Planet"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Holder.geometry}
          material={materials["Planet"]}
        />
      </group>
    </>
  );
};

useGLTF.preload("/arm.glb");

export default ArmillaryModel;
