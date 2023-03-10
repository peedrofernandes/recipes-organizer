import React from "react"
import { DefaultIconProps, Svg } from "./Icon"

export default function CollectionIcon(props: DefaultIconProps) {
  return (
    <Svg size={props.size} viewBox={[0, 96, 960, 960]}>
      <path fill={props.color} d="m261 530 220-354 220 354H261Zm445 446q-74 0-124-50t-50-124q0-74 50-124t124-50q74 0 124 50t50 124q0 74-50 124t-124 50Zm-586-25V647h304v304H120Zm586.085-35Q754 916 787 882.916q33-33.085 33-81Q820 754 786.916 721q-33.085-33-81.001-33Q658 688 625 721.084q-33 33.085-33 81Q592 850 625.084 883q33.085 33 81.001 33ZM180 891h184V707H180v184Zm189-421h224L481 289 369 470Zm112 0ZM364 707Zm342 95Z" />
    </Svg>
  )
}