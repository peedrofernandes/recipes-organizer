import React, { ReactNode, useContext, useEffect, useMemo } from "react"
import { Link, useLocation } from "react-router-dom"
import styled, { ThemeProvider } from "styled-components"

import { ThemeContext } from "../context/ThemeContext"

import Button from "../components/buttons/_Button"
import Icon from "../components/icons/_Icon"
import Modal from "../components/modals/_Modal"
import ingredientHandler from "../../handlers/IngredientHandler"
import { AdaptedIngredient, AdaptedRecipe } from "@controllers/AdaptedTypes"
import recipeHandler from "@infra/handlers/RecipeHandler"
import { Values } from "@domain/utilities/types/Values"
import { DataContext } from "../context/DataContext"
import { FormContext } from "../context/FormContext"
import Form from "../components/forms/_Form"

const LayoutContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;

  background-color: ${({ theme }) => theme.main.primaryV1};
  color: ${({ theme }) => theme.main.contrastV1};

  & > section {
    padding: 0 0 128px 0;
  }

  * {
    &::-webkit-scrollbar {
      width: 8px;
      background-color: "inherit";
    }

    &::-webkit-scrollbar-track {
      margin: 8px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: ${({ theme }) => theme.main.contrastV2};
      border-radius: 64px;

      &:hover {
        background-color: ${({ theme }) => theme.main.contrastV1};
      }
    }
    
    &::-webkit-scrollbar-thumb:hover {
    }
  }
`

const ButtonSet = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px 16px 0 16px;
  gap: 16px;

  @media (min-width: 1000px) {
    display: block;

    & > a {
      position: fixed;
      top: 16px;
      left: 16px;
    }

    & > button {
      position: fixed;
      top: 16px;
      right: 16px;
    }
  }
`

const BottomNav = styled.nav`
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  width: 100%;

  & > a {
    width: 100%;
    text-decoration: none;
  }
`

