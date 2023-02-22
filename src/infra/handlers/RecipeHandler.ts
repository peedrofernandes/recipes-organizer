import { AdaptedIngredient, AdaptedRecipe } from "@controllers/AdaptedTypes"
import RecipeController from "@controllers/RecipeController"
import { Id } from "@domain/utilities/types/Id"
import IngredientRepository from "./IngredientRepository"
import RecipeRepository from "./RecipeRepository"
import services from "./services"
import useDataContext from "@infra/ui/hooks/useDataContext"


export default function recipeHandler(
  updateUIOnCreate: (recipe: AdaptedRecipe) => void,
  updateUIOnUpdate: (recipe: AdaptedRecipe) => void,
  updateUIOnDelete: (id: Id) => void,
  updateUIOnLoad: (newData: [AdaptedIngredient[], AdaptedRecipe[]]) => void
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

  const turnIntoJsonMethod = (data: [AdaptedRecipe[], AdaptedIngredient[]]) => {
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