import styled from 'styled-components';

const StyledTextarea = styled.textarea`
  display: block;
  height: 40vh;
  margin: 5px 0px;
  padding: 5px;
  background-color: ${(props) => props.theme.color.white};
  color: ${(props) => props.theme.color.color};
  border: 1px solid ${(props) => props.theme.color.darkGrey};
  border-radius: 3px;
  font-family: Roboto;
  :focus-visible {
    border: 1px solid ${(props) => props.theme.color.outlineBlue};
    outline: ${(props) => props.theme.color.outlineBlueTransparent} solid 3px;
  }
`;
export default StyledTextarea;
