import { useRoute } from "wouter";
import { useProjectStore } from "../../store/projectStore";
import { styled } from "styled-components";

import { motion } from "framer-motion";
import { useState } from "react";

const ProjectWrapper = styled.div`
  padding: 4rem;
  height: 100%;
  width: 100%;
  position: absolute;
  z-index: 1;
`;

const Banner = styled(motion.div)`
  width: 100%;
  /* padding: 2rem; */
  /* border: 0.5px solid #abea9a; */
  position: relative;
  overflow: hidden;
`;

const BannerTitle = styled.h1`
  color: #fefefe;
  position: absolute;

  font-size: 7.5em;
  font-weight: 400;

  margin: 0;
  top: 50%;
  left: 50%;
  width: max-content;

  font-family: "IBM Plex Sans", sans-serif;
  text-transform: uppercase;

  transform: translate(-50%, -50%);
  z-index: 1;

  overflow: hidden;
`;

const BannerTitleInner = styled(motion.span)`
  display: inline-block;
`;

const BannerImage = styled(motion.div)`
  height: 55rem;
  margin-top: 4rem;
  overflow: hidden;
  transform-origin: top;
`;

const BannerImageInner = styled(motion.img)`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const ProjectData = styled.div`
  margin-top: 4rem;
  color: ${(props) => props.theme.colors.primary};

  display: flex;
  gap: 4rem;
`;

const Author = styled.div`
  flex-basis: 100%;

  h2 {
    color: ${(props) => props.theme.colors.light};
    font-size: 1em;
    font-weight: 200;
    text-transform: uppercase;
  }
  p {
    font-weight: 300;
    text-transform: uppercase;
  }
`;

const DataRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  h2 {
    color: ${(props) => props.theme.colors.light};
    font-weight: 200;
    font-size: 1em;
    text-transform: uppercase;
  }

  p {
    font-weight: 300;
    text-transform: uppercase;
  }
`;

const ProjectPageOverlay = () => {
  const [match, params] = useRoute("/works/:id");
  const projects = useProjectStore((state) => state.projects);

  const filteredProjects = projects.filter((el) => el.id === params.id);
  const project = filteredProjects[0];

  const [leave, setLeave] = useState(false);

  return (
    <ProjectWrapper>
      <Banner>
        <BannerTitle>
          <BannerTitleInner
            initial={{ y: "100%", opacity: 0 }}
            animate={!leave ? { y: "0", opacity: 1 } : { y: "-100%" }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            {project.title}
          </BannerTitleInner>
        </BannerTitle>
        <BannerImage
          initial={{ y: "-101%" }}
          animate={!leave ? { y: 0 } : { y: "101%" }}
          transition={{ duration: 0.8 }}
        >
          <BannerImageInner
            src="/default.png"
            initial={{ y: "101%" }}
            animate={!leave ? { y: 0 } : { y: "-101%" }}
            transition={{ duration: 0.8 }}
          />
        </BannerImage>
      </Banner>
      <button onClick={() => setLeave((prev) => !prev)}>click</button>

      <ProjectData>
        <Author>
          <h2>Ho Tri Luc</h2>
          <p> April 2023.</p>
        </Author>
        <DataRow>
          <h2>Description:</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
            corporis odit, modi, dicta, quos magnam temporibus aperiam rerum
            nihil officiis hic iure itaque harum. Nesciunt doloremque odit
            laboriosam iure fugit.
          </p>
        </DataRow>
        <DataRow>
          <h2>Technologies:</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
            corporis odit, modi, dicta, quos magnam temporibus aperiam rerum
            nihil officiis hic iure itaque harum. Nesciunt doloremque odit
            laboriosam iure fugit.
          </p>
        </DataRow>
      </ProjectData>
    </ProjectWrapper>
  );
};

export default ProjectPageOverlay;
