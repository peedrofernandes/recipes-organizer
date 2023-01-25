import React, { MouseEvent, ReactNode, useContext, useRef } from "react"
import styled from "styled-components"
import { ModalContext } from "../context/ModalContext";
import Button from "./Button";
import Form from "./Form";
import Icon from "./Icon";
import { Grid, GridItem } from "./MaterialGrid";

const ModalBackground = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, .6);
  z-index: 1;

  display: flex;
  justify-content: center;
  align-items: center;
`

const ModalBox = styled.div`
  background-color: ${({ theme }) => theme.main.primaryV2};
  color: ${({ theme }) => theme.main.contrastV2};
  width: 100%;
  height: 100%;
  padding: 16px;
  border-radius: 8px;
  max-height: 80vh;
  overflow-y: auto;

  & > button {
    position: absolute;
    top: 8px;
    right: 8px;
  }

`

export default function Modal() {
  const { currentModal, setModal } = useContext(ModalContext)
  const modalBoxRef = useRef<HTMLDivElement>(null)

  function modalCloseClickOutside(e: MouseEvent) {
    if (!modalBoxRef.current?.contains(e.target as Node)) {
      setModal("none")
    }
  }

  const ModalContainer = (props: { children: ReactNode }) => (
    <ModalBackground onClick={(e) => modalCloseClickOutside(e)}>
      <Grid>
        <GridItem rAbs={{ xs: [1, 5], sm: [2, 8], md: [2, 12] }}>
          <ModalBox ref={modalBoxRef}>
            <Button type="icon" onClick={() => setModal("none")}>
              <Icon type="Close" size={24}/>
            </Button>
            {props.children}
          </ModalBox>
        </GridItem>
      </Grid>
    </ModalBackground>
  )

  switch (currentModal) {
    case "none":
      return null;
    case "CreateRecipe":
      
      return (
        <ModalContainer>

          <h1>Nova receita</h1>

          <Form>
            <label>Nome*</label>
            <input type="text" name="name" placeholder="Nome" />

            <label>Descrição</label>
            <input type="text" name="description" placeholder="Descrição" />

            <label>Tipo*</label>
            <select name="type">
              <option value="Week">Receita de semana</option>
              <option value="Weekend">Receita de fim de semana</option>
              <option value="Both">Ambos</option>
            </select>

            <label>Imagem</label>
            <input type="file" accept="image/png, image/gif, image/jpeg" title=" Selecione" />
          </Form>
        </ModalContainer>
      );
    
    case "UpdateRecipe":

      return (
        <ModalContainer>

          <h1>Nova receita</h1>

          <Form>
            <label>Nome*</label>
            <input type="text" name="name" placeholder="Nome" />

            <label>Descrição</label>
            <input type="text" name="description" placeholder="Descrição" />

            <label>Tipo*</label>
            <select name="type">
              <option value="Week">Receita de semana</option>
              <option value="Weekend">Receita de fim de semana</option>
              <option value="Both">Ambos</option>
            </select>

            <label>Imagem</label>
            <input type="file" accept="image/png, image/gif, image/jpeg" title=" Selecione" />
          </Form>
          
        </ModalContainer>
      )
      
    case "ConfirmRecipeDelete":
    case "CreateIngredient":
    case "UpdateIngredient":
    case "ConfirmIngredientDelete":
    default:
      return null;
  }
}