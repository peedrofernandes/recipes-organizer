import { AdaptedRecipe } from "@controllers/AdaptedTypes"
import { Id } from "@domain/utilities/types/Id"
import { Error } from "@infra/ui/types/Error"
import React from "react"
import styled from "styled-components"
import Card from "../cards/Card"

const List = styled.ul`
  margin-top: 8px;
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 8px;
`

type RecipeSelectionListProps = {
  recipes: [AdaptedRecipe, string][]
  handleChangeDate: (id: Id, date: string) => void
  errorState: React.StateType<Error>
}

export default function RecipeSelectionList(props: RecipeSelectionListProps) {
  const { recipes, handleChangeDate, errorState } = props

  return (
    <List>
      {recipes.length > 0 ? (
        <>
          {recipes.map(r => (
            <li key={r[0].id}>
              <Card
                variant="RecipeSelection"
                status="active"
                recipeWithDate={r}
                handleChangeDate={handleChangeDate}
                errorState={errorState}
              />
            </li>
          ))}
        </>
      ) : (
        <Card variant="RecipeSelection" status="inactive" />
      )}
    </List>
  )
}