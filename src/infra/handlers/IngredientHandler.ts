import { AdaptedIngredient } from "@controllers/AdaptedTypes"
import IngredientController from "@controllers/IngredientController"
import { Id } from "@domain/utilities/types/Id"
import IngredientRepository from "./IngredientRepository"
import services from "./services"

export default function ingredientHandler(
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