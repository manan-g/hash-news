import React from 'react';
import styled from 'styled-components';
import { useStateValue } from '../StateProvider';
import Logo from './Logo';
import ProfileIcon from './ProfileIcon';
import { Link } from 'react-router-dom';
import { StyledOrangeButton } from './Button';

const StyledHeader = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.theme.color.white};
  box-shadow: 3px 0px 3px ${(props) => props.theme.color.grey};
  padding: 10px;
  position: relative;
  z-index: 2;
`;

const StyledTitle = styled.div`
  color: ${(props) => props.theme.color.subTitle};
  align-self: center;
  margin-left: 200px;
`;

export default function Header() {
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
    title,
    setTitle,
  ] = useStateValue();
  return (
    <StyledHeader>
      <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        
      }}>
        <Logo />
        <StyledTitle>{title}</StyledTitle>
      </div>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
      }}>
        {user && user.privilege > 2 && (
          <Link to="/create-article">
            <StyledOrangeButton>Create Article</StyledOrangeButton>
          </Link>
        )}
        <ProfileIcon />
      </div>
    </StyledHeader>
  );
}
