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

  const onClickBackHandler = async () => {
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

    await navigate("/works");
  };

  return (
    <>
      <AnimatePresence mode="wait">
        <ProjectWrapper key={currentProject.id} ref={projectScope}>
          <Button
            style={{
              position: "absolute",
              top: -20,
              left: -30,
              zIndex: 15,
              color: "#fefefe",
              fontWeight: 200,
            }}
            onClick={onClickBackHandler}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            exit={{ opacity: 0, pointerEvents: "none" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="329pt"
              viewBox="0 0 350 350"
              width="329pt"
              strokeWidth={2}
            >
              <path d="m194.800781 164.769531 128.210938-128.214843c8.34375-8.339844 8.34375-21.824219 0-30.164063-8.339844-8.339844-21.824219-8.339844-30.164063 0l-128.214844 128.214844-128.210937-128.214844c-8.34375-8.339844-21.824219-8.339844-30.164063 0-8.34375 8.339844-8.34375 21.824219 0 30.164063l128.210938 128.214843-128.210938 128.214844c-8.34375 8.339844-8.34375 21.824219 0 30.164063 4.15625 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921875-2.089844 15.082031-6.25l128.210937-128.214844 128.214844 128.214844c4.160156 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921874-2.089844 15.082031-6.25 8.34375-8.339844 8.34375-21.824219 0-30.164063zm0 0" />
            </svg>
          </Button>
          <Banner>
            <BannerTitle>
              <motion.span
                className="title"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={textVariants}
              >
                {currentProject.title}
              </motion.span>
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
