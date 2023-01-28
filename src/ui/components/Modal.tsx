import React, {
  Component,
  memo,
  MouseEvent,
  ReactElement,
  ReactNode,
  SyntheticEvent,
  useCallback,
  useRef,
  useState
} from "react"
import styled from "styled-components"

import { Grid, GridItem } from "./MaterialGrid";
import Button from "./Button";
import { Form, FieldSet, InputBox, SubmitContainer } from "./Form";
import Icon from "./Icon";

import { ComponentModalVariants, ModalVariants } from "../types/ModalTypes";
import { Ingredient, Recipe } from "../types/Data";

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
  overflow-y: auto;

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

const ModalComponents: ComponentModalVariants = {
  None: () => null,
  CreateIngredient: (props) => {
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [proteins, setProteins] = useState<number>();
    const [carbs, setCarbs] = useState<number>();
    const [fats, setFats] = useState<number>();
    const [totalGrams, setTotalGrams] = useState<number>();
    const file = useRef<HTMLInputElement>(null);

    const handleSubmit = useCallback((e: SyntheticEvent) => {
      e.preventDefault();
    }, [])

    return (
      <>
        <h1>Novo ingrediente</h1>

        <Form onSubmit={(e: SyntheticEvent) => handleSubmit(e)}>
          <label>Nome*</label>
          <input
            type="text"
            id="nome"
            name="nome"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label>Descrição</label>
          <input
            type="text"
            id="description"
            name="description"
            placeholder="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <legend>Macronutrientes</legend>

          <FieldSet>
            <InputBox>
              <label>Proteínas</label>
              <input
                type="number"
                min="0"
                id="proteins"
                name="proteins"
                placeholder="g"
                value={proteins}
                onChange={(e) => setProteins(e.target.valueAsNumber)}
              />
            </InputBox>
            <InputBox>
              <label>Carboidratos</label>
              <input
                type="number"
                min="0"
                id="proteins"
                name="proteins"
                placeholder="g"
                value={carbs}
                onChange={(e) => setCarbs(e.target.valueAsNumber)}
              />
            </InputBox>
            <InputBox>
              <label>Gorduras</label>
              <input
                type="number"
                min="0"
                id="proteins"
                name="proteins"
                placeholder="g"
                value={fats}
                onChange={(e) => setFats(e.target.valueAsNumber)}
              />
            </InputBox>

          </FieldSet>

          <label>Gramas totais</label>
          <input
            type="number"
            min="0"
            id="totalGrams"
            name="totalGrams"
            placeholder="g"
            value={totalGrams}
            onChange={(e) => setTotalGrams(e.target.valueAsNumber)}
          />
          
          <label>Imagem</label>
          <input
            type="file" accept="image/png, image/gif, image/jpeg" title=" Selecione"
            id="Image"
            name="Image"
            ref={file}
          />

          <SubmitContainer>
            <Button
              variant="styled"
              text="Enviar"
            />
          </SubmitContainer>

        </Form>
      </>   
    )
  },
  UpdateIngredient: (props) => <></>,
  ConfirmIngredientDelete: (props) => <></>,
  CreateRecipe: () => {
    return (
      <>

      <h1>Nova receita</h1>
      
      <Form>
          
      <label htmlFor="name">Nome*</label>
      <input id="name" type="text" name="name" placeholder="Nome" />

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

      </>
    );
  },
  UpdateRecipe: (props: { id: number | string }) => {
    return (
      <>

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
        
      </>
    )
  },
  ConfirmRecipeDelete: (props) => <></>
}

export type ModalProps = {
  variant: ModalVariants,
  events: {
    closeModal: () => void;
    handleCreateIngredient: (i: Omit<Ingredient, "id">) => void;
    handleUpdateIngredient: (id: number | string, i: Omit<Ingredient, "id">) => void;
    handleDeleteIngredient: (id: number | string) => void;
    handleCreateRecipe: (r: Omit<Recipe, "id">) => void;
    handleUpdateRecipe: (id: number | string, r: Omit<Recipe, "id">) => void;
    handleDeleteRecipe: (id: number | string) => void;
  }
}

export default function Modal(props: ModalProps) {
  const { variant, events } = props;
  const modalBoxRef = useRef<HTMLDivElement>(null)

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

  const modalCloseClickOutside = useCallback((e: MouseEvent) => {
    if (!modalBoxRef.current?.contains(e.target as Node)) {
      events.closeModal()
    }
  }, [modalBoxRef])

  let ModalVariant: ReactElement | null = null;
  switch (variant.name) {
    case "none":
      return null;
    case "CreateIngredient": {
      const e = { handleSubmit: events.handleCreateIngredient }
      ModalVariant = <ModalComponents.CreateIngredient events={e} />
      break;
    }
    case "UpdateIngredient": {
      const e = { handleSubmit: events.handleUpdateIngredient };
      ModalVariant = <ModalComponents.UpdateIngredient id={variant.id} events={e} />
      break;
    }
    case "ConfirmIngredientDelete": {
      const e = { handleConfirm: events.handleDeleteIngredient };
      ModalVariant = <ModalComponents.ConfirmIngredientDelete id={variant.id} events={e} />
      break;
    }
    case "CreateRecipe": {
      const e = { handleSubmit: events.handleCreateRecipe };
      ModalVariant = <ModalComponents.CreateRecipe events={e} />
      break;
    }
    case "UpdateRecipe": {
      const e = { handleSubmit: events.handleUpdateRecipe };
      ModalVariant = <ModalComponents.UpdateRecipe id={variant.id} events={e} />
      break;
    }
    case "ConfirmRecipeDelete": { 
      const e = { handleConfirm: events.handleDeleteRecipe };
      ModalVariant = <ModalComponents.ConfirmRecipeDelete id={variant.id} events={e} />
      break;
    }
  }

  return (
    <ModalContainer>
      {ModalVariant}
    </ModalContainer>
  )
}