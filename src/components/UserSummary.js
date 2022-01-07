import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useStateValue } from '../StateProvider';
import Description from './Description';
import MediaList from './MediaList';
import CommentsList from './CommentsList';
import { Link } from 'react-router-dom';
import Loader from './Loader';

const StyledMainSummary = styled.div`
  display: flex;
  flex-direction: row;
  margin: 20px auto;
  padding: 10px 0px;
  width: 95%;
  background-color: ${(props) => props.theme.color.white};
  border: 1.5px solid ${(props) => props.theme.color.border};
  border-radius: 2px;
  border-left-width: 5px;
  border-left-color: ${(props) =>
    props.motion == '0'
      ? props.theme.color.negative
      : props.motion == '1'
      ? '#FBD148'
      : props.theme.color.positive};
  box-shadow: 2px 1px 5px rgb(0 0 0 / 15%);
`;

const StyledVote = styled.div`
  flex: 1;
  text-align: center;
  margin-top: 5px;
`;
const StyledBody = styled.div`
  flex: 15;
  margin: 5px;
  display: flex;
  flex-direction: column;
`;

const StyledTitle = styled(Link)`
  text-decoration: none;
  color: ${(props) => props.theme.color.textBlue};
  /* margin: 5px; */
`;

export default function UserSummary({ summary }) {
  const [loading, setLoading] = useState(true);
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
    if (contract && summary) {
      const runAsync = async () => {
        try {
          const _vote = await contract.methods.votes(summary.voteId).call();
          setVote(_vote.voteCount);
          setLoading(false);
        } catch (e) {
          setError(e);
          setLoading(false);
        }
      };
      runAsync();
    }
    return () => {};
  }, [summary, contract]);

  return (
    <>
      {summary && (
        <StyledMainSummary motion={summary.motion}>
          {!loading ? (
            <StyledVote>{vote}</StyledVote>
          ) : (
            <Loader loading={loading} />
          )}
          <StyledBody>
            <StyledTitle to={`/article/${summary.articleId}`}>
              Article
            </StyledTitle>
            <Description text={summary.description}></Description>
            <MediaList
              action={1}
              id={summary.summaryId}
              auther={summary.auther}
            />
            <CommentsList action={1} id={summary.summaryId} />
          </StyledBody>
        </StyledMainSummary>
      )}
    </>
  );
}
