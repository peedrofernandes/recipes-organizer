import React from "react";
import styled from "styled-components";
import Card from "../components/Card";
import { Grid, GridItem } from "../components/MaterialGrid";
import PageLayout from "./PageLayout";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import { Ingredient, Recipe } from "../types/Data";

const Title = styled.h1`
  padding: 24px 0;
  text-align: center;
`

type PageProps = {
  variant: "Help";
} | {
  variant: "Ingredients";
  ingredients: Ingredient[];
  events: {
    handleEditClick: (id: number | string) => void;
    handleDeleteClick: (id: number | string) => void;
    handleCreateClick: () => void;
  }
} | {
  variant: "Recipes";
  recipes: Recipe[];
  events: {
    handleEditClick: (id: number | string) => void;
    handleDeleteClick: (id: number | string) => void;
    handleCreateClick: () => void;
  }
}

export default function Page(props: PageProps) {
  const { variant } = props;

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

            {props.ingredients.map((ingredient) => {
              return (
                <GridItem span={4}>
                  <Card
                    variant="Ingredient"
                    ingredient={ingredient}
                    events={props.events}
                  />
                </GridItem>
              )
            })}
            
          <GridItem span={4}>
            <Card
              variant="CreateIngredient"
              events={props.events}
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
                    events={props.events}
                  />
                </GridItem>
              )
            })}
            <GridItem span={4}>
              <Card variant="CreateRecipe" events={props.events} />
            </GridItem>
          </Grid>
        </PageLayout>
      )
    }
  }
}