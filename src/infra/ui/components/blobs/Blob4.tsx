import React from "react"
import { useTheme } from "styled-components"

export default function Blob4() {
  const { color } = useTheme()

  return (
    <svg>
      <defs>
        <clipPath id="BlobClipPath" clipPathUnits="objectBoundingBox">
          <path fill={color.primaryV1 + "90"} d="M0.842,0.119 C0.92,0.188,0.995,0.275,1,0.383 C1,0.491,1,0.62,0.968,0.737 C0.919,0.854,0.846,0.958,0.757,0.992 C0.669,1,0.564,0.991,0.456,0.95 C0.347,0.908,0.235,0.86,0.149,0.754 C0.062,0.648,0,0.484,0.043,0.372 C0.087,0.26,0.236,0.201,0.346,0.139 C0.457,0.078,0.529,0.014,0.605,0.007 C0.682,0,0.763,0.051,0.842,0.119">
          </path>
        </clipPath>
      </defs>
    </svg>

  )
}