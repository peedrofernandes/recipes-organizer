import React from "react"
import styled from "styled-components"
import Card from "../components/cards/_Card"
import { Grid, GridItem } from "../components/MaterialGrid"
import PageLayout from "./PageLayout"
import { Link } from "react-router-dom"
import Button from "../components/buttons/_Button"
import useDataContext from "../hooks/useDataContext"

const Title = styled.h1`
  padding: 24px 0;
  text-align: center;
`

type PageProps = {
  variant: "Help";
} | {
  variant: "Ingredients";
} | {
  variant: "Recipes";
}

export default function Page(props: PageProps) {
  const { variant } = props
  const { data } = useDataContext()

  switch (variant) {
  case "Help": {
    return (
      <PageLayout>
        <h1>Start page</h1>
        <Link to="/recipes">
          <Button variant="styled" text="Go to dashboard" />
        </Link>
      </PageLayout>
    )
  }
  case "Ingredients": {
    return (
      <PageLayout>
        <Title>Ingredientes</Title>

        <Grid>

          {data.ingredients.map((ingredient) => {
            return (
              <GridItem span={4} key={ingredient.id}>
                <Card
                  variant="Ingredient"
                  ingredient={ingredient}
                />
              </GridItem>
            )
          })}

          {data.loading.createIngredient && (
            <GridItem span={4}>
              <Card variant="Loading" />
            </GridItem>
          )}

          <GridItem span={4}>
            <Card
              variant="CreateIngredient"
            />
          </GridItem>


        </Grid>
      </PageLayout>
    )
  }

  case "Recipes": {

    return (
      <PageLayout>
        <Title>Receitas</Title>
        <Grid>

          {data.recipes.map((recipe) => {

            return (
              <GridItem span={4} key={recipe.id}>
                <Card
                  variant="Recipe"
                  recipe={recipe}
                />
              </GridItem>
            )
          })}

          {data.loading.createRecipe && (
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
  }
}