import React, { ReactNode, useContext, useEffect, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";

import { ThemeContext } from "../context/ThemeContext";

import Button from "../components/Button";
import Icon from "../components/Icon";
import Modal from "../components/Modal";
import { ModalContext } from "../context/ModalContext";
import { modalHasId } from "../types/typeGuards";
import ingredientHandler from "../../handlers/IngredientHandler";
import { AdaptedIngredient, AdaptedRecipe } from "@controllers/AdaptedTypes";
import recipeHandler from "@infra/handlers/RecipeHandler";
import { IngredientContext } from "../context/IngredientContext";
import { RecipeContext } from "../context/RecipeContextProvider";
import { Values } from "@domain/value-objects/Values";

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
  const { children } = props;

  const { theme, toggleTheme } = useContext(ThemeContext); 
  const { currentModal, setModal } = useContext(ModalContext);
  const { ingredients, setIngredients } = useContext(IngredientContext);
  const { recipes, setRecipes } = useContext(RecipeContext);
  const location = useLocation();

  const ingredientController = useMemo(() => {
    return ingredientHandler(
      // Create
      (ingredient: AdaptedIngredient) => setIngredients([...ingredients, ingredient]),
      // Update
      (ingredient: AdaptedIngredient) => {
        const filteredIngredients = ingredients.filter(i => i.id !== ingredient.id)
        setIngredients([...filteredIngredients, ingredient])
      },
      // Delete
      (id: string) => setIngredients(ingredients.filter(i => i.id !== id))
    )
  }, []);
  
  const recipeController = useMemo(() => {
    return recipeHandler(
      // Create
      (recipe: AdaptedRecipe) => setRecipes([...recipes, recipe]),
      // Update
      (recipe: AdaptedRecipe) => {
        const filteredRecipes = recipes.filter(r => r.id !== recipe.id);
        setRecipes([...filteredRecipes, recipe]);
      },
      // Delete
      (id: string) => setRecipes(recipes.filter(r => r.id !== id))
    )
  }, []);

  const events = useMemo(() => {
    return {
      modalEvents: {
        closeModal: () => setModal({ name: "none" }),

        handleCreateIngredient: (attr: Values<AdaptedIngredient>) => ingredientController.createIngredient(attr),

        handleUpdateIngredient: (id: string, attr: Values<AdaptedIngredient>) => ingredientController.updateIngredient(id, attr),

        handleDeleteIngredient: (id: string) => ingredientController.deleteIngredient(id),

        handleCreateRecipe: (attr: Values<AdaptedRecipe>) => recipeController.createRecipe(attr),

        handleUpdateRecipe: (id: string, attr: Values<AdaptedRecipe>) => recipeController.updateRecipe(id, attr),

        handleDeleteRecipe: (id: string) => recipeController.deleteRecipe(id)
      }
    }
  }, []);

  useEffect(() => {
    const fetchIngredients = async () => {
      const foundIngredients = await ingredientController.getAllIngredients();
      setIngredients([...ingredients, ...foundIngredients]);
      console.log(foundIngredients);
    }
    const fetchRecipes = async () => {
      const foundRecipes = await recipeController.getAllRecipes();
      setRecipes([...recipes, ...foundRecipes]);
    }

    fetchIngredients();
    fetchRecipes();
  }, [])

  return (
    <ThemeProvider theme={theme}>

      {!modalHasId(currentModal) ? (
        <Modal
          variant={{ name: currentModal.name }}
          events={events.modalEvents}
        />
        
      ) : (
        <Modal
          variant={{ name: currentModal.name, id: currentModal.id }}
          events={events.modalEvents}
        />
      )}

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