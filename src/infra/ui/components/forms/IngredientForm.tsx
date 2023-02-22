import { AdaptedIngredient, IngredientInput } from "@controllers/AdaptedTypes"
import { Id } from "@domain/utilities/types/Id"
import { FieldSet, FormContainer, InputField, InputGroup, SubmitContainer } from "@infra/ui/components/forms/Form/styles"
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

type SubmitErrors = ({
  name: false;
} | {
  name: true;
  nameMessage: string;
}) & ({
  macros: false;
} | {
  macros: true;
  macrosMessage: string;
})

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
  const [submitError, setSubmitError] = useState<SubmitErrors>({
    name: false,
    macros: false
  })



  const handleChangeMacros = (
    type: "proteins" | "carbs" | "fats" | "totalGrams",
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSubmitError((state): SubmitErrors => ({ ...state, macros: false }))
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
    setSubmitError((state): SubmitErrors => ({ ...state, name: false }))
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
        setSubmitError((state): SubmitErrors => ({
          ...state,
          macros: true,
          macrosMessage: "Macronutrientes devem ser completamente preenchidos!"
        }))
      }
      if (invalidName) {
        setSubmitError((state): SubmitErrors => ({
          ...state,
          name: true,
          nameMessage: "O ingrediente deve ter nome!"
        }))
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


      
      <FieldSet errorStatus={submitError.name}>
        <label>Nome*</label>
        <InputField errorStatus={submitError.name}>
          <input
            type="text" id="nome" name="nome"
            placeholder="Nome"
            value={name}
            onChange={handleChangeName}
          />
        </InputField>
        {submitError.name && <span>{submitError.nameMessage}</span>}
      </FieldSet>

      

      <FieldSet>
        <label>Descrição</label>
        <InputField>
          <input
            type="text" id="description" name="description"
            placeholder="Descrição" value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </InputField>
      </FieldSet>

      

      <legend>Macronutrientes</legend>
      <InputGroup>
        <FieldSet errorStatus={submitError.macros}>
          <label>Proteínas</label>
          <InputField errorStatus={submitError.macros}>
            <input
              type="number" id="proteins" name="proteins"
              step="any" min="0"
              placeholder="g" value={macros[0]}
              onChange={(e) => handleChangeMacros("proteins", e)}
            />
          </InputField>
        </FieldSet>
        <FieldSet errorStatus={submitError.macros}>
          <label>Carboidratos</label>
          <InputField errorStatus={submitError.macros}>
            <input
              type="number" id="proteins" name="proteins"
              step="any" min="0"
              placeholder="g" value={macros[1]}
              onChange={(e) => handleChangeMacros("carbs", e)}
            />
          </InputField>
        </FieldSet>
        <FieldSet errorStatus={submitError.macros}>
          <label>Gorduras</label>
          <InputField errorStatus={submitError.macros}>
            <input
              type="number" id="proteins" name="proteins"
              step="any" min="0"
              placeholder="g" value={macros[2]}
              onChange={(e) => handleChangeMacros("fats", e)}
            />
          </InputField>
        </FieldSet>
      </InputGroup>


      
      <FieldSet errorStatus={submitError.macros}>
        <label>Gramas totais</label>
        <InputField errorStatus={submitError.macros}>
          <input
            type="number" id="totalGrams" name="totalGrams"
            step="any" min="0" placeholder="g"
            value={macros[3]}
            onChange={(e) => handleChangeMacros("totalGrams", e)}
          />
        </InputField>
        {submitError.macros && <span>{submitError.macrosMessage}</span>}
      </FieldSet>

      


      <Input variant="file" id="file" name="file"
        accept="image/png, image/gif, image/jpeg" onChange={handleChangeFile}
        fileName={imageFile?.name ?? ""}
      />

      


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

