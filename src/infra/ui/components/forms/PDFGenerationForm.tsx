import { AdaptedRecipe } from "@controllers/AdaptedTypes"
import { Dropdown, DropdownItem, FieldSet, FormContainer, InputField, MacrosList } from "@infra/ui/components/forms/Form/styles"
import { Span, Subtitle, Text } from "@infra/ui/components/styles"
import React, { ChangeEvent, MouseEvent, useEffect, useMemo, useRef, useState } from "react"
import Icon from "../icons/_Icon"
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

export default function PDFGenerationForm(props: GeneratePDFFormProps) {
  const { loading } = props.data

  const [search, setSearch] = useState<string>("")
  const [recipeOptions, setRecipeOptions] = useState<AdaptedRecipe[]>([])
  useEffect(() => {
    if (loading) return
    setRecipeOptions(props.data.recipes.filter(r => r.name.includes(search)))
  }, [search, loading])

  const [selectedRecipes, setSelectedRecipes] = useState<[AdaptedRecipe, string][]>([])
  function handleChangeSelectedRecipes(recipe: AdaptedRecipe) {
    if (selectedRecipes.some(r => r[0].id === recipe.id))
      setSelectedRecipes(selectedRecipes.filter(r => r[0].id !== recipe.id))
    else
      setSelectedRecipes(state => ([...state, [recipe, ""]]))
  }
  

  
  const [showDropdown, setShowDropdown] = useState<boolean>(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLUListElement>(null)
  function handleCloseDropdown(e: MouseEvent) {
    if (!searchRef.current?.contains(e.target as Node)
    && !dropdownRef.current?.contains(e.target as Node)) {
      setShowDropdown(false)
    }
  }

  return (
    <FormContainer
      onClick={handleCloseDropdown}
      autoComplete="off"
    >

      <FieldSet>
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
        {selectedRecipes.length > 0 && (
          <Table variant="RecipeSelection" recipes={selectedRecipes} />
        )}
      </FieldSet>

    </FormContainer>
  )
}