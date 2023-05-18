import { useProjectStore } from "../../../store/projectStore";

import { Float, ScrollControls } from "@react-three/drei";

import Model from "./Model";
import Projects from "./Projects";
import Minimap from "./Minimap";

const WorksPageScene = () => {
  const projectsSize = useProjectStore((state) => state.projects.length);
  // const { width } = useThree((state) => state.viewport);

  return (
    <>
      <ScrollControls pages={projectsSize / 3}>
        <Minimap />
        <Float>
          <Model />
        </Float>
        <Projects />
      </ScrollControls>
    </>
  );
};

export default WorksPageScene;
