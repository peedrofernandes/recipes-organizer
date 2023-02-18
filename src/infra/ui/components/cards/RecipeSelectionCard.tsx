import { AdaptedRecipe } from "@controllers/AdaptedTypes"
import { Id } from "@domain/utilities/types/Id"
import React from "react"



type RecipeSelectionCardProps = {
  recipeWithDate: [AdaptedRecipe, string]
  errorStatus: boolean
  handleChangeDate: (id: Id, date: string) => void
}

export default function RecipeSelectionCard(props: RecipeSelectionCardProps) {
  return (
    <></>
  )
}