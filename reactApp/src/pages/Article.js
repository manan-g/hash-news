import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import MainArticle from '../components/MainArticle';
import SummaryList from '../components/SummaryList';

const StyledArticle = styled.div`
height: calc(100vh - 64px);
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
`

export default function Article() {
  let params = useParams();
  let _id = params.id;
  // console.log(_id, 'article');

  return (
    <StyledArticle>
      <MainArticle id={parseInt(_id)} />
      <SummaryList id={parseInt(_id)} />
    </StyledArticle>
  );
}