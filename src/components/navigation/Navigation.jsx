import { useLocation } from "wouter";

import { motion, useAnimate } from "framer-motion";
import {
  NavBar,
  NavItem,
  NavList,
  NavLogo,
  NavSocials,
} from "../../styled/Navigation";
import { useEffect } from "react";
import ActiveLink from "./ActiveLink";
import { useUIStore } from "../../store/UIStore";

const navigationConfig = [
  { title: "Works", href: "/works" },
  { title: "About", href: "/about" },
];

const Navigation = ({ delay, leaveAnimation }) => {
  const [location, navigate] = useLocation();

  const isLoaded = useUIStore((state) => state.isLoaded);
  const destination = useUIStore((state) => state.destination);
  const setDestination = useUIStore((state) => state.setDestination);

  // ANIMATION
  const [navigationScope, animateNavigation] = useAnimate();

  // This will handle leave animation whenever destination is set
  useEffect(() => {
    const leave = async () => {
      // Play leave animation if provided
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

      await Promise.all([navigate(destination), setDestination(null)]);
    };

    // if destination is set then leave
    if (destination) leave();
  }, [
    destination,
    navigate,
    setDestination,
    navigationScope,
    animateNavigation,
    leaveAnimation,
  ]);

  return (
    <NavBar
      ref={navigationScope}
      initial={{ y: "-25%", opacity: 0 }}
      animate={isLoaded ? { y: 0, opacity: 1 } : ""}
      transition={{
        duration: 0.75,
        ease: [0.57, 0, 0.13, 1],
        delay: delay || 0,
      }}
    >
      <NavLogo>
        <ActiveLink href={"/works"}> Logo</ActiveLink>
      </NavLogo>

      <NavList>
        {navigationConfig.map((link) => (
          <NavItem key={link.href}>
            <ActiveLink href={link.href}>{link.title}</ActiveLink>
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
