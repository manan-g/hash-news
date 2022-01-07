import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const StyledError = styled.div`
  height: fit-content;
  padding: 8px;
  background-color: #ca1c1c;
  color: ${(props) => props.theme.color.white};
  width: -webkit-fill-available;
  margin-bottom: 0;
`;

export default function Error({ message, setError }) {
  // const [height, setHeight] = useState();
  useEffect(() => {
    let timeout;
    if (message !== undefined && message.length !== 0) {
      const runAsync = async () => {
        await new Promise((res) => {
          timeout = setTimeout(() => {
            console.log('resolved');
            res();
          }, 10000);
        });
        setError();
      };
      runAsync();
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [message]);
  console.log(typeof message);
  console.log(message);
  return (
    <>
      {message && (
        <StyledError message={message}>
          {typeof message != 'object' ? message : message.toString()}
        </StyledError>
      )}
    </>
  );
}
