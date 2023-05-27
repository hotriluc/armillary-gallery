import { useLocation, useRoute } from "wouter";
import { useProjectStore } from "../../store/projectStore";

import { AnimatePresence, motion, useAnimate } from "framer-motion";
import { SplitText } from "@cyriacbr/react-split-text";
import { mod } from "../../helpers/math";

import {
  Author,
  Banner,
  BannerImage,
  BannerImageInner,
  BannerTitle,
  Button,
  Description,
  Heading,
  OverflowTextHolder,
  ProjectNavigation,
  ProjectWrapper,
  Technologies,
} from "../../styled/Project";
import Navigation from "../navigation/Navigation";

const text = `This is the project inspered by me. I was surfing through the net in
order to find cool inspiration.`;

const ProjectPageOverlay = () => {
  const [match, params] = useRoute("/works/:id");
  const projects = useProjectStore((state) => state.projects);
  const [location, navigate] = useLocation();

  const [projectScope, animateProject] = useAnimate();
  const [imageScope, animateImage] = useAnimate();

  if (!match) return;

  const index = projects.findIndex((el) => el.id === params.id);
  const currentProject = projects[index];
  const prevProject = projects[mod(index - 1, projects.length)];
  const nextProject = projects[mod(index + 1, projects.length)];

  // ANIMATIONS
  const textVariants = {
    initial: {
      y: "101%",
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: { duration: 1.1, ease: [0.87, 0, 0.13, 1] },
    },
    exit: {
      y: "-101%",
      opacity: 0,
      transition: { duration: 1.1, ease: [0.87, 0, 0.13, 1] },
    },
  };

  const imageVariants = {
    initial: {
      y: "-101%",
    },
    animate: {
      y: 0,
      transition: { duration: 1.1, ease: [0.87, 0, 0.13, 1] },
    },
    exit: {
      y: "101%",
      transition: { duration: 1.1, ease: [0.87, 0, 0.13, 1] },
    },
  };

  const imageInnerVariants = {
    initial: {
      y: "101%",
    },
    animate: {
      y: 0,
      transition: { duration: 1.1, ease: [0.87, 0, 0.13, 1] },
    },
    exit: {
      y: "-101%",
      transition: { duration: 1.1, ease: [0.87, 0, 0.13, 1] },
    },
  };

  const projectLeaveAnimation = async () => {
    await Promise.all([
      animateProject(
        "span",
        {
          y: "-101%",
          opacity: 0,
        },
        { duration: 1.1, ease: [0.87, 0, 0.13, 1] }
      ),
      animateProject(
        "a",
        {
          y: "-101%",
          opacity: 0,
        },
        { duration: 1.1, ease: [0.87, 0, 0.13, 1] }
      ),
      animateProject(
        "h2",
        {
          y: "-101%",
          opacity: 0,
        },
        { duration: 1.1, ease: [0.87, 0, 0.13, 1] }
      ),
      animateProject(
        "button",
        {
          pointerEvents: "none",
          opacity: 0,
        },
        { duration: 1.1, ease: [0.87, 0, 0.13, 1] }
      ),
      animateImage(
        imageScope.current,
        {
          y: "101%",
        },
        { duration: 1.1, ease: [0.87, 0, 0.13, 1] }
      ),
      animateImage(
        imageScope.current.children,
        {
          y: "-101%",
        },
        { duration: 1.1, ease: [0.87, 0, 0.13, 1] }
      ),
    ]);
  };

  return (
    <>
      <Navigation leaveAnimation={projectLeaveAnimation} />

      <AnimatePresence mode="wait">
        <ProjectWrapper key={currentProject.id} ref={projectScope}>
          <Banner>
            <BannerTitle>
              <motion.a
                href="#"
                className="title"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={textVariants}
                whileHover={{
                  color: "#101010",
                }}
              >
                {currentProject.title}
              </motion.a>
            </BannerTitle>

            <BannerImage
              ref={imageScope}
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
              <Button
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
              </Button>
              <Button
                onClick={async () => {
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
              </Button>
            </ProjectNavigation>
          </Author>

          <Description>
            <OverflowTextHolder>
              <Heading
                initial="initial"
                animate="animate"
                exit="exit"
                variants={textVariants}
              >
                Description:
              </Heading>
            </OverflowTextHolder>

            <SplitText
              LineWrapper={({ children }) => (
                <OverflowTextHolder>{children}</OverflowTextHolder>
              )}
              WordWrapper={({ children }) => (
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
    </>
  );
};

export default ProjectPageOverlay;
