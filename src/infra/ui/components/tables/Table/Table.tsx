import React, { Suspense } from "react"

const IngredientSelectionTable = React.lazy(() => import("../IngredientSelectionTable"))
const RecipeSelectionTable = React.lazy(() => import("../RecipeSelectionTable"))

type TableProps = ({
  variant: "IngredientSelection"
} & React.ComponentPropsWithoutRef<typeof IngredientSelectionTable>) | ({
  variant: "RecipeSelection"
} & React.ComponentPropsWithoutRef<typeof RecipeSelectionTable>)


export function Table(props: TableProps) {

  let result: JSX.Element
  switch (props.variant) {
  case "IngredientSelection":
    result = <IngredientSelectionTable {...props} />
    break
  case "RecipeSelection":
    result = <RecipeSelectionTable {...props} />
    break
  default:
    return null
  }

  return <Suspense>{result}</Suspense>
}