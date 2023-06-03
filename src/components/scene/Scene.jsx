import { SoftShadows } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { useControls } from "leva";
import { Route, Switch } from "wouter";

import WorksPageScene from "./WorksPageScene";
import AboutPageScene from "./AboutPageScene";

const Scene = () => {
  const { size, focus, samples } = useControls("soft shadows", {
    size: { min: 0, max: 200, value: 13, step: 1 },
    focus: { min: 1, max: 20, value: 20, step: 1 },
    samples: { min: 1, max: 100, value: 8, step: 1 },
  });

  return (
    <>
      {/* <EffectComposer stencilBuffer multisampling={1}>
        <Bloom mipmapBlur intensity={0.2} luminanceThreshold={0} />
      </EffectComposer> */}

      <SoftShadows size={size} focus={focus} samples={samples} />

      <Switch>
        <Route path="/works">
          <WorksPageScene />
        </Route>
        <Route path="/about">
          <AboutPageScene />
        </Route>
      </Switch>
    </>
  );
};

export default Scene;
