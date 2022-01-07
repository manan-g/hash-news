import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const StyledBar = styled.div`
  height: 10px;
  display: flex;
  flex-direction: row;
  border-radius: 6px;
  align-items: center;
  justify-content: center;
`;

const StyledVotes = styled.div`
  font-size: large;
  margin-left: 10px;
`;

const StyledSVGWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export default function TruthBar({ pos, neg }) {
  return (
    <StyledBar>
      <div style={{ fontSize: 'medium' }}>Summary Votes</div>
      <StyledVotes>{pos}</StyledVotes>
      <StyledSVGWrapper title="Favour">
        <svg height="20" width="20">
          <circle cx="10" cy="10" r="7" fill="#2fb0ab" />
        </svg>
      </StyledSVGWrapper>
      <StyledVotes>{neg}</StyledVotes>
      <StyledSVGWrapper title="Against">
        <svg height="20" width="20">
          <circle cx="10" cy="10" r="7" fill="#ff6402" />
        </svg>
      </StyledSVGWrapper>
    </StyledBar>
  );
}
