import { useLocation, useRoute } from "wouter";
import { useProjectStore } from "../../store/projectStore";
import { styled } from "styled-components";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { SplitText } from "@cyriacbr/react-split-text";

const ProjectWrapper = styled(motion.div)`
  padding: 8rem 4rem;
  height: 100%;
  width: 100%;
  position: absolute;
  z-index: 1;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: min-content 1fr;
  grid-row-gap: 2rem;
  grid-column-gap: 2rem;

  grid-template-areas:
    "banner banner banner"
    "nav description technologies";
`;

const Banner = styled(motion.div)`
  width: 100%;

  grid-area: banner;
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

  span {
    display: inline-block;
  }
`;

const BannerImage = styled(motion.div)`
  height: 55rem;
  overflow: hidden;
  transform-origin: top;
`;

const BannerImageInner = styled(motion.img)`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const Author = styled.div`
  display: flex;
  flex-direction: column;

  p {
    font-weight: 300;
    text-transform: uppercase;
  }
`;

const Heading = styled(motion.h2)`
  color: ${(props) => props.theme.colors.light};
  font-size: 1em;
  font-weight: 200;
  text-transform: uppercase;
`;

const OverflowTextHolder = styled(motion.div)`
  overflow: hidden;
  /* text-transform: uppercase; */

  span {
    font-weight: 300;
    display: inline-block;
    color: ${(props) => props.theme.colors.primary};
  }
`;

const ProjectNavigation = styled.div`
  grid-area: navigation;
  margin-top: auto;

  display: flex;
  gap: 1rem;

  button {
    fill: none;
    stroke: ${(props) => props.theme.colors.light};
    background: transparent;
    border: none;
    cursor: pointer;
    transition: all 0.3s;
  }

  button:hover {
    stroke: ${(props) => props.theme.colors.primary};
  }

  button:disabled {
    stroke: grey;
  }
`;

const Description = styled.div`
  grid-area: description;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Technologies = styled.div`
  grid-area: technologies;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

function mod(n, m) {
  return ((n % m) + m) % m;
}

const text = `This is the project inspered by me. I was surfing through the net in
order to find cool inspiration.`;

const ProjectPageOverlay = () => {
  const [match, params] = useRoute("/works/:id");
  const projects = useProjectStore((state) => state.projects);
  const [location, navigate] = useLocation();

  if (!match) return;

  const index = projects.findIndex((el) => el.id === params.id);
  const currentProject = projects[index];
  const prevProject = projects[mod(index - 1, projects.length)];
  const nextProject = projects[mod(index + 1, projects.length)];

  const textVariants = {
    initial: {
      y: "101%",
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: { duration: 1.2, ease: [0.87, 0, 0.13, 1] },
    },
    exit: {
      y: "-101%",
      opacity: 0,
      transition: { duration: 1.2, ease: [0.87, 0, 0.13, 1] },
    },
  };

  const imageVariants = {
    initial: {
      y: "-101%",
    },
    animate: {
      y: 0,
      transition: { duration: 1.2, ease: [0.87, 0, 0.13, 1] },
    },
    exit: {
      y: "101%",
      transition: { duration: 1.2, ease: [0.87, 0, 0.13, 1] },
    },
  };

  const imageInnerVariants = {
    initial: {
      y: "101%",
    },
    animate: {
      y: 0,
      transition: { duration: 1.2, ease: [0.87, 0, 0.13, 1] },
    },
    exit: {
      y: "-101%",
      transition: { duration: 1.2, ease: [0.87, 0, 0.13, 1] },
    },
  };

  return (
    <AnimatePresence mode="wait">
      <ProjectWrapper key={currentProject.id}>
        <Banner>
          <BannerTitle>
            <motion.span
              initial="initial"
              animate="animate"
              exit="exit"
              variants={textVariants}
            >
              {currentProject.title}
            </motion.span>
          </BannerTitle>
          <BannerImage
            initial="initial"
            animate="animate"
            exit="exit"
            variants={imageVariants}
          >
            <BannerImageInner
              src="/default.png"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={imageInnerVariants}
            />
          </BannerImage>
        </Banner>

        <Author>
          <OverflowTextHolder>
            <Heading
              initial="initial"
              animate="animate"
              exit="exit"
              variants={textVariants}
            >
              Ho Tri Luc
            </Heading>
          </OverflowTextHolder>
          <OverflowTextHolder>
            <motion.span
              initial="initial"
              animate="animate"
              exit="exit"
              variants={textVariants}
            >
              APRIL 23
            </motion.span>
          </OverflowTextHolder>

          <ProjectNavigation>
            <motion.button
              onClick={async () => {
                await navigate("/works/" + prevProject.id);
              }}
              initial={{ opacity: 0.2 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              exit={{ opacity: 0.2, pointerEvents: "none" }}
            >
              <svg width="100px" height="18px" viewBox="0 0 50 9">
                <path
                  vectorEffect="non-scaling-stroke"
                  d="m0 4.5 5-3m-5 3 5 3m45-3h-77"
                ></path>
              </svg>
            </motion.button>
            <motion.button
              onClick={async () => {
                // await setButtonIsEnabled(false);
                await navigate("/works/" + nextProject.id);
              }}
              initial={{ opacity: 0.2 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              exit={{ opacity: 0.2, pointerEvents: "none" }}
            >
              <svg
                width="100px"
                height="18px"
                viewBox="0 0 50 9"
                transform="scale(-1,1)"
              >
                <path
                  vectorEffect="non-scaling-stroke"
                  d="m0 4.5 5-3m-5 3 5 3m45-3h-77"
                ></path>
              </svg>
            </motion.button>
          </ProjectNavigation>
        </Author>

        <Description>
          <OverflowTextHolder>
            <Heading
              initial={{ y: "101%", opacity: 0 }}
              animate={{ y: "0", opacity: 1 }}
              exit={{ y: "-101%", opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.87, 0, 0.13, 1] }}
            >
              Description:
            </Heading>
          </OverflowTextHolder>

          <SplitText
            LineWrapper={({ id, children }) => (
              <OverflowTextHolder>{children}</OverflowTextHolder>
            )}
            WordWrapper={({ id, children }) => (
              <motion.span
                style={{ whiteSpace: "pre" }}
                initial="initial"
                animate="animate"
                exit="exit"
                variants={textVariants}
              >
                {children}
              </motion.span>
            )}
          >
            {text.toUpperCase()}
          </SplitText>
        </Description>

        <Technologies>
          <OverflowTextHolder>
            <Heading
              initial="initial"
              animate="animate"
              exit="exit"
              variants={textVariants}
            >
              Technologies:
            </Heading>
          </OverflowTextHolder>
          <SplitText
            LineWrapper={({ children }) => (
              <OverflowTextHolder>{children}</OverflowTextHolder>
            )}
            WordWrapper={({ children }) => (
              <motion.span
                initial="initial"
                animate="animate"
                exit="exit"
                variants={textVariants}
              >
                {children}
              </motion.span>
            )}
          >
            {text.toUpperCase()}
          </SplitText>
        </Technologies>
      </ProjectWrapper>
    </AnimatePresence>
  );
};

export default ProjectPageOverlay;
