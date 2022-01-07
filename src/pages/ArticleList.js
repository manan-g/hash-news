import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ArticleListItem from '../components/ArticleListItem';
import { useStateValue } from '../StateProvider';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import Pagination from '../components/Pagination';


const StyledList = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  height: calc(100vh - 134px);
  overflow-y: scroll;
  
  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    display: none;
  }
  ::-webkit-scrollbar-corner {
    background-color: ${(props) => props.theme.color.background};
  }
  ::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.color.grey};
    border-radius: 3px;
  }
`;

export default function ArticleList() {
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
  const [loading, setLoading] = useState(true);
  const [articleList, setArticleList] = useState([]);
  let params = useParams();
  const [currentPage, setCurrentPage] = useState(params.page?params.page:0);
  const [articleCount, setArticleCount] = useState(1);

  useEffect(() => {
    if (contract) {
      const RunAsync = async () => {
        setTitle('Articles');
        setLoading(true);
        let _articleCount = await contract.methods.articleCount().call();
        setArticleCount(_articleCount);
        if(currentPage>(_articleCount-1)/10)
        {
          setCurrentPage(0);
        }
        let index = currentPage * 10;
        let count = 10 + index;
        let articles = [];
        if (count > _articleCount) {
          count = _articleCount;
        }
        for (index; index < count; index++) {
          let article = await contract.methods.articles(index).call();
          article.vote = await contract.methods.votes(article.voteId).call();
          article.summaries = await contract.methods
            .getSummariesA(article.articleId)
            .call();
          articles.push(article);
        }
        setArticleList(articles);
        setLoading(false);
      };
      
      RunAsync();
    }
    return () => {
      // cleanup;
    };
  }, [contract,currentPage]);

  return (
    <>
      {<Loader loading={loading}></Loader>}
      {!loading && (
        <div>
          <StyledList>
            {articleList &&
              articleList.map((article) => (
                <ArticleListItem
                  key={article.articleId}
                  articleId={article.articleId}
                  title={article.articleTopic} 
                  body={article.articleDescription}
                  votes={article.vote.voteCount}
                  noOfSummaries={article.summaries.length}
                  id={article.auther}
                  time={article.uploadTime}
                />
              ))}
          </StyledList>
          <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          maxPage={parseInt((articleCount-1)/10)}
           />
        </div>
      )}
    </>
  );
}
