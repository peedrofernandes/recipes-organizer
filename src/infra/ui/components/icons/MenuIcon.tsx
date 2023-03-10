import React from "react"
import { DefaultIconProps, Svg } from "./Icon"

export default function MenuIcon(props: DefaultIconProps) {
  return (
    <Svg size={props.size} viewBox={[0, 96, 960, 960]}>
      <path fill={props.color} d="M120 816v-60h720v60H120Zm0-210v-60h720v60H120Zm0-210v-60h720v60H120Z"/>
    </Svg>
  )
}