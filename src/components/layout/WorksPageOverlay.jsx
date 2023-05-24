import { useLocation } from "wouter";
import { useProjectStore } from "../../store/projectStore";
import { useEffect } from "react";
import { useUIStore } from "../../store/UIStore";
import { motion } from "framer-motion";
import { styled } from "styled-components";

const Overlay = styled(motion.div)`
  position: absolute;
  width: 99%;
  color: white;
  z-index: 15;
`;

const OverlayTopHalf = styled(motion.div)`
  background: ${(props) => props.theme.colors.secondary};
  width: 100%;
  height: 50vh;
  transform-origin: top;
`;

const OverlayBottomHalf = styled(motion.div)`
  background: ${(props) => props.theme.colors.secondary};
  width: 100%;
  height: 50vh;
  transform-origin: bottom;
`;

const WorksPageOverlay = ({ path }) => {
  const activeID = useProjectStore((state) => state.activeID);
  const setActiveID = useProjectStore((state) => state.setActiveID);
  const isLoaded = useUIStore((state) => state.isLoaded);

  const [location, navigate] = useLocation();

  // Cleanup
  useEffect(() => {
    if (!activeID) return;

    return () => {
      setActiveID(null);
    };
  }, [activeID, setActiveID]);

  // Animations (useAnimate solution)
  // useEffect(() => {
  //   const enterAnimation = async () => {
  //     await animate(scope.current.children, { scaleY: 0 }, { duration: 0.8 });
  //     await animate(scope.current, { display: "none" });
  //   };

  //   const leaveAnimation = async () => {
  //     await animate(scope.current, { display: "block" });
  //     await animate(scope.current.children, { scaleY: 1 }, { duration: 0.8 });
  //     await navigate("/works/" + activeID);
  //   };

  //   if (activeID) {
  //     leaveAnimation();
  //   } else if (isLoaded) {
  //     enterAnimation();
  //   }
  // }, [activeID, animate, scope, navigate, isLoaded]);

  // Animation variants (config)
  // if there is no active_id then we do open(reveal) animation
  // otherwise close animation
  const parentVariants = !activeID
    ? {
        initial: {
          opacity: 1,
        },
        animate: {
          opacity: 1,

          // display: none after the children animations
          transitionEnd: {
            display: "none",
          },
          transition: { when: "afterChildren" },
        },
      }
    : {
        initial: {
          opacity: 1,
          display: "block",
        },
        animate: {
          display: "block",
          opacity: 1,

          // In order to see animations
          // display before the children because display: was set 'none'
          transition: { when: "beforeChildren" },
        },
      };

  const childVariants = !activeID
    ? {
        initial: {
          opacity: 1,
          scaleY: 1,
        },
        animate: {
          opacity: 1,
          scaleY: 0,

          transition: { duration: 1, ease: [0.87, 0, 0.13, 1] },
        },
      }
    : {
        initial: {
          opacity: 1,
          scaleY: 0,
        },
        animate: {
          opacity: 1,
          scaleY: 1,

          transition: { duration: 1, ease: [0.87, 0, 0.13, 1] },
        },
      };

  return (
    // <div
    //   ref={scope}
    //   style={{
    //     position: "absolute",
    //     width: "99%",
    //     color: "white",
    //     zIndex: 15,
    //     fontSize: "2rem",
    //   }}
    // >
    //   <div
    //     style={{
    //       background: "#101010",
    //       width: "100%",
    //       height: "50vh",
    //       transformOrigin: "top",
    //     }}
    //   />
    //   <div
    //     style={{
    //       background: "#101010",
    //       width: "100%",
    //       height: "50vh",
    //       transformOrigin: "bottom",
    //     }}
    //   />
    // </div>

    // Animate only whe all files have been loaded

    <Overlay
      initial="initial"
      animate={isLoaded ? "animate" : ""}
      variants={parentVariants}
      onAnimationComplete={() => {
        if (activeID) navigate("/works/" + activeID);
      }}
    >
      <OverlayTopHalf variants={childVariants} />
      <OverlayBottomHalf variants={childVariants} />
    </Overlay>
  );
};

export default WorksPageOverlay;
