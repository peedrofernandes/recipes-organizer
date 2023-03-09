import React, { Suspense, useEffect } from "react"
import useDataContext from "../../hooks/useDataContext"
import useEvents from "../../hooks/useEvents"
import styled from "styled-components"
import Icon from "@infra/ui/components/Icon"
import PageLayout from "../PageLayout"
import PDFDocument from "@infra/ui/components/PDF"
import RecipesPage from "../RecipesPage"
import IngredientsPage from "../IngredientsPage"
import HelpPage from "../HelpPage"

// const PDFDocument = React.lazy(() => import("../../components/PDF"))
// const IngredientsPage = React.lazy(() => import("../IngredientsPage"))
// const RecipesPage = React.lazy(() => import("../RecipesPage"))
// const HelpPage = React.lazy(() => import("../HelpPage"))

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
  variant: "Help" | "Ingredients" | "Recipes" | "PDF"
}

export function Page(props: PageProps) {
  const { variant } = props
  const { data } = useDataContext()
  const { generatePdfRequest, loadFromJsonRequest, saveToJson } = useEvents()

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
  case "PDF": {
    result = <PDFDocument />
    break
  }
  }

  return (
    <PageLayout>{result}</PageLayout>
  )
  // return (
  //   <Suspense fallback={(
  //     <PageLayout>
  //       <LoadingPage />
  //     </PageLayout>
  //   )}>
  //     <PageLayout>
  //       {result}
  //     </PageLayout>
  //   </Suspense>
  // )
}