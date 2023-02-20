import { AdaptedRecipe } from "@controllers/AdaptedTypes"
import React from "react"
import Button from "../components/buttons/Button"
import Card from "../components/cards/Card"
import { Grid, GridItem } from "../components/MaterialGrid"
import { Title } from "../components/styles"
import PageLayout from "./PageLayout"

type RecipesPageProps = {
  recipes: AdaptedRecipe[]
  fetchRecipesLoading: boolean
  createRecipesLoading: boolean
  events: { generatePdfRequest: () => void }
}

export default function RecipesPage(props: RecipesPageProps) {
  return (
    <PageLayout>
      <Title variant={1} as="h1">Receitas</Title>
      <Grid>

        <GridItem rSpan={{xs: 4, sm: 8, md: 12, lg: 12, xl: 12}}>
          <h1>Content</h1>
          <Button
            variant="styled"
            text="Gerar PDF"
            onClick={() => props.events.generatePdfRequest()}
          />
        </GridItem>

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