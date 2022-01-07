import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { useStateValue } from '../StateProvider';
import Comments from './Comments';
import AddComment from './AddComment';
import Loader from './Loader';
import Chevron from './Chevron';

const StyledAccordion = styled.div`
  margin: 10px 0px;
  width: 98%;
  display: flex;
  flex-direction: column;
`;

const StyledTitle = styled.p`
  font-size: 14px;
  text-align: left;
`;

const StyledContent = styled.div`
  overflow: hidden;
  transition: max-height 0.6s ease;
`;
const StyledAccordionButton = styled.div`
  color: ${(props) => props.theme.color.dullBlue};
  background-color: ${(props) => props.theme.color.lightBlue};
  border-color: ${(props) => props.theme.color.dullBlue};
  border: 1px solid;
  border-radius: 5px;
  cursor: pointer;
  /* padding: 18px; */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0px 18px;
  align-items: center;
  transition: background-color 0.6s ease;
`;

export default function CommentsList({ id, action }) {
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState();
  const [reload, setReload] = useState(false);
  const [active, setActive] = useState(false);
  const [height, setHeight] = useState('0px');
  const content = useRef(null);
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

  function toggleAccordion() {
    setActive(!active);
  }

  useEffect(() => {
    setHeight(!active ? '0px' : `${content.current.scrollHeight}px`);
  }, [active]);

  useEffect(() => {
    if (contract) {
      const runAsync = async () => {
        try {
          setLoading(true);
          let _comments = await contract.methods.getComments(action, id).call();
          setComments(_comments);
          if (active) {
            setHeight(`${content.current.scrollHeight}px`);
          }
          setLoading(false);
        } catch (e) {
          setError(e);
          // console.log(e);
          setLoading(false);
        }
      };
      runAsync();
    }
    return () => {};
  }, [contract, reload]);

  return (
    <StyledAccordion>
      <StyledAccordionButton active={active} onClick={toggleAccordion}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <Chevron rotate={active} width={10} fill={'#777'} />
          <StyledTitle>Comments</StyledTitle>
        </div>
      </StyledAccordionButton>
      <StyledContent ref={content} style={{ maxHeight: `${height}` }}>
        {loading && (
          <div style={{ height: `${height}` }}>
            <Loader loading={loading} />
          </div>
        )}
        {!loading &&
          comments &&
          comments.map((comment) => (
            <Comments
              key={comment.commentId}
              voteId={comment.voteId}
              auther={comment.auther}
              body={comment.message}
            ></Comments>
          ))}
        <AddComment action={action} _id={id} setReload={setReload} />
      </StyledContent>
    </StyledAccordion>
  );
}
