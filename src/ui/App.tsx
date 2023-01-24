import React, { useContext, useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import styled, { createGlobalStyle, ThemeProvider } from "styled-components"
import Button from "./components/Button"
import ThemeContext, { ThemeContextProps } from "./context/ThemeContext"
import ThemeContextProvider, { Theme, themesSet } from "./context/ThemeContext"
import Dashboard from "./pages/Dashboard"
import Start from "./pages/Start"

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Montserrat", sans-serif;
  }
`

const Layout = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.main.primaryV1};
  color: ${({ theme }) => theme.main.contrastV1};
`

export default function App() {
  const [theme, setTheme] = useState<Theme>(themesSet.light)
  
  const ThemeContextValue: ThemeContextProps = [
    theme,
    () => {
      const { dark, light } = themesSet;
      const newTheme = theme === light ? dark : light;
      setTheme(newTheme)
    }
  ]

  const [,toggleTheme] = ThemeContextValue

  return (
    <>
      <ThemeContext.Provider value={ThemeContextValue}>
        <ThemeProvider theme={theme}>

          <Layout>

            <Button type="styled" onClick={toggleTheme} text="Change theme" />
            <GlobalStyles />

            <Router>
              <Routes>
                <Route path="/" element={<Start />} />
                <Route path="/dashboard" element={<Dashboard />} />
              </Routes>
            </Router>

          </Layout>

        </ThemeProvider>
      </ThemeContext.Provider>
    </>
  )
}