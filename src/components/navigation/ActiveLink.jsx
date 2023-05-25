import { useRoute } from "wouter";

const ActiveLink = ({ href, onClickFn, ...props }) => {
  const [isActive] = useRoute(href);

  // pass destination to parent
  const onClickHandler = () => {
    onClickFn(href);
  };

  return (
    <a className={isActive ? "active" : ""} onClick={onClickHandler}>
      {props.children}
    </a>
  );
};

export default ActiveLink;
