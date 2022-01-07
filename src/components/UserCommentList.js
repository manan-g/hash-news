import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useStateValue } from '../StateProvider';
import UserComment from './UserComment';

const StyledDetail = styled.div`
  margin: 15px;
  padding: 15px;
`;

const StyledList = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function UserCommentsList() {
  const params = useParams();
  const _address = params.address;
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState();
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
          setLoading(true);
          let _comments = await contract.methods.getComments(_address).call();
          setComments(_comments);
          setLoading(false);
        } catch (e) {
          // setError(e);
          console.log(e);
          setLoading(false);
        }
      };
      runAsync();
    }
    return () => {};
  }, [contract, _address]);

  return (
    <StyledDetail>
      {!loading && (
        <StyledList>
          {comments &&
            comments.map((comment) => (
              <UserComment
                key={comment.commentId}
                comment={comment}
              ></UserComment>
            ))}
        </StyledList>
      )}
    </StyledDetail>
  );
}
