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

const Navigation = ({ delay, leaveAnimation }) => {
  const [navigationScope, animateNavigation] = useAnimate();
  const [destination, setDestination] = useState(null);
  const [location, navigate] = useLocation();

  const onClickLogoHandler = async () => {
    if (location === "/works") return;

    // We play leave animation of other components and after navigate
    try {
      if (leaveAnimation) {
        await Promise.all([
          leaveAnimation(),
          animateNavigation(
            navigationScope.current,
            { y: "-25%", opacity: 0 },
            { duration: 0.6 }
          ),
        ]);
      }
    } catch (err) {
      console.log(err);
    }

    await navigate("/works");
  };

  useEffect(() => {
    const leave = async () => {
      // Play animation if exist
      try {
        if (leaveAnimation) {
          await Promise.all([
            leaveAnimation(),
            animateNavigation(
              navigationScope.current,
              { y: "-25%", opacity: 0 },
              { duration: 0.6, ease: [0.57, 0, 0.13, 1] }
            ),
          ]);
        }
      } catch (err) {
        console.log(err);
      }

      await navigate(destination);
    };

    if (destination) leave();
  }, [
    destination,
    location,
    navigate,
    navigationScope,
    animateNavigation,
    leaveAnimation,
  ]);

  const onClickActiveLinkFn = (href) => {
    // Redirection won't be occurred if we click the link that we are already on
    if (location === href) {
      return;
    }

    // Otherwise set new destination
    setDestination(href);
  };

  return (
    <NavBar
      ref={navigationScope}
      initial={{ y: "-25%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.75,
        ease: [0.57, 0, 0.13, 1],
        delay: delay || 0,
      }}
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
