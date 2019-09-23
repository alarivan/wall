import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
      background: ${({ theme }) => theme.background}
  }
`;

export default GlobalStyles;
