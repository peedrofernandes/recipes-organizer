import React, { useEffect } from "react"
import styled from "styled-components"
import Card from "../components/cards/Card"
import { Grid, GridItem } from "../components/MaterialGrid"
import PageLayout from "./PageLayout"
import { Link } from "react-router-dom"
import Button from "../components/buttons/Button"
import useDataContext from "../hooks/useDataContext"
import useEvents from "../hooks/useEvents"
import PDFDocument from "../components/PDF"

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
} | {
  variant: "PDF"
}

export default function Page(props: PageProps) {
  const { variant } = props
  const { data } = useDataContext()
  const { generatePDFRequest } = useEvents()

  useEffect(() => {
    console.log("Selected recipes updated: " + data.selectedRecipes)
  }, [data.selectedRecipes])

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

          <GridItem rSpan={{xs: 4, sm: 8, md: 12, lg: 12, xl: 12}}>
            <h1>Content</h1>
            <Button
              variant="styled"
              text="Gerar PDF"
              onClick={() => generatePDFRequest()}
            />
          </GridItem>

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
  case "PDF": {
    return <PDFDocument />
  }
  }
}