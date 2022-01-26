import React from 'react';
import styled from 'styled-components';

const StyledEditIcon = styled.div`
display: inline;
cursor: pointer;
`

export default function EditIcon({height,  width, fill='#231F20', handleClick}) {
  return (
    <StyledEditIcon onClick={handleClick}>
      <svg
        enableBackground="new 0 0 45 45"
        height={height}
        viewBox="0 0 45 45"
        width={width}
      >
        <g>
          <rect
            fill={fill}
            height="23"
            transform="matrix(-0.7071 -0.7072 0.7072 -0.7071 38.2666 48.6029)"
            width="11"
            x="23.7"
            y="4.875"
          />
          <path
            d="M44.087,3.686l-2.494-2.494c-1.377-1.377-3.61-1.377-4.987,0L34.856,2.94l7.778,7.778l1.749-1.749   C45.761,7.593,45.465,5.063,44.087,3.686z"
            fill={fill}
          />
          <polygon fill={fill} points="16,22.229 16,30 23.246,30  " />
          <path
            d="M29,40H5V16h12.555l5-5H3.5C1.843,11,0,11.843,0,13.5v28C0,43.156,1.843,45,3.5,45h28   c1.656,0,2.5-1.844,2.5-3.5V23.596l-5,5V40z"
            fill={fill}
          />
        </g>
      </svg>
    </StyledEditIcon>
  );
}
