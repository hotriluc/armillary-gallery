import {
  Float,
  Mask,
  useAnimations,
  useGLTF,
  useMask,
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { damp } from "three/src/math/MathUtils";
import { useUIStore } from "../../store/UIStore";
import { useLocation } from "wouter";

const CharacterModel = (props) => {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/arm.glb");
  const { actions } = useAnimations(animations, group);

  const stencil = useMask(1);
  const maskRef = useRef();
  const destination = useUIStore((state) => state.destination);
  const [location] = useLocation();

  const { width } = useThree((state) => state.viewport);

  useEffect(() => {
    void actions["Swim"].play();
  }, []);

  useFrame((state, delta) => {
    maskRef.current.scale.y = damp(
      maskRef.current.scale.y,
      location === "/about" && destination === null ? 1 : 0,
      location === "/about" && destination === null ? 3.5 : 7.2,
      delta
    );
  });

  return (
    <>
      <Float>
        <Mask
          ref={maskRef}
          colorWrite
          position={[width / 4, 0, 0]}
          rotation-x={-0.5}
          scale-y={0}
        >
          <planeGeometry args={[6, 3.5]} />
          <meshBasicMaterial color={"#346899"} />
        </Mask>
      </Float>

      <Float>
        <group ref={group} {...props} dispose={null}>
          <group
            name="Armature"
            rotation={[Math.PI / 2, 0, Math.PI / 4]}
            scale={0.03}
            position={[width / 4, -1.5, 0]}
          >
            <primitive object={nodes.mixamorigHips} />
            <skinnedMesh
              castShadow
              receiveShadow
              name="PinkSoldier_hat001"
              geometry={nodes.PinkSoldier_hat001.geometry}
              material={materials.Character}
              material-stencilWrite={true}
              material-stencilRef={stencil.stencilRef}
              material-stencilFunc={stencil.stencilFunc}
              material-stencilFail={7680}
              material-stencilZFail={7680}
              material-stencilZPass={7680}
              skeleton={nodes.PinkSoldier_hat001.skeleton}
            />
            <skinnedMesh
              castShadow
              receiveShadow
              name="PinkSoldier_lower001"
              geometry={nodes.PinkSoldier_lower001.geometry}
              material={materials.Character}
              skeleton={nodes.PinkSoldier_lower001.skeleton}
            />
            <skinnedMesh
              castShadow
              receiveShadow
              name="PinkSoldier_mask_T001"
              geometry={nodes.PinkSoldier_mask_T001.geometry}
              material={materials.Character}
              skeleton={nodes.PinkSoldier_mask_T001.skeleton}
            />
            <skinnedMesh
              castShadow
              receiveShadow
              name="PinkSoldier_upper001"
              geometry={nodes.PinkSoldier_upper001.geometry}
              material={materials.Character}
              skeleton={nodes.PinkSoldier_upper001.skeleton}
            />
          </group>
        </group>
      </Float>
    </>
  );
};

useGLTF.preload("/arm.glb");
export default CharacterModel;
