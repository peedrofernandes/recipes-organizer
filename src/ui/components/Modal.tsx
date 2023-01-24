import React, { ReactNode } from "react"
import styled from "styled-components"
import Form from "./Form";
import { Grid, GridItem } from "./MaterialGrid";

const ModalBackground = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .6);
  position: absolute;
  z-index: 1;

  display: flex;
  justify-content: center;
  align-items: center;
`

const ModalBox = styled.div`
  background-color: white;
  width: 100%;
  height: 100%;
  padding: 16px;
  border-radius: 8px;
  max-height: 80vh;
  overflow-y: auto;
`

type ModalProps = {
  type: "CreateRecipe"
} | {
  type: "UpdateRecipe"
} | {
  type: "ConfirmRecipeDelete"
} | {
  type: "CreateIngredient"
} | {
  type: "UpdateIngredient"
} | {
  type: "ConfirmIngredientDelete"
}

export default function Modal(props: ModalProps) {
  const { type } = props;

  const ModalContainer = (props: { children: ReactNode }) => (
    <ModalBackground>
      <Grid>
        <GridItem rAbs={{ xs: [1, 5], sm: [2, 8], md: [2, 12] }}>
          <ModalBox>
            {props.children}
          </ModalBox>
        </GridItem>
      </Grid>
    </ModalBackground>
  )

  switch (type) {
    case "CreateRecipe":
      
      
      return (
        <ModalContainer>
          <h1>Criar nova receita</h1>
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
    case "ConfirmRecipeDelete":
    case "CreateIngredient":
    case "UpdateIngredient":
    case "ConfirmIngredientDelete":
    default:
      return null;
  }
}