import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useStateValue } from '../StateProvider';
import styled from 'styled-components';
import { StyledDarkButton } from '../components/Button';
import StyledTextarea from '../styled_components/StyledTextarea';
import StyledForm from '../styled_components/StyledForm';
import StyledLabel from '../styled_components/StyledLabel';
import Loader from '../components/Loader';
// import UserAPI from '../Utils.js/axiosInstance';

const StyledCreateSummary = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledSelect = styled.select`
  display: block;
  min-width: 200px;
  margin: 5px 0px;
  padding: 5px;
  color: ${(props) => props.theme.color.color};
  border: 1px solid ${(props) => props.theme.color.darkGrey};
  border-radius: 3px;

  :focus-visible {
    border: 1px solid ${(props) => props.theme.color.outlineBlue};
    outline: ${(props) => props.theme.color.outlineBlue} solid 3px;
  }
`;

export default function CreateSummary() {
  const [summary, setSummary] = useState();
  const [motion, setMotion] = useState(0);
  const [summaryId, setSummaryId] = useState();
  const [loading, setLoading] = useState(false);
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
  let params = useParams();
  const _id = params.id;

  useEffect(() => {
    setTitle('Create Summary');
    return () => {};
  }, []);

  const handleChange = (e, setState) => {
    e.preventDefault();
    setState(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (contract) {
      try {
        setLoading(true);
        const _event = await contract.methods
          .createSummary(summary, _id, motion)
          .send({
            from: address,
          });
        if (_event.blockHash) {
          setSummaryId(_event.events.SummaryCreated.returnValues.summaryId);
        }

        const _values = _event.events.SummaryCreated.returnValues;
        // UserAPI.post('add-summary/',{
        //   articleId: _values.articleId,
        //   summaryId: _values.summaryId,
        //   text: _values.description,
        //   author: _values.auther,
        //   voteId: _values.voteId
        // })

        setLoading(false);
      } catch (e) {
        setError(e);
        setLoading(false);
      }
    }
  };

  return (
    <>
      <Loader loading={loading} />
      {!loading && (
        <StyledCreateSummary>
          <StyledForm onSubmit={handleSubmit}>
            <StyledLabel>Summary</StyledLabel>
            <StyledTextarea
              type="text"
              required
              onChange={(e) => {
                handleChange(e, setSummary);
              }}
            />
            <div style={{ marginTop: '15px' }}>Motion</div>
            <StyledSelect
              onChange={(e) => {
                handleChange(e, setMotion);
              }}
            >
              <option value="0">Against</option>
              <option value="1">Neutral</option>
              <option value="2">Support</option>
            </StyledSelect>
            <br />
            <StyledDarkButton type="submit">Submit</StyledDarkButton>
            {summaryId && (
              <Navigate
                state={{ scroll: `${summaryId}` }}
                to={`/article/${_id}`}
              />
            )}
          </StyledForm>
        </StyledCreateSummary>
      )}
    </>
  );
}
