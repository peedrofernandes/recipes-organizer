import { AdaptedIngredient, AdaptedRecipe } from "@controllers/AdaptedTypes"
import { Id } from "@domain/utilities/types/Id"
import { Values } from "@domain/utilities/types/Values"
import { FieldSet, FormContainer, Input, InputStyles, Option, Select, SelectTitle, SubmitContainer } from "@infra/ui/styles/formStyles"
import React, { ChangeEvent, MouseEvent, useEffect, useRef, useState } from "react"
import Button from "../buttons/_Button"

console.log(`Input Styles at third file: ${InputStyles}`)
console.log(`Input component: ${Input}`)

type RecipeFormProps = {
  variant: "Create"
  data: {
    loading: true
  } | {
    loading: false
    ingredients: AdaptedIngredient[]
  }
} | {
  variant: "Update"
  id: Id
  currentValues: Values<AdaptedRecipe>
  data: {
    loading: true
  } | {
    loading: false
    ingredients: AdaptedIngredient[]
  }
  ingredients: AdaptedIngredient[]
}

const typeTranslator = {
  "Week": "Receita de semana",
  "Weekend": "Receita de fim de semana",
  "Both": "Indiferente"
}

export default function RecipeForm(props: RecipeFormProps) {
  const { loading } = props.data

  const [name, setName] = useState<string>()
  const [type, setType] = useState<"Week" | "Weekend" | "Both" | undefined>()
  const [description, setDescription] = useState<string>("")
  const [showDropdown, setShowDropdown] = useState<boolean>(false)
  const [search, setSearch] = useState<string>("")
  const [ingOptions, setIngOptions] = useState<AdaptedIngredient[]>([])

  const dropdownTitleRef = useRef<HTMLFieldSetElement>(null)
  function handleCloseDropdowns(e: MouseEvent) {
    if (!dropdownTitleRef.current?.contains(e.target as Node)) {
      setShowDropdown(false)
    }
  }

  function handleChangeType(t: "Week" | "Weekend" | "Both") {
    switch (t) {
    case "Week": {
      const newType = (type !== "Week") ? "Week" : undefined
      return setType(newType)
    }
    case "Weekend": {
      const newType = (type !== "Weekend") ? "Weekend" : undefined
      return setType(newType)
    }
    case "Both": {
      const newType = (type !== "Both") ? "Both" : undefined
      return setType(newType)
    }
    default: {
      return setType(undefined)
    }
    }
  }

  function handleChangeSearch(e: ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value)
  }

  useEffect(() => {
    if (loading) return

    if (search === "")
      setIngOptions([])
    else
      setIngOptions(props.data.ingredients.filter(i => i.name.includes(search)))
  }, [search, loading])
  return (
    <FormContainer onClick={(e) => handleCloseDropdowns(e)}>

      <FieldSet>
        <label>Nome</label>
        <Input type="text" id="nome" name="nome"
          placeholder="Nome"
          value={name}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
        />
      </FieldSet>

      <FieldSet>
        <label>Ingredientes</label>
        <Input type="text" id="searchIngredients" name="searchIngredients"
          placeholder="Pesquisar"
          value={search}
          onChange={handleChangeSearch}
        />
        {ingOptions.length > 0 && (
          <Select>
            {ingOptions.map(opt => <Option key={opt.id}>{opt.name}</Option>)}
          </Select>
        )}
      </FieldSet>

      <FieldSet>
        <label>Tipo</label>
        <SelectTitle
          onClick={() => setShowDropdown(dropdown => !dropdown)}
          ref={dropdownTitleRef}
          selected={type !== undefined}
        >
          {type !== undefined ? typeTranslator[type] : "Selecione"}
        </SelectTitle>
        {showDropdown && (
          <Select>
            <Option active={type === "Week"} onClick={() => handleChangeType("Week")}>
              {typeTranslator["Week"]}
            </Option>
            <Option active={type === "Weekend"} onClick={() => handleChangeType("Weekend")}>
              {typeTranslator["Weekend"]}
            </Option>
            <Option active={type === "Both"} onClick={() => handleChangeType("Both")}>
              {typeTranslator["Both"]}
            </Option>
          </Select>
        )}
      </FieldSet>

      <FieldSet>
        <label>Descrição</label>
        <Input type="text" id="description" name="description"
          placeholder="Descrição"
          value={description}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
        />
      </FieldSet>

      <SubmitContainer>
        <Button variant="styled" text="Criar"></Button>
      </SubmitContainer>

    </FormContainer>
  )
}