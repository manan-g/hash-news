import React, { useState } from 'react';
import styled from 'styled-components';
import { useStateValue } from '../StateProvider';
// import UserAPI from '../Utils.js/axiosInstance';

const StyledInput = styled.input`
  display: block;
  min-width: 200px;
  width: -webkit-fill-available;
  padding: 5px 0px 5px 70px;
  color: ${(props) => props.theme.color.color};
  border: 0px;
  border-radius: 3px;
  :focus-visible {
    outline: none;
  }
`;

export default function AddComment({ setReload, action, _id }) {
  const [comment, setComment] = useState('');
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
  // const params = useParams();
  // let _id = params.id;

  const handleChange = async (e) => {
    e.preventDefault();
    setComment(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (contract && comment.length != 0) {
      try {
        // console.log(action, _id, comment);
        const _receipt = await contract.methods
          .commentArticle(action, _id, comment)
          .send({ from: address });

        const _values = _receipt.events.CommentCreated.returnValues;
        // UserAPI.post('add-comment/', {
        //   action: action,
        //   id: _values.articleId,
        //   commentId: _values.commentId,
        //   author: _values.auther,
        //   text: _values.message,
        //   voteId: _values.voteId,
        // });

        setReload((prev) => !prev);
        setComment('');
      } catch (e) {
        setError(e);
        console.log(e);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <StyledInput
          required
          type="text"
          placeholder="comment!"
          value={comment}
          onChange={handleChange}
        />
      </form>
    </div>
  );
}
