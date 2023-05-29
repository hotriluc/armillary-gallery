import { useAnimations, useGLTF } from "@react-three/drei";
import { useEffect, useRef } from "react";

const CharacterModel = (props) => {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/arm.glb");
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    actions["Swim"].play();
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <group
        name="Armature"
        rotation={[Math.PI / 2, 0, Math.PI / 4]}
        scale={0.03}
        position={[3, -1, 0]}
      >
        <primitive object={nodes.mixamorigHips} />
        <skinnedMesh
          castShadow
          receiveShadow
          name="PinkSoldier_hat001"
          geometry={nodes.PinkSoldier_hat001.geometry}
          material={materials.Character}
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
  );
};

useGLTF.preload("/arm.glb");
export default CharacterModel;
