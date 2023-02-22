import React, { useRef } from "react"
import styled from "styled-components"
import Icon from "../Icon"
import { Span } from "../styles"
import { BaseButtonProps } from "./Button"

const DropdownButtonContainer = styled.button`
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items:center;
  border: none;
  cursor: pointer;

  padding: 16px;

  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.color.primaryV1};
  color: ${({ theme }) => theme.main.contrastV1};
  &:hover {
    background-color: ${({ theme }) => theme.color.primaryV2};
  }

  > span.clickCircle {
    position: absolute;
    width: 200px;
    height: 200px;
    opacity: 0.3;
    background-color: white;
    transform: translate(-50%, -50%);
    animation: expandDropdown 0.5s forwards;
    border-radius: 50%;

    @keyframes expandDropdown {
      0% {
        transform: translate(-50%, -50%) scale(0.01);
      } 
      50% {
        transform:  translate(-50%, -50%) scale(5.0);
        opacity: 0.3;
      }
      100% {
        transform: translate(-50%, -50%) scale(5.0);
        opacity: 0;
      }
    }
  }
`
interface DropdownButtonProps extends BaseButtonProps {
  icon?: React.ReactElement<typeof Icon>
  text: string
}

export default function DropdownButton(props: DropdownButtonProps) {
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
    <DropdownButtonContainer
      onClick={handleClick}
      type={props.type}
      ref={buttonRef}
    >
      {props.icon}
      <Span>{props.text}</Span>
    </DropdownButtonContainer>
  )
}