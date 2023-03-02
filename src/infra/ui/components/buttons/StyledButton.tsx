import React, { useRef } from "react"
import styled from "styled-components"
import Icon from "../Icon"
import { Span } from "../styles"
import { BaseButtonProps } from "./Button"

const StyledButtonContainer = styled.button<{ variant?: "normal" | "big" }>`
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  gap: 4px;
  
  background-color: ${({ theme, color }) => color === "red" ? "#ff0000" : theme.color.primaryV1};
  color: ${({ theme }) => theme.color.contrastV1};
  padding: 8px 12px;
  outline: none;
  border: none;
  font-weight: bold;
  white-space: nowrap;

  ${({ variant }) => variant === "big" ? `
    * {
      font-size: 24px;
      padding: 18px 36px;
    }
  ` : ""}

  &:hover {
    cursor: pointer;
    background-color: ${({ theme, color }) => color === "red" ? "#ff3838" : theme.color.primaryV2};
  }

  > span.clickCircle {
    position: absolute;
    width: 200px;
    height: 200px;
    background-color: white;
    transform: translate(-50%, -50%);
    opacity: 0.4;
    animation: expand 0.5s forwards;
    border-radius: 50%;

    @keyframes expand {
      0% {
        transform: translate(-50%, -50%) scale(0.01);
      } 
      50% {
        transform:  translate(-50%, -50%) scale(1.0);
        opacity: 0.4;
      }
      100% {
        transform: translate(-50%, -50%) scale(1.0);
        opacity: 0;
      }
    }
  } 
`

interface StyledButtonProps extends BaseButtonProps {
  variant: "normal" | "big"
  text: string
  color?: "red" | "green" | "blue"
  icon?: React.ReactElement<typeof Icon>
}

export default function StyledButton(props: StyledButtonProps) {

  const buttonRef = useRef<HTMLButtonElement>(null)
  
  function animationOnClick(e: React.MouseEvent<HTMLButtonElement>) {
    if (!buttonRef.current) return

    const clickCircle = document.createElement("span")
    clickCircle.classList.add("clickCircle")
    const rect = buttonRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    clickCircle.style.left = x + "px"
    clickCircle.style.top = y + "px"
    buttonRef.current.appendChild(clickCircle)
    setTimeout(() => {
      buttonRef.current?.removeChild(clickCircle)
    }, 1000)
  }
  
  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    animationOnClick(e)
    if (props.onClick)
      props.onClick()
  }

  return (
    <StyledButtonContainer
      color={props.color}
      onClick={handleClick}
      type={props.type}
      ref={buttonRef}
      variant={props.variant}
    >
      {props.icon}
      <Span>{props.text}</Span>
    </StyledButtonContainer>
  )
}