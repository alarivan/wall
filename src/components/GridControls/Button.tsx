import styled from 'styled-components';
import { darken } from 'polished';
import StyledButton from '../common/Button';

const Button = styled.button`
  ${StyledButton}
  margin-bottom: 0.25rem;

  background-color: ${({ theme }) => theme.secondary};
  :hover {
    background-color: ${({ theme }) => darken(0.1, theme.secondary)};
  }
`;

export default Button;
