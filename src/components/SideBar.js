import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const StyledSideBar = styled.div`
  display: flex;
  flex-direction: column;
  flex: 2;
  background-color: ${props=>props.theme.color.white};
  height: calc(100vh - 64px);
  
`;

const StyledMenu = styled.div`
margin-top: 40px;
margin-left: 30px;
font-size: small;
color: ${props=>props.theme.color.subTitle};
`

const StyledNavLink = styled(NavLink)`
  color: black;
  font-size: small;
  text-decoration: none;
  padding: 8px 15px;
  margin: 5px 0px;
  padding-left: 25px;
  cursor: pointer;
  border-left: 5px solid ${(props) => props.theme.color.white};
  &.active {
    color: ${(props) => props.theme.color.orange};
    background-color: ${(props) => props.theme.color.lightOrange};
    border-left: 5px solid ${(props) => props.theme.color.orange};
  }
`;

export default function SideBar() {

  return (
    <StyledSideBar>
    <StyledMenu>Menu</StyledMenu>
      <StyledNavLink to="/">Home</StyledNavLink>
      <StyledNavLink to="/about">About Us</StyledNavLink>
      <StyledNavLink to="/list">Articles</StyledNavLink>
    </StyledSideBar>
  );
}
