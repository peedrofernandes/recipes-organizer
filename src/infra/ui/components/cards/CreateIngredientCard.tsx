import React from "react"
import Icon from "../icons/_Icon"
import { CardContainer } from "./_Card"

type CreateIngredientCardProps = {
  events: {
    createEvent: () => void;
  }
}

export default function CreateIngredientCard(props: CreateIngredientCardProps) {
  return (
    <CardContainer status="inactive" onClick={() => props.events.createEvent()}>
      <Icon variant="AddRecipe" size={48} />
      <Icon variant="Plus" size={24} />
    </CardContainer>
  )
}