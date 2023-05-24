import { Canvas } from "@react-three/fiber";
import Wrapper from "./components/layout/Wrapper";
import { Redirect, Route, Switch, useLocation, useRoute } from "wouter";

import Scene from "./components/scene/Scene";
import { Loader, useProgress } from "@react-three/drei";

import WorksPageOverlay from "./components/layout/WorksPageOverlay";
import AboutPageOverlay from "./components/layout/AboutPageOverlay";
import NotFoundPageOverlay from "./components/layout/NotFoundPageOverlay";
import ProjectPageOverlay from "./components/layout/ProjectPageOverlay";
import Navigation from "./components/layout/Navigation";

import { useEffect } from "react";
import { useUIStore } from "./store/UIStore";
import { Perf } from "r3f-perf";
import { AnimatePresence } from "framer-motion";
import { useProjectStore } from "./store/projectStore";

const App = () => {
  const { active } = useProgress();

  const setIsLoaded = useUIStore((state) => state.setIsLoaded);

  useEffect(() => {
    if (active === false) {
      setTimeout(() => {
        setIsLoaded(true);
      }, 500);
    }
  }, [active, setIsLoaded]);

  const [location] = useLocation();
  const [isProjectRoute] = useRoute("/works/:id");

  return (
    <Wrapper>
      <Navigation />

      <AnimatePresence>
        <Switch
          key={!isProjectRoute ? location : "/works/"}
          location={location}
        >
          <Route path="/">
            <Redirect to={"/works"} />
          </Route>
          <Route path="/works">
            <WorksPageOverlay path="/works" />
          </Route>
          <Route path="/about" component={AboutPageOverlay} />
          <Route path="/works/:id" component={ProjectPageOverlay} />
          <Route component={NotFoundPageOverlay} />
        </Switch>
      </AnimatePresence>

      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 1.5, 5] }}
        // orthographic camera={{ position: [0, 0, 2]}}
      >
        <Perf />
        <Scene />
      </Canvas>
      <Loader />
    </Wrapper>
  );
};

export default App;
