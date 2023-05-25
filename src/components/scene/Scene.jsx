import { SoftShadows } from "@react-three/drei";
import { Bloom, EffectComposer, N8AO } from "@react-three/postprocessing";
import { useControls } from "leva";
import { Route, Switch, useLocation } from "wouter";
import WorksPageScene from "./WorksPageScene";

const Scene = () => {
  const { size, focus, samples } = useControls("soft shadows", {
    size: { min: 0, max: 200, value: 13, step: 1 },
    focus: { min: 1, max: 20, value: 20, step: 1 },
    samples: { min: 1, max: 100, value: 8, step: 1 },
  });

  return (
    <>
      {/* <EffectComposer>
        <Bloom mipmapBlur intensity={0.2} luminanceThreshold={0} />
      </EffectComposer> */}

      <SoftShadows size={size} focus={focus} samples={samples} />

      <Switch>
        <Route path="/works">
          <WorksPageScene />
        </Route>
        {/* <Route path="/about">
          <mesh>
            <planeGeometry />
            <meshBasicMaterial color={"blue"} />
          </mesh>
        </Route> */}
      </Switch>
    </>
  );
};

export default Scene;
