import { motion } from "framer-motion";
import { styled, css } from "styled-components";

export const Flex = styled.div`
  display: flex;

  gap: ${(props) => props.gap || "2rem"};

  ${(props) =>
    props.column &&
    css`
      flex-direction: column;
    `}

  ${(props) =>
    props.spaceBetween &&
    css`
      justify-content: space-between;
    `}

    ${(props) =>
    props.alignCenter &&
    css`
      align-items: center;
    `}
`;

export const OverflowTextHolder = styled(motion.div)`
  overflow: hidden;

  &:not(:last-of-type) {
    margin-bottom: 0.5rem;
  }
  /* text-transform: uppercase; */

  span {
    font-weight: 300;
    display: inline-block;
    color: ${(props) => props.theme.colors.primary};
  }
`;
