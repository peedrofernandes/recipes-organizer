import React from "react"
import { DefaultIconProps, Svg } from "./Icon"

export default function IngredientIcon(props: DefaultIconProps) {
  return (
    <Svg size={props.size} viewBox={[0,0,48,48]}>
      <path fill={props.color} d="M32 44q-3.35 0-5.075-1.125T24 40.5q-.95-1-1.825-1.75T19.95 38q-2.25 0-5-.775t-5.175-2.55Q7.35 32.9 5.7 30.05q-1.65-2.85-1.7-7-.1-8.35 4.125-13.7T19.95 4q3.55 0 6 1.025T30.175 7.6q1.775 1.55 3 3.425Q34.4 12.9 35.5 14.65q.6 1 1.2 1.825T38 18q3 3 4.5 5.25t1.5 6.8q0 6-3.725 9.975Q36.55 44 32 44Zm0-3q3.25 0 6.125-3.125T41 30.05q0-3.6-1.025-5.275Q38.95 23.1 35.9 20.1q-1-1-1.8-2.15t-1.6-2.45q-2.15-3.45-4.625-5.975Q25.4 7 19.95 7q-6.8 0-9.875 4.8T7 22.75q0 3.65 1.525 6.025 1.525 2.375 3.6 3.775t4.275 1.925q2.2.525 3.55.525 2.25 0 3.625 1.125T25.85 38.2q1.2 1.3 2.375 2.05Q29.4 41 32 41Zm-8-11q2.5 0 4.25-1.75T30 24q0-2.5-1.75-4.25T24 18q-2.5 0-4.25 1.75T18 24q0 2.5 1.75 4.25T24 30Zm0-6Z"/>
    </Svg>
  )
}