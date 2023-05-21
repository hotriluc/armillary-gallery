import { useLocation } from "wouter";
import { useProjectStore } from "../../store/projectStore";
import { useEffect } from "react";
import { useAnimate } from "framer-motion";
import { useUIStore } from "../../store/UIStore";

const WorksPageOverlay = () => {
  const activeID = useProjectStore((state) => state.activeID);
  const setActiveID = useProjectStore((state) => state.setActiveID);
  const isLoaded = useUIStore((state) => state.isLoaded);

  const [location, navigate] = useLocation();
  const [scope, animate] = useAnimate();

  // Cleanup
  useEffect(() => {
    if (!activeID) return;

    return () => {
      setActiveID(null);
    };
  }, [activeID, setActiveID]);

  // Animations
  useEffect(() => {
    const enterAnimation = async () => {
      await animate(scope.current.children, { scaleY: 0 }, { duration: 0.8 });
      await animate(scope.current, { display: "none" });
    };

    const leaveAnimation = async () => {
      await animate(scope.current, { display: "block" });
      await animate(scope.current.children, { scaleY: 1 }, { duration: 0.8 });
      await navigate("/works/" + activeID);
    };

    if (activeID) {
      leaveAnimation();
    } else if (isLoaded) {
      enterAnimation();
    }
  }, [activeID, animate, scope, navigate, isLoaded]);

  return (
    <div
      ref={scope}
      style={{
        position: "absolute",
        width: "99%",
        color: "white",
        zIndex: 2,
        fontSize: "2rem",
      }}
    >
      <div
        style={{
          background: "red",
          width: "100%",
          height: "50vh",
          transformOrigin: "top",
        }}
      />
      <div
        style={{
          background: "red",
          width: "100%",
          height: "50vh",
          transformOrigin: "bottom",
        }}
      />
    </div>
  );
};

export default WorksPageOverlay;
