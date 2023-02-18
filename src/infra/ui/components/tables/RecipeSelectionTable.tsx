import { AdaptedRecipe } from "@controllers/AdaptedTypes"
import { Id } from "@domain/utilities/types/Id"
import { InputField } from "@infra/ui/components/forms/Form/styles"
import { StyledTable, Text } from "@infra/ui/components/styles"
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
            <td><Text>{r[0].name}</Text></td>
            <td><Text>{r[0].type}</Text></td>
            <td><Text>{r[0].kcal ? r[0].kcal.toFixed(2).toString() + "kcal" : "-"}</Text></td>
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
            <td><Text>Pesquise e adicione receitas acima! </Text></td>
          </tr>
        )}
      </tbody>
    </StyledTable>
  )
}