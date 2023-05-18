import { Canvas } from "@react-three/fiber";
import Wrapper from "./components/layout/Wrapper";
import { Link, Redirect, Route, Switch } from "wouter";

import Scene from "./components/scene/Scene";

const Works = () => {
  return (
    <div style={{ position: "absolute", color: "white", fontSize: "2rem" }}>
      works
    </div>
  );
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
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 1.5, 5] }}
        // orthographic camera={{ position: [0, 0, 2]}}
      >
        <Scene />
      </Canvas>
    </Wrapper>
  );
};

export default App;
