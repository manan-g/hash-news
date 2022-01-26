import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import UserInfo from "./UserInfo";

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

const StyledSummaryCount = styled.div`
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
const StyledTitle = styled(Link)`
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

export default function ArticleListItem({articleId, title, body, votes, noOfSummaries,id,time }) {
  return (
    <StyledListItem>
      <StyledStats>
        <StyledVotesCount>
          <StyledPara style={{ fontSize: "1rem" }}>{votes}</StyledPara>
          <StyledPara>votes</StyledPara>
        </StyledVotesCount>
        <StyledSummaryCount>
          <StyledPara style={{ fontSize: "1rem" }}>{noOfSummaries}</StyledPara>
          <StyledPara>summaries</StyledPara>
        </StyledSummaryCount>
      </StyledStats>

      <StyledArticle>
        <StyledContent>
          <StyledTitle to={`/article/${articleId}`}>{title}</StyledTitle>
          <StyledBody>{body.length>340? body.substring(0,240)+'...':body}</StyledBody>
        </StyledContent>

        <UserInfo
          id={id}
          role="Journalist"
          time={new Date(parseInt(time)*1000)}
        />
      </StyledArticle>
    </StyledListItem>
  );
}
