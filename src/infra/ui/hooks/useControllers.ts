import { AdaptedIngredient, AdaptedRecipe } from "@controllers/AdaptedTypes"
import implementIngredientController from "@infra/implementers/implementIngredientController"
import implementRecipeController from "@infra/implementers/implementRecipeController"
import useDataContext from "./useDataContext"

export default function  useControllers() {
  const { dispatch } = useDataContext()

  const ingredientController = implementIngredientController(
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

  const recipeController = implementRecipeController(
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
    (newData: [AdaptedRecipe[], AdaptedIngredient[]]) => dispatch({
      type: "ADD_DATA",
      payload: { recipes: newData[0], ingredients: newData[1] }
    })
  )

  return { ingredientController, recipeController }
}