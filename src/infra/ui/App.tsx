import React from "react"
import { HashRouter as Router, Routes, Route } from "react-router-dom"
import { createGlobalStyle } from "styled-components"
import useLoadData from "./hooks/useLoadData"

import Page from "./pages/Page"

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Montserrat", sans-serif;
  }

  a {
    text-decoration: none;
  }
`

export default function App() {

  useLoadData()

  return (
    <>
      <GlobalStyles />
      
      <Router>
        <Routes>
          <Route path="/" element={<Page variant="Help" />} />
          <Route path="/recipes" element={<Page variant="Recipes" />} />
          <Route path="/ingredients" element={<Page variant="Ingredients" /> } />
          {/* <Route path="/PDF" element={<Page variant="PDF" />} /> */}
        </Routes>
      </Router>
    </>
  )
}