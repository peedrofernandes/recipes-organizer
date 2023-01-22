import React, { ReactNode } from "react"
import styled from "styled-components"
import Form from "../Form";
import { Grid, GridItem } from "../MaterialGrid";

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
`

export enum ModalType { CreateNewRecipe, DeleteRecipe }

export default function Modal(props: {
  type: ModalType
}) {
  const { type } = props;

  return (
    <ModalBackground>
      <Grid>

        {type === ModalType.CreateNewRecipe && (
          <GridItem span={12}>
            <ModalBox>
              <h1>Criar nova receita</h1>
              <Form>
                <label>Nome</label>
                <input type="text" name="name" placeholder="Nome" />

                <label>Descrição</label>
                <input type="text" name="description" placeholder="Descrição" />

                <label>Tipo</label>
                <select name="type">
                  <option value="Week">Receita de semana</option>
                  <option value="Weekend">Receita de fim de semana</option>
                  <option value="Both">Ambos</option>
                </select>

              </Form>

            </ModalBox>
          </GridItem>
        )}

      </Grid>
    </ModalBackground>
  )
}