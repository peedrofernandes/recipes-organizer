import React from "react"
import { DefaultIconProps, Svg } from "./Icon"

export default function AutomationIcon(props: DefaultIconProps) {
  return (
    <Svg size={props.size} viewBox={[0, 96, 960, 960]}>
      <path fill={props.color} d="M280 976 120 816l160-160 42 44-86 86h464V626h60v220H236l86 86-42 44Zm-80-450V306h524l-86-86 42-44 160 160-160 160-42-44 86-86H260v160h-60Z"/>
    </Svg>
  )
}