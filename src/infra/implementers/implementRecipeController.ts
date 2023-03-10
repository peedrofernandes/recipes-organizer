import { AdaptedIngredient, AdaptedRecipe, IngredientRecipe, StoredIngredient, StoredRecipe } from "@controllers/AdaptedTypes"
import RecipeController from "@controllers/RecipeController"
import { Id } from "@domain/utilities/types/Id"
import IngredientRepository from "../repositories/IngredientRepository"
import RecipeRepository from "../repositories/RecipeRepository"
import services from "../common/services"
import useDataContext from "@infra/ui/hooks/useDataContext"
import React from "react"
import PDF from "@infra/ui/components/PDF"
import { pdf } from "@react-pdf/renderer"
import { saveAs } from "file-saver"


export default function implementRecipeController(
  updateUIOnCreate: (recipe: AdaptedRecipe) => void,
  updateUIOnUpdate: (recipe: AdaptedRecipe) => void,
  updateUIOnDelete: (id: Id) => void,
  updateUIOnLoad: (newData: [ AdaptedRecipe[], AdaptedIngredient[]]) => void
) {
  const recipeRepository = new RecipeRepository()
  const ingredientRepository = new IngredientRepository()
  const { dispatch } = useDataContext()

  const uiCallbacks = {
    updateUIOnCreate,
    updateUIOnUpdate,
    updateUIOnDelete,
    updateUIOnLoad
  }

  const turnIntoJsonMethod = (data: [
    StoredRecipe[],
    StoredIngredient[],
    IngredientRecipe[]
  ]) => {
    const jsonFile = new Blob(
      [JSON.stringify(data)], { type: "application/json" }
    )
    
    const a = document.createElement("a")
    a.download = "recipes"
    a.href = window.URL.createObjectURL(jsonFile)

    a.click()
  }

  const generatePDFMethod = async (recipesWithDates: [AdaptedRecipe, Date][]) => {
    dispatch({
      type: "SET_SELECTED_RECIPES_WITH_DATES",
      payload: { recipes: recipesWithDates }
    })

    console.log("Recipes with dates at the IMplementer: ")
    console.log(recipesWithDates)

    const pdfProps = { list: recipesWithDates }
    const PDFElement: React.ReactElement = React.createElement(PDF, pdfProps)

    const blob = await pdf(PDFElement).toBlob()
    saveAs(blob, "Recipes.pdf")
  }

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