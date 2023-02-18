import { AdaptedIngredient, AdaptedRecipe, RecipeInput } from "@controllers/AdaptedTypes"
import { Id } from "@domain/utilities/types/Id"
import useTheme from "@infra/ui/hooks/useTheme"
import { Dropdown, DropdownItem, FieldSet, FormContainer, MacrosList, InputField, SelectField, SubmitContainer } from "@infra/ui/components/forms/Form/styles"
import { Span, Subtitle, Text } from "@infra/ui/components/styles"
import React, { ChangeEvent, FormEvent, MouseEvent, useEffect, useMemo, useRef, useState } from "react"
import Button from "../buttons/Button"
import Card from "../cards/Card"
import Icon from "../icons/_Icon"
import Table from "../tables/Table"
import List from "../lists/List"




type RecipeFormProps = ({
  variant: "Create"
  events: {
    submitEvent: (input: RecipeInput) => void
  }
} | {
  variant: "Update"
  recipe: AdaptedRecipe
  events: {
    submitEvent: (input: RecipeInput, id: Id) => void
  }
}) & ({
  data: {
    loading: true
  } | {
    loading: false
    ingredients: AdaptedIngredient[]
  }
})




const typeTranslator = {
  "Week": "Receita de semana",
  "Weekend": "Receita de fim de semana",
  "Both": "Indiferente"
}




type SubmitErrors = ({
  name: false
} | {
  name: true
  nameMessage: string
}) & ({
  ingredients: false
} | {
  ingredients: true
  ingredientsMessage: string
}) & ({
  type: false
} | {
  type: true
  typeMessage: string
})




