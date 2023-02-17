import { AdaptedRecipe } from "@controllers/AdaptedTypes"
import RecipeController from "@controllers/RecipeController"
import { Id } from "@domain/utilities/types/Id"
import IngredientRepository from "./IngredientRepository"
import RecipeRepository from "./RecipeRepository"
import services from "./services"
import useDataContext from "@infra/ui/hooks/useDataContext"


export default function recipeHandler(
  updateUIOnCreate: (recipe: AdaptedRecipe) => void,
  updateUIOnUpdate: (recipe: AdaptedRecipe) => void,
  updateUIOnDelete: (id: Id) => void
) {
  const recipeRepository = new RecipeRepository()
  const ingredientRepository = new IngredientRepository()
  const { dispatch } = useDataContext()

  const uiCallbacks = { updateUIOnCreate, updateUIOnUpdate, updateUIOnDelete }

  const turnIntoJsonMethod = () => { return }

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