import { AdaptedRecipe } from "@controllers/AdaptedTypes"
import { Id } from "@domain/utilities/types/Id"
import React from "react"
import styled from "styled-components"
import { FieldSet, InputField } from "../forms/Form/styles"
import { Subtitle, Text, Title } from "../styles"

const Card = styled.div<{ variant: "active" | "inactive" }>`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  gap: 16px;
  border-radius: 4px;
  
  ${({ variant, theme }) => variant === "active" ? `
    box-shadow: 0 0 4px ${theme.main.contrastV1};
  ` : `
    border: 1px dashed ${theme.main.contrastV3};
  `}

  & > :first-child {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 16px;
  }

  & > * {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`

const ImageContainer = styled.div`
  img {
    max-width: 60px;
    border-radius: 4px;
  }
`

const Macros = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  white-space: nowrap;
  font-weight: bold;
  font-size: 12px;

  ${({ theme }) => `
    @media ${theme.breakpoints.sm} {
      font-size: 14px;
    }
  `}

  & > :nth-child(1) {
    & > :nth-child(1) {
      color: ${({ theme }) => theme.color.green}
    }
    & > :nth-child(2) {
      color: ${({ theme }) => theme.color.orange}
    }
    & > :nth-child(3) {
      color: ${({ theme }) => theme.color.blue}
    }
  }
`

type RecipeSelectionCardProps = {
  status: "active"
  recipeWithDate: [AdaptedRecipe, string]
  errorStatus: boolean
  handleChangeDate: (id: Id, date: string) => void
} | {
  status: "inactive"
}

export default function RecipeSelectionCard(props: RecipeSelectionCardProps) {
  return (
    <Card variant={props.status === "active" ? "active" : "inactive"}>

      {props.status === "active" ? (
        <>
          <div>
            <div>
              <Title variant={5} as="h5">{props.recipeWithDate[0].name}</Title>
              <Text>{props.recipeWithDate[0].type}</Text>
              <Subtitle>{props.recipeWithDate[0].description}</Subtitle>
            </div>
            {props.recipeWithDate[0].imageUrl && (
              <ImageContainer>
                <img
                  src={props.recipeWithDate[0].imageUrl}
                  alt={`Image of the recipe ${props.recipeWithDate[0].name}`}
                /> 
              </ImageContainer>
            )}
          </div>
  
          {props.recipeWithDate[0].macros && (
            <Macros>
              <div>
                <li>P: {props.recipeWithDate[0].macros[0].toFixed(2)}g</li>
                <li>C: {props.recipeWithDate[0].macros[1].toFixed(2)}g</li>
                <li>G: {props.recipeWithDate[0].macros[2].toFixed(2)}g</li>
              </div>
              <div>
                <li>{props.recipeWithDate[0].kcal?.toFixed(2)}kcal</li>
              </div>
            </Macros>
          )}
  
          <FieldSet errorStatus={props.errorStatus}>
            <label>Data</label>
            <InputField errorStatus={props.errorStatus}>
              <input
                type="date"
                onChange={(e) => props.handleChangeDate(props.recipeWithDate[0].id, e.target.value)}
                value={props.recipeWithDate[1]}
              />
            </InputField>
          </FieldSet>

        </>
      ) : (
        <Text>Pesquise e adicione receitas acima!</Text>
      )}

    </Card>
  )
}