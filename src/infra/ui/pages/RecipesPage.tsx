import { AdaptedRecipe } from "@controllers/AdaptedTypes"
import React from "react"
import Actions from "../components/actions/Actions"
import Card from "../components/cards/Card"
import { Grid, GridItem } from "../components/Grid"
import { Title } from "../components/styles"
import useDataContext from "../hooks/useDataContext"
import useEvents from "../hooks/useEvents"
import useViewportTracker from "../hooks/useViewportTracker"
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
  const viewportState = useViewportTracker()

  const { generatePdfRequest, loadFromJsonRequest, saveToJson } = useEvents()
  const { data } = useDataContext()

  return (
    <PageLayout>

      <Grid>
        <GridItem rSpan={{ xs: 4, sm: 8, md: 12, lg: 12, xl: 12 }} style={{ padding: "60px 0"}}>
          <Title variant={1} as="h1">Receitas</Title>
        </GridItem>
        {viewportState.md && (
          <GridItem rSpan={{ xs: 4, sm: 8, md: 12, lg: 12, xl: 12 }}>
            <Actions variant="Desktop"
              events={{
                generatePdfRequestOnClick: generatePdfRequest,
                loadFromJsonRequestOnClick: loadFromJsonRequest,
                saveToJsonOnClick:
                  () => saveToJson([data.recipes, data.ingredients])
              }}
            />
          </GridItem>
        )}
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
      </Grid>
    </PageLayout>
  )
}