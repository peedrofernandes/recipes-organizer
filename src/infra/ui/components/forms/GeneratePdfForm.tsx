import { AdaptedRecipe } from "@controllers/AdaptedTypes"
import { FormContainer, InputField } from "@infra/ui/styles/formStyles"
import { Title } from "@infra/ui/styles/generalStyles"
import React, { useState } from "react"
import PDFDocument from "../PDF"

type GeneratePDFFormProps = {
  list: [AdaptedRecipe, Date][]
  events: {
    submitEvent: (adaptedRecipesWithDates: [AdaptedRecipe, Date][]) => Promise<void>
    randomize: (
      adaptedRecipes: AdaptedRecipe[], initialDate: Date
    ) => Promise<[AdaptedRecipe, Date][]>
  }
}

export default function GeneratePdfForm(props: GeneratePDFFormProps) {
  const [date, setDate] = useState<string>("")

  return (
    <FormContainer>
      <Title variant="4" as="h4">Previsão do documento PDF</Title>
      <InputField>
        <input type="date" value={date} /> 
      </InputField>
    </FormContainer>
  )
}