export default function PageLayout(props: { children: ReactNode }) {
  const { children } = props

  const { theme, toggleTheme } = useContext(ThemeContext)
  const { data, dispatch } = useContext(DataContext)
  const { form, setForm } = useContext(FormContext)
  const location = useLocation()

  const ingredientController = ingredientHandler(
    // Update UI on Create
    (ingredient: AdaptedIngredient) => dispatch({
      type: "ADD_INGREDIENT", payload: { ingredient }
    }),
    // Update UI on Update
    (ingredient: AdaptedIngredient) => dispatch({
      type: "UPDATE_INGREDIENT", payload: { ingredient }
    }),
    // Update UI on Delete
    (id: string) => dispatch({
      type: "DELETE_INGREDIENT", payload: { id }
    })
  )

  const recipeController = useMemo(() => {
    return recipeHandler(
      // Update UI on Create
      (recipe: AdaptedRecipe) => dispatch({
        type: "ADD_RECIPE", payload: { recipe }
      }),
      // Update UI on Update
      (recipe: AdaptedRecipe) => dispatch({
        type: "UPDATE_RECIPE", payload: { recipe }
      }),
      // Update UI on Delete
      (id: string) => dispatch({
        type: "DELETE_RECIPE", payload: { id }
      })
    )
  }, [])

  const events = {
    createIngredientEvent: async (values: Values<AdaptedIngredient>) => {
      dispatch({ type: "TOGGLE_LOADING_INGREDIENTS"})
      setForm({ variant: null })
      await ingredientController.createIngredient(values)
    },
    updateIngredientEvent: async (id: string, values: Values<AdaptedIngredient>) => {
      dispatch({ type: "TOGGLE_LOADING_INGREDIENTS"})
      setForm({ variant: null })
      await ingredientController.updateIngredient(id, values)
    },
    deleteIngredientEvent: async (id: string) => {
      dispatch({ type: "TOGGLE_LOADING_INGREDIENTS"})
      setForm({ variant: null })
      await ingredientController.deleteIngredient(id)
    },
    createRecipeEvent: async (values: Values<AdaptedRecipe>) => {
      dispatch({ type: "TOGGLE_LOADING_RECIPES" })
      setForm({ variant: null })
      await recipeController.createRecipe(values)
    },
    updateRecipeEvent: async (id: string, values: Values<AdaptedRecipe>) => {
      dispatch({ type: "TOGGLE_LOADING_RECIPES"})
      setForm({ variant: null })
      await recipeController.updateRecipe(id, values)
    },
    deleteRecipeEvent: async (id: string) => {
      dispatch({ type: "TOGGLE_LOADING_RECIPES"})
      setForm({ variant: null })
      await recipeController.deleteRecipe(id)
    }
  }

  useEffect(() => {
    const fetchIngredients = async () => {
      dispatch({ type: "TOGGLE_LOADING_INGREDIENTS" })
      setTimeout(async () => { 
        const ingredients = await ingredientController.getAllIngredients()
        dispatch({ type: "SET_INGREDIENTS", payload: { ingredients }})
      }, 500)
    }
    const fetchRecipes = async () => {
      dispatch({ type: "TOGGLE_LOADING_RECIPES"})
      const recipes = await recipeController.getAllRecipes()
      dispatch({ type: "SET_RECIPES", payload: { recipes }})
    }

    fetchIngredients()
    fetchRecipes()
  }, [])

  useEffect(() => {
    console.log(`loadingIngredients in PageLayout: ${data.loadingIngredients}`)
  }, [data.loadingIngredients])

  const CurrentForm = useMemo(() => {
    switch (form.variant) {
    case "IngredientCreation":
      return (
        <Modal
          events={{ closeModalEvent: () => setForm({ variant: null }) }}
          title="Criar novo ingrediente"
        >
          <Form
            variant="IngredientCreation"
            events={{ submitEvent: events.createIngredientEvent }}
          />
        </Modal>)
    case "IngredientUpdate":
      return (
        <Modal
          events={{ closeModalEvent: () => setForm({ variant: null }) }}
          title="Editar ingrediente"
        >
          <Form
            id={form.id}
            variant="IngredientUpdate"
            currentValues={form.currentValues}
            events={{ submitEvent: events.updateIngredientEvent }}
          />
        </Modal>)
    case "IngredientDeletion":
      return (
        <Modal
          events={{ closeModalEvent: () => setForm({ variant: null }) }}
          title="Tem certeza que deseja excluir o ingrediente?"
        >
          <Form
            variant="IngredientDeletion"
            id={form.id}
            events={{
              confirmEvent: events.deleteIngredientEvent,
              cancelEvent: () => setForm({ variant: null })
            }}
          />
        </Modal>)
    case "RecipeCreation":
      return (
        <Modal
          events={{ closeModalEvent: () => setForm({ variant: null }) }}
          title="Criar nova receita"
        >
          <Form
            variant="RecipeCreation"
            events={{ submitEvent: events.createRecipeEvent }}
            data={data.loadingIngredients
              ? { loading: true }
              : { loading: false, ingredients: data.ingredients }
            }
          />
        </Modal>)
    case "RecipeUpdate":
      return (
        <Modal
          events={{ closeModalEvent: () => setForm({ variant: null }) }}
          title="Editar receita"
        >
          <Form
            variant="RecipeUpdate"
            id={form.id}
            currentValues={form.currentValues}
            events={{ submitEvent: events.updateRecipeEvent }}
            data={data.loadingIngredients
              ? { loading: true }
              : { loading: false, ingredients: data.ingredients }
            }
          />
        </Modal>)
    case "RecipeDeletion":
      return (
        <Modal
          events={{ closeModalEvent: () => setForm({ variant: null }) }}
          title="Tem certeza que deseja excluir a receita?"
        >
          <Form
            variant="RecipeDeletion"
            id={form.id}
            events={{
              confirmEvent: events.deleteRecipeEvent,
              cancelEvent: () => setForm({ variant: null })
            }}
          />
        </Modal>
      )
    default:
      return null
    }
  }, [form, data])

  return (
    <ThemeProvider theme={theme}>
      <LayoutContainer>

        {CurrentForm}


        <ButtonSet>
          {location.pathname !== "/" && (
            <Link to="/">
              <Button variant="icon">
                <Icon variant="Help" color={theme.color.primaryV1} />
              </Button>
            </Link>
          )}

          <Button variant="icon" onClick={() => toggleTheme()} >
            <Icon variant="DarkMode" size={36} />
          </Button>
        </ButtonSet>

        <section>
          {children}
        </section>

        {location.pathname !== "/" && (

          <BottomNav>
            <Link to="/recipes">
              <Button variant="layout" selected={location.pathname === "/recipes"}>
                <Icon variant="Menu Book" size={36} />
                <span>Receitas</span>
              </Button>
            </Link>
            <Link to="/ingredients">
              <Button variant="layout" selected={location.pathname === "/ingredients"}>
                <Icon variant="Ingredient" size={36} />
                <span>Ingredientes</span>
              </Button>
            </Link>
          </BottomNav>
        )}

      </LayoutContainer>

    </ThemeProvider>
  )
}