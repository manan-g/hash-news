import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useStateValue } from '../StateProvider';

const StyledListItem = styled.div`
    display: flex;
  flex-direction: row;
  padding: 5px;
  border: 1.5px solid ${(props) => props.theme.color.border};
  border-radius: 2px;
  box-shadow: 2px 1px 5px rgb(0 0 0 / 15%);
  margin: 15px 50px;
  background-color: ${props=>props.theme.color.white};
`;

const StyledStats = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 5px;
  font-size: 0.7rem;
  align-items: center;
  /* justify-content: space-between; */
  justify-content: space-around;
`;

const StyledCommentCount = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${(props) => props.theme.color.green};
  color: ${(props) => props.theme.color.white};
  padding: 5px;
  border-radius: 5px;
  margin-top: 10px;
`;

const StyledVotesCount = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
`;

const StyledArticle = styled.div`
  display: flex;
  margin: 5px;
  width: 100%;
  flex-direction: column;
`;
const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
`;
const StyledTitle = styled.a`
  text-decoration: none;
  color: ${(props) => props.theme.color.textBlue};
  margin: 5px;
`;
const StyledBody = styled.div`
  margin: 5px;
  font-weight: 200;
  font-size: 0.8rem;
  width: -webkit-fill-available;
`;

const StyledPara = styled.p`
  margin: 1px;
`;

export default function ArticleListItem({
  articleId,
  title,
  body,
  voteId,
}) {
  const [vote, setVote] = useState();
  const [summaries, setSummaries] = useState();
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
          const _summaries = await contract.methods.getSummariesA(articleId).call();
          setSummaries(_summaries);
          setVote(_vote);
        } catch (e) {
          console.log(e);
          setError(e);
        }
      };
      runAsync();
    }
    return () => {};
  }, [contract, voteId]);

  return (
    <StyledListItem>
      <StyledStats>
        <StyledVotesCount>
          <StyledPara style={{ fontSize: '1rem' }}>{vote && vote.voteCount}</StyledPara>
          <StyledPara>votes</StyledPara>
        </StyledVotesCount>
        <StyledCommentCount>
          <StyledPara style={{ fontSize: '1rem' }}>{summaries && summaries.length}</StyledPara>
          <StyledPara>summaries</StyledPara>
        </StyledCommentCount>
      </StyledStats>

      <StyledArticle>
        <StyledContent>
          <StyledTitle href={`/article/${articleId}`}>{title}</StyledTitle>
          <StyledBody>{body}</StyledBody>
        </StyledContent>
      </StyledArticle>
    </StyledListItem>
  );
}
