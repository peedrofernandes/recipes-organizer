import { AdaptedIngredient } from "@controllers/AdaptedTypes"
import React from "react"
import Actions from "../components/actions/Actions"
import Card from "../components/cards/Card"
import { Grid, GridItem } from "../components/Grid"
import { Title } from "../components/styles"
import useDataContext from "../hooks/useDataContext"
import useEvents from "../hooks/useEvents"
import useViewportTracker from "../hooks/useViewportTracker"
import PageLayout from "./PageLayout"

type IngredientPageProps = {
  ingredients: AdaptedIngredient[]
  fetchIngredientsLoading: boolean
  createIngredientLoading: boolean
}

export default function IngredientsPage(props: IngredientPageProps) {
  const viewportState = useViewportTracker()
  const { generatePdfRequest, loadFromJsonRequest, saveToJson } = useEvents()
  const { data } = useDataContext()

  return (
    <PageLayout>

      <Grid>
        
        <GridItem rSpan={{ xs: 4, sm: 8, md: 12, lg: 12, xl: 12 }} style={{ padding: "60px 0"}}>
          <Title variant={1} as="h1">Ingredientes</Title>
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