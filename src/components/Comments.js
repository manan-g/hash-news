import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useStateValue } from '../StateProvider';
// import UserAPI from '../Utils.js/axiosInstance';
import Loader from './Loader';

const StyledComment = styled.div`
  margin: 1px 0px;
  display: flex;
  flex-direction: row;
  font-size: small;
  padding: 3px 0px;
`;
const StyledVote = styled.div`
  color: ${(props) => props.theme.color.dullBlue};
  margin: 0 15px 0 15px;
  align-self: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const StyledBody = styled.div`
  align-self: center;
  word-wrap: anywhere;
`;

const StyledRuler = styled.hr`
  width: 98%;
  border-bottom: 1px;
  margin: 0px auto;
`;

const StyledName = styled(Link)`
  text-decoration: none;
  color: ${(props) => props.theme.color.textBlue};
  font-weight: 200;
`;

const StyledSvg1 = styled.svg`
   fill: ${(props) => props.currentAction==1 ? props.theme.color.orange : props.theme.color.grey};
  margin: 5px;
  :hover {
    cursor: pointer;
  }
`;

const StyledSvg2 = styled.svg`
   fill: ${(props) => props.currentAction==-1 ? props.theme.color.orange : props.theme.color.grey};
  margin: 5px;
  :hover {
    cursor: pointer;
  }
`;

export default function Comments({ voteId, auther, body }) {
  const [loading, setLoading] = useState(false);
  const [vote, setVote] = useState();
  const [currentAction, setCurrentAction] = useState(0);
  const [name, setName] = useState();
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

  useEffect(() => {
    if (voteId && contract) {
      const runAsync = async () => {
        setLoading(true);
        let temp = await contract.methods.votes(voteId).call();
        const _user = await contract.methods.users(auther).call();
        setName(_user.name);
        setVote(temp.voteCount);
        const _action = await contract.methods.whetherVoted(voteId).call();
        setCurrentAction(_action);
        setLoading(false);
      };
      runAsync();
    }

    return () => {};
  }, [voteId, contract]);

  const handleVoteIncrease = async () => {
    if (contract && voteId && user && user.privilege > 0) {
      try {
        setLoading(true);
        const _voteCount = await contract.methods.upvote(voteId, true).send({
          from: address,
        });

        setVote(_voteCount.events.Upvoted.returnValues.voteCount);
        
        // UserAPI.post('update-vote/', {
        //   voteCount: _voteCount.events.Upvoted.returnValues.voteCount,
        //   voteId: voteId
        // })

        const _action = await contract.methods.whetherVoted(voteId).call();
        setCurrentAction(_action);
        setLoading(false);
      } catch (e) {
        console.log(e);
        setError(e);
        setLoading(false);
      }
    }
  };

  const handleVoteDecrease = async () => {
    if (contract && voteId && user && user.privilege > 0) {
      try {
        setLoading(true);
        const _voteCount = await contract.methods.upvote(voteId, false).send({
          from: address,
        });
        setVote(_voteCount.events.Upvoted.returnValues.voteCount);

        // UserAPI.post('update-vote/', {
        //   voteCount: _voteCount.events.Upvoted.returnValues.voteCount,
        //   voteId: voteId
        // })

        const _action = await contract.methods.whetherVoted(voteId).call();
        setCurrentAction(_action);
        setLoading(false);
      } catch (e) {
        console.log(e);
        setError(e);
        setLoading(false);
      }
    }
  };

  return (
    <>
      <StyledComment>
        <StyledVote>
          <div style={{ height: '20px', width: '20px', textAlign: 'center' }}>
            {' '}
            {!loading ? <div>{vote}</div> : <Loader loading={loading} />}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {user && user.privilege > 0 && (
              <StyledSvg1  currentAction={currentAction} height="5px" width="10px" onClick={handleVoteIncrease}>
                <polygon points="5,0 10,5 0,5" />
              </StyledSvg1>
            )}
            {user && user.privilege > 0 && (
              <StyledSvg2  currentAction={currentAction} height="5px" width="10px" onClick={handleVoteDecrease}>
                <polygon points="0,0 10,0 5,5" />
              </StyledSvg2>
            )}
          </div>
        </StyledVote>

        <StyledBody>
          {body} -<StyledName to={`/user/${auther}`}> {name}</StyledName>
        </StyledBody>
      </StyledComment>
      <StyledRuler />
    </>
  );
}
