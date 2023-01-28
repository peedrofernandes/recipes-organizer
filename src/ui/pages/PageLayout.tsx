import React, { ReactNode, useContext, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";

import { ThemeContext } from "../context/ThemeContext";

import Button from "../components/Button";
import Icon from "../components/Icon";
import Modal from "../components/Modal";
import { ModalContext } from "../context/ModalContext";
import { modalHasId } from "../types/typeGuards";

const LayoutContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;

  background-color: ${({ theme }) => theme.main.primaryV1};
  color: ${({ theme }) => theme.main.contrastV1};

  & > section {
    padding: 0 0 128px 0;
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
  const { children } = props;

  const { theme, toggleTheme } = useContext(ThemeContext); 
  const { currentModal, setModal } = useContext(ModalContext);
  const location = useLocation()

  const events = useMemo(() => {
    return {
      modalEvents: {
        closeModal: () => setModal({ name: "none" })
      }
    }
  }, [])

  return (
    <ThemeProvider theme={theme}>

      {!modalHasId(currentModal) ? (
        <Modal
          variant={{ name: currentModal.name }}
          events={events.modalEvents}
        />
        
      ) : (
        <Modal
          variant={{ name: currentModal.name, id: currentModal.id }}
          events={events.modalEvents}
        />
      )}

      <LayoutContainer>

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