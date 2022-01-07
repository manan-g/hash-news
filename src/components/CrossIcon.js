import React from 'react';
import styled from 'styled-components';

const StyledEditIcon = styled.div`
  display: inline;
  cursor: pointer;
`;

export default function CrossIcon({
  height,
  width,
  fill = '#231F20',
  handleClick,
}) {
  return (
    <StyledEditIcon onClick={handleClick}>
      <svg
        height={height}
        width={width}
        viewBox="0 0 10 10"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M1,1 9,9 M9,1 1,9" />
      </svg>
    </StyledEditIcon>
  );
}
