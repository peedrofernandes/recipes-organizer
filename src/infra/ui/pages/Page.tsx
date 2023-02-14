import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import Card from "../components/cards/_Card"
import { Grid, GridItem } from "../components/MaterialGrid"
import PageLayout from "./PageLayout"
import { Link } from "react-router-dom"
import Button from "../components/buttons/_Button"
import useDataContext from "../hooks/useDataContext"
import useEvents from "../hooks/useEvents"
import services from "@infra/handlers/services"
import PDFDocument from "../components/PDF"
import { AdaptedRecipe } from "@controllers/AdaptedTypes"

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
  const { generatePDF } = useEvents()

  const [recipeList, setRecipeList] = useState<[AdaptedRecipe, Date][]>([])

  useEffect(() => {
    setRecipeList(data.recipes.map(r => [r, new Date()]))
  }, [data.recipes])

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
              onClick={() => generatePDF(data.recipes.map(r => [r, new Date()]))}
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
    return <PDFDocument list={recipeList} />
  }
  }
}