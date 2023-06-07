import { useProjectStore } from "../../store/projectStore";

import { Float, Scroll, ScrollControls } from "@react-three/drei";

import { Suspense } from "react";

import Gallery from "../gallery/Gallery";
import Minimap from "../gallery/Minimap";
import ArmillaryModel from "../models/ArmillaryModel";
import { useThree } from "@react-three/fiber";

const WorksPageScene = () => {
  const projectsSize = useProjectStore((state) => state.projects.length);
  const { width } = useThree((state) => state.viewport);

  const itemGap = 0.5;
  const itemWidth = 1.5;

  return (
    <ScrollControls
      pages={
        (width - (itemGap + itemWidth) + projectsSize * (itemGap + itemWidth)) /
        width
      }
      horizontal={width < 7}
    >
      <Minimap />
      <Float>
        <Suspense fallback={null}>
          <ArmillaryModel />
        </Suspense>
      </Float>

      {width > 7 ? (
        <Gallery />
      ) : (
        <Scroll>
          <Gallery />
        </Scroll>
      )}
    </ScrollControls>
  );
};

export default WorksPageScene;
