import { Canvas } from "@react-three/fiber";
import Wrapper from "./components/layout/Wrapper";
import { Link, Redirect, Route, Switch } from "wouter";
import Projects from "./components/scene/Projects";
import { Center } from "@react-three/drei";

const Works = () => {
  return <div style={{ position: "absolute" }}>works</div>;
};

const About = () => {
  return <div>About</div>;
};

const NotFound = () => {
  return <div>Not found</div>;
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
      // orthographic camera={{ position: [0, 0, 2]}}
      >
        <Switch>
          <Route path="/works">
            <Center>
              {/* <OrbitControls /> */}

              <mesh>
                <sphereGeometry />
              </mesh>
              <Projects />
            </Center>
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
