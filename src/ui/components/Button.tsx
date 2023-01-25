import React from "react"
import styled from "styled-components"
import Icon from "./Icon"

const StyledButton = styled.button`
  background-color: ${({ theme }) => theme.color.primaryV1};
  color: ${({ theme }) => theme.color.contrastV1};
  padding: 10px;
  border-radius: 16px;
  outline: none;
  border: none;
  font-weight: bold;

  &:hover {
    cursor: pointer;
  }
`

const IconButton = styled.button`
  outline: none;
  border: none;
  font-weight: bold;

  display: flex;
  justify-content: center;
  align-items: center;

  background: none;
  color: ${({ theme }) => theme.main.contrastV1};

  transition: 0.1s ease-in-out;
  opacity: 0.75;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }
`

type ButtonProps = ({
  type: "styled";
  text: string;
} | {
  type: "icon";
  children: React.ReactElement<typeof Icon>
}) & { onClick?: any }

export default function Button(props: ButtonProps) {
  const { type, onClick } = props

  switch (type) {

    case "styled":
      return (
        <StyledButton onClick={onClick}>
          {props.text}
        </StyledButton>
      )
    
    case "icon":
      const { children } = props
      
      return (
        <IconButton onClick={onClick}>
          {children}
        </IconButton>
      )

    default:
      return null;
  }
}