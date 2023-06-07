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
              { type: "spring", stiffness: 100, damping: 20 }
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
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: delay || 0,
      }}
    >
      <NavLogo>
        <ActiveLink href={"/works"}>
          <svg
            width="40"
            height="40"
            viewBox="0 0 312 315"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M188.664 256C255.49 256 309.664 201.826 309.664 135C309.664 106.443 299.771 80.1959 283.225 59.5M67.6638 135C67.6638 68.1735 121.837 14 188.664 14C199.922 14 210.822 15.5377 221.164 18.4145"
              stroke="#ABEA9A"
              strokeWidth="3"
            />
            <path
              d="M297.664 135C297.664 195.199 248.863 244 188.664 244C128.465 244 79.6638 195.199 79.6638 135C79.6638 74.801 128.465 26 188.664 26"
              stroke="#fefefe"
              strokeWidth="3"
            />
            <circle
              cx="251.664"
              cy="39"
              r="37.5"
              stroke="#ABEA9A"
              strokeWidth="3"
            />
            <path
              d="M14.1638 222C-22.3363 230 32.6644 114.3 56.6638 157.5C71.1091 183.502 30.1633 331.5 78.1633 301.5C126.163 271.5 170.163 75.502 170.163 141.5C170.163 165.5 167.663 270.667 167.663 306"
              stroke="#ABEA9A"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d="M23.8276 221.992C-12.6725 229.992 42.3282 114.292 66.3276 157.492C80.7729 183.495 39.8271 331.492 87.8271 301.492C135.827 271.492 179.827 75.4942 179.827 141.492C179.827 165.492 177.326 270.659 177.326 305.992"
              stroke="#fefefe"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d="M149.958 270.998C144.248 284.496 223.664 82.2263 223.664 148.302C223.664 172.331 223.664 277.625 223.664 313"
              stroke="#ABEA9A"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d="M159.958 270.998C154.248 284.496 233.664 82.2263 233.664 148.302C233.664 172.331 233.664 277.625 233.664 313"
              stroke="#fefefe"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
        </ActiveLink>
      </NavLogo>

      <NavList>
        {navigationConfig.map((link) => (
          <NavItem key={link.href}>
            <ActiveLink href={link.href}>{link.title}</ActiveLink>
          </NavItem>
        ))}
      </NavList>

      <NavSocials>
        <motion.a href="mailto:hotriluc97@gmail.com">
          hotriluc97@gmail.com
        </motion.a>
      </NavSocials>
    </NavBar>
  );
};

export default Navigation;
