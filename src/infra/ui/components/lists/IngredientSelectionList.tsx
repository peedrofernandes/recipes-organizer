import React from "react"
import { AdaptedIngredient } from "@controllers/AdaptedTypes"
import styled from "styled-components"
import Card from "../cards/Card"
import { Id } from "@domain/utilities/types/Id"

const List = styled.ul`
  margin-top: 8px;
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 8px;
`

type IngredientSelectionListProps = {
  ingredients: [AdaptedIngredient, string][];
  errorStatus: boolean;
  handleChangeGrams: (id: Id, value: string) => void
}

export default function IngredientSelectionList(props: IngredientSelectionListProps) {
  return (
    <List>
      {props.ingredients.map(i => (
        <li key={i[0].id}>
          <Card
            variant="IngredientSelection"
            ingredientWithGrams={i}
            errorStatus={props.errorStatus}
            handleChangeGrams={props.handleChangeGrams}
          />
        </li>
      ))}
    </List>
  )
}