import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useStateValue } from '../StateProvider';

const StyledImg = styled.img`
  height: 40px;
  width: 40px;
`;

const StyledProfileIcon = styled.div`
  width: 40px;
  height: 40px;
  overflow: hidden;
  border-radius: 50%;
  border: 2px solid ${(props) => props.theme.color.white};
  margin: 0px 30px 0px 40px;

  :hover {
    border: 2px solid ${(props) => props.theme.color.outlineBlueTransparent};
  }
`;

export default function ProfileIcon() {
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
    <Link state={{ user: user }} to={`/user/${address}/profile`}>
      <StyledProfileIcon>
        <StyledImg
          src={
            user.profilePhotoUrl != '' ? user.profilePhotoUrl : '/159236.png'
          }
        ></StyledImg>
      </StyledProfileIcon>
    </Link>
  );
}
