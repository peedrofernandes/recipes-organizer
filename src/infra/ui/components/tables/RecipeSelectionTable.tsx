import { AdaptedRecipe } from "@controllers/AdaptedTypes"
import { Id } from "@domain/utilities/types/Id"
import { StyledTable, Text } from "@infra/ui/components/styles"
import React from "react"
import Input from "../inputs/Input"

type RecipeSelectionTableProps = {
  recipes: [AdaptedRecipe, string][];
  handleChangeDate: (id: Id, value: string) => void
  error: { status: false } | {
    status: true
    message: string
  }
}

export default function RecipeSelectionTable(props: RecipeSelectionTableProps) {
  const { recipes, handleChangeDate, error } = props

  return (
    <StyledTable>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Tipo</th>
          <th>Kcal</th>
          <th>Data</th>
        </tr> 
      </thead>
      <tbody>
        {recipes.length > 0 ? recipes.map(r => (
          <tr key={r[0].id}>
            <td><Text>{r[0].name}</Text></td>
            <td><Text>{r[0].type}</Text></td>
            <td><Text>{r[0].kcal ? r[0].kcal.toFixed(2).toString() + "kcal" : "-"}</Text></td>
            <td>
              <Input variant="date"
                id={`RecipeDate#${r[0].id}`} name={`RecipeDate#${r[0].id}`}
                initialDate={r[1]}
                handleChangeDate={(date) => handleChangeDate(r[0].id, date)}
                error={error}
              />
            </td>
          </tr>
        )) : (
          <tr>
            <td><Text>Pesquise e adicione receitas acima! </Text></td>
          </tr>
        )}
      </tbody>
    </StyledTable>
  )
}