import { useLocation } from "wouter";
import { useProjectStore } from "../../store/projectStore";
import { useEffect } from "react";

const WorksPageOverlay = () => {
  const activeID = useProjectStore((state) => state.activeID);
  const setActiveID = useProjectStore((state) => state.setActiveID);

  const [location, navigate] = useLocation();

  useEffect(() => {
    if (!activeID) return;

    // if clicked then navigate
    navigate("/works/" + activeID);

    // so every time we return back to homepage it will not navigate until we click
    return () => {
      setActiveID(null);
    };
  }, [activeID, navigate, setActiveID]);

  return (
    <div style={{ position: "absolute", color: "white", fontSize: "2rem" }}>
      works
    </div>
  );
};

export default WorksPageOverlay;
