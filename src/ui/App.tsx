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
            />
            }
          />
              
          <Route
            path="/ingredients"
            element={
              <Page
                variant="Ingredients"
                ingredients={ingredients}
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