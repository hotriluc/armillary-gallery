import { ThemeProvider, createGlobalStyle } from "styled-components";
import normalize from "styled-normalize";

const GlobalStyle = createGlobalStyle`
  ${normalize}

  *,
  *::after,
  *::before {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
  }

  html {
    box-sizing: border-box;
    font-size: 62.5%;
  }

  html, 
  body,
  #root {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    overscroll-behavior: none;
  }

  body {
    background-color: ${(props) => props.theme.colors.secondary};
    font-family: 'Inter', sans-serif;
    font-size: 1.6rem;

    @media (max-width: 768px) {
      font-size: 1.4rem;
    }
  }
/* 
  h1,h2,h3,h4,h5{
    font-family: 'Inter', sans-serif;
  } */

  button {
    font-family: 'Inter', sans-serif;
  }

  h1 {
    font-size: 2em;
  }
  h2 {
    font-size: 1.5em;
  }
  h3 {
    font-size: 1.125em;
  }
  h4{
    font-size: 1em;
  }

`;

const theme = {
  colors: {
    primary: "#abea9a",
    secondary: "#101010",
    light: "#fefefe",
  },
};

const Wrapper = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <>{children}</>
    </ThemeProvider>
  );
};

export default Wrapper;
