import { motion } from "framer-motion";
import { styled } from "styled-components";

export const ProjectWrapper = styled(motion.div)`
  padding: 8rem 4rem;
  height: 100%;
  width: 100%;
  position: absolute;
  z-index: 1;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: min-content 1fr;
  grid-row-gap: 2rem;
  grid-column-gap: 2rem;

  grid-template-areas:
    "banner banner banner"
    "nav description technologies";
`;

export const Banner = styled(motion.div)`
  width: 100%;
  z-index: 16;
  grid-area: banner;
  position: relative;
  overflow: hidden;
`;

export const BannerTitle = styled.h1`
  color: #fefefe;
  position: absolute;

  font-size: 7.5em;
  font-weight: 400;

  margin: 0;
  top: 50%;
  left: 50%;
  width: max-content;

  font-family: "IBM Plex Sans", sans-serif;
  text-transform: uppercase;

  transform: translate(-50%, -50%);
  z-index: 1;

  overflow: hidden;

  span {
    display: inline-block;
  }
`;

export const BannerImage = styled(motion.div)`
  height: 55rem;
  overflow: hidden;
  transform-origin: top;
`;

export const BannerImageInner = styled(motion.img)`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

export const Author = styled.div`
  display: flex;
  flex-direction: column;

  p {
    font-weight: 300;
    text-transform: uppercase;
  }
`;

export const Heading = styled(motion.h2)`
  color: ${(props) => props.theme.colors.light};
  font-size: 1em;
  font-weight: 200;
  text-transform: uppercase;
`;

export const OverflowTextHolder = styled(motion.div)`
  overflow: hidden;
  /* text-transform: uppercase; */

  span {
    font-weight: 300;
    display: inline-block;
    color: ${(props) => props.theme.colors.primary};
  }
`;

export const ProjectNavigation = styled.div`
  grid-area: navigation;
  margin-top: auto;

  display: flex;
  gap: 1rem;
`;

export const Button = styled(motion.button)`
  & {
    fill: none;
    stroke: ${(props) => props.theme.colors.light};
    background: transparent;
    border: none;
    cursor: pointer;
    transition: all 0.3s;
  }

  &:hover {
    stroke: ${(props) => props.theme.colors.primary};
  }

  &:disabled {
    stroke: grey;
  }
`;

export const Description = styled.div`
  grid-area: description;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Technologies = styled.div`
  grid-area: technologies;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
