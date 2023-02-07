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
import { OptionalValues, Values } from "@domain/utilities/types/Values"
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
  const { dispatch } = useContext(DataContext)
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
    closeFormEvent: () => setForm({ variant: null }),

    IngredientCreation: {
      submitEvent: (values: OptionalValues<AdaptedIngredient>) =>
        ingredientController.createIngredient(values),
    },
    IngredientUpdate: {
      submitEvent: (id: string, values: OptionalValues<AdaptedIngredient>) =>
        ingredientController.updateIngredient(id, values),
    },
    IngredientDeletion: {
      confirmEvent: (id: string) =>
        ingredientController.deleteIngredient(id),
    },
    RecipeCreation: {
      submitEvent: (values: OptionalValues<AdaptedRecipe>) =>
        recipeController.createRecipe(values),
    },
    RecipeUpdate: {
      submitEvent: (id: string, values: OptionalValues<AdaptedRecipe>) =>
        recipeController.updateRecipe(id, values),
    },
    RecipeDeletion: {
      confirmEvent: (id: string) => recipeController.deleteRecipe(id)
    }

  }
  useEffect(() => {
    const fetchIngredients = async () => {
      const ingredients = await ingredientController.getAllIngredients()
      dispatch({ type: "SET_INGREDIENTS", payload: { ingredients }})
      console.log(ingredients)
    }
    const fetchRecipes = async () => {
      const recipes = await recipeController.getAllRecipes()
      dispatch({ type: "SET_RECIPES", payload: { recipes }})
    }

    fetchIngredients()
    fetchRecipes()
  }, [])

  return (
    <ThemeProvider theme={theme}>

      {/* {!modalHasId(currentModal) ? (
        <Modal
          variant={{ name: currentModal.name }}
          events={events.modalEvents}
        />

      ) : (
        <Modal
          variant={{ name: currentModal.name, id: currentModal.id }}
          events={events.modalEvents}
        />
      )} */}

      {form.variant !== null && (
        <Modal
          events={{ closeModalEvent: events.closeFormEvent }}
          title="Title"
        >
          <Form
            variant={form.variant}
            id={"id" in form && form.id}
            events={events[form.variant]}
          />
        </Modal>
      )
        
      }

      <LayoutContainer>

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