import { AdaptedIngredient } from "@controllers/AdaptedTypes"
import { Id } from "@domain/utilities/types/Id"
import { Values } from "@domain/utilities/types/Values"
import React, { useState } from "react"
import Button from "../buttons/_Button"
import { FormContainer, InputFieldSet, SmallInputContainer, SubmitContainer } from "./_Form"

type IngredientFormProps = {
  variant: "Create",
  events: {
    submitEvent: (values: Values<AdaptedIngredient>) => void;
  }
} | {
  variant: "Update",
  id: Id,
  events: {
    submitEvent: (id: Id, values: Values<AdaptedIngredient>) => void;
  }
}

type SubmitErrors = ({
  nameError?: false
} | {
  nameError: true;
  nameErrorMessage: string
}) & ({
  macrosError?: false
} | {
  macrosError: true
  macrosErrorMessage: string
})

export default function IngredientForm(props: IngredientFormProps) {
  const [name, setName] = useState<string>()
  const [description, setDescription] = useState<string>()
  const [macros, setMacros] = useState<[number, number, number, number]>([0,0,0,0])
  const [imageFile, setImageFile] = useState<File>()

  const [submitError, setSubmitError] = useState<SubmitErrors>({
    nameError: false,
    macrosError: false
  })

  const handleChangeMacros = (
    type: "proteins" | "carbs" | "fats" | "totalGrams",
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSubmitError(state => ({ ...state, macrosError: false,}))

    const v = e.target.valueAsNumber

    setMacros((prevMacros) => {
      const newMacros: typeof prevMacros = [...prevMacros]
      switch (type) {
      case "proteins":
        newMacros[0] = v
        return newMacros
      case "carbs":
        newMacros[1] = v
        return newMacros
      case "fats":
        newMacros[2] = v
        return newMacros
      case "totalGrams":
        newMacros[3] = v
        return newMacros
      }
    })
  }

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageFile(e.target.files?.[0])
    console.log("File name:", imageFile?.name)
    console.log("File size:", imageFile?.size, "bytes")
    console.log("File type:", imageFile?.type)
  }

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubmitError(state => ({ ...state, nameError: false }))
    setName(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const invalidName = !name
    const invalidMacros = macros.some(
      elem => elem !== 0
    ) && macros.some(
      elem => elem === 0
    )
    if (invalidName || invalidMacros) {
      if (invalidMacros) {
        setSubmitError(state => ({
          ...state,
          macrosError: true,
          macrosErrorMessage: "Macronutrientes devem ser completamente preenchidos!"
        }))
      }
      if (invalidName) {
        setSubmitError(state => ({
          ...state,
          nameError: true,
          nameErrorMessage: "O ingrediente deve ter nome!"
        }))
      }
      return
    }
    
    const ingredientValues: Values<AdaptedIngredient> = {
      name,
      description,
      imageFile,
      macros
    }

    switch (props.variant) {
    case "Create":
      props.events.submitEvent(ingredientValues)
      break
    case "Update":
      props.events.submitEvent(props.id, ingredientValues)
      break
    }

  }

  return (
    <FormContainer onSubmit={handleSubmit}>
      <InputFieldSet error={submitError.nameError}>
        <label>Nome*</label>
        <input
          type="text" id="nome" name="nome"
          placeholder="Nome"
          value={name}
          onChange={handleChangeName}
        />
        {submitError.nameError && <span>{submitError.nameErrorMessage}</span>}
      </InputFieldSet>

      <InputFieldSet>
        <label>Descrição</label>
        <input
          type="text"
          id="description"
          name="description"
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </InputFieldSet>

      <legend>Macronutrientes</legend>

      <SmallInputContainer>
        <InputFieldSet error={submitError.macrosError}>
          <label>Proteínas</label>
          <input
            type="number"
            min="0"
            id="proteins"
            name="proteins"
            placeholder="g"
            value={macros[0] !== 0 ? macros[0] : undefined}
            onChange={(e) => handleChangeMacros("proteins", e)}
          />
        </InputFieldSet>
        <InputFieldSet error={submitError.macrosError}>
          <label>Carboidratos</label>
          <input
            type="number"
            min="0"
            id="proteins"
            name="proteins"
            placeholder="g"
            value={macros[1] !== 0 ? macros[1] : undefined}
            onChange={(e) => handleChangeMacros("carbs", e)}
          />
        </InputFieldSet>
        <InputFieldSet error={submitError.macrosError}>
          <label>Gorduras</label>
          <input
            type="number"
            min="0"
            id="proteins"
            name="proteins"
            placeholder="g"
            value={macros[2] !== 0 ? macros[2] : undefined}
            onChange={(e) => handleChangeMacros("fats", e)}
          />
        </InputFieldSet>

      </SmallInputContainer>

      <InputFieldSet error={submitError.macrosError}>
        <label>Gramas totais</label>
        <input
          type="number"
          min="0"
          id="totalGrams"
          name="totalGrams"
          placeholder="g"
          value={macros[3] !== 0 ? macros[3] : undefined}
          onChange={(e) => handleChangeMacros("totalGrams", e)}
        />
        {submitError.macrosError && <span>{submitError.macrosErrorMessage}</span>}
      </InputFieldSet>

      <InputFieldSet>
        <label>Imagem</label>
        <input
          type="file" accept="image/png, image/gif, image/jpeg" title=" Selecione"
          id="Image"
          name="Image"
          onChange={handleChangeFile}
        />
      </InputFieldSet>

      <SubmitContainer>
        <Button
          variant="styled"
          text="Enviar"
          type="submit"
        />
      </SubmitContainer>

      <h1>Content</h1>
      <h1>Content</h1>
      <h1>Content</h1>
      <h1>Content</h1>
      <h1>Content</h1>
      <h1>Content</h1>
      <h1>Content</h1>
      <h1>Content</h1>
      <h1>Content</h1>
      <h1>Content</h1>

    </FormContainer>
  )
}

