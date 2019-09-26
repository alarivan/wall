import styled from 'styled-components';
import { darken, readableColor } from 'polished';

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

  color: ${({ theme, bgColor }) => readableColor(bgColor || theme.secondary)};
  background-color: ${({ theme, bgColor }) => bgColor || theme.secondary};

  :hover {
    background-color: ${({ theme, bgColor }) =>
      darken(0.1, bgColor || theme.secondary)};
  }
`;

export default Button;
