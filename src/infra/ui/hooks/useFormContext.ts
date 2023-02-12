import { useContext } from "react"
import { FormContext } from "../context/FormContext"

export default function useFormContext() {
  const formContext = useContext(FormContext)
  let title: string
  switch (formContext.form.variant) {
  case "IngredientCreation":
    title = "Criar novo Ingrediente"
    break
  case "RecipeCreation":
    title = "Criar nova Receita"
    break
  case "IngredientUpdate":
    title = "Atualizar Ingrediente"
    break
  case "RecipeUpdate":
    title = "Atualizar Receita"
    break
  case "IngredientDeletion":
    title = "Tem certeza que deseja excluir o ingrediente?"
    break
  case "RecipeDeletion":
    title = "Tem certeza que deseja excluir a receita?"
    break
  default:
    title = ""
    break
  }

  return { ...formContext, title }
}