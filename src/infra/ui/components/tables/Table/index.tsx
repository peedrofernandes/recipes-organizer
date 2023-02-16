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
    return <IngredientSelectionTable
      errorStatus={props.errorStatus}
      handleChangeGrams={props.handleChangeGrams}
      ingredients={props.ingredients}
    />
  case "RecipeSelection":
    return <RecipeSelectionTable
      recipes={props.recipes}
    />
  }
}