export default function RecipeForm(props: RecipeFormProps) {
  const { loading } = props.data
  let initialName = ""
  let initialType: "Week" | "Weekend" | "Both" | "" = ""
  let initialDescription = ""
  let initialIngredients: [AdaptedIngredient, string][] = []
  let initialImageUrl = ""
  if (props.variant === "Update") {
    initialName = props.recipe.name
    initialType = props.recipe.type
    initialDescription = props.recipe.description || ""
    initialIngredients = props.recipe.ingredients?.map(
      item => [item[0], item[1].toString()]
    ) || []
    initialImageUrl = props.recipe.imageUrl || ""
  }

  
  // Data States and handlers

  const [name, setName] = useState<string>(initialName)
  const [type, setType] = useState<"Week" | "Weekend" | "Both" | "">(initialType)
  const [description, setDescription] = useState<string>(initialDescription)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [ingredients, setIngredients] = useState<[AdaptedIngredient, string][]>(initialIngredients)
  const [submitError, setSubmitError] = useState<SubmitErrors>({
    name: false,
    ingredients: false,
    type: false
  })

  function handleChangeName(e: ChangeEvent<HTMLInputElement>) {
    setSubmitError((state): SubmitErrors => ({
      ...state,
      name: false
    }))
    setName(e.target.value)
  }

  function handleChangeType(t: "Week" | "Weekend" | "Both") {
    setSubmitError((state): SubmitErrors => ({
      ...state,
      type: false
    }))
    switch (t) {
    case "Week": {
      const newType = (type !== "Week") ? "Week" : ""
      return setType(newType)
    }
    case "Weekend": {
      const newType = (type !== "Weekend") ? "Weekend" : ""
      return setType(newType)
    }
    case "Both": {
      const newType = (type !== "Both") ? "Both" : ""
      return setType(newType)
    }
    default: {
      return setType("")
    }
    }
  }

  function handleChangeIngredients(ing: AdaptedIngredient) {
    if (ingredients.some(i => i[0].id === ing.id))
      setIngredients(ingredients.filter(i => i[0].id !== ing.id))
    else
      setIngredients([...ingredients, [ing, ""]])
  }

  function handleChangeGrams(id: Id, value: string) {
    setSubmitError((state): SubmitErrors => ({
      ...state,
      ingredients: false
    }))
    const index = ingredients.findIndex(item => item[0].id === id)
    const ing = ingredients[index]
    if (!ing) {
      setSubmitError((state): SubmitErrors => ({
        ...state,
        ingredients: true,
        ingredientsMessage: "Erro - Não foi possível encontrar o ingrediente (contatar desenvolvedor)"
      }))
      return
    }
    ing[1] = value
    ingredients[index] = ing
    setIngredients(ingredients)
  }

  function handleChangeFile(e: ChangeEvent<HTMLInputElement>) {
    setImageFile(e.target.files?.[0] || null)
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const invalidName = !name
    const invalidType = !type
    const invalidIngredients = ingredients.some(i => !i[1])

    if (invalidName || invalidIngredients || invalidType) {
      if (invalidName)
        setSubmitError((state): SubmitErrors => ({
          ...state,
          name: true,
          nameMessage: "A receita deve ter um nome!"
        }))
      if (invalidIngredients)
        setSubmitError((state): SubmitErrors => ({
          ...state,
          ingredients: true,
          ingredientsMessage: "Todos os ingredientes devem ter uma quantidade em gramas!"
        }))
      if (invalidType)
        setSubmitError((state): SubmitErrors => ({
          ...state,
          type: true,
          typeMessage: "A receita deve ter um tipo!"
        }))
      return
    }

    const recipeInput: RecipeInput = {
      name, type, description,
      ...(imageFile ? { imageFile } : null),
      initialImageUrl,
      ...(!invalidIngredients ? {
        ingredients: ingredients.map(i => [i[0], parseFloat(i[1])])
      } : null)
    }

    if (props.variant === "Create")
      props.events.submitEvent(recipeInput)
    else
      props.events.submitEvent(recipeInput, props.recipe.id)
  }




  // Auxiliar states, variables, handlers and effects

  const { breakpoints } = useTheme().theme
  
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false)
  const [search, setSearch] = useState<string>("")
  const [ingOptions, setIngOptions] = useState<AdaptedIngredient[]>([])
  const [showTypesDropdown, setShowTypesDropdown] = useState<boolean>(false)
  const [showIngOptionsDropdown, setShowIngOptionsDropdown] = useState<boolean>(false)

  const typeSelectionRef = useRef<HTMLFieldSetElement>(null)
  const typesDropdownRef = useRef<HTMLUListElement>(null)

  const ingredientsSearchRef = useRef<HTMLDivElement>(null)
  const ingredientsDropdownRef = useRef<HTMLUListElement>(null)
  
  function handleCloseDropdowns(e: MouseEvent) {
    if (!typeSelectionRef.current?.contains(e.target as Node)) {
      setShowTypesDropdown(false)
    }
    if (!ingredientsDropdownRef.current?.contains(e.target as Node)
      && !ingredientsSearchRef.current?.contains(e.target as Node)) {
      setShowIngOptionsDropdown(false)
    }
  }
  function handleChangeSearch(e: ChangeEvent<HTMLInputElement>) {
    setSubmitError((state): SubmitErrors => ({
      ...state,
      ingredients: false
    }))
    setSearch(e.target.value)
  }

  useEffect(() => {
    if (props.data.loading) return setIngOptions([])
    setIngOptions(props.data.ingredients.filter(
      i => i.name.includes(search)))
  }, [search, loading])

  useEffect(() => {
    const mediaWatcher = window.matchMedia(breakpoints.md)
    setIsSmallScreen(!mediaWatcher.matches)

    function update(value: boolean) {
      setIsSmallScreen(value)
    }

    mediaWatcher.addEventListener("change", () => update(!mediaWatcher.matches))

    return () => {
      mediaWatcher.removeEventListener("change", () => update(!mediaWatcher.matches))
    }
  }, [])
    
  return (
    <FormContainer
      onClick={handleCloseDropdowns}
      onSubmit={handleSubmit}
      onScroll={() => setShowIngOptionsDropdown(false)}
      autoComplete="off"
    >

      


      {/* Name Input */}
      <FieldSet errorStatus={submitError.name}>
        <label>Nome</label>
        <InputField errorStatus={submitError.name}>
          <input type="text" id="nome" name="nome"
            placeholder="Nome"
            value={name}
            onChange={handleChangeName}
          />
        </InputField>
        {submitError.name && <span>{submitError.nameMessage}</span>}
      </FieldSet>

      
      

      {/* Ingredients Input */}
      <FieldSet errorStatus={submitError.ingredients}>
        <label>Ingredientes</label>
        <InputField
          ref={ingredientsSearchRef}
          onClick={() => setShowIngOptionsDropdown(true)}
          errorStatus={submitError.ingredients}
        >
          {useMemo(() => (
            <Icon variant={loading ? "Spinner" : "Search"} size={20} />
          ), [loading])}
          <input type="text" id="searchIngredients" name="searchIngredients"
            placeholder="Pesquisar"
            value={search}
            onChange={handleChangeSearch}
          />  
        </InputField>
        <Dropdown
          ref={ingredientsDropdownRef}
          style={{display: showIngOptionsDropdown && !loading && ingOptions.length > 0 ? "block" : "none"}}
        >
          {ingOptions.map(
            opt => (
              <DropdownItem key={opt.id}
                active={ingredients.some(i => i[0].id === opt.id)}
                onClick={() => handleChangeIngredients(opt)}
              >
                <div>
                  <Text>{opt.name}</Text>
                  <Subtitle>{opt.description}</Subtitle>
                </div>
                {opt.macros && (
                  <MacrosList>
                    <li><Span>P: {opt.macros[0].toFixed(2)}g</Span></li>
                    <li><Span>C: {opt.macros[1].toFixed(2)}g</Span></li>
                    <li><Span>G: {opt.macros[2].toFixed(2)}g</Span></li>
                  </MacrosList>
                )}
                <Icon
                  variant={
                    ingredients.some(i => i[0].id === opt.id)
                      ? "Check"
                      : "CheckEmpty"
                  } size={20}
                />
              </DropdownItem>
            ))}
        </Dropdown>
        {ingredients.length > 0 && (
          <>
            { !isSmallScreen ? (
              <Table
                variant="IngredientSelection"
                errorStatus={submitError.ingredients}
                handleChangeGrams={handleChangeGrams}
                ingredients={ingredients}
              />
            ) : (
              <List
                variant="IngredientSelection"
                ingredients={ingredients}
                errorStatus={submitError.ingredients}
                handleChangeGrams={handleChangeGrams}
              />
            )}
          </>
        )}
        {submitError.ingredients && <span>{submitError.ingredientsMessage}</span>}
      </FieldSet>

      


      {/* Type selection */}
      <FieldSet errorStatus={submitError.type}>
        <label>Tipo</label>
        <SelectField
          onClick={() => setShowTypesDropdown(true)}
          ref={typeSelectionRef}
          selected={type !== undefined}
          errorStatus={submitError.type}
        >
          {type ? typeTranslator[type] : "Selecione"}
        </SelectField>
        {submitError.type && <span>{submitError.typeMessage}</span>}
        <Dropdown ref={typesDropdownRef}
          style={{ display: showTypesDropdown ? "block" : "none" }}
        >
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
      </FieldSet>

      

      
      {/* Description selection */}
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

      

      
      {/* Image selection */}
      <FieldSet>
        <label>Imagem</label>
        <input
          type="file" accept="image/png, image/gif, image/jpeg"
          onChange={handleChangeFile}
        />
      </FieldSet>

      


      {/* Submit */}
      <SubmitContainer>
        <Button type="submit" variant="styled" text="Criar" />
      </SubmitContainer>

      
      
    </FormContainer>
  )
}