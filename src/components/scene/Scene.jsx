import { SoftShadows } from "@react-three/drei";
import { Route, Switch } from "wouter";

import WorksPageScene from "./WorksPageScene";
import AboutPageScene from "./AboutPageScene";
import { Bloom, EffectComposer } from "@react-three/postprocessing";

const Scene = () => {
  return (
    <>
      <SoftShadows size={13} focus={20} samples={8} />
      {/* <EffectComposer>
        <Bloom mipmapBlur intensity={0.2} luminanceThreshold={0} />
      </EffectComposer> */}
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
