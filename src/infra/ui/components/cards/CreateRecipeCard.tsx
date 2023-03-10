import { CardContainer } from "@infra/ui/components/cards/Card/styles"
import React from "react"
import Icon from "../icons/Icon"

type CreateRecipeCardProps = {
  events: {
    createEvent: () => void
  }
}

export default function CreateRecipeCard(props: CreateRecipeCardProps) {
  return (
    <CardContainer status="inactive" onClick={() => props.events.createEvent()}>
      <Icon variant="AddRecipe" size={48} />
      <Icon variant="Plus" size={24} />
    </CardContainer>
  )
}