import React, { ReactNode, useContext } from "react";
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

const TopBar = styled.div`
  position: fixed;
  width: 100%;

  display: flex;
  justify-content: flex-end;
  padding: 16px 16px 0 16px;
`

const FloatingButton = styled.div`
  position: absolute;
  top: 2px;
  right: 2px;
`

export default function Layout(props: { children: ReactNode }) {
  const { children } = props;

  const { theme, toggleTheme } = useContext(ThemeContext); 

  return (
    <ThemeProvider theme={theme}>

      <Modal />

      <LayoutContainer>
          <TopBar>
            <Button type="icon" onClick={() => toggleTheme()} >
              <Icon type="DarkMode" size={36} />
            </Button>
          </TopBar>
        {children}

      </LayoutContainer>

    </ThemeProvider>
  )
}