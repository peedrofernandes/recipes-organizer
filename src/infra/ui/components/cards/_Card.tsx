import { AdaptedIngredient, AdaptedRecipe } from "@controllers/AdaptedTypes"
import { Id } from "@domain/utilities/types/Id"
import { Values } from "@domain/utilities/types/Values"
import React from "react"

import CreateIngredientCard from "./CreateIngredientCard"
import CreateRecipeCard from "./CreateRecipeCard"
import IngredientCard from "./IngredientCard"
import RecipeCard from "./RecipeCard"

// --------- Visual Elements ----------

// ----------- Type Options -----------

type CardProps = {
  variant: "Ingredient";
  ingredient: AdaptedIngredient;
  events: {
    updateEvent: (id: Id, currentValues: Values<AdaptedIngredient>) => void;
    deleteEvent: (id: Id) => void;
  }
} | {
  variant: "Recipe";
  recipe: AdaptedRecipe;
  events: {
    updateEvent: (id: Id, currentValues: Values<AdaptedRecipe>) => void;
    deleteEvent: (id: Id) => void;
  }
} | {
  variant: "CreateRecipe";
  events: {
    createEvent: () => void;
  }
} | {
  variant: "CreateIngredient";
  events: {
    createEvent: () => void;
  }
};

// ------------------------------------

export default function Card(props: CardProps) {
  switch (props.variant) {
  case "Ingredient":
    return <IngredientCard ingredient={props.ingredient} events={props.events} />
  case "CreateIngredient":
    return <CreateIngredientCard events={props.events} />
  case "Recipe":
    return <RecipeCard recipe={props.recipe} events={props.events} />
  case "CreateRecipe":
    return <CreateRecipeCard events={props.events} />
  }
}