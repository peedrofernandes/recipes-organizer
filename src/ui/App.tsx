import React, { memo, useMemo } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { createGlobalStyle } from "styled-components"
import ModalContextProvider from "./context/ModalContext"
import ThemeContextProvider from "./context/ThemeContext"
import Page from "./pages/Page"

import { recipes, ingredients } from "./temp/data";

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Montserrat", sans-serif;
  }
`

export default function App() {

  const events = useMemo(() => {
    return {
      ingredientEvents: {
        handleCreateClick: () => console.log("A new ingredient should be created."),
        handleEditClick: (id: number | string) => console.log(`The ${id} ingredient should be updated.`),
        handleDeleteClick: (id: number | string) => console.log(`The ${id} ingredient should be deleted.`)
      },
      recipeEvents: {
        handleCreateClick: () => console.log("A new recipe should be created."),
        handleEditClick: (id: number | string) => console.log(`The ${id} recipe should be updated.`),
        handleDeleteClick: (id: number | string) => console.log(`The ${id} recipe should be deleted.`)
      }
    }
  }, []);

  return (
    <>
      
    <ThemeContextProvider>
    <ModalContextProvider>

      <GlobalStyles />
        
      <Router>
        <Routes>
            
          <Route
            path="/"
            element={
            <Page
              variant="Help"
            />
            }
          />
              
          <Route
            path="/recipes"
            element={
            <Page
              variant="Recipes"
              recipes={recipes}
              events={events.recipeEvents}
            />
            }
          />
              
          <Route
            path="/ingredients"
            element={
              <Page
                variant="Ingredients"
                ingredients={ingredients}
                events={events.ingredientEvents}
              />
            }
          />
            
        </Routes>
      </Router>
        
    </ModalContextProvider>
    </ThemeContextProvider>

    </>
  )
}