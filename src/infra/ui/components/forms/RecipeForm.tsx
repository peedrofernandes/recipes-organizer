import { AdaptedIngredient, AdaptedRecipe } from "@controllers/AdaptedTypes"
import { Id } from "@domain/utilities/types/Id"
import { Values } from "@domain/utilities/types/Values"
import { Dropdown, DropdownItem, FieldSet, FormContainer, IngredientListItem, IngredientMacrosSpan, InputField, SelectTitle, SubmitContainer } from "@infra/ui/styles/formStyles"
import { Span, Subtitle, Text } from "@infra/ui/styles/generalStyles"
import React, { ChangeEvent, FormEvent, MouseEvent, useEffect, useMemo, useRef, useState } from "react"
import Button from "../buttons/_Button"
import Icon from "../icons/_Icon"




type RecipeFormProps = ({
  variant: "Create"
  events: {
    submitEvent: (values: Values<AdaptedRecipe>) => void
  }
} | {
  variant: "Update"
  id: Id
  currentValues: Values<AdaptedRecipe>
  events: {
    submitEvent: (id: Id, values: Values<AdaptedRecipe>) => void
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



  
  // Data States and handlers

  const [name, setName] = useState<string>("")
  const [type, setType] = useState<"Week" | "Weekend" | "Both" | "">("")
  const [description, setDescription] = useState<string>("")
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [ingredients, setIngredients] = useState<[AdaptedIngredient, string][]>([])
  const [submitError, setSubmitError] = useState<SubmitErrors>({
    name: false,
    ingredients: false,
    type: false
  })

  function handleChangeName(e: ChangeEvent<HTMLInputElement>) {
    setSubmitError(state => ({
      ...state,
      name: false
    }))
    setName(e.target.value)
  }

  function handleChangeType(t: "Week" | "Weekend" | "Both") {
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

  function handleChangeGrams(e: ChangeEvent<HTMLInputElement>, id: Id) {
    const index = ingredients.findIndex(item => item[0].id === id)
    const ing = ingredients[index]
    if (!ing) {
      setSubmitError(state => ({
        ...state,
        ingredients: true,
        ingredientsMessage: "Erro - Não foi possível encontrar o ingrediente (contatar desenvolvedor)"
      }))
      return
    }
    ing[1] = e.target.value
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
        setSubmitError(state => ({
          ...state,
          name: true,
          nameMessage: "A receita deve ter um nome!"
        }))
      if (invalidIngredients)
        setSubmitError(state => ({
          ...state,
          ingredients: true,
          ingredientsMessage: "Todos os ingredientes devem ter uma quantidade em gramas!"
        }))
      if (invalidType)
        setSubmitError(state => ({
          ...state,
          type: true,
          typeMessage: "A receita deve ter um tipo!"
        }))
      return
    }

    const adaptedRecipe: Values<AdaptedRecipe> = {
      name, type, description,
      ...(imageFile ? { imageFile } : null),
      ...(!invalidIngredients ? {
        ingredients: ingredients.map(i => [i[0], parseFloat(i[1])])
      } : null)
    }

    if (props.variant === "Create")
      props.events.submitEvent(adaptedRecipe)
    else
      props.events.submitEvent(props.id, adaptedRecipe)
  }




  // Auxiliar states, variables, handlers and effects
  
  const [search, setSearch] = useState<string>("Arr")
  const [ingOptions, setIngOptions] = useState<AdaptedIngredient[]>([])
  const [showTypesDropdown, setShowTypesDropdown] = useState<boolean>(false)
  const [showIngOptionsDropdown, setShowIngOptionsDropdown] = useState<boolean>(false)

  const typesTitleRef = useRef<HTMLFieldSetElement>(null)
  const searchOptionsRef = useRef<HTMLUListElement>(null)
  const searchInputRef = useRef<HTMLDivElement>(null)
  function handleCloseDropdowns(e: MouseEvent) {
    if (!typesTitleRef.current?.contains(e.target as Node)) {
      setShowTypesDropdown(false)
    }
    if (!searchOptionsRef.current?.contains(e.target as Node)
      && !searchInputRef.current?.contains(e.target as Node)) {
      setShowIngOptionsDropdown(false)
    }
  }
  function handleChangeSearch(e: ChangeEvent<HTMLInputElement>) {
    setSubmitError(state => ({
      ...state,
      ingredients: false
    }))
    setSearch(e.target.value)
  }

  useEffect(() => {
    if (props.data.loading || !search) return setIngOptions([])
    setIngOptions(props.data.ingredients.filter(
      i => i.name.includes(search)))
    setShowIngOptionsDropdown(true)
  }, [search, loading])

  return (
    <FormContainer onClick={(e) => handleCloseDropdowns(e)} onSubmit={handleSubmit}>

      


      {/* Name Input */}
      <FieldSet error={submitError.name}>
        <label>Nome</label>
        <InputField error={submitError.name}>
          <input type="text" id="nome" name="nome"
            placeholder="Nome"
            value={name}
            onChange={handleChangeName}
          />
        </InputField>
        {submitError.name && <span>{submitError.nameMessage}</span>}
      </FieldSet>

      
      

      {/* Ingredients Input */}
      <FieldSet error={submitError.ingredients}>
        <label>Ingredientes</label>
        <InputField
          ref={searchInputRef}
          onClick={() => setShowIngOptionsDropdown(true)}
          error={submitError.ingredients}
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
        {submitError.ingredients && <span>{submitError.ingredientsMessage}</span>}
        {showIngOptionsDropdown && !loading && ingOptions.length > 0 && (
          <Dropdown ref={searchOptionsRef}>
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
                    <IngredientMacrosSpan>
                      <li><Span>P: {opt.macros[0].toFixed(2)}g</Span></li>
                      <li><Span>C: {opt.macros[1].toFixed(2)}g</Span></li>
                      <li><Span>G: {opt.macros[2].toFixed(2)}g</Span></li>
                    </IngredientMacrosSpan>
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
        )}
        {ingredients.length > 0 && (
          <div>
            {ingredients.map(i => (
              <IngredientListItem key={i[0].id}>
                <div>
                  <Text>{i[0].name}</Text>
                  <Subtitle>{i[0].description}</Subtitle>
                </div>
                <InputField error={submitError.ingredients}>
                  <input
                    type="number"
                    placeholder="Gramas totais"
                    onChange={(e) => handleChangeGrams(e, i[0].id)}
                  />
                </InputField>
              </IngredientListItem>
            ))}
          </div>
        )}
      </FieldSet>

      


      {/* Type selection */}
      <FieldSet>
        <label>Tipo</label>
        <SelectTitle
          onClick={() => setShowTypesDropdown(true)}
          ref={typesTitleRef}
          selected={type !== undefined}
        >
          {type ? typeTranslator[type] : "Selecione"}
        </SelectTitle>
        {showTypesDropdown && (
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