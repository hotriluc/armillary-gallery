import { motion } from "framer-motion";
import { styled } from "styled-components";

export const AboutWrapper = styled(motion.div)`
  padding: 10rem 8rem 5rem;
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
  grid-template-rows: min-content 1fr 1fr;
  gap: 4rem;

  @media (max-width: 768px) {
    gap: 2rem;
    padding: 8rem 2rem 5rem;
    grid-template-areas:
      "name name"
      "content content"
      "contentNav contentNav"
      "copyright copyright";

    grid-template-rows: min-content 1fr;
  }
`;

// NAME
export const Name = styled(motion.h1)`
  grid-area: name;

  font-family: "IBM Plex Sans", sans-serif;
  font-size: 7.5em;
  font-weight: 400;
  text-transform: uppercase;
  margin: 0;

  width: max-content;

  overflow: hidden;
  z-index: 1;

  span {
    display: inline-block;
    color: ${(props) => props.theme.colors.light};
    /* 
    -webkit-text-stroke: 1px;
    -webkit-text-fill-color: transparent; */
  }

  @media (max-width: 768px) {
    font-size: 4em;
  }
`;

// CONTENT
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
    transition: all 0.3s;
  }

  button:hover {
    color: ${(props) => props.theme.colors.primary};
  }

  .active {
    color: ${(props) => props.theme.colors.primary};
  }

  button:disabled,
  button:disabled:hover {
    color: grey;
    pointer-events: none;
    opacity: 0.8;
  }
`;

// EXPERIENCE
export const PositionList = styled.ul`
  list-style: none;
  color: ${(props) => props.theme.colors.primary};
  font-weight: 300;
  text-transform: uppercase;

  display: flex;
  flex-direction: column;
  gap: 1rem;
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
export const SocialsList = styled.ul`
  display: flex;
  list-style: none;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Social = styled(motion.li)`
  overflow: hidden;

  text-decoration: none;
  text-transform: uppercase;
  font-weight: 300;
  position: relative;
`;

export const Link = styled(motion.a)`
  display: inline-block;
  text-decoration: none;
  color: ${(props) => props.theme.colors.primary};
  fill: none;
  stroke: ${(props) => props.theme.colors.primary};

  span {
    display: flex;
    align-items: center;
  }

  &:hover {
    color: ${(props) => props.theme.colors.light};
    stroke: ${(props) => props.theme.colors.light};
  }
`;

// CREDITS
export const CreditsList = styled.ul`
  display: flex;
  list-style: none;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Credit = styled.li`
  color: ${(props) => props.theme.colors.primary};
  font-weight: 300;
  text-transform: uppercase;

  display: flex;
  gap: 2rem;
  align-items: flex-start;

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
`;

export const CreditAuthor = styled.div`
  overflow: hidden;
`;

export const CreditLink = styled.div`
  overflow: hidden;
`;

// COPYRIGHT
export const Copyright = styled.div`
  grid-area: copyright;
  text-transform: uppercase;
  align-self: end;
`;
