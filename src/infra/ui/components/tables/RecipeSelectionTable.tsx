import { AdaptedRecipe } from "@controllers/AdaptedTypes"
import { InputField } from "@infra/ui/components/forms/Form/styles"
import { StyledTable } from "@infra/ui/components/styles"
import React from "react"

type RecipeSelectionTableProps = {
  recipes: [AdaptedRecipe, string][]
}

export default function RecipeSelectionTable(props: RecipeSelectionTableProps) {
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
        {props.recipes.map(r => (
          <tr key={r[0].id}>
            <td>{r[0].name}</td>
            <td>{r[0].type}</td>
            <td>{r[0].kcal ? r[0].kcal.toFixed(2).toString() + "kcal" : "-"}</td>
            <td>
              <InputField>
                <input type="date" />
              </InputField>
            </td>
          </tr>
        ))}
      </tbody>
    </StyledTable>
  )
}