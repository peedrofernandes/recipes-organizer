import React, { ReactNode, useRef, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import styled, { ThemeProvider } from "styled-components"

import Button from "../components/buttons/Button"
import Icon from "../components/Icon"
import Modal from "../components/Modal"
import Form from "../components/forms/Form"
import useFormContext from "../hooks/useFormContext"
import useTheme from "../hooks/useTheme"
import { Grid, GridItem } from "../components/Grid"
import useViewportTracker from "../hooks/useViewportTracker"
import useEvents from "../hooks/useEvents"
import useDataContext from "../hooks/useDataContext"
import Wave from "../components/Wave"
import Actions from "../components/actions/Actions"
import ActionsMobile from "../components/actions/ActionsMobile"

const LayoutContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;

  background-color: ${({ theme }) => theme.main.primaryV1};
  color: ${({ theme }) => theme.main.contrastV1};

  & > section {
    padding: 0 0 128px 0;
  }

  * {
    &::-webkit-scrollbar {
      width: 8px;
      background-color: "inherit";
    }

    &::-webkit-scrollbar-track {
      margin: 8px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: ${({ theme }) => theme.main.contrastV2};
      border-radius: 64px;

      &:hover {
        background-color: ${({ theme }) => theme.main.contrastV1};
      }
    }
    
    &::-webkit-scrollbar-thumb:hover {
    }
  }
`

const Topbar = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row-reverse;
  padding: 16px 16px 0 16px;

  position: relative;


  ${({ theme }) => `
    @media ${theme.breakpoints.lg} {
      position: sticky;
      top: 0;
    }
  `}
`

const TopRight = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  ${({ theme }) => `
    @media ${theme.breakpoints.md} {
      position: fixed;
      top: 16px;
      right: 16px;
      gap: 16px;
    }
  `}
`


const Content = styled.div`
  padding-bottom: 180px;
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

type PageLayoutProps = {
  children: ReactNode
}

export default function PageLayout(props: PageLayoutProps) {
  const { children } = props

  const { generatePdfRequest, loadFromJsonRequest, saveToJson } = useEvents()
  const { data } = useDataContext()
  const { theme, toggleTheme } = useTheme()
  const { title, form } = useFormContext()
  const location = useLocation()
  const viewportState = useViewportTracker()

  const buttonRef = useRef<HTMLDivElement>(null)
  const [showMenuDropdown, setShowMenuDropdown] = useState<boolean>(false)
  function handleCloseDropdowns(e: React.MouseEvent<HTMLElement>) {
    if (!buttonRef.current?.contains(e.target as Node)) {
      setShowMenuDropdown(false)
    }
  }
  function toggleMenuDropdown() {
    setShowMenuDropdown(value => !value)
  }

  return (
    <ThemeProvider theme={theme}>
      <LayoutContainer onClick={handleCloseDropdowns}>

        
        {form.variant !== null && (
          <Modal
            variant={
              form.variant === "IngredientDeletion"
                || form.variant === "RecipeDeletion"
                ? "small"
                : "form"
            }
            title={title}
          >
            <Form />
          </Modal>
        )}

        
        {location.pathname === "/" && <Wave />}


        <Topbar>

          <TopRight>
            <Link to="/">
              <Button variant="icon">
                <Icon
                  variant="Help"
                  size={viewportState.md ? 36 : 24}
                />
              </Button>
            </Link>
            <Button variant="icon" onClick={() => toggleTheme()} >
              <Icon
                variant={theme.variant === "Light" ? "DarkMode" : "LightMode"}
                size={viewportState.md ? 36 : 24}
              />
            </Button>
          </TopRight>

          {location.pathname !== "/" && !viewportState.md && (
            <Actions variant="Mobile"
              events={{
                generatePdfRequestOnClick: generatePdfRequest,
                loadFromJsonRequestOnClick: loadFromJsonRequest,
                saveToJsonOnClick: () => saveToJson([data.recipes, data.ingredients])
              }}
              showMenuDropdown={showMenuDropdown}
              toggleMenuDropdown={toggleMenuDropdown}
              ref={buttonRef}
            />
          )}

        </Topbar>



        <Content>
          <section>
            {children}
          </section>
        </Content>

          

        
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