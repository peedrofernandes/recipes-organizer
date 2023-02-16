import { AdaptedIngredient } from "@controllers/AdaptedTypes"
import { Id } from "@domain/utilities/types/Id"
import { InputField } from "@infra/ui/components/forms/Form/styles"
import { Subtitle, StyledTable, Text } from "@infra/ui/components/styles"
import React from "react"

type IngredientSelectionProps = {
  ingredients: [AdaptedIngredient, string][]
  errorStatus: boolean
  handleChangeGrams: (id: Id, value: string) => void
}

export default function IngredientSelectionTable(props: IngredientSelectionProps) {
  const { ingredients, errorStatus, handleChangeGrams } = props

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
            <td>{i[0].macros ? i[0].macros[0].toFixed(2) + "g" : "-"}</td>
            <td>{i[0].macros ? i[0].macros[1].toFixed(2) + "g" : "-"}</td>
            <td>{i[0].macros ? i[0].macros[2].toFixed(2) + "g" : "-"}</td>
            <td>
              <InputField errorStatus={errorStatus}>
                <input
                  type="number"
                  placeholder="Gramas totais"
                  onChange={(e) => handleChangeGrams(
                    i[0].id, e.target.value)}
                  value={ingredients[index][1]}
                />
              </InputField>
            </td>
          </tr>
        ))}
      </tbody>
    </StyledTable>
  )
}

