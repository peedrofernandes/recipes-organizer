import { useEffect } from "react"
import useControllers from "./useControllers"
import useDataContext from "./useDataContext"

export default function useLoadData() {
  const { dispatch } = useDataContext()
  const { ingredientController, recipeController } = useControllers()

  useEffect(() => {
    const fetchIngredients = async () => {
      dispatch({ type: "LOADING_FETCH_INGREDIENTS" })
      const ingredients = await ingredientController.getAllIngredients()
      dispatch({ type: "SET_INGREDIENTS", payload: { ingredients }})
    }
    const fetchRecipes = async () => {
      dispatch({ type: "LOADING_FETCH_RECIPES"})
      const recipes = await recipeController.getAllRecipes()
      dispatch({ type: "SET_RECIPES", payload: { recipes }})
    }

    fetchIngredients()
    fetchRecipes()
  }, [])
}