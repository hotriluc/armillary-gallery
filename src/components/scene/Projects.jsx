import Project from "./Project";

const projects = [
  {
    id: "clip_the_street",
    title: "Clip the street.",
  },
  {
    id: "bgr",
    title: "BGR.",
  },
  {
    id: "hollow",
    title: "Hollow.",
  },
  {
    id: "hollow",
    title: "Hollow.",
  },
  {
    id: "hollow2",
    title: "Hollow.",
  },
  {
    id: "hollow3",
    title: "Hollow.",
  },
  {
    id: "hollow4",
    title: "Hollow.",
  },
  {
    id: "hollow5",
    title: "Hollow.",
  },
];

const Projects = () => {
  const radius = 2.5;
  const interval = (Math.PI * 2) / projects.length;

  return (
    <>
      {projects.map((el, i) => (
        // position  using sin and cos we can place our objects on the circle
        // rotation (1st term - we rotate i-th plane to make its side to look into the center)
        // 2nd term - control how much spin you add to your cards (if multiply it by  0.5 it will look like N-gon)
        <Project
          key={i}
          position={[
            Math.cos(interval * i) * radius,
            0,
            Math.sin(interval * i) * radius,
          ]}
          rotation={[
            0,
            (-2 * i * Math.PI) / projects.length +
              (Math.PI * projects.length) / projects.length,
            0,
          ]}
        />
      ))}
    </>
  );
};

export default Projects;
