import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useStateValue } from '../StateProvider';

const StyledProfile = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const StyledStats = styled.div`
  display: inline-grid;
  grid-template-columns: auto auto auto;
  grid-gap: 20px;
  margin: 10px;
  background-color: ${(props) => props.theme.color.white};
  box-shadow: 1px 2px 3px rgb(0 0 0 / 25%);
  padding: 20px;
`;
const StyledAbout = styled.div`
  margin: 10px;
  background-color: ${(props) => props.theme.color.white};
  box-shadow: 1px 2px 3px rgb(0 0 0 / 25%);
  padding: 20px;
  min-width: 300px;
`;

const StyledNoOfArticles = styled.div``;
const StyledNoOfSummaries = styled.div``;
const StyledNoOfTrueArticles = styled.div``;
const StyledNoOfFalseArticles = styled.div``;
const StyledLabel = styled.p`
  margin: 0px 0px 3px 0px;
  color: ${(props) => props.theme.color.subTitle};
`;

export default function Profile() {
  // const [vote, setVote] = useState();
  const [stats, setStats] = useState();
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
  let location = useLocation();
  const _user = location.state.user;

  useEffect(() => {
    if (contract) {
      const runAsync = async () => {
        try {
          const _stat = await contract.methods.getUserStat(_user.userId).call();
          setStats(_stat);
        } catch (e) {
          setError(e);
        }
      };
      runAsync();
    }
    return () => {};
  }, [contract, _user.userId]);

  return (
    <StyledProfile>
      <StyledStats>
        <StyledNoOfArticles>
          <StyledLabel>Articles</StyledLabel>
          {stats && stats[0]}
        </StyledNoOfArticles>
        <StyledNoOfSummaries>
          <StyledLabel>Summaries</StyledLabel>
          {stats && stats[1]}
        </StyledNoOfSummaries>
        <StyledNoOfTrueArticles>
          <StyledLabel>True articles</StyledLabel>
          {stats && stats[2]}
        </StyledNoOfTrueArticles>
        <StyledNoOfFalseArticles>
          <StyledLabel>Fake articles</StyledLabel>
          {stats && stats[3]}
        </StyledNoOfFalseArticles>
      </StyledStats>
      <StyledAbout>
        <StyledLabel>About</StyledLabel>
        {_user.about ? _user.about : 'No Description'}
      </StyledAbout>
    </StyledProfile>
  );
}
