import React, { ReactElement } from "react"
import styled from "styled-components"
import Icon from "../Icons/_Icon"
import { BaseButtonProps } from "./_Button"

const IconButtonContainer = styled.button`
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

interface IconButtonProps extends BaseButtonProps {
  children: ReactElement<typeof Icon>
}

export default function IconButton(props: IconButtonProps) {
  return (
    <IconButtonContainer
      onClick={props.onClick}
      onSubmit={props.onSubmit}
    >
      {props.children}
    </IconButtonContainer>
  )
}