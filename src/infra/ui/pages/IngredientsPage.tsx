import { AdaptedIngredient } from "@controllers/AdaptedTypes"
import React from "react"
import Card from "../components/cards/Card"
import { Grid, GridItem } from "../components/MaterialGrid"
import { Title } from "../components/styles"
import PageLayout from "./PageLayout"

type IngredientPageProps = {
  ingredients: AdaptedIngredient[]
  fetchIngredientsLoading: boolean
  createIngredientLoading: boolean
}

export default function IngredientsPage(props: IngredientPageProps) {
  return (
    <PageLayout>
      <Grid>
        <GridItem rSpan={{ xs: 4, sm: 8, md: 12, lg: 12, xl: 12 }}>
          <Title variant={1} as="h1">Ingredientes</Title>
        </GridItem>
 

        {props.fetchIngredientsLoading ? (
          <GridItem span={4}>
            <Card variant="Skeleton"/>
          </GridItem>
        ) : (
          <>
            {props.ingredients.map((ingredient) => {
              return (
                <GridItem span={4} key={ingredient.id}>
                  <Card
                    variant="Ingredient"
                    ingredient={ingredient}
                  />
                </GridItem>
              )
            })}

            {props.createIngredientLoading && (
              <GridItem span={4}>
                <Card variant="Loading" />
              </GridItem>
            )}

            <GridItem span={4}>
              <Card
                variant="CreateIngredient"
              />
            </GridItem>
          </>
        )}

      </Grid>
    </PageLayout>
  )
}