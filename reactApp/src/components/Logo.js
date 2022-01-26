import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const LogoTitle = styled.div`
  margin-left: 2px;
  display: inline;
  font-family: ${(props) => props.theme.fontFamilyHeading};
`;
const LogoSubTitle = styled.div`
  display: inline;
  font-family: ${(props) => props.theme.fontFamilyHeading};
  font-weight: 600;
`;

const StyledAchor = styled(Link)`
  text-decoration: none;
  margin-right: 15px;
  color: black;
  :active {
    text-decoration: none;
  }
`;

export default function Logo() {
  return (
    <StyledAchor to="/">
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <LogoTitle>Hash</LogoTitle>
        <LogoSubTitle>NEWS</LogoSubTitle>
      </div>
    </StyledAchor>
  );
}
