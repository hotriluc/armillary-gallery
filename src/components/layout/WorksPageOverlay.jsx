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
  const isLoaded = useUIStore((state) => state.isLoaded);

  const [overlayScope, animateOverlay] = useAnimate();

  const galleryLeaveAnimation = useCallback(async () => {
    await animateOverlay(overlayScope.current, { display: "block" });
    await animateOverlay(
      overlayScope.current.children,
      { scaleY: 1 },
      { duration: 0.9, ease: [0.8, 0, 0.13, 1] }
    );
  }, [animateOverlay, overlayScope]);

  const galleryEnterAnimation = useCallback(async () => {
    await animateOverlay(
      overlayScope.current.children,
      { scaleY: 0 },
      { duration: 0.9, ease: [0.8, 0, 0.13, 1] }
    );
    await animateOverlay(overlayScope.current, { display: "none" });
  }, [animateOverlay, overlayScope]);

  useEffect(() => {
    if (isLoaded) {
      galleryEnterAnimation();
    }
  }, [isLoaded, galleryEnterAnimation]);

  return (
    <>
      <Navigation leaveAnimation={galleryLeaveAnimation} delay={0.6} />

      <Overlay ref={overlayScope}>
        <OverlayTopHalf />
        <OverlayBottomHalf />
      </Overlay>
    </>
  );
};

export default WorksPageOverlay;
