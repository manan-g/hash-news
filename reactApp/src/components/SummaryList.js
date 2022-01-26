import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useStateValue } from '../StateProvider';
import { StyledOrangeButton } from './Button';
import Loader from './Loader';
import Summary from './Summary';
// import { Element, scroller, animateScroll } from 'react-scroll';

const StyledTop = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
  align-items: center;
`;

export default function SummaryList({ id }) {
  const [summaries, setSummaries] = useState();
  const [refs, setRefs] = useState();
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

  let location = useLocation();
  const _scrollPos = location.state;

  useEffect(() => {
    if (!loading && _scrollPos && _scrollPos.scroll && refs && refs[_scrollPos.scroll]) {
      refs[_scrollPos.scroll].current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [loading, refs]);
    

  useEffect(() => {
    if (contract) {
      const runAsync = async () => {
        try {
          const _summaries = await contract.methods.getSummariesA(id).call();
          let _ref = _summaries.reduce((acc, value) => {
            acc[value.summaryId] = React.createRef();
            return acc;
          }, {});
          setRefs(_ref);
          setSummaries(_summaries);
          setLoading(false);
        } catch (e) {
          console.log(e);
          setError(e);
          setLoading(false);
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
          <StyledTop>
            <p style={{ fontSize: 'large' }}>Summaries</p>
            {user && user.privilege > 1 && (
              <Link to={`/create-summary/${id}`}>
                <StyledOrangeButton>Create Summary</StyledOrangeButton>
              </Link>
            )}
          </StyledTop>
          {summaries && refs &&
            summaries.map((summary) => (
              <Summary innerRef={refs[summary.summaryId]} key={summary.summaryId} summary={summary} />
            ))}
        </div>
      )}
    </>
  );
}
