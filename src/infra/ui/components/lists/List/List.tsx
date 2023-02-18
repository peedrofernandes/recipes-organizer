import React from "react"
import IngredientSelectionList from "../IngredientSelectionList"
import RecipeSelectionList from "../RecipeSelectionList"

type ListProps = {
  variant: "IngredientSelection"
} & React.ComponentPropsWithoutRef<typeof IngredientSelectionList> | {
  variant: "RecipeSelection"
} & React.ComponentPropsWithoutRef<typeof RecipeSelectionList>

export function List(props: ListProps) {
  switch (props.variant) {
  case "IngredientSelection":
    return <IngredientSelectionList {...props} />
  case "RecipeSelection":
    return <RecipeSelectionList {...props} />
  }
}