import { AdaptedRecipe } from "@controllers/AdaptedTypes"
import React from "react"
import Card from "../components/cards/Card"
import { GridItem } from "../components/MaterialGrid"
import PageLayout from "./PageLayout"

type RecipesPageProps = {
  recipes: AdaptedRecipe[]
  fetchRecipesLoading: boolean
  createRecipesLoading: boolean
  events: {
    generatePdfRequest: () => void
    saveInJson: () => void
    loadFromJsonRequest: () => void
  }
}

export default function RecipesPage(props: RecipesPageProps) {
  return (
    <PageLayout title="Receitas">

      {props.fetchRecipesLoading && (
        <GridItem span={4}>
          <Card variant="Skeleton"/>
        </GridItem>
      )}

      {props.recipes.map((recipe) => (
        <GridItem span={4} key={recipe.id}>
          <Card
            variant="Recipe"
            recipe={recipe}
          />
        </GridItem>
      )
      )}

      {props.createRecipesLoading && (
        <GridItem span={4}>
          <Card variant="Loading" />
        </GridItem>
      )}

      <GridItem span={4}>
        <Card variant="CreateRecipe" />
      </GridItem>
    </PageLayout>
  )
}