import { AdaptedIngredient, AdaptedRecipe, IngredientInput, RecipeInput } from "@controllers/AdaptedTypes"
import { Id } from "@domain/utilities/types/Id"
import { FormContainer } from "@infra/ui/styles/formStyles"
import React from "react"
import ConfirmDeleteForm from "./ConfirmDeleteForm"
import IngredientForm from "./IngredientForm"
import RecipeForm from "./RecipeForm"

type FormProps = {
  variant: "IngredientCreation",
  events: {
    submitEvent: (ingredientInput: IngredientInput) => Promise<void>
  }
} | {
  variant: "IngredientUpdate",
  ingredient: AdaptedIngredient
  events: {
    submitEvent: (adaptedIngredient: AdaptedIngredient) => Promise<void>
  }
} | {
  variant: "IngredientDeletion",
  id: Id,
  events: {
    confirmEvent: (id: Id) => Promise<void>
    cancelEvent: () => void
  }
} | {
  variant: "RecipeCreation",
  data: {
    loading: true
  } | {
    loading: false
    ingredients: AdaptedIngredient[]
  }
  events: {
    submitEvent: (recipeInput: RecipeInput) => Promise<void>
  }
} | {
  variant: "RecipeUpdate",
  data: {
    loading: true
  } | {
    loading: false
    ingredients: AdaptedIngredient[]
  }
  recipe: AdaptedRecipe
  events: {
    submitEvent: (adaptedRecipe: AdaptedRecipe) => Promise<void>
  }
} | {
  variant: "RecipeDeletion",
  id: Id,
  events: {
    confirmEvent: (id: Id) => Promise<void>
    cancelEvent: () => void
  }
}

export default function Form(props: FormProps) {
  switch (props.variant) {
  case "IngredientCreation":
    return <IngredientForm
      variant="Create"
      events={props.events}
    />
  case "IngredientUpdate":
    return <IngredientForm
      variant="Update"
      ingredient={props.ingredient}
      events={props.events}
    />
  case "IngredientDeletion":
    return <ConfirmDeleteForm
      variant="Ingredient"
      events={props.events}
      id={props.id}
    />
  case "RecipeCreation":
    return <RecipeForm
      variant="Create"
      data={props.data.loading
        ? { loading: true }
        : { loading: false, ingredients: props.data.ingredients }
      }
      events={props.events}
    />
  case "RecipeUpdate":
    return <FormContainer />
  case "RecipeDeletion":
    return <FormContainer />
  }
}