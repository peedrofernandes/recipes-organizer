import React, { ReactNode, useRef, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import styled, { ThemeProvider } from "styled-components"

import Button from "../components/buttons/Button"
import Icon from "../components/Icon"
import Modal from "../components/Modal"
import Form from "../components/forms/Form"
import useFormContext from "../hooks/useFormContext"
import useTheme from "../hooks/useTheme"
import { Title } from "../components/styles"
import { Grid, GridItem } from "../components/MaterialGrid"
import useViewportTracker from "../hooks/useViewportTracker"
import { Dropdown, DropdownItem } from "../components/forms/Form/styles"
import useEvents from "../hooks/useEvents"
import useDataContext from "../hooks/useDataContext"

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
      background-color: ${theme.main.primaryV1};
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

const ActionsDesktop = styled.section`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  padding: 16px 0;
  gap: 8px;
  align-items: center;
`

const ActionsMobile = styled.section`
  width: 100%;
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
  title: string
  children: ReactNode
}

export default function PageLayout(props: PageLayoutProps) {
  const { children } = props

  const { generatePdfRequest, loadFromJsonRequest, saveInJson } = useEvents()
  const { data } = useDataContext()
  const { theme, toggleTheme } = useTheme()
  const { title, form } = useFormContext()
  const location = useLocation()
  const viewportState = useViewportTracker()

  const [showMenuDropdown, setShowMenuDropdown] = useState<boolean>(false)
  function toggleMenuDropdown() {
    setShowMenuDropdown(value => !value)
  }

  const dropdownRef = useRef<HTMLUListElement>(null)
  function handleCloseDropdown(e: React.MouseEvent<HTMLElement>) {
    if (!dropdownRef.current?.contains(e.target as Node)) {
      setShowMenuDropdown(false)
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <LayoutContainer onClick={handleCloseDropdown}>

        
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


        <Topbar>

          <TopRight>
            <Link to="/">
              <Button variant="icon">
                <Icon
                  variant="Help"
                  color={theme.color.primaryV1}
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

          {!viewportState.md && (
            <ActionsMobile ref={dropdownRef}>
              <Button variant="icon" onClick={toggleMenuDropdown}>
                <Icon variant="Menu" size={36} />
              </Button>
              {showMenuDropdown && (
                <Dropdown style={{ width: "calc(100% - 32px)" }}>
                  <Button variant="dropdown"
                    text="Gerar PDF"
                    onClick={() => { setShowMenuDropdown(false); generatePdfRequest() }}
                    icon={<Icon variant="Document" size={20} />}
                  />
                  <Button variant="dropdown"
                    text="Salvar em arquivo"
                    onClick={() => { setShowMenuDropdown(false); saveInJson(data.recipes) }}
                    icon={<Icon variant="Save" size={20} />}
                  />
                  <Button variant="dropdown"
                    text="Carregar arquivo"
                    onClick={() => { setShowMenuDropdown(false); loadFromJsonRequest() }}
                    icon={<Icon variant="Load" size={20} />}
                  />
                </Dropdown>
              )}
            </ActionsMobile>
          )}

        </Topbar>



        <Content>
          <Grid>
            <GridItem rSpan={{ xs: 4, sm: 8, md: 12, lg: 12, xl: 12 }}>
              <Title variant={1} as="h1">{props.title}</Title>
              {viewportState.md && (
                <ActionsDesktop>
                  <Button variant="styled"
                    text="Gerar PDF"
                    onClick={generatePdfRequest}
                    icon={<Icon variant="Document" size={20} />}
                  />
                  <Button variant="styled"
                    text="Salvar em arquivo"
                    onClick={() => saveInJson(data.recipes)}
                    icon={<Icon variant="Save" size={20} />}
                  />
                  <Button variant="styled"
                    text="Carregar arquivo"
                    onClick={loadFromJsonRequest}
                    icon={<Icon variant="Load" size={20} />}
                  />
                </ActionsDesktop>
              )}
            </GridItem>
          </Grid>
          <section>
            <Grid>
              {children}
            </Grid>
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