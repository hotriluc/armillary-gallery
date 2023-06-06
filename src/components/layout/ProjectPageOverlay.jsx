import { useLocation, useRoute } from "wouter";
import { useProjectStore } from "../../store/projectStore";

import { AnimatePresence, motion, useAnimate } from "framer-motion";
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
  ProjectNavigation,
  ProjectWrapper,
  Technologies,
} from "../../styled/Project";
import Navigation from "../navigation/Navigation";
import AnimatedSplitText from "../text/AnimatedSplitText";
import { OverflowTextHolder } from "../../styled/Global";

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
      transition: { duration: 1, ease: [0.8, 0, 0.13, 1] },
    },
    exit: {
      y: "-101%",
      opacity: 0,
      transition: { duration: 0.9, ease: [0.8, 0, 0.13, 1] },
    },
  };

  const imageVariants = {
    initial: {
      y: "-101%",
    },
    animate: {
      y: 0,
      transition: { duration: 1, ease: [0.8, 0, 0.13, 1] },
    },
    exit: {
      y: "101%",
      transition: { duration: 0.9, ease: [0.8, 0, 0.13, 1] },
    },
  };

  const imageInnerVariants = {
    initial: {
      y: "101%",
    },
    animate: {
      y: 0,
      transition: { duration: 1, ease: [0.8, 0, 0.13, 1] },
    },
    exit: {
      y: "-101%",
      transition: { duration: 0.9, ease: [0.8, 0, 0.13, 1] },
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
        { duration: 0.9, ease: [0.8, 0, 0.13, 1] }
      ),
      animateProject(
        "a",
        {
          y: "-101%",
          opacity: 0,
        },
        { duration: 0.9, ease: [0.8, 0, 0.13, 1] }
      ),
      animateProject(
        "h2",
        {
          y: "-101%",
          opacity: 0,
        },
        { duration: 0.9, ease: [0.8, 0, 0.13, 1] }
      ),
      animateProject(
        "button",
        {
          pointerEvents: "none",
          opacity: 0,
        },
        { duration: 0.9, ease: [0.8, 0, 0.13, 1] }
      ),
      animateImage(
        imageScope.current,
        {
          y: "101%",
        },
        { duration: 0.9, ease: [0.8, 0, 0.13, 1] }
      ),
      animateImage(
        "img",
        {
          y: "-101%",
        },
        { duration: 0.9, ease: [0.8, 0, 0.13, 1] }
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
                href={currentProject.url || "#"}
                target="_blank"
                className="title"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={textVariants}
                whileHover={{
                  WebkitTextFillColor: "#abea9a",
                  opacity: 0.95,
                }}
              >
                {currentProject.title || "untitled"}
              </motion.a>
            </BannerTitle>

            <BannerImage
              ref={imageScope}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={imageVariants}
            >
              <div>
                <BannerImageInner
                  src={currentProject.leftImgUrl || "/bgr-1.png"}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={imageInnerVariants}
                />
              </div>
              <div>
                <BannerImageInner
                  src={currentProject.centerImgUrl || "/bgr-2.png"}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={imageInnerVariants}
                />
              </div>
              <div>
                <BannerImageInner
                  src={currentProject.rightImgUrl || "/bgr-3.png"}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={imageInnerVariants}
                />
              </div>
            </BannerImage>
          </Banner>

          <Author>
            <div>
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
                  {currentProject.date || "dd/mm/yyyy"}
                </motion.span>
              </OverflowTextHolder>
            </div>

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
                  style={{ transform: "scale(-1,1)" }}
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

            <AnimatedSplitText
              text={currentProject.description || "No description"}
              textVariants={textVariants}
            />
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

            <AnimatedSplitText
              text={currentProject.technologies || "No technologies"}
              textVariants={textVariants}
            />
          </Technologies>
        </ProjectWrapper>
      </AnimatePresence>
    </>
  );
};

export default ProjectPageOverlay;
