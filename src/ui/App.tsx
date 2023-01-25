import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { createGlobalStyle } from "styled-components"
import ModalContextProvider from "./context/ModalContext"
import ThemeContextProvider from "./context/ThemeContext"
import IngredientsPage from "./pages/IngredientsPage"
import RecipesPage from "./pages/RecipesPage"
import HelpPage from "./pages/HelpPage"

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
              <Route path="/" element={<HelpPage />} />
              <Route path="/recipes" element={<RecipesPage />} />
              <Route path="/ingredients" element={<IngredientsPage />} />
            </Routes>
          </Router>
          
        </ModalContextProvider>
      </ThemeContextProvider>
    </>
  )
}