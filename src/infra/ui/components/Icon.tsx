import React, { ReactNode, useContext } from "react"
import styled from "styled-components"
import { ThemeContext } from "../context/ThemeContext"

const SpinnerCircle = styled.circle<{ size?: number }>`
  fill: none;
  stroke-width: ${({ size }) => size ? size / 12 : 2};
  stroke: ${({ theme }) => theme.main.contrastV1};
  stroke-linecap: round;
  stroke-dasharray: ${({ size }) => size ? 2.18 * size : 105};
  animation: dash 3s ease infinite, rotate 1s linear infinite;
  transform-origin: 50% 50%;


  @keyframes dash {
    0% {
      stroke-dashoffset: 0;
    }
    100% {
      stroke-dashoffset: ${({ size }) => size ? 2 * 2.18 * size : 210};
    }
  }

  @keyframes rotate {
    100% {
      transform: rotate(-1turn)
    }
  }
`


export type IconProps = {
  variant: "Delete" | "Edit" | "NoRecipe" | "NoImage" | "AddRecipe" | "Plus" | "DarkMode" | "LightMode" | "Help" | "Menu Book" | "Ingredient" | "Close" | "Search" | "Spinner" | "Check" | "CheckEmpty" | "Download" | "Document"; 
  size?: number;
  color?: string;
}

