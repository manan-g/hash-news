import styled from "styled-components";

export const StyledLightButton = styled.button`
  color: ${(props) => props.theme.color.dullBlue};
  background-color: ${(props) => props.theme.color.lightBlue};
  border-color: ${(props) => props.theme.color.dullBlue};
  border: 1px solid;
  border-radius: 5px;
  text-decoration: none;
  height: 33px;
  padding: 8px;
  margin: 2px;
  cursor: pointer;
`;

export const StyledDarkButton = styled.button`
  color: ${(props) => props.theme.color.white};
  background-color: ${(props) => props.theme.color.darkBlue};
  border-color: ${(props) => props.theme.color.darkBlue};
  border: 1px solid;
  border-radius: 5px;
  text-decoration: none;
  /* height: 33px; */
  padding: 10px;
  cursor: pointer;
  /* margin: 2px; */
  :disabled{
    background-color: ${(props) => props.theme.color.lightBlue};
    border-color: ${props=>props.theme.color.background};
    cursor: default;
  }
`;


export const StyledOrangeButton = styled.button`
  color: ${(props) => props.theme.color.white};
  background-color: ${(props) => props.theme.color.orange};
  border-color: ${(props) => props.theme.color.orange};
  border: 1px solid;
  border-radius: 5px;
  text-decoration: none;
  /* height: 33px; */
  padding: 10px;
  cursor: pointer;
  /* margin: 2px; */
  :disabled{
    background-color: ${(props) => props.theme.color.lightBlue};
    border-color: ${props=>props.theme.color.background};
    cursor: default;
  }
`;

