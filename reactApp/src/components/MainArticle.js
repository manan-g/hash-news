import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useStateValue } from '../StateProvider';
import UserInfo from './UserInfo';
import Description from './Description';
import MediaList from './MediaList';
import CommentsList from './CommentsList';
import Loader from './Loader';
import Vote from './Vote';
import AdditionalInfo from './AdditionalInfo';
import TruthBar from './TruthBar';

const StyledTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px;
  padding-left: 30px;
  align-items: center;
  font-size: x-large;
`;

const StyledRuler = styled.hr`
  width: 95%;
  margin-top: 0px;
  margin-bottom: 20px;
`;

const StyledMainArticle = styled.div`
  display: flex;
  flex-direction: row;
  margin: 5px;
`;

const StyledBody = styled.div`
  flex: 10;
  margin: 5px;
  display: flex;
  flex-direction: column;
`;

export default function MainArticle({ id }) {
  const [loading, setLoading] = useState(true);
  const [article, setArticle] = useState();
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

  useEffect(() => {
    if (contract) {
      setTitle('Article');
      const runAsync = async () => {
        try {
          const _article = await contract.methods.articles(id).call();
          setArticle(_article);
          setLoading(false);
        } catch (e) {
          setError(e);
        }
      };
      runAsync();
    }
    return () => {};
  }, [contract]);

  return (
    <>
      <Loader loading={loading} />
      {!loading && (
        <div>
          <StyledTitle>
            {article && article.articleTopic}
            <TruthBar
              pos={article && article.noOfPositiveSummariesVotes}
              neg={article && article.noOfNegativeSummariesVotes}
            />
          </StyledTitle>
          <StyledRuler />
          <StyledMainArticle>
            <div
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                margin: '5px',
                alignItems: 'center',
              }}
            >
              <Vote voteId={article && article.voteId} />
            </div>
            <StyledBody>
              <Description
                text={article && article.articleDescription}
              ></Description>
              <UserInfo
                id={article && article.auther}
                role="Journalist"
                time={article && new Date(parseInt(article.uploadTime) * 1000)}
              />

              <MediaList action={0} id={id} auther={article.auther} />
              <CommentsList action={0} id={id} />

              <AdditionalInfo
                id={id}
                auther={article.auther}
                additionalNewInfo={article.additionalNewInfo}
              />
            </StyledBody>
          </StyledMainArticle>
        </div>
      )}
    </>
  );
}
