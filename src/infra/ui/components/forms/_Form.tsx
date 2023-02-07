import { AdaptedIngredient, AdaptedRecipe } from "@controllers/AdaptedTypes"
import { Id } from "@domain/utilities/types/Id"
import { OptionalValues } from "@domain/utilities/types/Values"
import React from "react"
import styled from "styled-components"
import ConfirmDeleteForm from "./ConfirmDeleteForm"
import IngredientForm from "./IngredientForm"
import CreateIngredientForm from "./IngredientForm"

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;

  label {
    margin-top: 16px;
  }

  input, select, option {
    width: 100%;
    display: inline-block;
    padding: 8px 4px;
    background-color: ${({ theme }) => theme.main.primaryV1 + "00"};
    color: ${({ theme }) => theme.main.contrastV1};
    border: 1px solid ${({ theme }) => theme.main.contrastV1};
    margin-top: 4px;
    min-width: 0;
    
    &:focus {
      outline: none;
      box-shadow: ${({ theme }) => `inset 0 0 4px ${theme.main.contrastV1}, 0 0 4px ${theme.main.contrastV1}`};
    }
  }

  input[type=file] {
    border: none;
    width: auto;
  }

  legend {
    margin-top: 16px;
    font-weight: bolder;
  }
`

export const FieldSet = styled.fieldset`
  display: flex;
  justify-content: center;
  gap: 8px;
  border: none;
`

export const InputBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`

export const SubmitContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 16px 0;
`

export const ConfirmButtonSet = styled.div`
  width: 100%;
  display: flex;
  gap: 16px;
  justify-content: center;
  position: absolute;
  bottom: 0;
  margin-bottom: 16px;
`

type FormProps = {
  variant: "IngredientCreation",
  events: {
    submitEvent: (values: OptionalValues<AdaptedIngredient>) => Promise<void>
  }
} | {
  variant: "IngredientUpdate",
  id: Id,
  events: {
    submitEvent: (id: Id, values: OptionalValues<AdaptedIngredient>) => Promise<void>
  }
} | {
  variant: "IngredientDeletion",
  id: Id,
  events: {
    confirmEvent: (id: Id) => Promise<void>
  }
} | {
  variant: "RecipeCreation",
  events: {
    submitEvent: (values: OptionalValues<AdaptedRecipe>) => Promise<void>
  }
} | {
  variant: "RecipeUpdate",
  id: Id,
  events: {
    submitEvent: (id: Id, values: OptionalValues<AdaptedRecipe>) => Promise<void>
  }
} | {
  variant: "RecipeDeletion",
  id: Id,
  events: {
    confirmEvent: (id: Id) => Promise<void>
  }
}

export default function Form(props: FormProps) {
  switch (props.variant) {
  case "IngredientCreation":
    return <IngredientForm variant="Create" events={props.events} />
  case "IngredientUpdate":
    return <IngredientForm variant="Update" id={props.id} events={props.events} />
  case "IngredientDeletion":
    return <FormContainer />
  case "RecipeCreation":
    return <FormContainer />
  case "RecipeUpdate":
    return <FormContainer />
  case "RecipeDeletion":
    return <FormContainer />
  }
}