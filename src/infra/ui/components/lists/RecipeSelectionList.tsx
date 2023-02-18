import { AdaptedRecipe } from "@controllers/AdaptedTypes"
import { Id } from "@domain/utilities/types/Id"
import React from "react"
import styled from "styled-components"
import Card from "../cards/Card"

const List = styled.ul`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 8px;

  > li {
    padding: 8px;
  }
`

type RecipeSelectionListProps = {
  recipes: [AdaptedRecipe, string][]
  errorStatus: boolean
  handleChangeDate: (id: Id, date: string) => void
}

export default function RecipeSelectionList(props: RecipeSelectionListProps) {
  return (
    <List>
      {props.recipes.map(r => (
        <li key={r[0].id}>
          <Card variant=""/>
        </li>
      ))}
    </List>
  )
}