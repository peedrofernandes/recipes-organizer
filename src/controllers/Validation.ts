import { OptionalValues } from "@domain/utilities/types/Values"
import { AdaptedIngredient, AdaptedRecipe } from "./AdaptedTypes"

export function validateIngredient(
  optionalValues: OptionalValues<AdaptedIngredient>
): void {
  const errorMessages = []

  if (!optionalValues.name)
    errorMessages.push("Ingredient must have a name!")
  
  if (errorMessages.length > 0)
    throw new Error(errorMessages.join(","))
}

export function validateRecipe(
  optionalValues: OptionalValues<AdaptedRecipe>
): void {
  const errorMessages = []

  if (!optionalValues.name)
    errorMessages.push("Recipe must have a name!")
  if (!optionalValues.type)
    errorMessages.push("Recipe must have a type!")
  
  if (errorMessages.length > 0)
    throw new Error(errorMessages.join(","))
}