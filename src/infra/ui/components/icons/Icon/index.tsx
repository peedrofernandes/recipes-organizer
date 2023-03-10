import React from "react"
import { Icon } from "./Icon"

export type DefaultIconProps = {
  size?: number
  color: string
}

export const Svg = (props: {
  children: React.ReactNode,
  size?: number,
  viewBox: [number, number, number, number]
}) => {
  const { children, size, viewBox } = props
  const [v1, v2, v3, v4] = viewBox
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={size ?? "48"}
      width={size ?? "48"}
      viewBox={`${v1} ${v2} ${v3} ${v4}`}
    >
      {children}
    </svg>
  )
}

export default Icon