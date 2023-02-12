import { CardContainer, ImageContainer } from "@infra/ui/styles/cardStyles"
import React from "react"
import Icon from "../icons/_Icon"

export default function LoadingCard() {
  return (
    <CardContainer status="active">
      <ImageContainer>
        <Icon variant="Spinner" />
      </ImageContainer>
    </CardContainer>
  )
}