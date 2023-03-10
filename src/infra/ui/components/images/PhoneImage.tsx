import React from "react"

import img1076  from "../../assets/phone-1076.webp"
import img538  from "../../assets/phone-538.webp"
import img269  from "../../assets/phone-269.webp"

export default function PhoneImage() {
  return (
    <img
      src={img1076}
      alt="Imagem de um spartphone mostrando o app MealMind"
      srcSet={`
        ${img1076} 1076w,
        ${img538} 538w,
        ${img269} 269w
      `}

    />
  )
}