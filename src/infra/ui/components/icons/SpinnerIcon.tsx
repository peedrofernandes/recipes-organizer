import React from "react"
import styled from "styled-components"
import { DefaultIconProps, Svg } from "./Icon"

const SpinnerCircle = styled.circle<{ size?: number }>`
  fill: none;
  stroke-width: ${({ size }) => size ? size / 12 : 2};
  stroke: ${({ theme }) => theme.main.contrastV1};
  stroke-linecap: round;
  stroke-dasharray: ${({ size }) => size ? 2.18 * size : 105};
  animation: dash 3s ease infinite, rotate 1s linear infinite;
  transform-origin: 50% 50%;


  @keyframes dash {
    0% {
      stroke-dashoffset: 0;
    }
    100% {
      stroke-dashoffset: ${({ size }) => size ? 2 * 2.18 * size : 210};
    }
  }

  @keyframes rotate {
    100% {
      transform: rotate(-1turn)
    }
  }
`

export default function SpinnerIcon(props: DefaultIconProps) {
  const { size } = props

  return (
    <Svg size={size} viewBox={[0, 0, size ?? 48, size ?? 48]}>
      <SpinnerCircle
        cx={size ? size / 2 : "24"}
        cy={size ? size / 2 : "24"}
        r={size ? size / 2 - size / 12 : "20"}
        size={size}
      />
    </Svg>
  )
}