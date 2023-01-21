import styled from "styled-components";

const Button = styled.button`
  background-color: ${props => props.theme.main};
  color: ${props => props.theme.secondary};
  padding: 10px;
  border-radius: 6px;
  outline: none;
  border: none;

  &:hover {
    cursor: pointer;
  }
`

export default Button

