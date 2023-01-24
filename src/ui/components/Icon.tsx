import React, { ReactNode, useContext } from "react"
import ThemeContext from "../context/ThemeContext"


export type IconProps = {
  type: "Delete" | "Edit" | "NoRecipe" | "NoImage" | "AddRecipe" | "Plus"; 
  size?: number;
  color?: string;
}

export default function Icon(props: IconProps) {
  const { type, size, color } = props

  const [theme] = useContext(ThemeContext)

  const Svg = (props: {
    children: ReactNode,
    size?: number,
    viewBox: [number, number, number, number]
  }) => {
    const { children, size, viewBox } = props
    const [v1, v2, v3, v4] = viewBox
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        height={size ?? "48"}
        width={size ?? "48"}
        viewBox={`${v1} ${v2} ${v3} ${v4}`}
      >
        {children}
      </svg>
    )
  }

  switch (type) {
    case "Delete":
      return (
        <Svg size={size} viewBox={[0,0,48,48]}>
          <path fill={color ?? theme.main.contrastV1} d="M13.05 42q-1.25 0-2.125-.875T10.05 39V10.5H8v-3h9.4V6h13.2v1.5H40v3h-2.05V39q0 1.2-.9 2.1-.9.9-2.1.9Zm21.9-31.5h-21.9V39h21.9Zm-16.6 24.2h3V14.75h-3Zm8.3 0h3V14.75h-3Zm-13.6-24.2V39Z" />  
        </Svg>
      )
    case "Edit":
      return (
        <Svg size={size}  viewBox={[0,0,48,48]}>
          <path fill={color ?? theme.main.contrastV1} d="M9 39h2.2l22.15-22.15-2.2-2.2L9 36.8Zm30.7-24.3-6.4-6.4 2.1-2.1q.85-.85 2.1-.85t2.1.85l2.2 2.2q.85.85.85 2.1t-.85 2.1Zm-2.1 2.1L12.4 42H6v-6.4l25.2-25.2Zm-5.35-1.05-1.1-1.1 2.2 2.2Z"/>
        </Svg>
      )
    case "NoRecipe":
      return (
        <Svg size={size} viewBox={[0,0,48,48]}>
          <path fill={color ?? theme.main.contrastV1} d="M4 20.1v-2q0-5.45 5.25-8.775T24 6q9.5 0 14.75 3.325T44 18.1v2Zm3.1-3h33.8q-.15-3.45-4.825-5.775T24 9q-7.4 0-12.125 2.325T7.1 17.1ZM4 28.9v-3q1.65 0 2.875-1.1t3.925-1.1q2.7 0 3.575 1.1t2.925 1.1q2.05 0 3.025-1.1.975-1.1 3.675-1.1 2.7 0 3.675 1.1.975 1.1 3.025 1.1t2.925-1.1q.875-1.1 3.575-1.1t3.925 1.1Q42.35 25.9 44 25.9v3q-2.7 0-3.725-1.1T37.2 26.7q-2.05 0-2.925 1.1T30.7 28.9q-2.7 0-3.675-1.1-.975-1.1-3.025-1.1t-3.025 1.1Q20 28.9 17.3 28.9q-2.7 0-3.575-1.1T10.8 26.7q-2.05 0-3.075 1.1Q6.7 28.9 4 28.9ZM7 42q-1.2 0-2.1-.9Q4 40.2 4 39v-6.4h40V39q0 1.2-.9 2.1-.9.9-2.1.9Zm0-3h34v-3.4H7V39Zm0-3.4h34Zm.1-18.5h33.8Z"/>
        </Svg>
      )
    case "AddRecipe":
      return (
        <Svg size={size} viewBox={[0,0,48,48]}>
          <path fill={color ?? theme.main.contrastV1} d="M10 42V21.45q-1.65 0-2.825-1.175Q6 19.1 6 17.45V7.15q0-.45.35-.8.35-.35.8-.35.45 0 .825.35.375.35.375.8v7.1h2v-7.1q0-.45.35-.8.35-.35.8-.35.45 0 .8.35.35.35.35.8v7.1h2v-7.1q0-.45.375-.8Q15.4 6 15.85 6q.45 0 .8.35.35.35.35.8v10.3q0 1.65-1.175 2.825Q14.65 21.45 13 21.45V42Zm14 0V21.35q-2.05-1.15-3.1-3.1-1.05-1.95-1.05-4.5 0-3 1.525-5.375T25.55 6q2.65 0 4.175 2.375t1.525 5.375q0 2.55-1.1 4.5-1.1 1.95-3.15 3.1V42Zm10.7 0V6q2.9.25 5.1 2.275Q42 10.3 42 13.3v12.2h-4.3V42Z"/>
        </Svg>
      )
    case "Plus":
      return (
        <Svg size={size} viewBox={[0,0,24,24]}>
          <path d="M0 0h24v24H0V0z" fill="none"/>
          <path fill={color ?? theme.main.contrastV1} d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
        </Svg>
      )
    default:
      return null;
  }
}