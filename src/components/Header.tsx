import React from 'react';
import styled from 'styled-components';
import { Link } from '@reach/router';

const StyledHeader = styled.header`
  display: flex;
  justify-content: center;
  padding: 0.5rem;
  background: ${({ theme }) => theme.secondary};
`;

const HeaderLink = styled(Link)`
  color: ${({ theme }) => theme.text};
  text-decoration: none;
  margin: 0.5rem;
  font-size: 1.4rem;

  &[aria-current='page'] {
    font-weight: bold;
  }
`;

const Header: React.FC = () => {
  return (
    <StyledHeader>
      <HeaderLink to='/'>Gallery</HeaderLink>
      <HeaderLink to='/editor/new'>New</HeaderLink>
    </StyledHeader>
  );
};

export default Header;
