import { AdaptedIngredient } from "@controllers/AdaptedTypes"
import React from "react"
import Card from "../components/cards/Card"
import { GridItem } from "../components/MaterialGrid"
import PageLayout from "./PageLayout"

type IngredientPageProps = {
  ingredients: AdaptedIngredient[]
  fetchIngredientsLoading: boolean
  createIngredientLoading: boolean
}

export default function IngredientsPage(props: IngredientPageProps) {
  return (
    <PageLayout title="Ingredientes">

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
    </PageLayout>
  )
}