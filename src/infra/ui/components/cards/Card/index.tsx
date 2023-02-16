import { AdaptedIngredient, AdaptedRecipe } from "@controllers/AdaptedTypes"
import useDataContext from "@infra/ui/hooks/useDataContext"
import useEvents from "@infra/ui/hooks/useEvents"
import React from "react"

import CreateIngredientCard from "../CreateIngredientCard"
import CreateRecipeCard from "../CreateRecipeCard"
import IngredientCard from "../IngredientCard"
import IngredientSelectionCard from "../IngredientSelectionCard"
import LoadingCard from "../LoadingCard"
import RecipeCard from "../RecipeCard"

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
} | ({
  variant: "IngredientSelection"
} & React.ComponentPropsWithoutRef<typeof IngredientSelectionCard>);

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

  const { data } = useDataContext()

  switch (props.variant) {
  case "Ingredient":
    return <IngredientCard
      ingredient={props.ingredient}
      events={{
        updateEvent: updateIngredientRequest,
        deleteEvent: deleteIngredientRequest
      }}
      loadingUpdate={data.loading.updateIngredient === props.ingredient.id}
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
      loadingUpdate={data.loading.updateRecipe === props.recipe.id}
    />
  case "CreateRecipe":
    return <CreateRecipeCard
      events={{ createEvent: createRecipeRequest }}
    />
  case "IngredientSelection":
    return <IngredientSelectionCard
      {...props}
    />
  case "Loading":
    return <LoadingCard />
  }
}