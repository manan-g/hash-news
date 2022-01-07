import styled from 'styled-components';

const StyledForm = styled.form`
  background-color: ${(props) => props.theme.color.white};
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  width: 100%;
  margin: 30px 40px;
  box-shadow: 1px 2px 3px rgb(0 0 0 / 25%);
`;

export default StyledForm;
