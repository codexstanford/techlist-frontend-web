import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

export default () => (
  <StyledNavBarWrapper>
    <span>You are not logged in</span>

    <nav>
      <Link to="/">Home</Link>
      {` `}
      <Link to="/">Profile</Link>
      {` `}
      <Link to="/">Logout</Link>
    </nav>
  </StyledNavBarWrapper>
);

const StyledNavBarWrapper = styled.div`
  background-color: #b1040e;
  display: flex;
  flex: 1;
  justify-content: space-between;
`;
