import { AdaptedIngredient, AdaptedRecipe } from "@controllers/AdaptedTypes"
import ingredientHandler from "@infra/handlers/IngredientHandler"
import recipeHandler from "@infra/handlers/RecipeHandler"
import useDataContext from "./useDataContext"

export default function  useControllers() {
  const { dispatch } = useDataContext()

  const ingredientController = ingredientHandler(
    // Update UI on Create
    (ingredient: AdaptedIngredient) => dispatch({
      type: "ADD_INGREDIENT", payload: { ingredient }
    }),
    // Update UI on Update
    (ingredient: AdaptedIngredient) => dispatch({
      type: "UPDATE_INGREDIENT", payload: { ingredient }
    }),
    // Update UI on Delete
    (id: string) => dispatch({
      type: "DELETE_INGREDIENT", payload: { id }
    })
  )

  const recipeController = recipeHandler(
    // Update UI on Create
    (recipe: AdaptedRecipe) => dispatch({
      type: "ADD_RECIPE", payload: { recipe }
    }),
    // Update UI on Update
    (recipe: AdaptedRecipe) => dispatch({
      type: "UPDATE_RECIPE", payload: { recipe }
    }),
    // Update UI on Delete
    (id: string) => dispatch({
      type: "DELETE_RECIPE", payload: { id }
    }),
    // Update UI on Load
    (newData: [AdaptedIngredient[], AdaptedRecipe[]]) => dispatch({
      type: "ADD_DATA",
      payload: { ingredients: newData[0], recipes: newData[1] }
    })
  )

  return { ingredientController, recipeController }
}