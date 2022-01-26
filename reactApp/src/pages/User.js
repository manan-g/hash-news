import React, { useEffect, useState } from 'react';
import { NavLink, useParams, Outlet, Link } from 'react-router-dom';
import styled from 'styled-components';
import Vote from '../components/Vote';
import { useStateValue } from '../StateProvider';

const StyledTop = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: fit-content;
  margin: 15px auto;
  background-color: ${(props) => props.theme.color.white};
  box-shadow: 1px 2px 3px rgb(0 0 0 / 25%);
`;

const StyledIntro = styled.div`
display:flex;
flex-direction:'row';
  width: fit-content;
  padding: 30px 0px 30px 10px;
  align-items: center;
`;


const StyledPhoto = styled.img`
  width: 128px;
  height: 128px;
  border-radius: 5px;
`;

const StyledTitle = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  width: fit-content;
  min-width: 200px;
`;

const StyledName = styled.div`
  font-size: xx-large;
`;

const StyledEmail = styled.div`
  font-size: medium;
  color: ${(props) => props.theme.color.subTitle};
`;
const StyledPrivilege = styled.div`
  font-size: medium;
  color: ${(props) => props.theme.color.subTitle};
`;

const StyledButtonBar = styled.div`
  display: flex;
  flex-direction: row;
  margin: auto;
  margin-top: 15px;
  width: fit-content;
`;
const StyledNavLink = styled(NavLink)`
  color: ${(props) => props.theme.color.subTitle};
  font-size: small;
  border-radius: 20px;
  text-decoration: none;
  padding: 8px 15px;
  margin: 5px;
  cursor: pointer;
  &.active {
    color: ${(props) => props.theme.color.white};
    background-color: ${(props) => props.theme.color.orange};
  }
`;

export default function User() {
  const [userPage, setUserPage] = useState();
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
  let params = useParams();
  const _address = params.address;

  useEffect(() => {
    setTitle('User');
    return () => {};
  }, []);


  useEffect(() => {
    if (contract) {
      const runAsync = async () => {
        try {
          const _user = await contract.methods.users(_address).call();
          setUserPage(_user);
        } catch (e) {
          setError(e);
        }
      };
      runAsync();
    }
    return () => {};
  }, [contract, _address]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      {userPage && (
        <StyledTop>
          <div
            style={{
              width: '15px',
              alignSelf: 'center',
              margin: '15px 15px 0px 20px',
            }}
          >
            <Vote key={userPage.voteId} voteId={userPage.voteId} />
          </div>
          <StyledIntro>
            <StyledPhoto
              src={
                userPage.profilePhotoUrl != ''
                  ? userPage.profilePhotoUrl
                  : '/159236.png'
              }
            />
            <StyledTitle>
              <StyledName>{userPage.name}</StyledName>
              <StyledEmail>{userPage.email}</StyledEmail>

              <StyledPrivilege>
                {userPage.privilege == 3
                  ? 'journalist'
                  : userPage.privilege == 2
                  ? 'auditor'
                  : userPage.privilege == 1
                  ? 'verifier'
                  : 'reader'}
              </StyledPrivilege>
            </StyledTitle>
          </StyledIntro>
        </StyledTop>
      )}

      {userPage && (
        <StyledButtonBar>
          <StyledNavLink
            state={{ user: userPage }}
            to={`/user/${_address}/profile`}
          >
            Profile
          </StyledNavLink>
          <StyledNavLink to={`/user/${_address}/articles`}>
            Articles
          </StyledNavLink>
          <StyledNavLink to={`/user/${_address}/summaries`}>
            Summaries
          </StyledNavLink>
        </StyledButtonBar>
      )}
      <Outlet />
    </div>
  );
}
