import React, { useEffect } from 'react';
import { useStateValue } from '../StateProvider';
import { ReactComponent as Vect } from '../components/Bitcoinsvg.svg';
import styled from 'styled-components';

const StyledAbout = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  justify-content: space-between;
`;

const StyledInfo = styled.div`
  padding: 20px;
  flex: 1;
`;
const StyledTitle = styled.div`
  font-size: xx-large;
`;
const StyledSub = styled.div`
  font-size: small;
  color: ${(props) => props.theme.color.subTitle};
`;
const StyledProcedure = styled.div`
  /* border: 4px solid ${(props) =>
    props.theme.color.outlineBlueTransparent}; */
  /* border-radius: 4px; */
  padding-top: 5px;
  margin-top: 3px;
`;


export default function About() {
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
    setTitle('About');
    return () => {};
  }, []);

  return (
    <StyledAbout>
      <StyledInfo>
        <StyledTitle>HashNEWS</StyledTitle>
        <StyledSub>Decentralized Platform for News Discussion</StyledSub>
        <StyledProcedure>

        With
        the rise in the use of Social media across the planet, the fluidity of
        information has grown exponentially fast. And since humans are emotional
        beings, the spread of incorrect and biased news is twice as likely as
        correct and unbiased information.
        <br />
        <br />
        We propose a Solution
        to this problem by introducing a Decentralized News Platform - HashNEWS. The aim of
        this Project is to reduce the spread of false and biased news through
        various social media channels like Facebook, Instagram, Twitter, etc.
        The system uses a Blockchain based decentralized database which helps
        ensure that the news cannot be modified nor it can be biased because of
        lack of a centralized private platform
        <br/>
        <br/>
        <div>
          Developed by Naman Monga, Bhavleen Kaur, Ayushi, Manan Garg
        </div>
        </StyledProcedure>
      </StyledInfo>
      <Vect style={{ flex: '1' }} />
    </StyledAbout>
  );
}
