import React from "react"
import { DefaultIconProps, Svg } from "./Icon"

export default function CloseIcon(props: DefaultIconProps) {
  return (
    <Svg size={props.size} viewBox={[0, 0, 48, 48]}>
      <path fill={props.color} d="m12.45 37.65-2.1-2.1L21.9 24 10.35 12.45l2.1-2.1L24 21.9l11.55-11.55 2.1 2.1L26.1 24l11.55 11.55-2.1 2.1L24 26.1Z"/>
    </Svg>
  )
}