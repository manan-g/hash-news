import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useStateValue } from '../StateProvider';
import UserInfo from './UserInfo';
import Description from './Description';
import MediaList from './MediaList';
import CommentsList from './CommentsList';
import Loader from './Loader';
import Vote from './Vote';

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

const StyledBody = styled.div`
  flex: 10;
  margin: 5px;
  display: flex;
  flex-direction: column;
`;

export default function Summary({ summary,innerRef }) {
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState();
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
          const _auther = await contract.methods.users(summary.auther).call();
          setRole(_auther.privilege > 2 ? 'Journalist' : 'Verifier');
          setLoading(false);
        } catch (e) {
          setError(e);
          setLoading(false);
        }
      };
      runAsync();
    }
    return () => {};
  }, [contract]);

  return (
    <StyledMainSummary ref={innerRef} motion={summary.motion}>
      <Vote voteId={summary.voteId} />
      <StyledBody>
        <Description text={summary.description}></Description>
        <Loader loading={loading} />
        {!loading && (
          <UserInfo
            id={summary.auther}
            role={role}
            time={new Date(parseInt(summary.uploadTime) * 1000)}
          />
        )}
        <MediaList action={1} id={summary.summaryId} auther={summary.auther} />
        <CommentsList action={1} id={summary.summaryId} />
      </StyledBody>
    </StyledMainSummary>
  );
}
