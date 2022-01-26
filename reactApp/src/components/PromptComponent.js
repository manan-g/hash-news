import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useStateValue } from '../StateProvider';
import { StyledDarkButton } from './Button';
import { ReactComponent as Vect } from '../components/Bitcoinsvg.svg';

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
  padding-top: 5px;
  margin-top: 3px;
`;

const DarkOverlay = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: ${(props) => props.theme.color.background};
  position: fixed;
  top: 0;
  left: 0;
`;

const StyledPrompt = styled.div`
  position: fixed;
  padding: 10px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
`;

const StyledLoader = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0px;
  right: 0px;
  z-index: 50;

  background-color: ${(props) => props.theme.color.background};
`;

export default function PromptComponent() {
  const [
    Loading,
    setLoading,
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

  return (
    <>
      {Loading && (
        <StyledLoader>
          <svg
            style={{ maxWidth: '70px' }}
            version="1.1"
            id="L9"
            x="0px"
            y="0px"
            viewBox="0 0 100 100"
            enableBackground="new 0 0 0 0"
          >
            <path
              fill="#c4c8cc"
              d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"
            >
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="rotate"
                dur="1s"
                from="0 50 50"
                to="360 50 50"
                repeatCount="indefinite"
              />
            </path>
          </svg>
        </StyledLoader>
      )}
      <DarkOverlay></DarkOverlay>
      {show ? (
        <StyledPrompt>
          <StyledAbout>
            <StyledInfo>
              <StyledTitle>HashNEWS</StyledTitle>
              <StyledSub>Decentralized Platform for News Discussion</StyledSub>
              <StyledProcedure>
                With the rise in the use of Social media across the planet, the
                fluidity of information has grown exponentially fast. And since
                humans are emotional beings, the spread of incorrect and biased
                news is twice as likely as correct and unbiased information.
                <br />
              </StyledProcedure>
              <p>
                You are Not connected to a Blockchain. Follow the below steps to
                connect
                <br />
                If already connected then check whether ropsten network is
                selected or not
              </p>
              <ul>
                <li>Install Metamask as a Browser Extension</li>
                <li>Create Account and Login</li>
                <li>Select Ropsten Network</li>
                <li>select account with enough ethers</li>
                <li>
                  Connect your account to the site by clicking on the top-right
                  menu and then clicking on connected sites, manualy connect to
                  site
                </li>
                <li>after connecting reload the page</li>
              </ul>
            </StyledInfo>
            <Vect style={{ flex: '1' }} />
          </StyledAbout>
        </StyledPrompt>
      ) : (
        <div>
          <StyledPrompt>
            You are connected to the blockchain. Sign up to continue.
            <Link to="/signup">
              <StyledDarkButton>Sign Up</StyledDarkButton>
            </Link>
          </StyledPrompt>
        </div>
      )}
    </>
  );
}
