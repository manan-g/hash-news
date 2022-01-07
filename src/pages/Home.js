import React, { useEffect } from 'react';
import { useStateValue } from '../StateProvider';
import styled from 'styled-components';
import { ReactComponent as Vect } from '../components/amico.svg';
let content = [
  {
    title: 'Reading Guide',
    slug: [
      'Browse the Platform by moving to articles tab.',
      ' Every article is associated with votes and summaries.',
      'Summaries are Justification/References of the article.',
      'Summaries can be in favour/against/neutral to the article',
    ],
  },
  {
    title: 'Roles Info',
    slug: [
      'Our Platform gives you a role depending on your votes',
      'Initially User is assigned role as Reader. Reader is allowed to comment.',
      'Then after getting sufficient votes, User is upgraded to Verifier, Verifier is now allowed to comment and vote','Then again after getting more votes, User is upgraded to Auditor, Auditor can create summaries, comment and vote','Then after getting sufficient votes, User is upgraded to Journalist, Journalist can create article, summaries, comment, vote'
    ],
  },
  {
    title: 'Vote Info',
    slug: ['User needs 5000 votes for Journalist, 1000 votes for Auditor, 200 votes for Verifier','Every 4 vote on user\'s article is equivalent to 1 user vote, 8 vote on summary is equivalent to 1 user vote, 16 vote on comment is equivalent to 1 user vote ']
  }
];

const StyledHome = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  justify-content: space-between;
`;

const StyledInfo = styled.div`
  padding: 20px;
  flex: 1;
  overflow-y: scroll;
  ::-webkit-scrollbar {
  width: 0px;
}

::-webkit-scrollbar-track {
 display:none;
} 
`;

const StyledTitle = styled.div`
  font-size: xx-large;
`;
const StyledSub = styled.div`
  font-size: small;
  color: ${(props) => props.theme.color.subTitle};
`;
const StyledProcedure = styled.div`
  padding-top: 5px;
  margin-top: 3px;
`;

const StyledItem = styled.div`
  border: 1.5px solid ${(props) => props.theme.color.border};
  border-radius: 2px;
  padding: 15px;
  background-color: ${(props) => props.theme.color.white};
  box-shadow: 1px 2px 3px rgb(0 0 0 / 25%);
  margin-bottom: 15px;
`;
const StyledTopic = styled.div`
  text-align: center;
`;
const StyledUL = styled.ul``;
const StyledLI = styled.li``;

export default function Home() {
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
    setTitle('Home');
    return () => {};
  }, []);

  return (
    <StyledHome>
      <StyledInfo>
        <StyledTitle>HashNEWS</StyledTitle>
        <StyledSub>Decentralized Platform for News Discussion</StyledSub>
        <StyledProcedure>
          {content.map((text) => (
            <StyledItem>
              <StyledTopic>{text.title}</StyledTopic>
              <StyledUL>
                {text.slug.map((point) => (
                  <StyledLI>{point}</StyledLI>
                ))}
              </StyledUL>
            </StyledItem>
          ))}
        </StyledProcedure>
      </StyledInfo>
      <Vect style={{ flex: '1', height: '100%' }} />
    </StyledHome>
  );
}
