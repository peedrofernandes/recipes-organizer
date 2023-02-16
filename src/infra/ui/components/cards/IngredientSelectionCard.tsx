import { AdaptedIngredient } from "@controllers/AdaptedTypes"
import { Id } from "@domain/utilities/types/Id"
import { InputField } from "@infra/ui/components/forms/Form/styles"
import React from "react"
import styled from "styled-components"
import { Subtitle, Text } from "../styles"

const Card = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  gap: 16px;
  box-shadow: 0 0 4px ${({ theme }) => theme.main.contrastV1};
  margin-top: 8px;
  border-radius: 4px;
`

const ImageContainer = styled.div`
  img {
    max-width: 60px;
    border-radius: 4px;
  }
`

const Fieldset = styled.fieldset`
  label {
    margin: 0;
  }
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: none;

`

const Macros = styled.ul`
  white-space: nowrap;

  & > li {
    font-weight: bold;
  }

  & > li:nth-child(1) {
    color: ${({ theme }) => theme.color.green}
  }
  & > li:nth-child(2) {
    color: ${({ theme }) => theme.color.blue}
  }
  & > li:nth-child(3) {
    color: ${({ theme }) => theme.color.orange}
  }
`

type IngredientSelectionCardProps = {
  ingredient: [AdaptedIngredient, string]
  errorStatus: boolean
  handleChangeGrams: (id: Id, qtd: string) => void
}

export default function IngredientSelectionCard(props: IngredientSelectionCardProps) {
  const { ingredient, errorStatus } = props

  return (
    <Card>
      <div>
        <div>
          <Text>{ingredient[0].name}</Text>
          <Subtitle>{ingredient[0].description}</Subtitle>
        </div>
        {ingredient[0].imageUrl && (
          <ImageContainer>
            <img
              src={ingredient[0].imageUrl}
              alt={`${ingredient[0].name} recipe image`}
            />
          </ImageContainer>
        )}
      </div>
      {ingredient[0].macros && (
        <Macros>
          <li>P: {ingredient[0].macros[0].toFixed(2)}g</li>
          <li>C: {ingredient[0].macros[1].toFixed(2)}g</li>
          <li>G: {ingredient[0].macros[2].toFixed(2)}g</li>
        </Macros>
      )}
      <Fieldset>
        <label>Gramas totais</label>
        <InputField errorStatus={errorStatus}>
          <input
            type="text"
            placeholder="Gramas totais"
            value={ingredient[1]}
            onChange={(e) => props.handleChangeGrams(ingredient[0].id, e.target.value)}
          />
        </InputField>
      </Fieldset>
    </Card>
  )
}