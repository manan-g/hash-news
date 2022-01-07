import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useStateValue } from '../StateProvider';

const StyledUserInfo = styled.div`
  font-size: 0.8rem;
  color: ${props=>props.theme.color.subTitle};
  display: flex;
  flex-direction: column;
  margin: 0px 40px 5px 0px;
  width: fit-content;
  float: right;
  padding: 2px 5px;
`;

const StyledProfilePhoto = styled.img`
height: 32px;
width:32px;
border-radius: 4px;
margin-right: 5px;
`

const StyledTime = styled.div`
margin-bottom: 3px;
`;

const StyledName = styled(Link)`
  text-decoration: none;
  color: ${(props) => props.theme.color.textBlue};
  font-weight: 200;
  margin-bottom: 3px;
`;

const StyledRole = styled.div`
  margin-right: 5px;
  font-weight: 500;
`;

const StyledVoteCount = styled.div`
  font-weight: 500;
`;

export default function UserInfo({ role, time, id }) {
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
  const [auther, setAuther] = useState();
  const [vote, setVote] = useState(0);
  const [photoUrl, setPhotoUrl] = useState('/159236.png');

  useEffect(() => {
    const RunAsync = async () => {
      if (id) {
        const _user = await contract.methods.users(id).call();
        // console.log(_user);
        setAuther(_user.name);
        const vote = await contract.methods.votes(_user.voteId).call();
        setVote(vote.voteCount);
        if(_user.profilePhotoUrl)
        {
          setPhotoUrl(_user.profilePhotoUrl)
        }
      }
    };
    RunAsync();
    return () => {};
  }, [id]);
  return (
    <div>
      <StyledUserInfo>
        <StyledTime>{`${time.toLocaleString(undefined, {dateStyle:'medium'})} at ${time.toLocaleString(undefined,{timeStyle:'short',hour12:false})}`}</StyledTime>
        <div style={{
            display: 'flex',
            flexDirection: 'row',
          }}>
        <StyledProfilePhoto src={photoUrl} />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
        <StyledName to={`/user/${id}/profile`}>{auther}</StyledName>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <StyledRole title="Role">{role} | </StyledRole>
          <StyledVoteCount title="Votes">{vote}</StyledVoteCount>
          </div>
          </div>
        </div>
      </StyledUserInfo>
    </div>
  );
}
