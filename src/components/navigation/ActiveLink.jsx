import { useLocation, useRoute } from "wouter";
import { useUIStore } from "../../store/UIStore";

const ActiveLink = ({ href, ...props }) => {
  const [isActive] = useRoute(href);
  const [location] = useLocation();

  const setDestination = useUIStore((state) => state.setDestination);

  const onClickHandler = () => {
    // click on active link will not occur redirection
    if (location === href) {
      return;
    }

    // otherwise set new destination
    setDestination(href);
  };

  return (
    <a className={isActive ? "active" : ""} onClick={onClickHandler}>
      {props.children}
    </a>
  );
};

export default ActiveLink;
