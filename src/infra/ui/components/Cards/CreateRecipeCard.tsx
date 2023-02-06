import React from "react"
import Icon from "../Icons/_Icon"
import { CardContainer } from "./_Card"

type CreateRecipeCardProps = {
  events: {
    handleCreateClick: () => void
  }
}

export default function CreateRecipeCard(props: CreateRecipeCardProps) {
  return (
    <CardContainer status="inactive" onClick={() => props.events.handleCreateClick()}>
      <Icon variant="AddRecipe" size={48} />
      <Icon variant="Plus" size={24} />
    </CardContainer>
  )
}