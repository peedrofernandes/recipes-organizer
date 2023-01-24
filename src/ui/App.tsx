import React, { useContext, useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import styled, { createGlobalStyle, ThemeProvider } from "styled-components"
import Button from "./components/Button"
import Layout from "./components/Layout"
import ModalContextProvider from "./context/ModalContext"
import ThemeContextProvider, { ThemeContext } from "./context/ThemeContext"
import Recipes from "./pages/Recipes"
import Start from "./pages/Start"

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
          
          <Layout>
            <Router>
              <Routes>
                <Route path="/" element={<Start />} />
                <Route path="/recipes" element={<Recipes />} />
              </Routes>
            </Router>
          </Layout>
          
        </ModalContextProvider>
      </ThemeContextProvider>
    </>
  )
}