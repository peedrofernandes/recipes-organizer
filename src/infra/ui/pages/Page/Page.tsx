import React, { useEffect } from "react"
import useDataContext from "../../hooks/useDataContext"
import useEvents from "../../hooks/useEvents"
import PDFDocument from "../../components/PDF"
import IngredientsPage from "../IngredientsPage"
import RecipesPage from "../RecipesPage"
import HelpPage from "../HelpPage"

type PageProps = {
  variant: "Help" | "Ingredients" | "Recipes" | "PDF"
}

export function Page(props: PageProps) {
  const { variant } = props
  const { data } = useDataContext()
  const { generatePdfRequest } = useEvents()

  useEffect(() => {
    console.log("Selected recipes updated: " + data.selectedRecipes)
  }, [data.selectedRecipes])

  switch (variant) {
  case "Help": {
    return <HelpPage />
  }
  case "Ingredients": {
    return <IngredientsPage
      ingredients={data.ingredients}
      createIngredientLoading={data.loading.createIngredient}
      fetchIngredientsLoading={data.loading.fetchIngredients}
    />
  }

  case "Recipes": {
    return <RecipesPage
      recipes={data.recipes}
      createRecipesLoading={data.loading.createRecipe}
      fetchRecipesLoading={data.loading.fetchRecipes}
      events={{ generatePdfRequest }}
    />
  }
  case "PDF": {
    return <PDFDocument />
  }
  }
}