import { AdaptedRecipe } from "@controllers/AdaptedTypes"
import { Id } from "@domain/utilities/types/Id"
import { InputField } from "@infra/ui/components/forms/Form/styles"
import { StyledTable } from "@infra/ui/components/styles"
import React from "react"

type RecipeSelectionTableProps = {
  recipes: [AdaptedRecipe, string][];
  errorStatus: boolean;
  handleChangeDate: (id: Id, value: string) => void
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
        {props.recipes.length > 0 ? props.recipes.map(r => (
          <tr key={r[0].id}>
            <td>{r[0].name}</td>
            <td>{r[0].type}</td>
            <td>{r[0].kcal ? r[0].kcal.toFixed(2).toString() + "kcal" : "-"}</td>
            <td>
              <InputField errorStatus={props.errorStatus}>
                <input
                  type="date"
                  onChange={(e) => props.handleChangeDate(r[0].id, e.target.value)}
                  value={r[1]}
                />
              </InputField>
            </td>
          </tr>
        )) : (
          <tr>
            <td>Pesquise e adicione receitas acima! </td>
          </tr>
        )}
      </tbody>
    </StyledTable>
  )
}