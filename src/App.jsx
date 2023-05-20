import { Canvas } from "@react-three/fiber";
import Wrapper from "./components/layout/Wrapper";
import { Redirect, Route, Switch } from "wouter";

import Scene from "./components/scene/Scene";
import { Loader } from "@react-three/drei";

import WorksPageOverlay from "./components/layout/WorksPageOverlay";
import AboutPageOverlay from "./components/layout/AboutPageOverlay";
import NotFoundPageOverlay from "./components/layout/NotFoundPageOverlay";
import ProjectPageOverlay from "./components/layout/ProjectPageOverlay";
import Navigation from "./components/layout/Navigation";

const App = () => {
  return (
    <Wrapper>
      <Navigation />
      <Switch>
        <Route path="/">
          <Redirect to={"/works"} />
        </Route>
        <Route path="/works" component={WorksPageOverlay} />
        <Route path="/about" component={AboutPageOverlay} />
        <Route path="/works/:id" component={ProjectPageOverlay} />
        <Route component={NotFoundPageOverlay} />
      </Switch>

      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 1.5, 5] }}
        // orthographic camera={{ position: [0, 0, 2]}}
      >
        <Scene />
      </Canvas>
      <Loader />
    </Wrapper>
  );
};

export default App;
