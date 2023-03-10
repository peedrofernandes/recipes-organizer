import React from "react"
import { DefaultIconProps, Svg } from "./Icon"

export default function CheckEmptyIcon(props: DefaultIconProps) {
  return (
    <Svg size={props.size} viewBox={[0, 0, 48, 48]}>
      <path fill={props.color} d="M9 42q-1.2 0-2.1-.9Q6 40.2 6 39V9q0-1.2.9-2.1Q7.8 6 9 6h30q1.2 0 2.1.9.9.9.9 2.1v30q0 1.2-.9 2.1-.9.9-2.1.9Zm0-3h30V9H9v30Z"/>
    </Svg>
  )
}