import React from "react"
import { DefaultIconProps, Svg } from "./Icon"

export default function PlusIcon(props: DefaultIconProps) {
  return (
    <Svg size={props.size} viewBox={[0,0,24,24]}>
      <path d="M0 0h24v24H0V0z" fill="none"/>
      <path fill={props.color} d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
    </Svg>
  )
}