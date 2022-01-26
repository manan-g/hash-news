import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
body{
  margin: 0px;
  font-family: Roboto;
  background-color: ${(props) => props.theme.color.background};
  color: ${(props) => props.theme.color.color};
  caret-color:  ${(props) => props.theme.color.color};
  overflow-y: overlay;
  ::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
 display:none;
} 
::-webkit-scrollbar-corner{
  background-color: ${(props) => props.theme.color.background}; 
}
::-webkit-scrollbar-thumb {
  background: ${(props) => props.theme.color.grey}; 
  border-radius: 3px;
} 
}
@font-face {
  font-family: Roboto;
  src: url(/fonts/Roboto-Regular.ttf);
}
@font-face {
  font-family: Roboto;
  src: url(/fonts/Roboto-Light.ttf);
  font-weight: 200;
}
@font-face {
  font-family: Roboto;
  src: url(/fonts/Roboto-Medium.ttf);
  font-weight: 500;
}
`;
