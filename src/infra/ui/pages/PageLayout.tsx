import React, { ReactNode } from "react"
import { Link, useLocation } from "react-router-dom"
import styled, { ThemeProvider } from "styled-components"

import Button from "../components/buttons/Button"
import Icon from "../components/icons/_Icon"
import Modal from "../components/modals/_Modal"
import Form from "../components/forms/Form"
import useFormContext from "../hooks/useFormContext"
import useTheme from "../hooks/useTheme"

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

const ButtonSet = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px 16px 0 16px;
  gap: 16px;

  @media (min-width: 1000px) {
    display: block;

    & > a {
      position: fixed;
      top: 16px;
      left: 16px;
    }

    & > button {
      position: fixed;
      top: 16px;
      right: 16px;
    }
  }
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

export default function PageLayout(props: { children: ReactNode }) {
  const { children } = props

  const { theme, toggleTheme } = useTheme()
  const { title, form } = useFormContext()
  const location = useLocation()

  return (
    <ThemeProvider theme={theme}>
      <LayoutContainer>

        
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


        <ButtonSet>
          {location.pathname !== "/" && (
            <Link to="/">
              <Button variant="icon">
                <Icon variant="Help" color={theme.color.primaryV1} />
              </Button>
            </Link>
          )}

          <Button variant="icon" onClick={() => toggleTheme()} >
            <Icon variant="DarkMode" size={36} />
          </Button>
        </ButtonSet>

        <section>
          {children}
        </section>


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