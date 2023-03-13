import React, { Suspense, useEffect } from "react"
import useDataContext from "../../hooks/useDataContext"
import useEvents from "../../hooks/useEvents"
import styled from "styled-components"
import PageLayout from "../PageLayout"
import Icon from "@infra/ui/components/icons/Icon"
import { useNavigate } from "react-router"

const IngredientsPage = React.lazy(() => import("../IngredientsPage"))
const RecipesPage = React.lazy(() => import("../RecipesPage"))
const HelpPage = React.lazy(() => import("../HelpPage"))

const LoadingContainer = styled.div`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;

  > * {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`

const LoadingPage = () => {
  return (
    <LoadingContainer>
      <Icon variant="Spinner"/>
    </LoadingContainer>
  )
}

type PageProps = {
  variant: "Help" | "Ingredients" | "Recipes"
}

export function Page(props: PageProps) {

  const navigate = useNavigate()
  const { variant } = props
  const { data } = useDataContext()
  const { generatePdfRequest, loadFromJsonRequest, saveToJson } = useEvents()

  if (data.passedTutorial && variant === "Help")
    navigate("/recipes")

  useEffect(() => {
    console.log("Selected recipes updated: " + data.selectedRecipes)
  }, [data.selectedRecipes])

  let result: JSX.Element
  switch (variant) {
  case "Help": {
    result = <HelpPage />
    break
  }
  case "Ingredients": {
    result = <IngredientsPage
      ingredients={data.ingredients}
      createIngredientLoading={data.loading.createIngredient}
      fetchIngredientsLoading={data.loading.fetchIngredients}
    />
    break
  }

  case "Recipes": {
    result = <RecipesPage
      recipes={data.recipes}
      createRecipesLoading={data.loading.createRecipe}
      fetchRecipesLoading={data.loading.fetchRecipes}
      events={{
        generatePdfRequest,
        loadFromJsonRequest,
        saveInJson: () => saveToJson([data.recipes, data.ingredients])
      }}
    />
    break
  }
  // case "PDF": {
  //   result = <PDFDocument />
  //   break
  // }
  }

  return (
    <Suspense fallback={(
      <PageLayout>
        <LoadingPage />
      </PageLayout>
    )}>
      <PageLayout>
        {result}
      </PageLayout>
    </Suspense>
  )
}