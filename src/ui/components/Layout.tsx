import React, { ReactNode, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import { ThemeContext } from "../context/ThemeContext";
import Button from "./Button";
import Icon from "./Icon";
import Modal from "./Modal";

const LayoutContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;

  background-color: ${({ theme }) => theme.main.primaryV1};
  color: ${({ theme }) => theme.main.contrastV1};
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
      bottom: 16px;
      left: 16px;
    }

    & > button {
      position: fixed;
      top: 16px;
      right: 16px;
    }
  }
`
export default function Layout(props: { children: ReactNode }) {
  const { children } = props;

  const { theme, toggleTheme } = useContext(ThemeContext); 
  const location = useLocation()

  return (
    <ThemeProvider theme={theme}>

      <Modal />

      <LayoutContainer>

        <ButtonSet>
          {location.pathname !== "/" && (
          <Link to="/">
            <Button type="icon">
              <Icon type="Help" color={theme.color.primaryV1} />
            </Button>
          </Link>
          )}

          <Button type="icon" onClick={() => toggleTheme()} >
            <Icon type="DarkMode" size={36} />
          </Button>
        </ButtonSet>

        {children}

      </LayoutContainer>

    </ThemeProvider>
  )
}