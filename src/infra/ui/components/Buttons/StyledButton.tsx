import React from "react"
import styled from "styled-components"
import { BaseButtonProps } from "./_Button"

const StyledButtonContainer = styled.button`
  background-color: ${({ theme, color }) => color === "red" ? "#ff0000" : theme.color.primaryV1};
  color: ${({ theme }) => theme.color.contrastV1};
  padding: 8px 32px;
  border-radius: 4px;
  outline: none;
  border: none;
  font-weight: bold;

  &:hover {
    cursor: pointer;
  }
`

interface StyledButtonProps extends BaseButtonProps {
  text: string;
  color?: "red" | "green" | "blue";
}

export default function StyledButton(props: StyledButtonProps) {
  return (
    <StyledButtonContainer
      color={props.color}
      onClick={props.onClick}
      onSubmit={props.onSubmit}
    >
      {props.text}
    </StyledButtonContainer>
  )
}