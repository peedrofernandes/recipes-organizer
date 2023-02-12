import { AdaptedIngredient, AdaptedRecipe } from "@controllers/AdaptedTypes"
import { Id } from "@domain/utilities/types/Id"
import React, { createContext, ReactNode, useState } from "react"

type FormState = {
  variant: null
} | {
  variant: "IngredientCreation"
} | {
  variant: "IngredientUpdate"
  ingredient: AdaptedIngredient
} | {
  variant: "IngredientDeletion"
  id: Id
} | {
  variant: "RecipeCreation"
} | {
  variant: "RecipeUpdate"
  recipe: AdaptedRecipe
} | {
  variant: "RecipeDeletion"
  id: Id
}

type FormContext = {
  form: FormState
  setForm: (state: FormState) => void 
}

// const initialState: FormState = { variant: null }
const initialState: FormState = { variant: "RecipeCreation" }

export const FormContext = createContext<FormContext>({
  form: initialState,
  setForm: (state: FormState) => { return state }
})

export default function FormContextProvider(props: { children: ReactNode }) {
  const [form, setForm] = useState<FormState>(initialState)

  return (
    <FormContext.Provider value={{ form, setForm }}>
      {props.children}
    </FormContext.Provider>
  )
}

