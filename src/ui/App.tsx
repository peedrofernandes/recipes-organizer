import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import styled, { createGlobalStyle, ThemeProvider } from "styled-components"
import Dashboard from "./pages/Dashboard"
import Start from "./pages/Start"

const GlobalStyles = createGlobalStyle`
  $black: #111414;

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Montserrat", sans-serif;
  }
`

const Layout = styled.div`
  width: 100%;
  height: 100vh;
`

const theme = {
  main: "#111414",
  secondary: "white"
}

export default function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Layout>
          <GlobalStyles />

          <Router>
            <Routes>
              <Route path="/" element={<Start />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </Router>

        </Layout>
      </ThemeProvider>
    </>
  )
}