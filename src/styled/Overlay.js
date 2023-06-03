import { styled } from "styled-components";

export const Overlay = styled.div`
  position: absolute;
  width: 100%;
  color: white;
  z-index: 15;
`;

export const OverlayTopHalf = styled.div`
  background: ${(props) => props.theme.colors.secondary};
  width: 100%;
  height: 50vh;
  transform-origin: top;
`;

export const OverlayBottomHalf = styled.div`
  background: ${(props) => props.theme.colors.secondary};
  width: 100%;
  height: 50vh;
  transform-origin: bottom;
`;
