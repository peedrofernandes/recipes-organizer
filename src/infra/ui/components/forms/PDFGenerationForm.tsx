import { AdaptedRecipe } from "@controllers/AdaptedTypes"
import { Id } from "@domain/utilities/types/Id"
import { Dropdown, DropdownItem, FieldSet, FormContainer, InputField, MacrosList, SubmitContainer } from "@infra/ui/components/forms/Form/styles"
import { Span, Subtitle, Text } from "@infra/ui/components/styles"
import useViewportTracker from "@infra/ui/hooks/useViewportTracker"
import React, { ChangeEvent, FormEvent, MouseEvent, useEffect, useMemo, useRef, useState } from "react"
import { Link } from "react-router-dom"
import Button from "../buttons/Button"
import Icon from "../icons/_Icon"
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

type SubmitErrors = ({
  recipeQuantities: false
} | {
  recipeQuantities: true
  recipeQuantitiesMessage: string
}) & ({
  dates: false
} | {
  dates: true
  datesMessage: string
})

export default function PDFGenerationForm(props: GeneratePDFFormProps) {
  const { loading } = props.data


  // Search for recipes functionality
  const [search, setSearch] = useState<string>("")
  const [recipeOptions, setRecipeOptions] = useState<AdaptedRecipe[]>([])
  useEffect(() => {
    if (loading) return
    setRecipeOptions(props.data.recipes.filter(r => r.name.includes(search)))
  }, [search, loading])


  // Change state of selected recipes for the submit
  const [selectedRecipes, setSelectedRecipes] = useState<[AdaptedRecipe, string][]>([])
  function handleChangeSelectedRecipes(recipe: AdaptedRecipe) {
    if (selectedRecipes.some(r => r[0].id === recipe.id))
      setSelectedRecipes(selectedRecipes.filter(r => r[0].id !== recipe.id))
    else
      setSelectedRecipes(state => ([...state, [recipe, ""]]))
  }
  

  // Dropdown open/closing logic
  const [showDropdown, setShowDropdown] = useState<boolean>(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLUListElement>(null)
  function handleCloseDropdown(e: MouseEvent) {
    if (!searchRef.current?.contains(e.target as Node)
    && !dropdownRef.current?.contains(e.target as Node)) {
      setShowDropdown(false)
    }
  }

  // Viewport tracker
  const isSmallScreen = useViewportTracker()


  // Handle change date of each recipe
  function handleChangeDate(id: Id, value: string) {
    setSubmitErrors(errors => ({ ...errors, dates: false }))
    const index = selectedRecipes.findIndex(r => r[0].id === id)
    const updatedRecipe = selectedRecipes[index]
    updatedRecipe[1] = value
    selectedRecipes[index] = updatedRecipe
    setSelectedRecipes(selectedRecipes)
  }


  // Submit error and success handling
  const [submitErrors, setSubmitErrors] = useState<SubmitErrors>({
    dates: false, recipeQuantities: false
  })
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false)
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    console.log("Submitted!")

    const invalidRecipeDates = selectedRecipes.some(recipe => !recipe[1])
    const noRecipes = selectedRecipes.length === 0

    if (invalidRecipeDates || noRecipes) {
      if (invalidRecipeDates) {
        setSubmitErrors(errors => ({
          ...errors,
          dates: true,
          datesMessage: "Todas as receitas devem conter datas!"
        }))
      }
      if (noRecipes) {
        setSubmitErrors(errors => ({
          ...errors,
          recipeQuantities: true,
          recipeQuantitiesMessage: "Adicione pelo menos uma receita!"
        }))
      }
      return
    }

    const timezoneOffsetMilliseconds = new Date().getTimezoneOffset() * 60 * 1000
    const input: [AdaptedRecipe, Date][] =
      selectedRecipes.map(([recipe, date]) => [
        recipe,
        new Date(new Date(date).getTime() + timezoneOffsetMilliseconds)
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

      <FieldSet errorStatus={submitErrors.dates || submitErrors.recipeQuantities}>
        <label>Label</label>
        <InputField
          ref={searchRef}
          onClick={() => setShowDropdown(true)}
        >
          {useMemo(() => (
            <Icon variant={loading ? "Spinner" : "Search"} size={20} />
          ), [loading])}
          <input
            type="text" id="search" name="search" placeholder="Pesquisar"
            onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)} />
        </InputField>
        {recipeOptions.length > 0 && showDropdown && (
          <Dropdown ref={dropdownRef}>
            {recipeOptions.map(recipe => (
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
            ))}
          </Dropdown>
        )}
        {submitErrors.recipeQuantities && <span>
          {submitErrors.recipeQuantitiesMessage}
        </span>}
        {!isSmallScreen ? (
          <Table variant="RecipeSelection"
            recipes={selectedRecipes}
            errorStatus={submitErrors.dates || submitErrors.recipeQuantities}
            handleChangeDate={handleChangeDate}
          />
          
        ): (
          <List variant="RecipeSelection"
            errorStatus={submitErrors.dates || submitErrors.recipeQuantities}
            recipes={selectedRecipes}
            handleChangeDate={handleChangeDate}
          />
        )}
        {submitErrors.dates && <span>{submitErrors.datesMessage}</span>}
      </FieldSet>

      <SubmitContainer style={{ display: selectedRecipes.length === 0 ? "none" : ""}}>
        <Button variant="styled" type="submit" text="Criar PDF" />
        {submitSuccess && (
          <Link to="/PDF">
            <Button variant="icon" >
              <Icon variant="Download" size={24} />
            </Button>
          </Link>
        )}
      </SubmitContainer>

    </FormContainer>
  )
}