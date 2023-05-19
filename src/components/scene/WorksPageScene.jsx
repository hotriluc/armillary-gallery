import { useProjectStore } from "../../store/projectStore";

import { Float, ScrollControls } from "@react-three/drei";

import { Suspense } from "react";

import Model from "../gallery/Model";
import Gallery from "../gallery/Gallery";
import Minimap from "../gallery/Minimap";

const WorksPageScene = () => {
  const projectsSize = useProjectStore((state) => state.projects.length);
  // const { width } = useThree((state) => state.viewport);

  return (
    <>
      <ScrollControls pages={projectsSize / 3}>
        <Minimap />
        <Float>
          <Suspense fallback={null}>
            <Model />
          </Suspense>
        </Float>
        <Gallery />
      </ScrollControls>
    </>
  );
};

export default WorksPageScene;
