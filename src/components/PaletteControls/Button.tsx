import styled from 'styled-components';
import { darken, readableColor } from 'polished';

function getTextColor(defaultColor: string, color?: string): string {
  return color ? readableColor(color) : readableColor(defaultColor);
}

function getHoverBgColor(defaultColor: string, color?: string): string {
  return color || defaultColor;
}

interface Props {
  bgColor?: string;
}

const Button = styled.button<Props>`
  width: 100%;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  border: none;
  font-weight: 500;
  text-transform: uppercase;
  box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.75);
  transition: background-color 200ms ease-in;

  color: ${({ theme, bgColor }) => getTextColor(theme.secondary, bgColor)};
  background-color: ${({ theme, bgColor }) =>
    bgColor ? bgColor : theme.secondary};

  :hover {
    background-color: ${({ theme, bgColor }) =>
      darken(0.1, getHoverBgColor(theme.secondary, bgColor))};
  }
`;

export default Button;
