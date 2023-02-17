import useDataContext from "@infra/ui/hooks/useDataContext"
import useEvents from "@infra/ui/hooks/useEvents"
import useFormContext from "@infra/ui/hooks/useFormContext"
import React from "react"
import ConfirmDeleteForm from "../ConfirmDeleteForm"
import IngredientForm from "../IngredientForm"
import RecipeForm from "../RecipeForm"
import PDFGenerationForm from "../PDFGenerationForm"

export default function Form() {
  const { form } = useFormContext()
  
  const {
    createIngredient,
    updateIngredient,
    createRecipe,
    updateRecipe,
    deleteIngredient,
    deleteRecipe,
    cancelRequest,
    randomizeRecipes,
    generatePDF
  } = useEvents()

  const { data } = useDataContext()

  switch (form.variant) {
  case "IngredientCreation":
    return <IngredientForm
      variant="Create"
      events={{ submitEvent: createIngredient }}
    />
  case "IngredientUpdate":
    return <IngredientForm
      variant="Update"
      ingredient={form.ingredient}
      events={{ submitEvent: updateIngredient }}
    />
  case "RecipeCreation":
    return <RecipeForm
      variant="Create"
      data={data.loading.fetchIngredients
        ? { loading: true }
        : { loading: false, ingredients: data.ingredients }}
      events={{ submitEvent: createRecipe }}
    />
  case "RecipeUpdate":
    return <RecipeForm
      variant="Update"
      data={data.loading.fetchIngredients
        ? { loading: true }
        : { loading: false, ingredients: data.ingredients }}
      recipe={form.recipe}
      events={{ submitEvent: updateRecipe }}
    />
  case "IngredientDeletion":
    return <ConfirmDeleteForm
      variant="Ingredient"
      id={form.id}
      events={{ confirmEvent: deleteIngredient, cancelEvent: cancelRequest }}
    />
  case "RecipeDeletion":
    return <ConfirmDeleteForm
      variant="Recipe"
      id={form.id}
      events={{ confirmEvent: deleteRecipe, cancelEvent: cancelRequest }}
    />
  case "PDFGeneration":
    return <PDFGenerationForm
      data={data.loading.fetchRecipes ? {
        loading: true 
      } : {
        loading: false,
        recipes: data.recipes
      }}
      events={{ randomize: randomizeRecipes, submitEvent: generatePDF }}
    />
  default:
    return null
  }
}