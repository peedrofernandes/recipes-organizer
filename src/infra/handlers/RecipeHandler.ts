import ReactDOMServer from "react-dom/server"
import { AdaptedRecipe } from "@controllers/AdaptedTypes"
import { RecipeAdapter } from "@controllers/RecipeAdapter"
import RecipeController from "@controllers/RecipeController"
import { Id } from "@domain/utilities/types/Id"
import Card from "@infra/ui/components/cards/_Card"
import PDFDocument from "@infra/ui/components/PDF"
import React, { useRef } from "react"
import IngredientRepository from "./IngredientRepository"
import RecipeRepository from "./RecipeRepository"
import services from "./services"
export default function recipeHandler(
  updateUIOnCreate: (recipe: AdaptedRecipe) => void,
  updateUIOnUpdate: (recipe: AdaptedRecipe) => void,
  updateUIOnDelete: (id: Id) => void
) {
  const recipeRepository = new RecipeRepository()
  const ingredientRepository = new IngredientRepository()

  const uiCallbacks = { updateUIOnCreate, updateUIOnUpdate, updateUIOnDelete }

  const turnIntoJsonMethod = () => { return }

  const generatePDFMethod = async (recipesWithDates: [AdaptedRecipe, Date][]) => { return }

  const recipeController = new RecipeController(
    recipeRepository,
    ingredientRepository,
    turnIntoJsonMethod,
    generatePDFMethod,
    uiCallbacks,
    services
  )

  return recipeController
}