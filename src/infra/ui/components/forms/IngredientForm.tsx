import { AdaptedIngredient } from "@controllers/AdaptedTypes"
import { DeepPartial } from "@domain/utilities/types/DeepPartial"
import { Id } from "@domain/utilities/types/Id"
import { OptionalValues } from "@domain/utilities/types/Values"
import React, { useState } from "react"
import Button from "../buttons/_Button"
import { FieldSet, FormContainer, InputBox, SubmitContainer } from "./_Form"

type IngredientFormProps = {
  variant: "Create",
  events: {
    submitEvent: (values: OptionalValues<AdaptedIngredient>) => void;
  }
} | {
  variant: "Update",
  id: Id,
  events: {
    submitEvent: (id: Id, values: OptionalValues<AdaptedIngredient>) => void;
  }
}

export default function IngredientForm(props: IngredientFormProps) {
  const [name, setName] = useState<string>()
  const [description, setDescription] = useState<string>()
  const [macros, setMacros] = useState<DeepPartial<[number, number, number, number]>>()
  const [imageFile, setImageFile] = useState<File>()

  const handleChangeMacros = (
    type: "proteins" | "carbs" | "fats" | "totalGrams",
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const v = e.target.valueAsNumber

    switch (type) {
    case "proteins":
      setMacros([v, macros?.[1], macros?.[2], macros?.[3]])
      break
    case "carbs":
      setMacros([macros?.[0], v, macros?.[2], macros?.[3]])
      break
    case "fats":
      setMacros([macros?.[0], macros?.[1], v, macros?.[3]])
      break
    case "totalGrams":
      setMacros([macros?.[0], macros?.[1], macros?.[2], v])
      break
    }
  }

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageFile(e.target.files?.[0])
    console.log("File name:", imageFile?.name)
    console.log("File size:", imageFile?.size, "bytes")
    console.log("File type:", imageFile?.type)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const ingredientValues: OptionalValues<AdaptedIngredient> = {
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
      <label>Nome*</label>
      <input
        type="text" id="nome" name="nome"
        placeholder="Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>Descrição</label>
      <input
        type="text"
        id="description"
        name="description"
        placeholder="Descrição"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <legend>Macronutrientes</legend>

      <FieldSet>
        <InputBox>
          <label>Proteínas</label>
          <input
            type="number"
            min="0"
            id="proteins"
            name="proteins"
            placeholder="g"
            value={macros?.[0]}
            onChange={(e) => handleChangeMacros("proteins", e)}
          />
        </InputBox>
        <InputBox>
          <label>Carboidratos</label>
          <input
            type="number"
            min="0"
            id="proteins"
            name="proteins"
            placeholder="g"
            value={macros?.[1]}
            onChange={(e) => handleChangeMacros("carbs", e)}
          />
        </InputBox>
        <InputBox>
          <label>Gorduras</label>
          <input
            type="number"
            min="0"
            id="proteins"
            name="proteins"
            placeholder="g"
            value={macros?.[2]}
            onChange={(e) => handleChangeMacros("fats", e)}
          />
        </InputBox>

      </FieldSet>

      <label>Gramas totais</label>
      <input
        type="number"
        min="0"
        id="totalGrams"
        name="totalGrams"
        placeholder="g"
        value={macros?.[3]}
        onChange={(e) => handleChangeMacros("totalGrams", e)}
      />

      <label>Imagem</label>
      <input
        type="file" accept="image/png, image/gif, image/jpeg" title=" Selecione"
        id="Image"
        name="Image"
        onChange={handleChangeFile}
      />

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

