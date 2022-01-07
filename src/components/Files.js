import React from 'react';
import styled from 'styled-components';

const StyledFiles = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledLink = styled.a`
  color: ${(props) => props.theme.color.darkBlue};
`;
const StyledDescription = styled.div``;

export default function Files({
  fileHash,
  fileType,
  fileName,
  fileDescription,
  uploadTime,
  uploader,
}) {
  return (
    <StyledFiles>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <StyledLink href={`https://ipfs.infura.io/ipfs/${fileHash}`}>
          {fileName}
        </StyledLink>
        <div>{new Date(parseInt(uploadTime) * 1000).toLocaleString()}</div>
      </div>
      <StyledDescription>{fileDescription}</StyledDescription>
      <div style={{ marginBottom: '10px' }}>{fileType}</div>
    </StyledFiles>
  );
}
