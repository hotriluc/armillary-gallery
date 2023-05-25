import { useLocation } from "wouter";

import { motion, useAnimate } from "framer-motion";
import {
  NavBar,
  NavItem,
  NavList,
  NavLogo,
  NavSocials,
} from "../../styled/Navigation";
import { useEffect, useState } from "react";
import ActiveLink from "./ActiveLink";

const navigationConfig = [
  { title: "Works", href: "/works" },
  { title: "About", href: "/about" },
];

const Navigation = (props) => {
  const [navigationScope, animateNavigation] = useAnimate();
  const [destination, setDestination] = useState(null);
  const [location, navigate] = useLocation();

  console.log(destination);

  const onClickLogoHandler = async () => {
    // We play leave animation of other components and after navigate
    await Promise.all([
      props.leaveAnimation(),
      animateNavigation(
        navigationScope.current,
        { y: 20, opacity: 0 },
        { duration: 0.6 }
      ),
    ]);

    await navigate("/home");
  };

  useEffect(() => {
    async function leave() {
      await Promise.all([
        props.leaveAnimation(),
        animateNavigation(
          navigationScope.current,
          { y: -20, opacity: 0 },
          { duration: 0.6 }
        ),
      ]);

      await navigate(destination);
    }

    if (destination) leave();
  }, [destination]);

  const onClickActiveLinkFn = (href) => {
    setDestination(href);
  };

  return (
    <NavBar
      ref={navigationScope}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <NavLogo onClick={onClickLogoHandler}>logo</NavLogo>

      <NavList>
        {navigationConfig.map((link) => (
          <NavItem key={link.href}>
            <ActiveLink href={link.href} onClickFn={onClickActiveLinkFn}>
              {link.title}
            </ActiveLink>
          </NavItem>
        ))}
      </NavList>

      <NavSocials>
        <motion.a href="">hotriluc97@gmail.com</motion.a>
      </NavSocials>
    </NavBar>
  );
};

export default Navigation;
