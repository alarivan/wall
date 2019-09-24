import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    background: string;
    primary: string;
    text: string;
    secondary: string;
    secondaryText: string;
    error: string;
  }
}
