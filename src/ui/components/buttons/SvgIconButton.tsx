import React, { ReactNode } from "react"
import styled from "styled-components"

type SvgIconButtonProps = {
  children: ReactNode
  size?: number
}

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  transition: 0.1s ease-in-out;

  &:hover {
    cursor: pointer;
    transform: scale(1.2);
  }

  &:active {
    transform: scale(1.1);
  }
`

export default function SvgIconButton(props: SvgIconButtonProps) {
  const { children, size } = props

  return (
    <IconContainer>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        height={size ?? "48"}
        width={size ?? "48"}
        viewBox={"0 0 48 48"}
      >
        {children}
      </svg>
    </IconContainer>
  )
}