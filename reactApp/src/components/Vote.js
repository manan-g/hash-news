import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useStateValue } from '../StateProvider';
import Loader from './Loader';
// import UserAPI from '../Utils.js/axiosInstance';

const StyledSvg1 = styled.svg`
  fill: ${(props) =>
    props.currentAction == 1
      ? props.theme.color.orange
      : props.theme.color.grey};
  margin: 5px;
  :hover {
    cursor: pointer;
  }
`;

const StyledSvg2 = styled.svg`
  fill: ${(props) =>
    props.currentAction == -1
      ? props.theme.color.orange
      : props.theme.color.grey};
  margin: 5px;
  :hover {
    cursor: pointer;
  }
`;

const StyledVote = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin: 5px;
  align-items: center;
`;

export default function Vote({ voteId }) {
  const [vote, setVote] = useState();
  const [currentAction, setCurrentAction] = useState(0);
  const [loading, setLoading] = useState(true);
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
    if (contract) {
      const runAsync = async () => {
        try {
          const _vote = await contract.methods.votes(voteId).call();
          setVote(_vote.voteCount);
          const _action = await contract.methods.whetherVoted(voteId).call();
          setCurrentAction(_action);
          setLoading(false);
        } catch (e) {
          setError(e);
        }
      };
      runAsync();
    }
    return () => {};
  }, [contract]);

  const handleVoteIncrease = async (e) => {
    e.preventDefault();
    if (contract && voteId) {
      try {
        setLoading(true);
        const _voteCount = await contract.methods.upvote(voteId, true).send({
          from: address,
        });
        // console.log();
        setVote(_voteCount.events.Upvoted.returnValues.voteCount);

        // UserAPI.post('update-vote/', {
        //   voteCount: _voteCount.events.Upvoted.returnValues.voteCount,
        //   voteId: voteId,
        // });

        const _action = await contract.methods.whetherVoted(voteId).call();
        setCurrentAction(_action);
        setLoading(false);
      } catch (e) {
        setError(e);
        setLoading(false);
      }
    }
  };
  const handleVoteDecrease = async (e) => {
    e.preventDefault();
    if (contract && voteId) {
      try {
        setLoading(true);
        const _voteCount = await contract.methods.upvote(voteId, false).send({
          from: address,
        });
        // console.log(_voteCount);
        setVote(_voteCount.events.Upvoted.returnValues.voteCount);

        // UserAPI.post('update-vote/', {
        //   voteCount: _voteCount.events.Upvoted.returnValues.voteCount,
        //   voteId: voteId,
        // });

        const _action = await contract.methods.whetherVoted(voteId).call();
        setCurrentAction(_action);
        setLoading(false);
      } catch (e) {
        // console.log(e);
        setError(e);
        setLoading(false);
      }
    }
  };

  return (
    <StyledVote>
      {user && user.privilege > 0 && (
        <StyledSvg1
          currentAction={currentAction}
          height="10px"
          width="20px"
          onClick={handleVoteIncrease}
        >
          <polygon points="10,0 20,10 0,10" />
        </StyledSvg1>
      )}
      {!loading ? (
        <div style={{ margin: '2.5px', height: '20px' }}>{vote}</div>
      ) : (
        <Loader loading={loading} width="25px" />
      )}
      {user && user.privilege > 0 && (
        <StyledSvg2
          currentAction={currentAction}
          height="10px"
          width="20px"
          onClick={handleVoteDecrease}
        >
          <polygon points="0,0 20,0 10,10" />
        </StyledSvg2>
      )}
    </StyledVote>
  );
}
