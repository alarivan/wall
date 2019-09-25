import styled from 'styled-components';
import { darken } from 'polished';

const Button = styled.button`
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  margin-bottom: 0.25rem;
  border: none;
  color: #eaeaea;
  font-weight: 500;
  text-transform: uppercase;
  box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.75);
  transition: background-color 200ms ease-in;

  background-color: ${({ theme }) => theme.secondary};
  :hover {
    background-color: ${({ theme }) => darken(0.1, theme.secondary)};
  }
`;

export default Button;
