import { AdaptedIngredient, AdaptedRecipe } from "@controllers/AdaptedTypes"
import useEvents from "@infra/ui/hooks/useEvents"
import React from "react"

import CreateIngredientCard from "./CreateIngredientCard"
import CreateRecipeCard from "./CreateRecipeCard"
import IngredientCard from "./IngredientCard"
import LoadingCard from "./LoadingCard"
import RecipeCard from "./RecipeCard"

// --------- Visual Elements ----------

// ----------- Type Options -----------

type CardProps = {
  variant: "Ingredient";
  ingredient: AdaptedIngredient;
} | {
  variant: "Recipe";
  recipe: AdaptedRecipe;
} | {
  variant: "CreateRecipe";
} | {
  variant: "CreateIngredient";
} | {
  variant: "Loading"
};

// ------------------------------------

export default function Card(props: CardProps) {
  const { 
    createIngredientRequest,
    createRecipeRequest,
    updateIngredientRequest,
    updateRecipeRequest,
    deleteIngredientRequest,
    deleteRecipeRequest
  } = useEvents()

  switch (props.variant) {
  case "Ingredient":
    return <IngredientCard
      ingredient={props.ingredient}
      events={{
        updateEvent: updateIngredientRequest,
        deleteEvent: deleteIngredientRequest
      }}
    />
  case "CreateIngredient":
    return <CreateIngredientCard
      events={{ createEvent: createIngredientRequest }}
    />
  case "Recipe":
    return <RecipeCard
      recipe={props.recipe}
      events={{ 
        updateEvent: updateRecipeRequest,
        deleteEvent: deleteRecipeRequest
      }}
    />
  case "CreateRecipe":
    return <CreateRecipeCard
      events={{ createEvent: createRecipeRequest }}
    />
  case "Loading":
    return <LoadingCard />
  }
}