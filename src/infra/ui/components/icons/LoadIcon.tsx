import React from "react"
import { DefaultIconProps, Svg } from "./Icon"

export default function LoadIcon(props: DefaultIconProps) {
  return (
    <Svg size={props.size} viewBox={[0, 96, 960, 960]}>
      <path fill={props.color} d="M452 854h60V653l82 82 42-42-156-152-154 154 42 42 84-84v201ZM220 976q-24 0-42-18t-18-42V236q0-24 18-42t42-18h361l219 219v521q0 24-18 42t-42 18H220Zm331-554V236H220v680h520V422H551ZM220 236v186-186 680-680Z"/>
    </Svg>
  )
}