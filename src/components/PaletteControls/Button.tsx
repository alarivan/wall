import styled from 'styled-components';
import { darken, readableColor } from 'polished';

function getTextColor(defaultColor: string, color?: string): string {
  return color ? readableColor(color) : readableColor(defaultColor);
}

interface Props {
  bgColor?: string;
}

const Button = styled.button<Props>`
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  margin-bottom: 0.25rem;
  border: none;
  font-weight: 500;
  text-transform: uppercase;
  box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.75);
  transition: background-color 200ms ease-in;

  color: ${({ theme, bgColor }) => getTextColor(theme.secondary, bgColor)};
  background-color: ${({ theme, bgColor }) =>
    bgColor ? bgColor : theme.secondary};
  :hover {
    background-color: ${({ theme }) => darken(0.1, theme.secondary)};
  }
`;

export default Button;
