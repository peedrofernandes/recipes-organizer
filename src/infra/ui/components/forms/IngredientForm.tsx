import { AdaptedIngredient } from "@controllers/AdaptedTypes"
import { Id } from "@domain/utilities/types/Id"
import { Values } from "@domain/utilities/types/Values"
import { FieldSet, FormContainer, InputGroup, SubmitContainer } from "@infra/ui/styles/formStyles"
import React, { useState } from "react"
import Button from "../buttons/_Button"

type IngredientFormProps = {
  variant: "Create"
  events: {
    submitEvent: (values: Values<AdaptedIngredient>) => void;
  }
} | {
  variant: "Update"
  currentValues: Values<AdaptedIngredient>
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
  const { variant } = props
  const isUpdateVariant = (variant === "Update")

  const initialName = isUpdateVariant
    ? props.currentValues.name : ""
  const [name, setName] = useState<string>(initialName)

  const initialDescription = isUpdateVariant
    ? (props.currentValues.description || "") : ""
  const [description, setDescription] = useState<string>(initialDescription)

  const initialMacros: [number, number, number, number] = isUpdateVariant
    ? (props.currentValues.macros || [-1, -1, -1, -1]) : [-1, -1, -1, -1]
  const [macros, setMacros] = useState<[number, number, number, number]>(initialMacros)

  const initialImageFile = isUpdateVariant
    ? (props.currentValues.imageFile || undefined) : undefined
  const [imageFile, setImageFile] = useState<File | undefined>(initialImageFile)

  const [submitError, setSubmitError] = useState<SubmitErrors>({
    nameError: false,
    macrosError: false
  })

  const handleChangeMacros = (
    type: "proteins" | "carbs" | "fats" | "totalGrams",
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSubmitError(state => ({ ...state, macrosError: false }))

    const v = Number.isNaN(e.target.valueAsNumber) ? -1 : e.target.valueAsNumber

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
  }

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubmitError(state => ({ ...state, nameError: false }))
    setName(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const invalidName = !name
    const invalidMacros = macros.some(
      elem => elem !== -1
    ) && macros.some(
      elem => elem === -1
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
      <FieldSet error={submitError.nameError}>
        <label>Nome*</label>
        <input 
          type="text" id="nome" name="nome"
          placeholder="Nome"
          value={name}
          onChange={handleChangeName}
        />
        {submitError.nameError && <span>{submitError.nameErrorMessage}</span>}
      </FieldSet>

      <FieldSet>
        <label>Descrição</label>
        <input 
          type="text" id="description" name="description"
          placeholder="Descrição" value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </FieldSet>

      <legend>Macronutrientes</legend>

      <InputGroup>
        <FieldSet error={submitError.macrosError}>
          <label>Proteínas</label>
          <input 
            type="number" id="proteins" name="proteins"
            step="any" min="0" 
            placeholder="g" value={macros[0] !== -1 ? macros[0] : undefined}
            onChange={(e) => handleChangeMacros("proteins", e)}
          />
        </FieldSet>
        <FieldSet error={submitError.macrosError}>
          <label>Carboidratos</label>
          <input 
            type="number" id="proteins" name="proteins"
            step="any" min="0"
            placeholder="g" value={macros[1] !== -1 ? macros[1] : undefined}
            onChange={(e) => handleChangeMacros("carbs", e)}
          />
        </FieldSet>
        <FieldSet error={submitError.macrosError}>
          <label>Gorduras</label>
          <input 
            type="number" id="proteins" name="proteins"
            step="any" min="0"  
            placeholder="g" value={macros[2] !== -1 ? macros[2] : undefined}
            onChange={(e) => handleChangeMacros("fats", e)}
          />
        </FieldSet>

      </InputGroup>

      <FieldSet error={submitError.macrosError}>
        <label>Gramas totais</label>
        <input 
          type="number" id="totalGrams" name="totalGrams"
          step="any" min="0" placeholder="g"
          value={macros[3] !== -1 ? macros[3] : undefined}
          onChange={(e) => handleChangeMacros("totalGrams", e)}
        />
        {submitError.macrosError && <span>{submitError.macrosErrorMessage}</span>}
      </FieldSet>

      <FieldSet>
        <label>Imagem</label>
        <input 
          type="file" id="Image" name="Image"
          accept="image/png, image/gif, image/jpeg" title="Selecione"
          onChange={handleChangeFile}
        />
      </FieldSet>

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

