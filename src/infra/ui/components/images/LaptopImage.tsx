import React from "react"

import img2704 from "../../assets/laptop-2704.webp"
import img1377 from "../../assets/laptop-1377.webp"
import img689 from "../../assets/laptop-689.webp"

export default function LaptopImage() {
  return (
    <img
      src={img2704}
      alt="Laptop with mockup of MealMind"
      srcSet={`
        ${img2704} 2704w,
        ${img1377} 1377w,
        ${img689} 689w 
      `}
    />
  )
}