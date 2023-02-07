import { Id } from "@domain/utilities/types/Id"
import React, { createContext, ReactNode, useState } from "react"

type FormState = {
  variant: null
} | {
  variant: "IngredientCreation"
} | {
  variant: "IngredientUpdate"
  id: Id
} | {
  variant: "IngredientDeletion"
  id: Id
} | {
  variant: "RecipeCreation"
} | {
  variant: "RecipeUpdate"
  id: Id
} | {
  variant: "RecipeDeletion"
  id: Id
}

type FormContext = {
  form: FormState
  setForm: (state: FormState) => void 
}

const initialState: FormState = { variant: null }

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

