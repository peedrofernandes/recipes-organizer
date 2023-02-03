import React, {
  ChangeEvent,
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
import { AdaptedIngredient, AdaptedRecipe } from "@controllers/AdaptedTypes";
import { Id } from "@domain/value-objects/Id";
import { Values } from "@domain/value-objects/Values";

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

const TopContainer = styled.div`
  position: sticky;
  background-color: ${({ theme }) => theme.main.primaryV2};
  padding: 16px 0;
  top: 0;
  width: 100%;
  filter: ${({ theme }) => `drop-shadow(0 12px 6px ${theme.main.primaryV2})`};

  & > button {
    position: absolute;
    top: 16px;
    right: 0;
  };

  & > h1, h2, h3 {
    width: 100%;
    text-align: center;
  }
`

const ConfirmButtonSet = styled.div`
  width: 100%;
  display: flex;
  gap: 16px;
  justify-content: center;
  position: absolute;
  bottom: 0;
  margin-bottom: 16px;
`

const ModalComponents: ComponentModalVariants = {
  None: () => null,

  CreateIngredient: (props) => {
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [macros, setMacros] = useState<[number, number, number, number]>([-1, -1, -1, -1]);
    const [imageFile, setImageFile] = useState<File>();

    const handleChangeMacros = (
      type: "proteins" | "carbs" | "fats" | "totalGrams",
      e: ChangeEvent<HTMLInputElement>
    ) => {
      const v = e.target.valueAsNumber;

      switch (type) {
        case "proteins":
          setMacros([v, macros[1], macros[2], macros[3]])
          break;
        case "carbs":
          setMacros([macros[0], v, macros[2], macros[3]])
          break;
        case "fats":
          setMacros([macros[0], macros[1], v, macros[3]])
          break;
        case "totalGrams":
          setMacros([macros[0], macros[1], macros[2], v])
          break;
      }
    }

    const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
      setImageFile(e.target.files?.[0]);
      console.log('File name:', imageFile?.name);
      console.log('File size:', imageFile?.size, 'bytes');
      console.log('File type:', imageFile?.type);
    }

    const handleSubmit = (e: SyntheticEvent) => {
      e.preventDefault();

      const ingredientValues: Values<AdaptedIngredient> = {
        name,
        description,
        imageFile,
        imageUrl: "",
        macros
      };

      props.events.handleSubmit(ingredientValues);
      props.events.closeModal();
    }

    return (
      <>
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
                value={macros[0]}
                onChange={(e) => handleChangeMacros("proteins", e)}
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
                value={macros[1]}
                onChange={(e) => handleChangeMacros("carbs", e)}
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
                value={macros[2]}
                onChange={(e) => handleChangeMacros("fats", e)}
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
            value={macros[3]}
            onChange={(e) => handleChangeMacros("totalGrams", e)}
          />
          
          <label>Imagem</label>
          <input
            type="file" accept="image/png, image/gif, image/jpeg" title=" Selecione"
            id="Image"
            name="Image"
            onChange={handleChangeFile}
          />

          <SubmitContainer>
            <Button
              variant="styled"
              text="Enviar"
            />
          </SubmitContainer>

          <h1>Content</h1>
          <h1>Content</h1>
          <h1>Content</h1>
          <h1>Content</h1>
          <h1>Content</h1>
          <h1>Content</h1>
          <h1>Content</h1>
          <h1>Content</h1>
          <h1>Content</h1>
          <h1>Content</h1>

        </Form>
      </>   
    )
  },

  UpdateIngredient: (props) => <></>,

  ConfirmIngredientDelete: (props) => {
    function handleClick() {
      props.events.handleConfirm(props.id);
      props.events.closeModal();
    }

  return (
    <>
      <ConfirmButtonSet>
        <Button variant="styled" text="Sim" onClick={handleClick} />
        <Button variant="styled" text="Não" color="red"/>
      </ConfirmButtonSet>
    </>
  )},

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

  UpdateRecipe: (props) => {
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
    handleCreateIngredient: (values: Values<AdaptedIngredient>) => void;
    handleUpdateIngredient: (id: Id, values: Values<AdaptedIngredient>) => void;
    handleDeleteIngredient: (id: Id) => void;
    handleCreateRecipe: (attr: Values<AdaptedRecipe>) => void;
    handleUpdateRecipe: (id: Id, values: Values<AdaptedRecipe>) => void;
    handleDeleteRecipe: (id: Id) => void;
  }
}

export default function Modal(props: ModalProps) {
  const { variant, events } = props;
  const modalBoxRef = useRef<HTMLDivElement>(null)

  const ModalContainer = memo((props: { children: ReactNode, title: string }) => (
    <ModalBackground onClick={(e) => modalCloseClickOutside(e)}>
  
    <Grid>
      <GridItem rAbs={{ xs: [1, 5], sm: [2, 8], md: [2, 12] }}>
        <ModalBox ref={modalBoxRef}>
            <TopContainer>
            <h3>{props.title}</h3>
            <Button variant="icon" onClick={() => events.closeModal()}>
              <Icon variant="Close" size={24}/>
            </Button>
          </TopContainer>
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
  let title: string;
  switch (variant.name) {
    case "none":
      return null;
    case "CreateIngredient": {
      title = "Criar novo ingrediente";
      ModalVariant = <ModalComponents.CreateIngredient
        events={{
          handleSubmit: events.handleCreateIngredient, 
          closeModal: events.closeModal
        }}
      />
      break;
    }
    case "UpdateIngredient": {
      title = "Atualizar ingrediente";
      ModalVariant = <ModalComponents.UpdateIngredient
        id={variant.id}
        events={{
          handleSubmit: events.handleUpdateIngredient, 
          closeModal: events.closeModal
        }}
      />
      break;
    }
    case "ConfirmIngredientDelete": {
      title = "Tem certeza que deseja excluir o ingrediente?";
      ModalVariant = <ModalComponents.ConfirmIngredientDelete
        id={variant.id}
        events={{
          handleConfirm: events.handleDeleteIngredient, 
          closeModal: events.closeModal
        }}
      />
      break;
    }
    case "CreateRecipe": {
      title = "Criar nova receita";
      ModalVariant = <ModalComponents.CreateRecipe
        events={{
          handleSubmit: events.handleCreateRecipe, 
          closeModal: events.closeModal
        }}
      />
      break;
    }
    case "UpdateRecipe": {
      title = "Atualizar receita";
      ModalVariant = <ModalComponents.UpdateRecipe
        id={variant.id}
        events={{
          handleSubmit: events.handleUpdateRecipe, 
          closeModal: events.closeModal
        }}
      />
      break;
    }
    case "ConfirmRecipeDelete": {
      title = "Tem certeza que deseja excluir a receita?";
      ModalVariant = <ModalComponents.ConfirmRecipeDelete
        id={variant.id}
        events={{
          handleConfirm: events.handleDeleteRecipe, 
          closeModal: events.closeModal
        }}
      />
      break;
    }
  }

  return (
    <ModalContainer title={title}>
      {ModalVariant}
    </ModalContainer>
  )
}