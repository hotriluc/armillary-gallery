import { styled } from "styled-components";
import { motion } from "framer-motion";

export const NavBar = styled(motion.nav)`
  position: absolute;
  width: 100%;
  z-index: 10;

  padding: 4rem 8rem;
  color: ${(props) => props.theme.colors.light};
  font-weight: 200;

  display: flex;
  gap: 4rem;
  align-items: center;

  @media (max-width: 768px) {
    padding: 3rem 2rem;
    gap: 2rem;
  }
`;

export const NavList = styled.ul`
  flex: 1;
  list-style: none;

  display: flex;
  justify-content: center;
  gap: 4rem;

  @media (max-width: 768px) {
    gap: 2rem;
  }
`;

export const NavItem = styled(motion.li)`
  a {
    color: ${(props) => props.theme.colors.light};
    transition: all 0.3s;
    text-decoration: none;
    text-transform: uppercase;
    cursor: pointer;
  }
  a:hover {
    color: ${(props) => props.theme.colors.primary};
  }

  .active {
    color: ${(props) => props.theme.colors.primary};
  }
`;

export const NavLogo = styled.div`
  flex: 1;
`;

export const NavSocials = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;

  a {
    color: ${(props) => props.theme.colors.light};
    transition: all 0.3s;
    text-decoration: none;
    cursor: pointer;
  }

  a:hover {
    color: ${(props) => props.theme.colors.primary};
  }
`;
