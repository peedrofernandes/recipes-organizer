import React, { useContext, useMemo } from "react"
import styled from "styled-components"
import Card from "../components/cards/_Card"
import { Grid, GridItem } from "../components/MaterialGrid"
import PageLayout from "./PageLayout"
import { Link } from "react-router-dom"
import Button from "../components/buttons/_Button"
import { Id } from "@domain/utilities/types/Id"
import { DataContext } from "../context/DataContext"
import { FormContext } from "../context/FormContext"
import { AdaptedIngredient, AdaptedRecipe } from "@controllers/AdaptedTypes"

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

  const { data } = useContext(DataContext)
  const { setForm } = useContext(FormContext)

  const events = useMemo(() => ({
    ingredientEvents: {
      createEvent: () => setForm({ variant: "IngredientCreation" }),
      updateEvent: (adaptedIngredient: AdaptedIngredient) =>
        setForm({ variant: "IngredientUpdate", ingredient: adaptedIngredient }),
      deleteEvent: (id: Id) => setForm({ variant: "IngredientDeletion", id })
    },
    recipeEvents: {
      createEvent: () => setForm({ variant: "RecipeCreation" }),
      updateEvent: (adaptedRecipe: AdaptedRecipe) =>
        setForm({ variant: "RecipeUpdate", recipe: adaptedRecipe }),
      deleteEvent: (id: Id) => setForm({ variant: "RecipeDeletion", id })
    }
  }), [])

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
    const {
      createEvent,
      updateEvent,
      deleteEvent
    } = events.ingredientEvents

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
                  events={{ updateEvent, deleteEvent }}
                />
              </GridItem>
            )
          })}

          <GridItem span={4}>
            <Card
              variant="CreateIngredient"
              events={{ createEvent }}
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
                  events={events.recipeEvents}
                />
              </GridItem>
            )
          })}
          <GridItem span={4}>
            <Card variant="CreateRecipe" events={events.recipeEvents} />
          </GridItem>
        </Grid>
      </PageLayout>
    )
  }
  }
}