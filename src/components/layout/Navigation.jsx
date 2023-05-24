import { Link, useRoute } from "wouter";

import { motion, useAnimate } from "framer-motion";
import {
  NavBar,
  NavItem,
  NavList,
  NavLogo,
  NavSocials,
} from "../../styled/Navigation";
import { useEffect } from "react";

export const ActiveLink = (props) => {
  const [isActive] = useRoute(props.href);

  return (
    <Link {...props}>
      <a className={isActive ? "active" : ""}>{props.children}</a>
    </Link>
  );
};

const Navigation = () => {
  const [navigationScope, animateNavigation] = useAnimate();

  // Animations (useAnimate solution)
  useEffect(() => {
    const enterAnimation = async () => {
      await animateNavigation(
        navigationScope.current,
        {
          y: 0,
          opacity: 1,
        },
        { duration: 0.6 }
      );
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
    };

    enterAnimation();
  }, [animateNavigation, navigationScope]);

  return (
    <NavBar ref={navigationScope} initial={{ y: 20, opacity: 0 }}>
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
  );
};

export default Navigation;
