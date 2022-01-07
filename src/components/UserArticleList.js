import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useStateValue } from '../StateProvider';
import Loader from './Loader';
import UserArticleItem from './UserArticleItem';

const StyledList = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function UserArticleList() {
  const params = useParams();
  const _address = params.address;
  const [articleList, setArticleList] = useState([]);
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
    if (contract && _address) {
      const runAsync = async () => {
        try {
          setLoading(true);
          const _articles = await contract.methods
            .getUserArticles(_address)
            .call();
          setArticleList(_articles);
          setLoading(false);
        } catch (e) {
          setError(e);
          setLoading(false);
        }
      };
      runAsync();
    }
    return () => {};
  }, [contract, _address]);

  return (
    <div>
    <Loader loading={loading} />
        {!loading && <StyledList>
          {articleList &&
            articleList.map((article) => (
              <UserArticleItem
                key={article.articleId}
                articleId={article.articleId}
                title={article.articleTopic} 
                body={article.articleDescription} 
                voteId={article.voteId}
              />
            ))}
        </StyledList>}
    </div>
  );
}
