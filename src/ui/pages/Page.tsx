import React from "react";
import styled from "styled-components";

import recipes from "../data";

import { AtLeastOne } from "../../types/AtLeastOne";

import Card from "../components/Card";
import { Grid, GridItem } from "../components/MaterialGrid";
import PageLayout from "./PageLayout";
import { Link } from "react-router-dom";
import Button from "../components/Button";

const Title = styled.h1`
  padding: 24px 0;
  text-align: center;
`

type PageProps = {
  variant: "Help",
} | {
  variant: "Ingredients",
  ingredients: {
    id: number | string;
    name: string;
    macros?: {
      proteins: number;
      carbs: number;
      fats: number;
      gramsPerServing: number;
    },
    options?: AtLeastOne<{
      description: string;
      imageUrl: string;
    }>
  }[]
} | {
  variant: "Recipes"
  recipes: {
    id: number | string;
    name: string;
    type: "Week" | "Weekend" | "Both";
    macros?: {
      proteins: number;
      carbs: number;
      fats: number;
      totalGrams: number;
    }
    idIngredients: (number | string)[];
    options?: AtLeastOne<{
      description: string;
      imageUrl: string;
    }>
  }[]
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

            {recipes.map((recipe) => {
              const { name, type, options } = recipe;
              return (
                <GridItem span={4}>
                  <Card />
                </GridItem>
              )
            })}
            
          <GridItem span={4}>
            <Card status="inactive" />
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
            {recipes.map((recipe) => {
              const events = {
                handleDeleteClick: () => { },
                handleUpdateClick: () => { }
              }

              return (
                <GridItem span={4}>
                  <Card variant="Recipe" {...recipe} events={events} />
                </GridItem>
              )
            })}
            <GridItem span={4}>
              <Card variant="CreateRecipe" />
            </GridItem>
          </Grid>
        </PageLayout>
      )
    }
  }
}