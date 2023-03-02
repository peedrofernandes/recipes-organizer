import { AdaptedIngredient } from "@controllers/AdaptedTypes"
import IngredientController from "@controllers/IngredientController"
import { Id } from "@domain/utilities/types/Id"
import IngredientRepository from "../repositories/IngredientRepository"
import services from "../common/services"

export default function implementIngredientController(
  updateUIOnCreate: (ingredient: AdaptedIngredient) => void,
  updateUIOnUpdate: (ingredient: AdaptedIngredient) => void,
  updateUIOnDelete: (id: Id) => void
) {
  const ingredientRepository = new IngredientRepository()
  const uiCallbacks = {
    updateUIOnCreate, updateUIOnUpdate, updateUIOnDelete
  }

  const ingredientController = new IngredientController(
    ingredientRepository,
    uiCallbacks,
    services
  )

  return ingredientController
}