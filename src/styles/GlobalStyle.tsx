import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import palette from './palette';

const GlobalStyle = createGlobalStyle`
  ${reset}

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    box-sizing: border-box;
  }

  #root {
    min-height: 100%;
  }

  html {
    background: ${palette.gray[2]};
    height: 100%;
  }

  * {
    box-sizing: inherit;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;

export default GlobalStyle;
