import { AdaptedRecipe } from "@controllers/AdaptedTypes"
import { Id } from "@domain/utilities/types/Id"
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
  error: {
    status: false
  } | {
    status: true
    message: string
  }
}

export default function RecipeSelectionList(props: RecipeSelectionListProps) {
  const { recipes, handleChangeDate, error } = props

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
                error={error}
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