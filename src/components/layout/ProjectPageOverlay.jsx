import { useRoute } from "wouter";
import { useProjectStore } from "../../store/projectStore";
import { styled } from "styled-components";

const ProjectWrapper = styled.div`
  padding: 4rem;
  height: 100%;
  width: 100%;
  position: absolute;
  z-index: 10;
`;

const Banner = styled.div`
  width: 100%;
  /* padding: 2rem; */
  /* border: 0.5px solid #abea9a; */
  position: relative;
`;

const BannerTitle = styled.h1`
  color: #101010;
  position: absolute;

  font-size: 7.5em;
  font-weight: 400;

  margin: 0;
  top: 50%;
  left: 50%;
  width: max-content;

  transform: translate(-50%, -50%);
`;

const BannerImage = styled.div`
  height: 55rem;
  margin-top: 4rem;
  overflow: hidden;

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
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

  if (!match) return;

  const filteredProjects = projects.filter((el) => el.id === params.id);
  const project = filteredProjects[0];

  return (
    <ProjectWrapper>
      <Banner>
        <BannerTitle>{project.title}</BannerTitle>
        <BannerImage>
          <img src="/default.png" alt="" />
        </BannerImage>
      </Banner>

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
