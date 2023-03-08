import { AdaptedIngredient, IngredientInput } from "@controllers/AdaptedTypes"
import { Id } from "@domain/utilities/types/Id"
import { FormContainer, InputGroup, SubmitContainer } from "@infra/ui/components/forms/Form/styles"
import React, { useState } from "react"
import Button from "../buttons/Button"
import Input from "../inputs/Input"

type IngredientFormProps = {
  variant: "Create"
  events: {
    submitEvent: (input: IngredientInput) => void;
  }
} | {
  variant: "Update"
  ingredient: AdaptedIngredient
  events: {
    submitEvent: (input: IngredientInput, id: Id) => void;
  }
}

type StringTuple = [string, string, string, string]

// type SubmitErrors = ({
//   name: false;
// } | {
//   name: true;
//   nameMessage: string;
// }) & ({
//   macros: false;
// } | {
//   macros: true;
//   macrosMessage: string;
// })

type Error = {
  status: false
} | {
  status: true
  message: string
}

export default function IngredientForm(props: IngredientFormProps) {
  let initialName = ""
  let initialDescription = ""
  let initialMacros: StringTuple = ["", "", "", ""]
  let initialImageUrl = ""
  if (props.variant === "Update") {
    initialName = props.ingredient.name
    initialDescription = props.ingredient.description || ""
    initialMacros = props.ingredient.macros?.map(item => item.toString()) as StringTuple || ["", "", "", ""]
    initialImageUrl = props.ingredient.imageUrl || ""
  }
  
  const [name, setName] = useState<string>(initialName)
  const [description, setDescription] = useState<string>(initialDescription)
  const [macros, setMacros] = useState<[string, string, string, string]>(initialMacros)
  const [imageFile, setImageFile] = useState<File | null>()
  const [nameError, setNameError] = useState<Error>({ status: false })
  const [macrosError, setMacrosError] = useState<Error>({ status: false })



  const handleChangeMacros = (
    type: "proteins" | "carbs" | "fats" | "totalGrams",
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMacrosError({ status: false })
    setMacros((prevMacros) => {
      const newMacros: typeof prevMacros = [...prevMacros]
      switch (type) {
      case "proteins":
        newMacros[0] = e.target.value
        return newMacros
      case "carbs":
        newMacros[1] = e.target.value
        return newMacros
      case "fats":
        newMacros[2] = e.target.value
        return newMacros
      case "totalGrams":
        newMacros[3] = e.target.value
        return newMacros
      }
    })
  }

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("File changed!")
    setImageFile(e.target.files?.[0] || null)
  }

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameError({ status: false })
    setName(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const invalidName = !name
    const invalidMacros = macros.some(
      elem => !elem
    ) && macros.some(
      elem => !!elem
    )
    if (invalidName || invalidMacros) {
      if (invalidMacros) {
        setMacrosError({
          status: true,
          message: "Macronutrientes devem ser completamente preenchidos!"
        })
      }
      if (invalidName) {
        setNameError({
          status: true,
          message: "O ingrediente deve ter nome!"
        })
      }
      return
    }

    const inputData: IngredientInput = {
      name,
      description,
      ...(imageFile ? { imageFile } : null),
      initialImageUrl,
      ...(macros.every(m => !!m) ? {
        macros: macros.map(
          item => parseFloat(item)
        ) as [number, number, number, number]
      } : null)
    }

    switch (props.variant) {
    case "Create":
      props.events.submitEvent(inputData)
      break
    case "Update":
      props.events.submitEvent(inputData, props.ingredient.id)
      break
    }

  }

  return (
    <FormContainer onSubmit={handleSubmit}>

      

      {/* Name Input */}
      <Input variant="text"
        id="IngredientName" name="IngredientName" placeholder="Nome"
        label="Nome*"
        onChange={handleChangeName}
        value={name}
        error={nameError}
        showErrorMessage
      />

      

      {/* Description Input */}
      <Input variant="text"
        id="IngredientDescription" name="IngredientDescription"
        placeholder="Descrição" label="Descrição"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
      />

      

      {/* Macros Inputs */}
      <legend>Macronutrientes</legend>
      <InputGroup>
        {/* Proteins Input */}
        <Input variant="number"
          id="IngredientProteins" name="IngredientProteins"
          placeholder="Proteínas" label="Proteínas"
          min="0" step="any"
          onChange={(e) => handleChangeMacros("proteins", e)}
          value={macros[0]}
          error={macrosError}
        />

        {/* Carbs Input */}
        <Input variant="number"
          id="IngredientCarbs" name="IngredientCarbs"
          placeholder="Carboidratos" label="Carboidratos"
          min="0" step="any"
          onChange={(e) => handleChangeMacros("carbs", e)}
          value={macros[1]}
          error={macrosError}
        />

        {/* Fats Input */}
        <Input variant="number"
          id="IngredientFats" name="IngredientFats"
          placeholder="Gorduras" label="Gorduras"
          min="0" step="any"
          onChange={(e) => handleChangeMacros("fats", e)}
          value={macros[2]}
          error={macrosError}
        />
      </InputGroup>

      {/* Total grams Input */}
      <Input variant="number"
        id="IngredientTotalGrams" name="IngredientTotalGrams"
        placeholder="Gramas totais" label="Gramas totais"
        min="0" step="any"
        onChange={(e) => handleChangeMacros("totalGrams", e)}
        value={macros[3]}
        error={macrosError}
        showErrorMessage
      />

      

      {/* File Input */}
      <Input variant="file" id="file" name="file"
        accept="image/png, image/gif, image/jpeg" onChange={handleChangeFile}
        fileName={imageFile?.name ?? ""}
      />

      

      {/* Submit */}
      <SubmitContainer>
        <Button
          variant="styled"
          text="Enviar"
          type="submit"
        />
      </SubmitContainer>
    
    
    </FormContainer>
  )
}

