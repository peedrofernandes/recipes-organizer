import { AdaptedIngredient, AdaptedRecipe, IngredientInput, RecipeInput } from "@controllers/AdaptedTypes"
import { Id } from "@domain/utilities/types/Id"
import { useMemo } from "react"
import useControllers from "./useControllers"
import useDataContext from "./useDataContext"
import useFormContext from "./useFormContext"

export default function useEvents() {
  const { setForm } = useFormContext()
  const { dispatch } = useDataContext()
  const { recipeController, ingredientController } = useControllers()
  

  const events = useMemo(() => ({
    createIngredientRequest: () => setForm({ variant: "IngredientCreation" }),
      
    updateIngredientRequest: (adaptedIngredient: AdaptedIngredient) =>
      setForm({ variant: "IngredientUpdate", ingredient: adaptedIngredient }),
      
    deleteIngredientRequest: (id: Id) => setForm({ variant: "IngredientDeletion", id }),

    createRecipeRequest: () => setForm({ variant: "RecipeCreation" }),

    updateRecipeRequest: (adaptedRecipe: AdaptedRecipe) =>
      setForm({ variant: "RecipeUpdate", recipe: adaptedRecipe }),
      
    deleteRecipeRequest: (id: Id) => setForm({ variant: "RecipeDeletion", id }),

    generatePDFRequest: () => setForm({ variant: "PDFGeneration" }),

    cancelRequest: () => setForm({ variant: null }),

    createIngredient: async (ingredientInput: IngredientInput) => {
      dispatch({ type: "LOADING_CREATE_INGREDIENT"})
      setForm({ variant: null })
      await ingredientController.createIngredient(ingredientInput)
    },

    updateIngredient: async (input: IngredientInput, id: Id) => {
      dispatch({ type: "LOADING_UPDATE_INGREDIENT", payload: { id }})
      setForm({ variant: null })
      await ingredientController.updateIngredient(input, id)
    },

    deleteIngredient: async (id: string) => {
      dispatch({ type: "LOADING_DELETE_INGREDIENT"})
      setForm({ variant: null })
      await ingredientController.deleteIngredient(id)
    },

    createRecipe: async (recipeInput: RecipeInput) => {
      dispatch({ type: "LOADING_CREATE_RECIPE" })
      setForm({ variant: null })
      await recipeController.createRecipe(recipeInput)
    },

    updateRecipe: async (input: RecipeInput, id: Id) => {
      dispatch({ type: "LOADING_UPDATE_RECIPE", payload: { id }})
      setForm({ variant: null })
      await recipeController.updateRecipe(input, id)
    },

    deleteRecipe: async (id: string) => {
      dispatch({ type: "LOADING_DELETE_RECIPE"})
      setForm({ variant: null })
      await recipeController.deleteRecipe(id)
    },

    randomizeRecipes: async (adaptedRecipes: AdaptedRecipe[], initialDate: Date) => {
      return recipeController.randomizeRecipes(adaptedRecipes, initialDate)
    },

    generatePDF: async (adaptedRecipesWithDates: [AdaptedRecipe, Date][]) => {
      return recipeController.generatePDF(adaptedRecipesWithDates)
    }
  }), [])

  return events
}