import { AdaptedIngredient, AdaptedRecipe } from "@controllers/AdaptedTypes"
import { Id } from "@domain/utilities/types/Id"
import { Values } from "@domain/utilities/types/Values"
import { Dropdown, DropdownItem, FieldSet, FormContainer, IngredientListItem, IngredientMacrosSpan, InputField, SelectTitle, SubmitContainer } from "@infra/ui/styles/formStyles"
import { Span, Subtitle, Text } from "@infra/ui/styles/generalStyles"
import React, { ChangeEvent, MouseEvent, useEffect, useMemo, useRef, useState } from "react"
import Button from "../buttons/_Button"
import Icon from "../icons/_Icon"

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
  const [search, setSearch] = useState<string>("Arr")
  const [ingOptions, setIngOptions] = useState<AdaptedIngredient[]>([])
  const [selectedIngs, setSelectedIngs] = useState<AdaptedIngredient[]>([])
  
  const [showTypes, setShowTypes] = useState<boolean>(false)
  const [showIngOptions, setShowIngOptions] = useState<boolean>(false)
  const typesTitleRef = useRef<HTMLFieldSetElement>(null)
  const searchOptionsRef = useRef<HTMLUListElement>(null)
  const searchInputRef = useRef<HTMLDivElement>(null)
  function handleCloseDropdowns(e: MouseEvent) {
    if (!typesTitleRef.current?.contains(e.target as Node)) {
      setShowTypes(false)
    }
    if (!searchOptionsRef.current?.contains(e.target as Node)
      && !searchInputRef.current?.contains(e.target as Node)) {
      setShowIngOptions(false)
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
    setShowIngOptions(true)
    setSearch(e.target.value)
  }

  function handleSelectedIngredients(ing: AdaptedIngredient) {
    if (selectedIngs.includes(ing))
      setSelectedIngs(selectedIngs.filter(i => i.id !== ing.id))
    else
      setSelectedIngs([...selectedIngs, ing])
      
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

      {/* Input de Nome */}
      <FieldSet>
        <label>Nome</label>
        <InputField>
          <input type="text" id="nome" name="nome"
            placeholder="Nome"
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
          />
        </InputField>
      </FieldSet>

      {/* Seleção de Ingredientes */}
      <FieldSet>
        <label>Ingredientes</label>

        <InputField ref={searchInputRef} onClick={() => setShowIngOptions(true)}>
          {useMemo(() => (
            <Icon variant={loading ? "Spinner" : "Search"} size={20} />
          ), [loading])}
          <input type="text" id="searchIngredients" name="searchIngredients"
            placeholder="Pesquisar"
            value={search}
            onChange={handleChangeSearch}
          />  
        </InputField>

        {showIngOptions && !loading && ingOptions.length > 0 && (
          <Dropdown ref={searchOptionsRef}>
            {ingOptions.map(
              opt => (
                <DropdownItem key={opt.id}
                  active={selectedIngs.includes(opt)}
                  onClick={() => handleSelectedIngredients(opt)}
                >
                  <div>
                    <Text>{opt.name}</Text>
                    <Subtitle>{opt.description}</Subtitle>
                  </div>

                  {opt.macros && (
                    <IngredientMacrosSpan>
                      <li><Span>P: {opt.macros[0].toFixed(2)}g</Span></li>
                      <li><Span>C: {opt.macros[1].toFixed(2)}g</Span></li>
                      <li><Span>G: {opt.macros[2].toFixed(2)}g</Span></li>
                    </IngredientMacrosSpan>
                  )}

                  <Icon variant={selectedIngs.includes(opt) ? "Check" : "CheckEmpty"} size={20} />
                </DropdownItem>
              ))}
          </Dropdown>
        )}

        {selectedIngs.length > 0 && (
          <div>
            {selectedIngs.map(i => (
              <IngredientListItem key={i.id}>
                <div>
                  <Text>{i.name}</Text>
                  <Subtitle>{i.description}</Subtitle>
                </div>
                <InputField>
                  <input type="number" placeholder="Gramas totais" />
                </InputField>
              </IngredientListItem>
            ))}
          </div>
        )}

      </FieldSet>

      {/* Seleção de tipo */}
      <FieldSet>
        <label>Tipo</label>
        <SelectTitle
          onClick={() => setShowTypes(true)}
          ref={typesTitleRef}
          selected={type !== undefined}
        >
          {type !== undefined ? typeTranslator[type] : "Selecione"}
        </SelectTitle>
        {showTypes && (
          <Dropdown>
            <DropdownItem active={type === "Week"} onClick={() => handleChangeType("Week")}>
              {typeTranslator["Week"]}
            </DropdownItem>
            <DropdownItem active={type === "Weekend"} onClick={() => handleChangeType("Weekend")}>
              {typeTranslator["Weekend"]}
            </DropdownItem>
            <DropdownItem active={type === "Both"} onClick={() => handleChangeType("Both")}>
              {typeTranslator["Both"]}
            </DropdownItem>
          </Dropdown>
        )}
      </FieldSet>

      {/* Input da descrição */}
      <FieldSet>
        <label>Descrição</label>
        <InputField>
          <input type="text" id="description" name="description"
            placeholder="Descrição"
            value={description}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
          />
        </InputField>
      </FieldSet>

      {/* Submit */}
      <SubmitContainer>
        <Button variant="styled" text="Criar"></Button>
      </SubmitContainer>

      
    </FormContainer>
  )
}