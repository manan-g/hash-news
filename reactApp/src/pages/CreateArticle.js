import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useStateValue } from '../StateProvider';
import styled from 'styled-components';
import { StyledOrangeButton } from '../components/Button';
import StyledLabel from '../styled_components/StyledLabel';
import StyledForm from '../styled_components/StyledForm';
import StyledInput from '../styled_components/StyledInput';
import StyledTextarea from '../styled_components/StyledTextarea';
import Loader from '../components/Loader';
// import UserAPI from '../Utils.js/axiosInstance';

const StyledArticle = styled.div`
  display: flex;
  justify-content: center;
`;

export default function CreateArticle() {
  const [topic, setTopic] = useState();
  const [description, setDescription] = useState();
  const [articleId, setArticleId] = useState();
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

  useEffect(() => {
    setTitle('Create Article');
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
          .uploadArticle(topic, description)
          .send({
            from: address,
          });
        if (_event.blockHash) {
          setArticleId(_event.events.ArticleUploaded.returnValues.articleId);
        }

        const _values = _event.events.ArticleUploaded.returnValues;
        // UserAPI.post('add-article/',{
        //   articleId: _values.articleId,
        //   title: _values.articleTopic,
        //   text: _values.articleDescription,
        //   voteId: _values.voteId,
        //   author: _values.auther
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
        <StyledArticle>
          <StyledForm onSubmit={handleSubmit}>
            <StyledLabel>Title</StyledLabel>
            <StyledInput
              type="text"
              required
              onChange={(e) => {
                handleChange(e, setTopic);
              }}
            />
            <StyledLabel>Description</StyledLabel>
            <StyledTextarea
              type="text"
              required
              onChange={(e) => {
                handleChange(e, setDescription);
              }}
            />
            <br />
            <StyledOrangeButton type="submit">Submit</StyledOrangeButton>
            {articleId && <Navigate to={`/article/${articleId}`} />}
          </StyledForm>
        </StyledArticle>
      )}
    </>
  );
}
