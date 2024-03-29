import { AdaptedIngredient, AdaptedRecipe, RecipeInput } from "@controllers/AdaptedTypes"
import { Id } from "@domain/utilities/types/Id"
import { DropdownItem, FieldSet, FormContainer, MacrosList, InputField, SubmitContainer } from "@infra/ui/components/forms/Form/styles"
import { Span, Subtitle, Text } from "@infra/ui/components/styles"
import React, { ChangeEvent, FormEvent, MouseEvent, useRef, useState } from "react"
import Button from "../buttons/Button"
import Icon from "../icons/Icon"
import Table from "../tables/Table"
import List from "../lists/List"
import useViewportTracker from "@infra/ui/hooks/useViewportTracker"
import Input from "../inputs/Input"
import { SelectInputRefs } from "../inputs/SelectInput"



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


type Error = {
  status: false
} | {
  status: true
  message: string
}


export default function RecipeForm(props: RecipeFormProps) {
  // Auxiliar states, variables, handlers and visual effects

  const viewportState = useViewportTracker()
  
  const typesDropdownState = useState<boolean>(false)
  const [, setShowTypesDropdown] = typesDropdownState
  
  const ingredientsDropdownState = useState<boolean>(false)
  const [, setShowIngOptionsDropdown] = ingredientsDropdownState
  
  const typesRef = useRef<SelectInputRefs>(null)
  const selectRef = useRef<SelectInputRefs>(null)
  function handleCloseDropdowns(e: MouseEvent) {
    const ingsDropdownRef = selectRef.current?.dropdownRef
    const ingsBoxRef = selectRef.current?.searchRef
  
    const typesBoxRef = typesRef.current?.searchRef
  
    const isInvalidRefs = (
      !ingsBoxRef?.current || !typesBoxRef?.current 
    )
  
    if (isInvalidRefs)
      return
  
    const eventClickContainsTypesBox =
        typesBoxRef.current?.contains(e.target as Node)
    if (!eventClickContainsTypesBox) {
      setShowTypesDropdown(false)
    }
  
    const eventClickContainsIngsDropdown =
        ingsDropdownRef?.current?.contains(e.target as Node)
    const eventClickContainsIngsBox =
        ingsBoxRef.current.contains(e.target as Node)
    if (!eventClickContainsIngsDropdown && !eventClickContainsIngsBox) {
      setShowIngOptionsDropdown(false)
    }
  }

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
  function handleChangeName(e: ChangeEvent<HTMLInputElement>) {
    setNameError({ status: false })
    setName(e.target.value)
  }

  const [type, setType] = useState<"Week" | "Weekend" | "Both" | "">(initialType)
  function handleChangeType(t: "Week" | "Weekend" | "Both") {
    setTypeError({ status: false })
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

  const [description, setDescription] = useState<string>(initialDescription)


  const [imageFile, setImageFile] = useState<File | null>(null)
  function handleChangeFile(e: ChangeEvent<HTMLInputElement>) {
    setImageFile(e.target.files?.[0] || null)
  }

  const [ingredients, setIngredients] = useState<[AdaptedIngredient, string][]>(initialIngredients)
  function handleChangeIngredients(ing: AdaptedIngredient) {
    if (ingredients.some(i => i[0].id === ing.id))
      setIngredients(ingredients.filter(i => i[0].id !== ing.id))
    else
      setIngredients([...ingredients, [ing, ""]])
  }
  function handleChangeGrams(id: Id, value: string) {
    setIngredientsError({ status: false })
    const index = ingredients.findIndex(item => item[0].id === id)
    const ing = ingredients[index]
    if (!ing) {
      setIngredientsError({
        status: true,
        message: "Erro - Não foi possível encontrar o ingrediente (contatar desenvolvedor)"
      })
      return
    }
    ing[1] = value
    ingredients[index] = ing
    setIngredients(ingredients)
  }

  // Errors and submit logic
  const nameErrorState = useState<Error>({ status: false })
  const [nameError, setNameError] = nameErrorState

  const ingredientsErrorState = useState<Error>({ status: false })
  const [ingredientsError, setIngredientsError] = ingredientsErrorState

  const typeErrorState = useState<Error>({ status: false })
  const [, setTypeError] = typeErrorState

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const invalidName = !name
    const invalidType = !type
    const invalidIngredients = ingredients.some(i => !i[1])

    if (invalidName || invalidIngredients || invalidType) {
      if (invalidName)
        setNameError({
          status: true,
          message: "A receita deve ter um nome!"
        })
      if (invalidIngredients)
        setIngredientsError({
          status: true,
          message: "Todos os ingredientes devem ter uma quantidade em gramas!"
        })
      if (invalidType)
        setTypeError({
          status: true,
          message: "A receita deve ter um tipo!"
        })
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
    
  return (
    <FormContainer
      onClick={handleCloseDropdowns}
      onSubmit={handleSubmit}
      onScroll={() => setShowIngOptionsDropdown(false)}
      autoComplete="off"
    >

      


      {/* Input Name */}
      <FieldSet errorStatus={nameError.status}>
        <label>Nome</label>
        <InputField errorStatus={nameError.status}>
          <input type="text" id="nome" name="nome"
            placeholder="Nome"
            value={name}
            onChange={handleChangeName}
          />
        </InputField>
        {nameError.status && <Span>{nameError.message}</Span>}
      </FieldSet>


      {/* Ingredients Select */}
      <Input<AdaptedIngredient> variant="select"
        id="SelectIngredients" name="SelectIngredients"
        label="Ingredientes" errorState={ingredientsErrorState}
        ref={selectRef}
        data={props.data.loading ? { loading: true } : {
          loading: false,
          options: props.data.ingredients,
          searchableProp: (ing) => ing.name
        }}
        dropdownState={ingredientsDropdownState}
        createOptions={(opt) => (
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
        )}
      />

      

      {/* Show Selected Ingredients */}
      {ingredients.length > 0 && (
        <FieldSet errorStatus={ingredientsError.status}>
          { viewportState.md ? (
            <Table
              variant="IngredientSelection"
              errorState={ingredientsErrorState}
              handleChangeGrams={handleChangeGrams}
              ingredients={ingredients}
            />
          ) : (
            <List
              variant="IngredientSelection"
              ingredients={ingredients}
              errorState={ingredientsErrorState}
              handleChangeGrams={handleChangeGrams}
            />
          )}
        </FieldSet>
      )}



      {/* Type Select */}
      <Input<"Week" | "Weekend" | "Both"> variant="select"
        id="SelectRecipeType" name="SelectRecipeType"
        label="Tipo" placeholder={type ? typeTranslator[type] : "Pesquisar"}
        data={{
          loading: false,
          options: ["Week", "Weekend", "Both"],
          searchableProp: (t) => t
        }}
        dropdownState={typesDropdownState}
        ref={typesRef}
        createOptions={(opt) => (
          <DropdownItem key={opt} active={type === opt} onClick={() => handleChangeType(opt)} >
            {typeTranslator[opt]}
          </DropdownItem>
        )}
        errorState={typeErrorState}
      />

      

      {/* Description Input */}
      <Input variant="text" id="IngredientDescription" name="IngredientDescription"
        placeholder="Descrição" value={description} label="Descrição"
        onChange={(e) => setDescription(e.target.value)}
      />

      

      {/* Image Input */}
      <Input variant="file" id="file" name="file"
        accept="image/png, image/gif, image/jpeg"
        onChange={handleChangeFile}
        fileName={imageFile?.name ?? ""}
      />

      

      {/* Submit */}
      <SubmitContainer>
        <Button type="submit" variant="styled" text="Criar" />
      </SubmitContainer>

    
    </FormContainer>
  )
}