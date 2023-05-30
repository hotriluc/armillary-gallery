import { motion } from "framer-motion";
import { styled } from "styled-components";

export const AboutWrapper = styled(motion.div)`
  padding: 8rem 4rem;
  height: 100%;
  width: 100%;
  position: absolute;
  z-index: 1;

  display: grid;
  grid-template-areas:
    "name name"
    "content guy"
    "copyright contentNav";
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: min-content repeat(2, 1fr);
  column-gap: 2rem;
`;

export const Name = styled(motion.h1)`
  grid-area: name;

  font-family: "IBM Plex Sans", sans-serif;
  font-size: 7.5em;
  font-weight: 400;
  text-transform: uppercase;

  width: max-content;

  overflow: hidden;
  z-index: 1;

  span {
    display: inline-block;
    color: ${(props) => props.theme.colors.light};
  }
`;

export const Content = styled.div`
  grid-area: content;
`;

export const ContentNav = styled(motion.ul)`
  grid-area: contentNav;
  color: ${(props) => props.theme.colors.light};

  text-transform: uppercase;
  list-style: none;
  font-weight: 200;
`;

export const ContentNavItem = styled(motion.li)`
  overflow: hidden;
  border-top: 1px solid ${(props) => props.theme.colors.light};

  button {
    display: inline-block;
    color: ${(props) => props.theme.colors.light};

    font-weight: 300;
    border: none;
    padding: 2rem 0;
    width: 100%;

    text-align: start;
    text-transform: uppercase;
    background: none;

    cursor: pointer;
  }

  button:hover {
    color: ${(props) => props.theme.colors.primary};
  }

  .active {
    color: ${(props) => props.theme.colors.primary};
  }
`;

// EXPERIENCE
export const ExperienceWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const PositionList = styled.ul`
  list-style: none;
  color: ${(props) => props.theme.colors.primary};
  font-weight: 300;
  text-transform: uppercase;

  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const Position = styled(motion.li)`
  display: flex;
  align-items: flex-start;
  gap: 2rem;
`;

export const PositionDate = styled.div`
  overflow: hidden;
  flex-basis: 15%;

  span {
    display: inline-block;
  }
`;

export const PositionName = styled.div`
  flex: 1;
`;

// SOCIALS
export const SocialsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
`;

export const SocialsList = styled.ul`
  display: flex;
  list-style: none;
  flex-direction: column;
  gap: 1rem;
`;

export const SocialLink = styled(motion.li)`
  overflow: hidden;

  text-decoration: none;

  text-transform: uppercase;
  font-weight: 300;
  position: relative;

  a {
    display: inline-block;
    text-decoration: none;
    color: ${(props) => props.theme.colors.primary};
    fill: none;
    stroke: ${(props) => props.theme.colors.primary};

    span {
      display: flex;
      align-items: center;
    }
  }

  a:hover {
    color: ${(props) => props.theme.colors.light};
    stroke: ${(props) => props.theme.colors.light};
  }
`;
