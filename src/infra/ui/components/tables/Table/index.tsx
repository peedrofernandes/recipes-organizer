import React from "react"
import IngredientSelectionTable from "../IngredientSelectionTable"
import RecipeSelectionTable from "../RecipeSelectionTable"


type TableProps = ({
  variant: "IngredientSelection"
} & React.ComponentPropsWithoutRef<typeof IngredientSelectionTable>) | ({
  variant: "RecipeSelection"
} & React.ComponentPropsWithoutRef<typeof RecipeSelectionTable>)


export default function Table(props: TableProps) {

  switch (props.variant) {
  case "IngredientSelection":
    return <IngredientSelectionTable {...props} />
  case "RecipeSelection":
    return <RecipeSelectionTable {...props} />
  }
}