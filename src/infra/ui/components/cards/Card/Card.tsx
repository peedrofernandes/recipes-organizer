import { AdaptedIngredient, AdaptedRecipe } from "@controllers/AdaptedTypes"
import useDataContext from "@infra/ui/hooks/useDataContext"
import useEvents from "@infra/ui/hooks/useEvents"
import React, { Suspense } from "react"

const CreateIngredientCard = React.lazy(() => import("../CreateIngredientCard"))
const CreateRecipeCard = React.lazy(() => import("../CreateRecipeCard"))
const EntryCard = React.lazy(() => import("../EntryCard"))
const IngredientCard = React.lazy(() => import("../IngredientCard"))
const IngredientSelectionCard = React.lazy(() => import("../IngredientSelectionCard"))
const LoadingCard = React.lazy(() => import("../LoadingCard"))
const RecipeCard = React.lazy(() => import("../RecipeCard"))
const RecipeSelectionCard = React.lazy(() => import("../RecipeSelectionCard"))
const SkeletonCard = React.lazy(() => import("../SkeletonCard"))
const TutorialCard = React.lazy(() => import("../TutorialCard"))

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
} & React.ComponentPropsWithoutRef<typeof IngredientSelectionCard>) | ({
  variant: "RecipeSelection"
} & React.ComponentPropsWithoutRef<typeof RecipeSelectionCard>) | ({
  variant: "Skeleton"
  }) | ({
  variant: "Entry"
  } & React.ComponentPropsWithoutRef<typeof EntryCard>) | ({
  variant: "Tutorial"
} & React.ComponentPropsWithoutRef<typeof TutorialCard>);


// ------------------------------------

export function Card(props: CardProps) {
  const { 
    createIngredientRequest,
    createRecipeRequest,
    updateIngredientRequest,
    updateRecipeRequest,
    deleteIngredientRequest,
    deleteRecipeRequest
  } = useEvents()

  const { data } = useDataContext()

  let result : JSX.Element
  switch (props.variant) {
  case "Ingredient":
    result = <IngredientCard
      ingredient={props.ingredient}
      events={{
        updateEvent: updateIngredientRequest,
        deleteEvent: deleteIngredientRequest
      }}
      loadingUpdate={data.loading.updateIngredient === props.ingredient.id}
    />
    break
  case "CreateIngredient":
    result = <CreateIngredientCard
      events={{ createEvent: createIngredientRequest }}
    />
    break
  case "Recipe":
    result = <RecipeCard
      recipe={props.recipe}
      events={{ 
        updateEvent: updateRecipeRequest,
        deleteEvent: deleteRecipeRequest
      }}
      loadingUpdate={data.loading.updateRecipe === props.recipe.id}
    />
    break
  case "CreateRecipe":
    result = <CreateRecipeCard
      events={{ createEvent: createRecipeRequest }}
    />
    break
  case "IngredientSelection":
    result = <IngredientSelectionCard {...props} />
    break
  case "RecipeSelection":
    result = <RecipeSelectionCard {...props} />
    break
  case "Skeleton":
    result = <SkeletonCard />
    break
  case "Loading":
    result = <LoadingCard />
    break
  case "Entry":
    result = <EntryCard {...props} />
    break
  case "Tutorial":
    result = <TutorialCard {...props} />
    break
  default:
    return null
  }

  return (
    <Suspense>
      {result}
    </Suspense>
  )
}