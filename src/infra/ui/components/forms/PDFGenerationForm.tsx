import { AdaptedRecipe } from "@controllers/AdaptedTypes"
import { Id } from "@domain/utilities/types/Id"
import { DropdownItem, FieldSet, FormContainer, MacrosList, SubmitContainer, InputGroup } from "@infra/ui/components/forms/Form/styles"
import { Span, Subtitle, Text } from "@infra/ui/components/styles"
import useDateFormatter from "@infra/ui/hooks/useDateFormatter"
import useViewportTracker from "@infra/ui/hooks/useViewportTracker"
import React, { FormEvent, MouseEvent, useCallback, useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import Button from "../buttons/Button"
import Icon from "../icons/Icon"
import Input from "../inputs/Input"
import { SelectInputRefs } from "../inputs/SelectInput"
import List from "../lists/List"
import Table from "../tables/Table"

type GeneratePDFFormProps = {
  data: {
    loading: true
  } | {
    loading: false
    recipes: AdaptedRecipe[]
  }
  events: {
    submitEvent: (adaptedRecipesWithDates: [AdaptedRecipe, Date][]) => Promise<void>
    randomize: (
      adaptedRecipes: AdaptedRecipe[], initialDate: Date
    ) => Promise<[AdaptedRecipe, Date][]>
  }
}

type Error = {
  status: false
} | {
  status: true
  message: string
}

export default function PDFGenerationForm(props: GeneratePDFFormProps) {
  // Props and helpers
  const { loading } = props.data
  const { dateToString, stringToDate } = useDateFormatter()
  const viewportStatus = useViewportTracker()


  // functionality of search for recipes
  const [search] = useState<string>("")
  const [, setRecipeOptions] = useState<AdaptedRecipe[]>([])
  useEffect(() => {
    if (loading) return
    setRecipeOptions(props.data.recipes.filter(
      r => r.name.toLowerCase().includes(search.toLowerCase())
    ))
  }, [search, loading])


  // Change state of selected recipes for the submit
  const [selectedRecipes, setSelectedRecipes] = useState<[AdaptedRecipe, string][]>([])
  function handleChangeSelectedRecipes(recipe: AdaptedRecipe) {
    if (selectedRecipes.some(r => r[0].id === recipe.id))
      setSelectedRecipes(selectedRecipes.filter(r => r[0].id !== recipe.id))
    else
      setSelectedRecipes(state => ([...state, [recipe, ""]]))
  }


  // initialDate state, to randomize the dates of the recipes
  const [initialDate, setInitialDate] = useState<string>("")
  function handleChangeInitialDate(date: string) {
    setRandomizationError({ status: false })
    setInitialDate(date)
  }
  async function handleRandomize() {
    if (!initialDate) {
      setRandomizationError({
        status: true,
        message: "Selecione uma data inicial!"
      })
      return
    }
    setRandomizationError({ status: false })
    setDatesError({ status: false })

    const recipes = selectedRecipes.map(([recipe]) => recipe)
    const randomized = await props.events.randomize(recipes, stringToDate(initialDate))
    setSelectedRecipes(randomized.map(
      ([recipe, date]) => ([recipe, dateToString(date)])
    ))
  }
  

  // Dropdown open/closing logic
  const dropdownState = useState<boolean>(false)
  const [, setShowDropdown] = dropdownState
  const recipesBoxRef = useRef<SelectInputRefs>(null)
  function handleCloseDropdown(e: MouseEvent) {
    const searchRef = recipesBoxRef.current?.searchRef
    const dropdownRef = recipesBoxRef.current?.dropdownRef

    if (!searchRef?.current?.contains(e.target as Node)
    && !dropdownRef?.current?.contains(e.target as Node)) {
      setShowDropdown(false)
    }
  }


  // Handle change date of each recipe
  function handleChangeDate(id: Id, value: string) {
    setDatesError({ status: false })
    const index = selectedRecipes.findIndex(r => r[0].id === id)
    const updatedRecipe = selectedRecipes[index]
    updatedRecipe[1] = value
    selectedRecipes[index] = updatedRecipe
    setSelectedRecipes(selectedRecipes)
  }


  // Submit errors and success handling
  const [datesError, setDatesError] = useState<Error>({ status: false })
  const [recipesError, setRecipesError] = useState<Error>({ status: false })
  const [randomizationError, setRandomizationError] = useState<Error>({ status: false })
  
  const mergeErrors = useCallback((errors: Error[]): Error => {
    return errors.reduce((resultError, currentError) => {
      if (currentError.status) {
        return {
          status: true,
          message: resultError.status
            ? resultError.message.concat(`\n${currentError.message}`)
            : currentError.message
        }
      } else return { ...resultError }
    }, { status: false })
  }, [])
  
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false)
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const invalidRecipeDates = selectedRecipes.some(recipe => !recipe[1])
    const noRecipes = selectedRecipes.length === 0

    if (invalidRecipeDates || noRecipes) {
      if (invalidRecipeDates) {
        setDatesError({
          status: true,
          message: "Todas as receitas devem conter datas!"
        })
      }
      if (noRecipes) {
        setRecipesError({
          status: true,
          message: "Adicione pelo menos uma receita!"
        })
      }
      return
    }

    const input: [AdaptedRecipe, Date][] =
      selectedRecipes.map(([recipe, dateString]) => [
        recipe,
        stringToDate(dateString)
      ])
    
    props.events.submitEvent(input)
    setSubmitSuccess(true)
  }

  return (
    <FormContainer
      onClick={handleCloseDropdown}
      autoComplete="off"
      onSubmit={handleSubmit}
    >

      <Input<AdaptedRecipe> variant="select"
        id="SelectRecipes" name="SelectRecipes"
        label="Selecione uma data para cada receita"
        ref={recipesBoxRef}
        data={loading ? {
          loading: true
        } : {
          loading: false,
          options: props.data.recipes,
          searchableProp: (rcp) => rcp.name 
        }}
        dropdownState={dropdownState}
        createOptions={(recipe) => (
          <DropdownItem
            key={recipe.id}
            active={selectedRecipes.some(r => r[0].id === recipe.id)}
            onClick={() => handleChangeSelectedRecipes(recipe)}
          >
            <div>
              <Text>{recipe.name}</Text>
              <Subtitle>{recipe.description}</Subtitle>
            </div>
            {recipe.macros && (
              <MacrosList>
                <li><Span>P: {recipe.macros[0].toFixed(2)}</Span></li>
                <li><Span>C: {recipe.macros[1].toFixed(2)}</Span></li>
                <li><Span>G: {recipe.macros[2].toFixed(2)}</Span></li>|
                <li><Span>{recipe.kcal?.toFixed(2)}kcal</Span></li>
              </MacrosList>
            )}
            <Icon
              variant={selectedRecipes.some(
                r => r[0].id === recipe.id)
                ? "Check"
                : "CheckEmpty"
              }
              size={20}
            />
          </DropdownItem>
        )}
        error={datesError}
      />


      
      {/* Show Selected Recipes */}
      <FieldSet>
        <label>Selecione uma data para cada receita:</label>
        {viewportStatus.md ? (
          <Table variant="RecipeSelection"
            recipes={selectedRecipes}
            handleChangeDate={handleChangeDate}
            error={mergeErrors([datesError, recipesError])}
          />
          
        ) : (
          <List variant="RecipeSelection"
            recipes={selectedRecipes}
            handleChangeDate={handleChangeDate}
            error={mergeErrors([datesError, recipesError])}
          />
        )}
        {datesError.status && <Span>{datesError.message}</Span>}
      </FieldSet>

      

      {/* Date Inputs */}
      <FieldSet
        errorStatus={randomizationError.status}
        style={{ display: selectedRecipes.length === 0 ? "none" : "" }}
      >
        <Text style={{ margin: "16px 0", textAlign: "center" }}>
          Ou gere datas aleatórias!
        </Text>
        <InputGroup>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <Input variant="date"
              id="RandomDate" name="RandomDate"
              label="Data inicial"
              initialDate={initialDate}
              handleChangeDate={handleChangeInitialDate}
              error={datesError}
            />
          </div>
          <Button type="button" variant="styled" text="Gerar datas" onClick={handleRandomize} />
        </InputGroup>
        {randomizationError.status && (
          <Span style={{ textAlign: "center", display: "block" }}>
            {randomizationError.message}
          </Span>
        )}
      </FieldSet>

      

      {/* Submit */}
      <SubmitContainer style={{ display: selectedRecipes.length === 0 ? "none" : ""}}>
        <Button variant="styled" type="submit" text="Criar PDF" />
        {submitSuccess && (
          <Link to="/PDF">
            <Button variant="icon">
              <Icon variant="Download" size={24} />
            </Button>
          </Link>
        )}
      </SubmitContainer>

      

    </FormContainer>
  )
}