const Project = (props) => {
  return (
    <mesh {...props}>
      <planeGeometry />
      <meshBasicMaterial />
    </mesh>
  );
};

export default Project;
