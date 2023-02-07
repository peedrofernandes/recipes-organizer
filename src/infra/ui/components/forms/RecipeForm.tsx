import React from "react"
import { AdaptedIngredient } from "@controllers/AdaptedTypes"
import { OptionalValues } from "@domain/utilities/types/Values"
import { FormContainer } from "./_Form"

type RecipeFormProps = {
  variant: "Create"
} | {
  variant: "Update"
} | {
  variant: "ConfirmDelete"
}

export default function UpdateIngredient(props: RecipeFormProps) {
  return (
    <FormContainer>

    </FormContainer>
  )
}