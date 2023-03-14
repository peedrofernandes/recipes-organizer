import { AdaptedIngredient } from "@controllers/AdaptedTypes"
import { Id } from "@domain/utilities/types/Id"
import { Subtitle, StyledTable, Text } from "@infra/ui/components/styles"
import { Error } from "@infra/ui/types/Error"
import React from "react"
import Input from "../inputs/Input"

type IngredientSelectionProps = {
  ingredients: [AdaptedIngredient, string][]
  handleChangeGrams: (id: Id, value: string) => void
  errorState: React.StateType<Error>
}

export default function IngredientSelectionTable(props: IngredientSelectionProps) {
  const { ingredients, errorState, handleChangeGrams } = props


  return (
    <StyledTable>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Proteínas</th>
          <th>Carboidratos</th>
          <th>Gorduras</th>
          <th>Gramas Totais</th>
        </tr>
      </thead>
      <tbody>
        {ingredients.map((i, index) => (
          <tr key={index}>
            <td>
              <Text>{i[0].name}</Text>
              <Subtitle>{i[0].description}</Subtitle>
            </td>
            <td><Text>{i[0].macros ? i[0].macros[0].toFixed(2) + "g" : "-"}</Text></td>
            <td><Text>{i[0].macros ? i[0].macros[1].toFixed(2) + "g" : "-"}</Text></td>
            <td><Text>{i[0].macros ? i[0].macros[2].toFixed(2) + "g" : "-"}</Text></td>
            <td>
              <Input variant="number"
                id={`IngTotalGrams#${i[0].id}`} name={`IngTotalGrams#${i[0].id}`}
                placeholder="Gramas totais" value={ingredients[index][1]}
                onChange={(e) => handleChangeGrams(i[0].id, e.target.value)}
                errorState={errorState}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </StyledTable>
  )
}

