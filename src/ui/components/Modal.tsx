import React, { memo, MouseEvent, ReactNode, useCallback, useRef } from "react"
import styled from "styled-components"

import { Grid, GridItem } from "./MaterialGrid";
import Button from "./Button";
import Form from "./Form";
import Icon from "./Icon";
import { ModalOptions } from "../types/ModalOptions";

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
  padding: 0 16px 16px 16px;
  border-radius: 8px;
  max-height: 80vh;
  overflow-y: scroll;

  &::-webkit-scrollbar {
     width: 6px;
  }

  &::-webkit-scrollbar-track {
    margin: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.main.contrastV3};
    border-radius: 64px;

    &:hover {
      background-color: ${({ theme }) => theme.main.contrastV1};
    }
  }
  
  &::-webkit-scrollbar-thumb:hover {
  }
`

const CloseModalContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  position: sticky;
  background-color: ${({ theme }) => theme.main.primaryV2};
  padding: 16px 0;
  top: 0;
  width: 100%;
`

export type ModalProps = ModalOptions & {
  events: { closeModal: () => void }
}


export default function Modal(props: ModalProps) {
  const { variant, events } = props;
  const modalBoxRef = useRef<HTMLDivElement>(null)

  const modalCloseClickOutside = useCallback((e: MouseEvent) => {
    if (!modalBoxRef.current?.contains(e.target as Node)) {
      events.closeModal()
    }
  }, [modalBoxRef])

  const ModalContainer = memo((props: { children: ReactNode }) => (
    <ModalBackground onClick={(e) => modalCloseClickOutside(e)}>

    <Grid>
      <GridItem rAbs={{ xs: [1, 5], sm: [2, 8], md: [2, 12] }}>
        <ModalBox ref={modalBoxRef}>
          <CloseModalContainer>
            <Button variant="icon" onClick={() => events.closeModal()}>
              <Icon variant="Close" size={24}/>
            </Button>
          </CloseModalContainer>
          {props.children}
        </ModalBox>
      </GridItem>
    </Grid>
      
    </ModalBackground>
  ))

  switch (variant) {
    case "none": {
      return null;
    }
    case "CreateRecipe": {

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
      
    }
    case "UpdateRecipe": {
      return (
        <ModalContainer>

        <h1>Atualizar receita</h1>

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
          
          <h1>COntent</h1>
          <h1>COntent</h1>
          <h1>COntent</h1>
          <h1>COntent</h1>
          <h1>COntent</h1>
          <h1>COntent</h1>
          <h1>COntent</h1>
          <h1>COntent</h1>
          <h1>COntent</h1>
          <h1>COntent</h1>
          <h1>COntent</h1>
          <h1>COntent</h1>
          <h1>COntent</h1>
          <h1>COntent</h1>
          <h1>COntent</h1>
          <h1>COntent</h1>
          <h1>COntent</h1>
          <h1>COntent</h1>
          
        </ModalContainer>
      )
      
    }
    case "ConfirmRecipeDelete": {

    }
    case "CreateIngredient": {

    }
    case "UpdateIngredient": {

    }
    case "ConfirmIngredientDelete": {

    }
    default:
      return null;
  }
}