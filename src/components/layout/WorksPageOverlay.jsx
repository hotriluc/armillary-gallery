import { useLocation } from "wouter";
import { useProjectStore } from "../../store/projectStore";
import { useCallback, useEffect } from "react";
import { useUIStore } from "../../store/UIStore";
import { useAnimate } from "framer-motion";

import {
  Overlay,
  OverlayBottomHalf,
  OverlayTopHalf,
} from "../../styled/Overlay";
import Navigation from "../navigation/Navigation";

const WorksPageOverlay = () => {
  const activeID = useProjectStore((state) => state.activeID);
  const setActiveID = useProjectStore((state) => state.setActiveID);
  const isLoaded = useUIStore((state) => state.isLoaded);

  const [location, navigate] = useLocation();
  const [overlayScope, animateOverlay] = useAnimate();

  // Cleanup
  useEffect(() => {
    if (!activeID) return;
    return () => {
      setActiveID(null);
    };
  }, [activeID, setActiveID]);

  // Animations (useAnimate solution)
  const galleryLeaveAnimation = useCallback(async () => {
    await animateOverlay(overlayScope.current, { display: "block" });
    await animateOverlay(
      overlayScope.current.children,
      { scaleY: 1 },
      { duration: 0.9, ease: [0.8, 0, 0.13, 1] }
    );
  }, [animateOverlay, overlayScope]);

  useEffect(() => {
    const enterAnimation = async () => {
      await animateOverlay(
        overlayScope.current.children,
        { scaleY: 0 },
        { duration: 0.9, ease: [0.8, 0, 0.13, 1] }
      );
      await animateOverlay(overlayScope.current, { display: "none" });
    };

    const leaveToProject = async () => {
      await galleryLeaveAnimation();
      await navigate("/works/" + activeID);
    };

    if (activeID) {
      leaveToProject();
    } else if (isLoaded) {
      enterAnimation();
    }
  }, [
    activeID,
    isLoaded,
    navigate,
    animateOverlay,
    overlayScope,
    galleryLeaveAnimation,
  ]);

  return (
    <>
      <Navigation leaveAnimation={galleryLeaveAnimation} />
      {/* <NavBar ref={navigationScope} initial={{ y: 10, opacity: 0 }}>
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
      </NavBar> */}

      <Overlay ref={overlayScope}>
        <OverlayTopHalf />
        <OverlayBottomHalf />
      </Overlay>
    </>
  );
};

export default WorksPageOverlay;
