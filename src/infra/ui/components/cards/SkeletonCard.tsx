import React from "react"
import styled from "styled-components"

const Card = styled.div`
  width: 100%;
  aspect-ratio: 3 / 2;
  display: flex;
  gap: 8px;
  flex-direction: column;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    ${({ theme }) => `background: linear-gradient(to right, transparent, ${theme.main.primaryV1}, transparent)`};
    transform: translateX(-100%);
    animation: translate 1s infinite;
  }

  @keyframes translate {
    100% {
      transform: translateX(100%);
    }
  }

  & > div:first-child {
    width: 100%;
    flex-grow: 7;
    background-color: ${({ theme }) => theme.main.primaryV3};
    border-radius: 8px;
  }

  & > div:last-child {
    flex-grow: 3;
    background-color: ${({ theme }) => theme.main.primaryV3};
    border-radius: 8px;
  }
`

export default function SkeletonCard() {
  return (
    <Card>
      <div />
      <div />
    </Card>
  )
}