import {
  AboutWrapper,
  Content,
  ContentNav,
  ContentNavItem,
  Copyright,
  Credit,
  CreditAuthor,
  CreditLink,
  CreditsList,
  Link,
  Name,
  Position,
  PositionDate,
  PositionList,
  PositionName,
  Social,
  SocialsList,
} from "../../styled/About";
import Navigation from "../navigation/Navigation";
import { AnimatePresence, motion, stagger, useAnimate } from "framer-motion";

import AnimatedSplitText from "../text/AnimatedSplitText";
import { useCallback, useState } from "react";
import { useAboutStore } from "../../store/aboutStore";
import { Flex, OverflowTextHolder } from "../../styled/Global";

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
    transition: { duration: 1, ease: [0.8, 0, 0.13, 1] },
  },
  exit: {
    y: "-101%",
    opacity: 0,
    transition: { duration: 0.7, ease: [0.8, 0, 0.13, 1] },
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
  { name: "Codesandbox", href: "https://codesandbox.io/u/hotriluc97" },
];

const creditsData = [
  {
    name: "Character Model",
    author: "Jaeyeon Nam",
    href: "https://jaeysart.artstation.com/",
  },
  {
    name: "Transitions Tutorial",
    author: "Manoela Ilic",
    href: "https://tympanus.net/codrops/2022/07/06/how-to-create-a-cover-page-transition/",
  },
];

const Bio = () => {
  const text = `Hi. My name is Luc and I do things on the Internet. Sometimes I also design.`;
  const text2 = `Today I am mainly focused on frontend development but do not mind working on the backend. My goal with every project is to keep it simple and easy to use.
 it has been a year since I started to get interested in 3D.`;
  const text3 = `When something catches my eye I wonder If I can recreate it. During the coding process more ideas come and I end up with some interesting results.
  `;

  return (
    <Flex column="true">
      <AnimatedSplitText text={text} textVariants={textVariants} />
      <AnimatedSplitText text={text2} textVariants={textVariants} />
      <AnimatedSplitText text={text3} textVariants={textVariants} />
    </Flex>
  );
};

const Credits = () => {
  const text = `The resources that were used to build this website.`;

  return (
    <Flex column="true">
      <AnimatedSplitText text={text} textVariants={textVariants} />

      <CreditsList>
        {creditsData.map((credit, id) => (
          <Credit key={`credits_${id}`}>
            <CreditAuthor>
              <AnimatedSplitText
                text={credit.name}
                textVariants={textVariants}
              />
            </CreditAuthor>

            <CreditLink>
              <Link
                href={credit.href}
                target="_blank"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={textVariants}
              >
                <span>
                  {credit.author}
                  <svg
                    width="18"
                    height="18"
                    strokeWidth=".7"
                    viewBox="0 0 24 24"
                  >
                    <path
                      vectorEffect="non-scaling-stroke"
                      d="M18.25 15.5a.75.75 0 0 0 .75-.75v-9a.75.75 0 0 0-.75-.75h-9a.75.75 0 0 0 0 1.5h7.19L6.22 16.72a.75.75 0 1 0 1.06 1.06L17.5 7.56v7.19c0 .414.336.75.75.75z"
                    ></path>
                  </svg>
                </span>
              </Link>
            </CreditLink>
          </Credit>
        ))}
      </CreditsList>
    </Flex>
  );
};

const Experience = () => {
  return (
    <Flex column="true">
      <PositionList>
        {positionsData.map((position, id) => (
          <Position key={`position_${id}`}>
            <PositionDate>
              <AnimatedSplitText
                textVariants={textVariants}
                text={`${position.startDate.month} ${position.startDate.year}`}
              />
            </PositionDate>

            <PositionDate>
              <AnimatedSplitText
                textVariants={textVariants}
                text={`${position.endDate.month} ${position.endDate.year}`}
              />
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
    </Flex>
  );
};

const Socials = () => {
  return (
    <Flex column="true">
      <AnimatedSplitText
        text={"I can be found on those platforms."}
        textVariants={textVariants}
      />

      <SocialsList>
        {socialsData.map((el, id) => (
          <Social key={`social_${id}`}>
            <Link
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
                    vectorEffect="non-scaling-stroke"
                    d="M18.25 15.5a.75.75 0 0 0 .75-.75v-9a.75.75 0 0 0-.75-.75h-9a.75.75 0 0 0 0 1.5h7.19L6.22 16.72a.75.75 0 1 0 1.06 1.06L17.5 7.56v7.19c0 .414.336.75.75.75z"
                  ></path>
                </svg>
              </span>
            </Link>
          </Social>
        ))}
      </SocialsList>
    </Flex>
  );
};

const AboutPageOverlay = () => {
  const [aboutScope, animateAbout] = useAnimate();
  const [contentNavScope, animateContentNav] = useAnimate();

  const activeContentID = useAboutStore((state) => state.activeContentID);
  const setActiveContentID = useAboutStore((state) => state.setActiveContentID);
  const [isAnimating, setIsAnimating] = useState(false);

  const aboutLeaveAnimation = useCallback(async () => {
    await Promise.all([
      animateAbout(
        "span",
        {
          y: "-101%",
          opacity: 0,
        },
        { duration: 0.9, ease: [0.8, 0, 0.13, 1] }
      ),

      // only socials and credits consist links
      // if it was not conditional, then promise all will return rejection
      // and leave animation won't be executed because other sections don't have 'a'
      (activeContentID === 3 || activeContentID === 4) &&
        animateAbout(
          "a",
          {
            y: "-101%",
            opacity: 0,
          },
          { duration: 0.9, ease: [0.8, 0, 0.13, 1] }
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
          ease: [0.8, 0, 0.13, 1],
        }
      ),
    ]);
  }, [animateAbout, animateContentNav, activeContentID]);

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
        ease: [0.8, 0, 0.13, 1],
      },
    },
  };

  const onClickSectionHandler = (id) => {
    if (id === activeContentID) return;

    setActiveContentID(id);
    setIsAnimating(true);
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
              Luc Ho
            </motion.span>
          </Name>

          <Content>
            <AnimatePresence
              mode="wait"
              onExitComplete={() => setIsAnimating(false)}
            >
              {activeContentID === 1 && <Bio key={"bio"} />}
              {activeContentID === 2 && <Experience key={"experience"} />}
              {activeContentID === 3 && <Socials key={"social"} />}
              {activeContentID === 4 && <Credits key={"credits"} />}
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
                  disabled={isAnimating}
                  className={el.id === activeContentID ? "active" : ""}
                  onClick={() => onClickSectionHandler(el.id)}
                >{`0${el.id}. ${el.title}`}</motion.button>
              </ContentNavItem>
            ))}
          </ContentNav>

          <Copyright>
            <OverflowTextHolder>
              <motion.span
                initial="initial"
                animate="animate"
                variants={textVariants}
              >
                Designed and developed by Luc Ho. All rights reserved. 2023.
              </motion.span>
            </OverflowTextHolder>
          </Copyright>
        </AboutWrapper>
      </AnimatePresence>
    </>
  );
};

export default AboutPageOverlay;
