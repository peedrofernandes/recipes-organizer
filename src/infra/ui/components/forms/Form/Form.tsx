import useDataContext from "@infra/ui/hooks/useDataContext"
import useEvents from "@infra/ui/hooks/useEvents"
import useFormContext from "@infra/ui/hooks/useFormContext"
import React, { Suspense } from "react"

const ConfirmDeleteForm = React.lazy(() => import("../ConfirmDeleteForm"))
const IngredientForm = React.lazy(() => import("../IngredientForm"))
const RecipeForm = React.lazy(() => import("../RecipeForm"))
const PDFGenerationForm = React.lazy(() => import("../PDFGenerationForm"))
const LoadFromFileForm = React.lazy(() => import("../LoadFromFileForm"))

export function Form() {
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
    generatePdf,
    loadFromJson
  } = useEvents()

  const { data } = useDataContext()

  let result: JSX.Element
  switch (form.variant) {
  case "IngredientCreation":
    result = <IngredientForm
      variant="Create"
      events={{ submitEvent: createIngredient }}
    />
    break
  case "IngredientUpdate":
    result = <IngredientForm
      variant="Update"
      ingredient={form.ingredient}
      events={{ submitEvent: updateIngredient }}
    />
    break
  case "RecipeCreation":
    result = <RecipeForm
      variant="Create"
      data={data.loading.fetchIngredients
        ? { loading: true }
        : { loading: false, ingredients: data.ingredients }}
      events={{ submitEvent: createRecipe }}
    />
    break
  case "RecipeUpdate":
    result = <RecipeForm
      variant="Update"
      data={data.loading.fetchIngredients
        ? { loading: true }
        : { loading: false, ingredients: data.ingredients }}
      recipe={form.recipe}
      events={{ submitEvent: updateRecipe }}
    />
    break
  case "IngredientDeletion":
    result = <ConfirmDeleteForm
      variant="Ingredient"
      id={form.id}
      events={{ confirmEvent: deleteIngredient, cancelEvent: cancelRequest }}
    />
    break
  case "RecipeDeletion":
    result = <ConfirmDeleteForm
      variant="Recipe"
      id={form.id}
      events={{ confirmEvent: deleteRecipe, cancelEvent: cancelRequest }}
    />
    break
  case "PDFGeneration":
    result = <PDFGenerationForm
      data={data.loading.fetchRecipes ? {
        loading: true
      } : {
        loading: false,
        recipes: data.recipes
      }}
      events={{ randomize: randomizeRecipes, submitEvent: generatePdf }}
    />
    break
  case "LoadFromFile":
    result = <LoadFromFileForm
      events={{ load: loadFromJson }}
    />
    break
  default:
    return null
  }
  return <Suspense>{result}</Suspense>
}