export default function Icon(props: IconProps) {
  const { variant, size, color } = props

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
        height={size ?? "48"}
        width={size ?? "48"}
        viewBox={`${v1} ${v2} ${v3} ${v4}`}
      >
        {children}
      </svg>
    )
  }

  switch (variant) {
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
  case "LightMode": {
    return (
      <Svg size={size} viewBox={[0, 96, 960, 960]}>
        <path fill={color ?? theme.main.contrastV1} d="M479.765 716Q538 716 579 675.235q41-40.764 41-99Q620 518 579.235 477q-40.764-41-99-41Q422 436 381 476.765q-41 40.764-41 99Q340 634 380.765 675q40.764 41 99 41Zm.235 60q-83 0-141.5-58.5T280 576q0-83 58.5-141.5T480 376q83 0 141.5 58.5T680 576q0 83-58.5 141.5T480 776ZM70 606q-12.75 0-21.375-8.675Q40 588.649 40 575.825 40 563 48.625 554.5T70 546h100q12.75 0 21.375 8.675 8.625 8.676 8.625 21.5 0 12.825-8.625 21.325T170 606H70Zm720 0q-12.75 0-21.375-8.675-8.625-8.676-8.625-21.5 0-12.825 8.625-21.325T790 546h100q12.75 0 21.375 8.675 8.625 8.676 8.625 21.5 0 12.825-8.625 21.325T890 606H790ZM479.825 296Q467 296 458.5 287.375T450 266V166q0-12.75 8.675-21.375 8.676-8.625 21.5-8.625 12.825 0 21.325 8.625T510 166v100q0 12.75-8.675 21.375-8.676 8.625-21.5 8.625Zm0 720q-12.825 0-21.325-8.62-8.5-8.63-8.5-21.38V886q0-12.75 8.675-21.375 8.676-8.625 21.5-8.625 12.825 0 21.325 8.625T510 886v100q0 12.75-8.675 21.38-8.676 8.62-21.5 8.62ZM240 378l-57-56q-9-9-8.629-21.603.37-12.604 8.526-21.5 8.896-8.897 21.5-8.897Q217 270 226 279l56 57q8 9 8 21t-8 20.5q-8 8.5-20.5 8.5t-21.5-8Zm494 495-56-57q-8-9-8-21.375T678.5 774q8.5-9 20.5-9t21 9l57 56q9 9 8.629 21.603-.37 12.604-8.526 21.5-8.896 8.897-21.5 8.897Q743 882 734 873Zm-56-495q-9-9-9-21t9-21l56-57q9-9 21.603-8.629 12.604.37 21.5 8.526 8.897 8.896 8.897 21.5Q786 313 777 322l-57 56q-8 8-20.364 8-12.363 0-21.636-8ZM182.897 873.103q-8.897-8.896-8.897-21.5Q174 839 183 830l57-56q8.8-9 20.9-9 12.1 0 20.709 9Q291 783 291 795t-9 21l-56 57q-9 9-21.603 8.629-12.604-.37-21.5-8.526ZM480 576Z"/>
      </Svg>
    )
  }
  case "Help":
    return (
      <Svg size={size} viewBox={[0,0,48,48]}>
        <path fill={color ?? theme.main.contrastV1} d="M24.2 36.2q.9 0 1.525-.625.625-.625.625-1.525 0-.9-.625-1.525Q25.1 31.9 24.2 31.9q-.9 0-1.525.625-.625.625-.625 1.525 0 .9.625 1.525.625.625 1.525.625Zm-2.05-7.65h3.55q0-1.4.3-2.55t2.15-2.7q1.55-1.25 2.225-2.55.675-1.3.675-2.9 0-2.8-1.85-4.45-1.85-1.65-4.9-1.65-2.7 0-4.675 1.325Q17.65 14.4 16.8 16.75l3.15 1.2q.45-1.35 1.525-2.2 1.075-.85 2.675-.85 1.6 0 2.65.875 1.05.875 1.05 2.275 0 1.1-.675 2.075-.675.975-1.925 2.025-1.65 1.4-2.375 2.7-.725 1.3-.725 3.7ZM24 44.8q-4.3 0-8.075-1.65-3.775-1.65-6.6-4.475Q6.5 35.85 4.85 32.05 3.2 28.25 3.2 24q0-4.3 1.65-8.1t4.475-6.625q2.825-2.825 6.625-4.45T24 3.2q4.3 0 8.1 1.625t6.625 4.45q2.825 2.825 4.45 6.625t1.625 8.15q0 4.25-1.625 8.025-1.625 3.775-4.45 6.6Q35.9 41.5 32.1 43.15 28.3 44.8 24 44.8Z"/>
      </Svg>
    )
  case "Menu Book":
    return (
      <Svg size={size} viewBox={[0,0,48,48]}>
        <path fill={color ?? theme.main.contrastV1} d="M28 19.3v-2.4q1.65-.7 3.375-1.05Q33.1 15.5 35 15.5q1.3 0 2.55.2 1.25.2 2.45.5v2.2q-1.2-.45-2.425-.675Q36.35 17.5 35 17.5q-1.9 0-3.65.475T28 19.3Zm0 11v-2.45q1.65-.7 3.375-1.025Q33.1 26.5 35 26.5q1.3 0 2.55.2 1.25.2 2.45.5v2.2q-1.2-.45-2.425-.675Q36.35 28.5 35 28.5q-1.9 0-3.65.45T28 30.3Zm0-5.5v-2.4q1.65-.7 3.375-1.05Q33.1 21 35 21q1.3 0 2.55.2 1.25.2 2.45.5v2.2q-1.2-.45-2.425-.675Q36.35 23 35 23q-1.9 0-3.65.475T28 24.8ZM12.4 33q2.7 0 5.225.625 2.525.625 4.975 1.875V14.15q-2.25-1.5-4.875-2.325Q15.1 11 12.4 11q-1.9 0-3.725.475Q6.85 11.95 5 12.65v21.7q1.55-.7 3.525-1.025Q10.5 33 12.4 33Zm13.2 2.5q2.5-1.25 4.9-1.875Q32.9 33 35.6 33q1.9 0 3.925.3t3.475.8V12.65q-1.7-.85-3.6-1.25-1.9-.4-3.8-.4-2.7 0-5.225.825-2.525.825-4.775 2.325ZM24.1 40q-2.55-1.9-5.55-2.925T12.4 36.05q-1.85 0-3.6.45t-3.5 1.1q-1.15.55-2.225-.15Q2 36.75 2 35.45V12.3q0-.75.35-1.375T3.4 9.95q2.1-1 4.375-1.475Q10.05 8 12.4 8q3.15 0 6.125.85t5.575 2.6q2.55-1.75 5.475-2.6Q32.5 8 35.6 8q2.35 0 4.6.475 2.25.475 4.35 1.475.7.35 1.075.975T46 12.3v23.15q0 1.4-1.125 2.125-1.125.725-2.225.025-1.7-.7-3.45-1.125-1.75-.425-3.6-.425-3.15 0-6.05 1.05T24.1 40ZM13.8 23.55Z"/>
      </Svg>
    )
  case "Ingredient":
    return (
      <Svg size={size} viewBox={[0,0,48,48]}>
        <path fill={color ?? theme.main.contrastV1} d="M32 44q-3.35 0-5.075-1.125T24 40.5q-.95-1-1.825-1.75T19.95 38q-2.25 0-5-.775t-5.175-2.55Q7.35 32.9 5.7 30.05q-1.65-2.85-1.7-7-.1-8.35 4.125-13.7T19.95 4q3.55 0 6 1.025T30.175 7.6q1.775 1.55 3 3.425Q34.4 12.9 35.5 14.65q.6 1 1.2 1.825T38 18q3 3 4.5 5.25t1.5 6.8q0 6-3.725 9.975Q36.55 44 32 44Zm0-3q3.25 0 6.125-3.125T41 30.05q0-3.6-1.025-5.275Q38.95 23.1 35.9 20.1q-1-1-1.8-2.15t-1.6-2.45q-2.15-3.45-4.625-5.975Q25.4 7 19.95 7q-6.8 0-9.875 4.8T7 22.75q0 3.65 1.525 6.025 1.525 2.375 3.6 3.775t4.275 1.925q2.2.525 3.55.525 2.25 0 3.625 1.125T25.85 38.2q1.2 1.3 2.375 2.05Q29.4 41 32 41Zm-8-11q2.5 0 4.25-1.75T30 24q0-2.5-1.75-4.25T24 18q-2.5 0-4.25 1.75T18 24q0 2.5 1.75 4.25T24 30Zm0-6Z"/>
      </Svg>
    )
  case "Close":
    return (
      <Svg size={size} viewBox={[0, 0, 48, 48]}>
        <path fill={color ?? theme.main.contrastV1} d="m12.45 37.65-2.1-2.1L21.9 24 10.35 12.45l2.1-2.1L24 21.9l11.55-11.55 2.1 2.1L26.1 24l11.55 11.55-2.1 2.1L24 26.1Z"/>
      </Svg>
    )
  case "Search":
    return (
      <Svg size={size} viewBox={[0, 0, 48, 48]}>
        <path fill={color ?? theme.main.contrastV1} d="M39.8 41.95 26.65 28.8q-1.5 1.3-3.5 2.025-2 .725-4.25.725-5.4 0-9.15-3.75T6 18.75q0-5.3 3.75-9.05 3.75-3.75 9.1-3.75 5.3 0 9.025 3.75 3.725 3.75 3.725 9.05 0 2.15-.7 4.15-.7 2-2.1 3.75L42 39.75Zm-20.95-13.4q4.05 0 6.9-2.875Q28.6 22.8 28.6 18.75t-2.85-6.925Q22.9 8.95 18.85 8.95q-4.1 0-6.975 2.875T9 18.75q0 4.05 2.875 6.925t6.975 2.875Z"/>
      </Svg>
    )
  case "Spinner":
    return <Svg size={size} viewBox={[0, 0, size ?? 48, size ?? 48]}>
      <SpinnerCircle
        cx={size ? size / 2 : "24"}
        cy={size ? size / 2 : "24"}
        r={size ? size / 2 - size / 12 : "20"}
        size={size}
      />
    </Svg>
  case "Check":
    return <Svg size={size} viewBox={[0, 0, 48, 48]}>
      <path fill={color ?? theme.main.contrastV1} d="M20.95 31.95 35.4 17.5l-2.15-2.15-12.3 12.3L15 21.7l-2.15 2.15ZM9 42q-1.2 0-2.1-.9Q6 40.2 6 39V9q0-1.2.9-2.1Q7.8 6 9 6h30q1.2 0 2.1.9.9.9.9 2.1v30q0 1.2-.9 2.1-.9.9-2.1.9Zm0-3h30V9H9v30ZM9 9v30V9Z"/>
    </Svg>
  case "CheckEmpty":
    return <Svg size={size} viewBox={[0, 0, 48, 48]}>
      <path fill={color ?? theme.main.contrastV1} d="M9 42q-1.2 0-2.1-.9Q6 40.2 6 39V9q0-1.2.9-2.1Q7.8 6 9 6h30q1.2 0 2.1.9.9.9.9 2.1v30q0 1.2-.9 2.1-.9.9-2.1.9Zm0-3h30V9H9v30Z"/>
    </Svg>
  case "Download":
    return <Svg size={size} viewBox={[0, 96, 960, 960]}>
      <path fill={color ?? theme.main.contrastV1} d="M220 896q-24 0-42-18t-18-42V693h60v143h520V693h60v143q0 24-18 42t-42 18H220Zm260-153L287 550l43-43 120 120V256h60v371l120-120 43 43-193 193Z"/>
    </Svg>

  case "Document":
    return <Svg size={size} viewBox={[0, 96, 960, 960]}>
      <path fill={color ?? theme.main.contrastV1} d="M319 806h322v-60H319v60Zm0-170h322v-60H319v60Zm-99 340q-24 0-42-18t-18-42V236q0-24 18-42t42-18h361l219 219v521q0 24-18 42t-42 18H220Zm331-554V236H220v680h520V422H551ZM220 236v186-186 680-680Z"/>
    </Svg>
  default:
    return null
  }
}