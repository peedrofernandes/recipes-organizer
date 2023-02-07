import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { createGlobalStyle } from "styled-components"
import DataContextProvider from "./context/DataContext"
import FormContextProvider from "./context/FormContext"
import ThemeContextProvider from "./context/ThemeContext"
import Page from "./pages/Page"

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
        <FormContextProvider>
  
          <DataContextProvider>
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
                    />
                  }
                />
                <Route
                  path="/ingredients"
                  element={
                    <Page
                      variant="Ingredients"
                    />
                  }
                />
              </Routes>
            </Router>
          </DataContextProvider>
  
        </FormContextProvider>
      </ThemeContextProvider>

    </>
  )
}