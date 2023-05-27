import { styled } from "styled-components";
import { motion } from "framer-motion";

export const NavBar = styled(motion.nav)`
  position: absolute;
  width: 100%;
  z-index: 10;

  padding: 4rem 4rem;
  color: white;
  font-weight: 200;

  display: flex;
  gap: 4rem;
`;

export const NavList = styled.ul`
  flex: 1;
  list-style: none;

  display: flex;
  justify-content: center;
  gap: 4rem;
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
  cursor: pointer;
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
