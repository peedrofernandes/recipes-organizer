import React from "react"
import styled from "styled-components"
import { BaseButtonProps } from "./Button"

const StyledButtonContainer = styled.button`
  background-color: ${({ theme, color }) => color === "red" ? "#ff0000" : theme.color.primaryV1};
  color: ${({ theme }) => theme.color.contrastV1};
  padding: 6px 16px;
  border-radius: 16px;
  outline: none;
  border: none;
  font-weight: bold;

  &:hover {
    cursor: pointer;
  }
`

interface StyledButtonProps extends BaseButtonProps {
  type?: "submit"
  text: string;
  color?: "red" | "green" | "blue";
}

export default function StyledButton(props: StyledButtonProps) {
  return (
    <StyledButtonContainer
      color={props.color}
      onClick={props.onClick}
      type={props.type}
    >
      {props.text}
    </StyledButtonContainer>
  )
}