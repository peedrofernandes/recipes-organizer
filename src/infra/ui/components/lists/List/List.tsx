import React, { Suspense } from "react"

const IngredientSelectionList = React.lazy(() => import("../IngredientSelectionList"))
const RecipeSelectionList = React.lazy(() => import("../RecipeSelectionList"))

type ListProps = {
  variant: "IngredientSelection"
} & React.ComponentPropsWithoutRef<typeof IngredientSelectionList> | {
  variant: "RecipeSelection"
} & React.ComponentPropsWithoutRef<typeof RecipeSelectionList>

export function List(props: ListProps) {
  let result: JSX.Element
  switch (props.variant) {
  case "IngredientSelection":
    result = <IngredientSelectionList {...props} />
    break
  case "RecipeSelection":
    result = <RecipeSelectionList {...props} />
    break
  default:
    return null
  }

  return <Suspense>{result}</Suspense>
}