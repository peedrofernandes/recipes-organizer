import { AdaptedRecipe } from "@controllers/AdaptedTypes"
import { Id } from "@domain/utilities/types/Id"
import React from "react"
import styled from "styled-components"
import Card from "../cards/Card"
import RecipeSelectionCard from "../cards/RecipeSelectionCard"

const List = styled.ul`
  margin-top: 8px;
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 8px;
`

type RecipeSelectionListProps = {
  recipes: [AdaptedRecipe, string][]
  errorStatus: boolean
  handleChangeDate: (id: Id, date: string) => void
}

export default function RecipeSelectionList(props: RecipeSelectionListProps) {
  return (
    <List>
      {props.recipes.length > 0 ? (
        <>
          {props.recipes.map(r => (
            <li key={r[0].id}>
              <Card
                variant="RecipeSelection"
                status="active"
                recipeWithDate={r}
                errorStatus={props.errorStatus}
                handleChangeDate={props.handleChangeDate}
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