import React, { ReactNode, useContext } from "react"
import { ThemeContext } from "../context/ThemeContext";


export type IconProps = {
  type: "Delete" | "Edit" | "NoRecipe" | "NoImage" | "AddRecipe" | "Plus" | "DarkMode" | "Help"; 
  size?: number;
  color?: string;
}

export default function Icon(props: IconProps) {
  const { type, size, color } = props

  const { theme } = useContext(ThemeContext)

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
    case "DarkMode":
      return (
        <Svg size={size} viewBox={[0,0,48,48]}>
          <path fill={color ?? theme.main.contrastV1} d="M24 42q-7.5 0-12.75-5.25T6 24q0-7.5 5.25-12.75T24 6q.4 0 .85.025.45.025 1.15.075-1.8 1.6-2.8 3.95-1 2.35-1 4.95 0 4.5 3.15 7.65Q28.5 25.8 33 25.8q2.6 0 4.95-.925T41.9 22.3q.05.6.075.975Q42 23.65 42 24q0 7.5-5.25 12.75T24 42Zm0-3q5.45 0 9.5-3.375t5.05-7.925q-1.25.55-2.675.825Q34.45 28.8 33 28.8q-5.75 0-9.775-4.025T19.2 15q0-1.2.25-2.575.25-1.375.9-3.125-4.9 1.35-8.125 5.475Q9 18.9 9 24q0 6.25 4.375 10.625T24 39Zm-.2-14.85Z"/>
        </Svg>
      )
    case "Help":
      return (
        <Svg size={size} viewBox={[0,0,48,48]}>
          <path fill={color ?? theme.main.contrastV1} d="M24.2 36.2q.9 0 1.525-.625.625-.625.625-1.525 0-.9-.625-1.525Q25.1 31.9 24.2 31.9q-.9 0-1.525.625-.625.625-.625 1.525 0 .9.625 1.525.625.625 1.525.625Zm-2.05-7.65h3.55q0-1.4.3-2.55t2.15-2.7q1.55-1.25 2.225-2.55.675-1.3.675-2.9 0-2.8-1.85-4.45-1.85-1.65-4.9-1.65-2.7 0-4.675 1.325Q17.65 14.4 16.8 16.75l3.15 1.2q.45-1.35 1.525-2.2 1.075-.85 2.675-.85 1.6 0 2.65.875 1.05.875 1.05 2.275 0 1.1-.675 2.075-.675.975-1.925 2.025-1.65 1.4-2.375 2.7-.725 1.3-.725 3.7ZM24 44.8q-4.3 0-8.075-1.65-3.775-1.65-6.6-4.475Q6.5 35.85 4.85 32.05 3.2 28.25 3.2 24q0-4.3 1.65-8.1t4.475-6.625q2.825-2.825 6.625-4.45T24 3.2q4.3 0 8.1 1.625t6.625 4.45q2.825 2.825 4.45 6.625t1.625 8.15q0 4.25-1.625 8.025-1.625 3.775-4.45 6.6Q35.9 41.5 32.1 43.15 28.3 44.8 24 44.8Z"/>
        </Svg>
      )
    default:
      return null;
  }
}