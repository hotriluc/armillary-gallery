import { Canvas } from "@react-three/fiber";
import Wrapper from "./components/layout/Wrapper";
import { Link, Redirect, Route, Switch } from "wouter";
import Projects from "./components/scene/Projects";
import Model from "./components/scene/Model";
import { ScrollControls, SoftShadows } from "@react-three/drei";
import { useProjectStore } from "./store/projectStore";
import { useControls } from "leva";

const Works = () => {
  return <div style={{ position: "absolute" }}>works</div>;
};

const About = () => {
  return <div>About</div>;
};

const NotFound = () => {
  return <div>Not found</div>;
};

const WorksPageScene = () => {
  const projectsSize = useProjectStore((state) => state.projects.length);
  // const { width } = useThree((state) => state.viewport);

  const { size, focus, samples } = useControls("soft shadows", {
    size: { min: 0, max: 200, value: 13, step: 1 },
    focus: { min: 1, max: 20, value: 20, step: 1 },
    samples: { min: 1, max: 100, value: 8, step: 1 },
  });

  const { color, intensity } = useControls("ambient lights", {
    color: "#1d1d1d",
    intensity: { min: 0, max: 20, value: 1.6, step: 0.1 },
  });

  return (
    <>
      <SoftShadows size={size} focus={focus} samples={samples} />
      <ambientLight intensity={intensity} color={color} />

      <ScrollControls pages={projectsSize / 3}>
        <Model />
        <Projects />
      </ScrollControls>
    </>
  );
};

const App = () => {
  return (
    <Wrapper>
      <nav style={{ position: "absolute" }}>
        <Link href="/works"> Works</Link>
        <Link href="/about"> About</Link>
      </nav>

      <Switch>
        <Route path="/">
          <Redirect to={"/works"} />
        </Route>
        <Route path="/works" component={Works} />
        <Route path="/about" component={About} />
        <Route component={NotFound} />
      </Switch>

      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 1.5, 5] }}
        // orthographic camera={{ position: [0, 0, 2]}}
      >
        <Switch>
          <Route path="/works">
            <WorksPageScene />
          </Route>
          <Route path="/about">
            <mesh>
              <planeGeometry />
              <meshBasicMaterial color={"blue"} />
            </mesh>
          </Route>

          <Route />
        </Switch>
      </Canvas>
    </Wrapper>
  );
};

export default App;
