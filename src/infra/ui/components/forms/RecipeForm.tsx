import { AdaptedIngredient, AdaptedRecipe, RecipeInput } from "@controllers/AdaptedTypes"
import { Id } from "@domain/utilities/types/Id"
import { Dropdown, DropdownItem, FieldSet, FormContainer, IngredientListItem, IngredientMacrosSpan, IngredientTable, InputField, SelectField, SubmitContainer } from "@infra/ui/styles/formStyles"
import { Span, Subtitle, Text } from "@infra/ui/styles/generalStyles"
import React, { ChangeEvent, FormEvent, MouseEvent, useEffect, useMemo, useRef, useState } from "react"
import Button from "../buttons/_Button"
import Icon from "../icons/_Icon"




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

  function handleChangeGrams(e: ChangeEvent<HTMLInputElement>, id: Id) {
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
  
  const [search, setSearch] = useState<string>("")
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
    setSubmitError((state): SubmitErrors => ({
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
          <IngredientTable>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Proteínas</th>
                <th>Carboidratos</th>
                <th>Gorduras</th>
                <th>Gramas Totais</th>
              </tr>
            </thead>
            <tbody>
              {ingredients.map((i, index) => (
                <tr key={index}>
                  <td>
                    <Text>{i[0].name}</Text>
                    <Subtitle>{i[0].description}</Subtitle>
                  </td>
                  <td>{i[0].macros ? i[0].macros[0].toFixed(2) + "g" : "-"}</td>
                  <td>{i[0].macros ? i[0].macros[1].toFixed(2) + "g" : "-"}</td>
                  <td>{i[0].macros ? i[0].macros[2].toFixed(2) + "g" : "-"}</td>
                  <td>
                    <InputField error={submitError.ingredients}>
                      <input
                        type="number"
                        placeholder="Gramas totais"
                        onChange={(e) => handleChangeGrams(e, i[0].id)}
                        value={ingredients[index][1]}
                      />
                    </InputField>
                  </td>
                </tr>
              ))}
            </tbody>
          </IngredientTable>
        )}
        {submitError.ingredients && <span>{submitError.ingredientsMessage}</span>}
      </FieldSet>

      


      {/* Type selection */}
      <FieldSet error={submitError.type}>
        <label>Tipo</label>
        <SelectField
          onClick={() => setShowTypesDropdown(true)}
          ref={typesTitleRef}
          selected={type !== undefined}
          error={submitError.type}
        >
          {type ? typeTranslator[type] : "Selecione"}
        </SelectField>
        {submitError.type && <span>{submitError.typeMessage}</span>}
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