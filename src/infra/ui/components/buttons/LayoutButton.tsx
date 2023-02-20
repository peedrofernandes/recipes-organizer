import React, { ReactNode } from "react"
import styled from "styled-components"
import { BaseButtonProps } from "./Button"

const LayoutButtonContainer = styled.button<{ selected?: boolean }>`
  outline: none;
  border: none;

  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 8px 0 8px 0;
  font-weight: bold;
  cursor: pointer;

  background-color: ${({ theme, selected }) => (
    selected ? theme.color.primaryV1 : theme.main.primaryV1
  )};
  
  color: ${({ theme, selected }) => (
    selected ? theme.color.contrastV1 : theme.main.contrastV1
  )};

  &:hover {
    background-color: ${({ theme, selected }) => (
    selected ? theme.color.primaryV2 : theme.main.primaryV2
  )}};
`

interface LayoutButtonProps extends BaseButtonProps {
  selected?: boolean;
  children?: ReactNode;
}

export default function LayoutButton(props: LayoutButtonProps) {
  return (
    <LayoutButtonContainer
      selected={props.selected}
      onClick={props.onClick}
      type={props.type}
    >
      {props.children}
    </LayoutButtonContainer>
  )
}