import {
  AboutWrapper,
  Content,
  ContentNav,
  ContentNavItem,
  ExperienceWrapper,
  Name,
  Position,
  PositionDate,
  PositionList,
  PositionName,
  SocialLink,
  SocialsList,
  SocialsWrapper,
} from "../../styled/About";
import Navigation from "../navigation/Navigation";
import { AnimatePresence, motion, stagger, useAnimate } from "framer-motion";

import AnimatedSplitText from "../text/AnimatedSplitText";
import { useCallback } from "react";
import { useAboutStore } from "../../store/aboutStore";

const contentNavItems = [
  { title: "bio", id: 1 },
  { title: "experience", id: 2 },
  { title: "social medias", id: 3 },
  { title: "credits", id: 4 },
];

const textVariants = {
  initial: {
    y: "101%",
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: { duration: 1.05, ease: [0.82, 0, 0.13, 1] },
  },
  exit: {
    y: "-101%",
    opacity: 0,
    transition: { duration: 0.7, ease: [0.82, 0, 0.13, 1] },
  },
};

const positionsData = [
  {
    name: "fullstack web developer",
    companyName: "ScaleToolsUA",
    startDate: {
      month: "mar",
      year: "2021",
    },
    endDate: {
      month: "jul",
      year: "2022",
    },
  },
  {
    name: "trainee Ruby on Rails developer",
    companyName: "ScaleToolsUA",
    startDate: {
      month: "dec",
      year: "2020",
    },
    endDate: {
      month: "mar",
      year: "2021",
    },
  },
];

const socialsData = [
  {
    name: "Linked",
    href: "https://www.linkedin.com/in/luc-ho/",
  },
  {
    name: "Github",
    href: "https://github.com/hotriluc",
  },
  {
    name: "Twitter",
    href: "https://twitter.com/Blink_LH",
  },
];

const Bio = () => {
  const text = `My name is Luc and I do things on the web. Sometimes I also design.`;

  return <AnimatedSplitText text={text} textVariants={textVariants} />;
};

const Experience = () => {
  return (
    <ExperienceWrapper>
      <PositionList>
        {positionsData.map((position, id) => (
          <Position key={`position_${id}`}>
            <PositionDate>
              <motion.span
                initial="initial"
                animate="animate"
                exit="exit"
                variants={textVariants}
              >
                {position.startDate.month} {position.startDate.year}
              </motion.span>
            </PositionDate>

            <PositionDate>
              <motion.span
                initial="initial"
                animate="animate"
                exit="exit"
                variants={textVariants}
              >
                {position.endDate.month} {position.endDate.year}
              </motion.span>
            </PositionDate>

            <PositionName>
              <AnimatedSplitText
                textVariants={textVariants}
                text={`${position.name} at ${position.companyName}`}
              />
            </PositionName>
          </Position>
        ))}
      </PositionList>
    </ExperienceWrapper>
  );
};

const Socials = () => {
  return (
    <SocialsWrapper>
      <AnimatedSplitText
        text={"I can be found on those platforms."}
        textVariants={textVariants}
      />

      <SocialsList>
        {socialsData.map((el, id) => (
          <SocialLink key={`social_${id}`}>
            <motion.a
              href={el.href}
              target="_blank"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={textVariants}
            >
              <span>
                {el.name}
                <svg
                  width="18"
                  height="18"
                  strokeWidth=".7"
                  viewBox="0 0 24 24"
                >
                  <path
                    vector-effect="non-scaling-stroke"
                    d="M18.25 15.5a.75.75 0 0 0 .75-.75v-9a.75.75 0 0 0-.75-.75h-9a.75.75 0 0 0 0 1.5h7.19L6.22 16.72a.75.75 0 1 0 1.06 1.06L17.5 7.56v7.19c0 .414.336.75.75.75z"
                  ></path>
                </svg>
              </span>
            </motion.a>
          </SocialLink>
        ))}
      </SocialsList>
    </SocialsWrapper>
  );
};

const AboutPageOverlay = () => {
  const [aboutScope, animateAbout] = useAnimate();
  const [contentNavScope, animateContentNav] = useAnimate();

  const activeContentID = useAboutStore((state) => state.activeContentID);
  const setActiveContentID = useAboutStore((state) => state.setActiveContentID);

  const aboutLeaveAnimation = useCallback(async () => {
    await Promise.all([
      animateAbout(
        "span",
        {
          y: "-101%",
          opacity: 0,
        },
        { duration: 0.9, ease: [0.82, 0, 0.13, 1] }
      ),
      animateContentNav(
        "li",
        {
          scaleX: 0,
          opacity: 0,
        },
        {
          delay: stagger(0.2, { from: "last" }),
          duration: 0.8,
          ease: [0.82, 0, 0.13, 1],
        }
      ),
    ]);
  }, [animateAbout, animateContentNav]);

  const contentNavVariants = {
    initial: {
      opacity: 1,
    },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const contentNavItemVariants = {
    initial: {
      opacity: 0,
      scaleX: 0,
    },
    animate: {
      opacity: 1,
      scaleX: 1,
      transition: {
        duration: 0.8,
        ease: [0.82, 0, 0.13, 1],
      },
    },
  };

  return (
    <>
      <Navigation leaveAnimation={aboutLeaveAnimation} />

      <AnimatePresence mode="wait">
        <AboutWrapper ref={aboutScope} key={"about"}>
          <Name>
            <motion.span
              initial="initial"
              animate="animate"
              exit="exit"
              variants={textVariants}
            >
              Ho Tri Luc
            </motion.span>
          </Name>

          <Content>
            <AnimatePresence mode="wait">
              {activeContentID === 1 && <Bio key={"bio"} />}
              {activeContentID === 2 && <Experience key={"exp"} />}
              {activeContentID === 3 && <Socials key={"socials"} />}
            </AnimatePresence>
          </Content>

          <ContentNav
            ref={contentNavScope}
            variants={contentNavVariants}
            initial="initial"
            animate="animate"
          >
            {contentNavItems.map((el) => (
              <ContentNavItem key={el.id} variants={contentNavItemVariants}>
                <motion.button
                  className={el.id === activeContentID ? "active" : ""}
                  onClick={() => setActiveContentID(el.id)}
                >{`0${el.id}. ${el.title}`}</motion.button>
              </ContentNavItem>
            ))}
          </ContentNav>
        </AboutWrapper>
      </AnimatePresence>
    </>
  );
};

export default AboutPageOverlay;
