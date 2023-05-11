import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { damp } from "three/src/math/MathUtils";
import { useProjectStore } from "../../store/projectStore";

const Project = ({ data, ...props }) => {
  const ref = useRef();
  const [hovered, setHover] = useState(false);

  const { id: projectID } = data;
  const { rotation } = props;

  const activeID = useProjectStore((state) => state.activeID);
  const setActiveID = useProjectStore((state) => state.setActiveID);

  // Animate Click and Hover
  useFrame((state, delta) => {
    ref.current.rotation.y = damp(
      ref.current.rotation.y,
      hovered || activeID === projectID
        ? rotation[1] - Math.PI / 4
        : rotation[1],
      6,
      delta
    );
  });

  // Event Handlers
  const onMouseEnterHandler = (e) => {
    e.stopPropagation();
    setHover(true);
  };

  const onMouseClickHandler = (e) => {
    e.stopPropagation();
    setActiveID(projectID);
  };

  return (
    <mesh
      ref={ref}
      onPointerEnter={onMouseEnterHandler}
      onPointerLeave={() => setHover(false)}
      onClick={onMouseClickHandler}
      {...props}
    >
      <planeGeometry />
      <meshStandardMaterial color={"#101010"} />
    </mesh>
  );
};

export default Project;
