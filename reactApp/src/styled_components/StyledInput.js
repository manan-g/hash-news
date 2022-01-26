import styled from "styled-components";

const StyledInput = styled.input`
display: block;
/* width: 30vw; */
margin: 7px 0px;
padding: 10px;
background-color: ${props=>props.theme.color.white};
color: ${props => props.theme.color.color};
border: 1px solid ${props=>props.theme.color.darkGrey};
border-radius: 3px;

:focus-visible {
  border:1px solid ${(props) => props.theme.color.outlineBlue};
  outline: ${(props) => props.theme.color.outlineBlueTransparent} solid 3px;
}
`;
export default StyledInput