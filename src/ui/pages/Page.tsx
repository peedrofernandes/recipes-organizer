import React, { useContext, useMemo } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import { Grid, GridItem } from "../components/MaterialGrid";
import PageLayout from "./PageLayout";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import { Ingredient, Recipe } from "../types/Data";
import { ModalContext } from "../context/ModalContext";

const Title = styled.h1`
  padding: 24px 0;
  text-align: center;
`

type PageProps = {
  variant: "Help";
} | {
  variant: "Ingredients";
  ingredients: Ingredient[];
} | {
  variant: "Recipes";
  recipes: Recipe[];
}

export default function Page(props: PageProps) {
  const { variant } = props;

  const { currentModal, setModal } = useContext(ModalContext);

  const events = useMemo(() => ({
    ingredientEvents: {
      handleCreateClick: () => setModal({ name: "CreateIngredient" }),
      handleEditClick: (id: number | string) => setModal({ name: "UpdateIngredient", id }),
      handleDeleteClick: (id: number | string) => setModal({ name: "ConfirmIngredientDelete", id })
    },
    recipeEvents: {
      handleCreateClick: () => setModal({ name: "CreateRecipe" }),
      handleEditClick: (id: number | string) => setModal({ name: "UpdateRecipe", id }),
      handleDeleteClick: (id: number | string) => setModal({ name: "ConfirmRecipeDelete", id })
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
        handleCreateClick, handleEditClick, handleDeleteClick
      } = events.ingredientEvents;

      return (
        <PageLayout>
          <Title>Ingredientes</Title>
          
          <Grid>

            {props.ingredients.map((ingredient) => {
              return (
                <GridItem span={4}>
                  <Card
                    variant="Ingredient"
                    ingredient={ingredient}
                    events={{ handleEditClick, handleDeleteClick }}
                  />
                </GridItem>
              )
            })}
            
          <GridItem span={4}>
            <Card
              variant="CreateIngredient"
              events={{ handleCreateClick }}
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
            {props.recipes.map((recipe) => {

              return (
                <GridItem span={4}>
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