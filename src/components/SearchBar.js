import React from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  display: inline;
  align-items: center;
  padding: 5px;
  /* margin: 5px; */
  height: 22px;
  width: -webkit-fill-available;
  border: 1px solid ${(props) => props.theme.color.grey};
  border-radius: 2px;
  :focus-within {
    border: 1.5px solid ${(props) => props.theme.color.darkBlue};
  }
  background-image: url("/search.svg");
  background-repeat: no-repeat;
  background-position: 4px 8px;
  padding-left: 22px;
  outline: none;
  background-color: ${(props) => props.theme.color.lightGrey};
  margin-left: 5px;
`;

export default function SearchBar() {
  return <StyledInput type="text" placeholder="Search Articles"></StyledInput>;
}
