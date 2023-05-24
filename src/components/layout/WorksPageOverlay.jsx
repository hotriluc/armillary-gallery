import { useLocation } from "wouter";
import { useProjectStore } from "../../store/projectStore";
import { useEffect } from "react";
import { useUIStore } from "../../store/UIStore";
import { AnimatePresence, motion, useAnimate } from "framer-motion";
import { styled } from "styled-components";
import Navigation, { ActiveLink } from "./Navigation";
import {
  NavBar,
  NavItem,
  NavList,
  NavLogo,
  NavSocials,
} from "../../styled/Navigation";

const Overlay = styled.div`
  position: absolute;
  width: 99%;
  color: white;
  z-index: 15;
`;

const OverlayTopHalf = styled.div`
  background: ${(props) => props.theme.colors.secondary};
  width: 100%;
  height: 50vh;
  transform-origin: top;
`;

const OverlayBottomHalf = styled.div`
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
  const [overlayScope, animateOverlay] = useAnimate();
  const [navigationScope, animateNavigation] = useAnimate();

  // Cleanup
  useEffect(() => {
    if (!activeID) return;

    return () => {
      setActiveID(null);
    };
  }, [activeID, setActiveID]);

  // Animations (useAnimate solution)
  useEffect(() => {
    const enterAnimation = async () => {
      await animateOverlay(
        overlayScope.current.children,
        { scaleY: 0 },
        { duration: 0.9, ease: [0.8, 0, 0.13, 1] }
      );
      await animateNavigation(
        navigationScope.current,
        {
          y: 0,
          opacity: 1,
        },
        { duration: 0.6 }
      );

      await animateOverlay(overlayScope.current, { display: "none" });
    };

    const leaveAnimation = async () => {
      await animateNavigation(
        navigationScope.current,
        {
          y: -10,
          opacity: 0,
        },
        { duration: 0.25 }
      );
      await animateOverlay(overlayScope.current, { display: "block" });
      await animateOverlay(
        overlayScope.current.children,
        { scaleY: 1 },
        { duration: 0.9, ease: [0.8, 0, 0.13, 1] }
      );
      await navigate("/works/" + activeID);
    };

    if (activeID) {
      leaveAnimation();
    } else if (isLoaded) {
      enterAnimation();
    }
  }, [
    activeID,
    isLoaded,
    navigate,
    animateOverlay,
    overlayScope,
    animateNavigation,
    navigationScope,
  ]);

  return (
    <>
      <NavBar ref={navigationScope} initial={{ y: 10, opacity: 0 }}>
        <NavLogo>logo</NavLogo>

        <NavList>
          <NavItem>
            <ActiveLink href="/works"> Works</ActiveLink>
          </NavItem>
          <NavItem>
            <ActiveLink href="/about">About</ActiveLink>
          </NavItem>
        </NavList>
        <NavSocials>
          <motion.a href="">hotriluc97@gmail.com</motion.a>
        </NavSocials>
      </NavBar>

      <Overlay ref={overlayScope}>
        <OverlayTopHalf />
        <OverlayBottomHalf />
      </Overlay>
    </>

    // Animate only whe all files have been loaded
    // <>
    //   <Overlay
    //     initial="initial"
    //     animate={isLoaded ? "animate" : ""}
    //     variants={parentVariants}
    //     onAnimationComplete={() => {
    //       if (activeID) navigate("/works/" + activeID);
    //     }}
    //   >
    //     <OverlayTopHalf variants={childVariants} />
    //     <OverlayBottomHalf variants={childVariants} />
    //   </Overlay>
    // </>
  );
};

export default WorksPageOverlay;
