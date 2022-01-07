import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useStateValue } from '../StateProvider';
import Loader from './Loader';

const StyledComment = styled.div`
  margin: 1px 0px;
  display: flex;
  flex-direction: row;
  font-size: small;
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
`;

const StyledRuler = styled.hr`
  width: 98%;
  border-bottom: 1px;
  margin: 0px auto;
`;

export default function Comments({ comment }) {
  const [loading, setLoading] = useState(false);
  // const [comment, setComment] = useState()
  const [vote, setVote] = useState();
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
        setLoading(true);
        let _vote = await contract.methods.votes(comment.voteId).call();
        setVote(_vote.voteCount);
        setLoading(false);
      };
      runAsync();
    }

    return () => {};
  }, [comment, contract]);


  return (
    <>
      <StyledComment>
        <StyledVote>
          <div style={{ height: '20px', width: '20px',textAlign: 'center' }}>
            {' '}
            {!loading ? <div>{vote}</div> : <Loader loading={loading} />}
          </div>
        </StyledVote>

        <StyledBody>
          {comment.message}
        </StyledBody>
      </StyledComment>
      <StyledRuler />
    </>
  );
}
