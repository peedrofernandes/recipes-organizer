import { AdaptedIngredient } from "@controllers/AdaptedTypes"
import { Id } from "@domain/utilities/types/Id"
import { InputField } from "@infra/ui/components/forms/Form/styles"
import { Error } from "@infra/ui/types/Error"
import React from "react"
import styled from "styled-components"
import { Span, Subtitle, Text } from "../styles"

const Card = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  gap: 16px;
  box-shadow: 0 0 4px ${({ theme }) => theme.main.contrastV1};
  border-radius: 4px;

  & > :nth-child(1) {
    display: flex;
    flex-direction: column;
    gap: 16px;
    white-space: nowrap;
  }
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
  gap: 8px;
  border: none;

`

const Macros = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  white-space: nowrap;

  font-size: 12px;

  ${({ theme }) => `
    @media ${theme.breakpoints.sm} {
      font-size: 14px;
    }
  `}

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
  ingredientWithGrams: [AdaptedIngredient, string]
  errorState?: React.StateType<Error>
  handleChangeGrams: (id: Id, qtd: string) => void
}

export default function IngredientSelectionCard(props: IngredientSelectionCardProps) {
  const { ingredientWithGrams } = props
  const [error] = props.errorState || []

  return (
    <Card>
      <div>
        <div>
          <Text>{ingredientWithGrams[0].name}</Text>
          <Subtitle>{ingredientWithGrams[0].description}</Subtitle>
        </div>
        {ingredientWithGrams[0].imageUrl && (
          <ImageContainer>
            <img
              src={ingredientWithGrams[0].imageUrl}
              alt={`${ingredientWithGrams[0].name} recipe image`}
            />
          </ImageContainer>
        )}
      </div>
      {ingredientWithGrams[0].macros && (
        <Macros style={{ flexGrow: "1" }}>
          <li>P: {ingredientWithGrams[0].macros[0].toFixed(2)}g</li>
          <li>C: {ingredientWithGrams[0].macros[1].toFixed(2)}g</li>
          <li>G: {ingredientWithGrams[0].macros[2].toFixed(2)}g</li>
        </Macros>
      )}
      <Fieldset style={{ flexGrow: "1" }}>
        <label><Span>Gramas totais</Span></label>
        <InputField errorStatus={error?.status}>
          <input
            type="text"
            placeholder="Gramas totais"
            value={ingredientWithGrams[1]}
            onChange={(e) => props.handleChangeGrams(ingredientWithGrams[0].id, e.target.value)}
          />
        </InputField>
      </Fieldset>
    </Card>
  )
}