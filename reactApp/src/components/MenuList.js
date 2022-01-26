import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useStateValue } from '../StateProvider';
import { StyledLightButton, StyledDarkButton } from './Button';
import SignUpButton from './SignUpButton';

const Ul = styled.ul`
  list-style: none;
  display: flex;
  min-width: 315px;
  flex-flow: row nowrap;
  align-items: center;
  margin: 0px;

  li {
    padding: 18px 10px;
  }

  @media (max-width: 768px) {
    flex-flow: column nowrap;
    background-color: ${(props) => props.theme.color.background};
    position: fixed;
    transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(100%)')};
    top: 0;
    right: 0;
    height: 100vh;
    width: 300px;
    padding-top: 3.5rem;
    transition: transform 0.3s ease-in-out;

    li {
      color: #fff;
    }
  }
`;

const MenuList = ({ open }) => {
  const [
    Loading,
    setLoad,
    error,
    setError,
    show,
    setShow,
    user,
    setUser,
    address,
    setAddress,
    contract,
    setContract,
  ] = useStateValue();

  return (
    <Ul open={open}>
      <Link to="/">
        <StyledLightButton>Home</StyledLightButton>
      </Link>
      <Link to="/about">
        <StyledLightButton>About Us</StyledLightButton>
      </Link>
      <Link to="/list">
        <StyledLightButton>Articles</StyledLightButton>
      </Link>
      {user ? (
        <Link state={{ user: user }} to={`/user/${address}/profile`}>
          <StyledDarkButton>My Profile</StyledDarkButton>
        </Link>
      ) : (
        <SignUpButton />
      )}
    </Ul>
  );
};

export default MenuList;
