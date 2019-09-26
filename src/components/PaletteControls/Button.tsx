import styled from 'styled-components';
import { darken, readableColor } from 'polished';
import StyledButton from '../common/Button';

interface Props {
  bgColor?: string;
}

const Button = styled.button<Props>`
  ${StyledButton}

  color: ${({ theme, bgColor }) => readableColor(bgColor || theme.secondary)};
  background-color: ${({ theme, bgColor }) => bgColor || theme.secondary};

  :hover {
    background-color: ${({ theme, bgColor }) =>
      darken(0.1, bgColor || theme.secondary)};
  }
`;

export default Button;
