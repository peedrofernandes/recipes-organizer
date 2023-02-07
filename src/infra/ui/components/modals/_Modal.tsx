import React, {
  MouseEvent,
  ReactNode,
  useCallback,
  useRef,
} from "react"
import styled from "styled-components"

import { Grid, GridItem } from "../MaterialGrid"
import Icon from "../icons/_Icon"
import Button from "../buttons/_Button"

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


// const ModalComponents: ComponentModalVariants = {
//   None: () => null,

//   UpdateIngredient: (props) => <></>,

//   CreateRecipe: () => {
//     return (
//       <>
//         <Form>

//           <label htmlFor="name">Nome*</label>
//           <input id="name" type="text" name="name" placeholder="Nome" />

//           <label>Descrição</label>
//           <input type="text" name="description" placeholder="Descrição" />

//           <label>Tipo*</label>
//           <select name="type">
//             <option value="Week">Receita de semana</option>
//             <option value="Weekend">Receita de fim de semana</option>
//             <option value="Both">Ambos</option>
//           </select>

//           <label>Imagem</label>
//           <input type="file" accept="image/png, image/gif, image/jpeg" title=" Selecione" />

//         </Form>

//       </>
//     )
//   },

//   UpdateRecipe: (props) => {
//     return (
//       <>

//         <h1>Atualizar receita</h1>

//         <Form>
//           <label>Nome*</label>
//           <input type="text" name="name" placeholder="Nome" />

//           <label>Descrição</label>
//           <input type="text" name="description" placeholder="Descrição" />

//           <label>Tipo*</label>
//           <select name="type">
//             <option value="Week">Receita de semana</option>
//             <option value="Weekend">Receita de fim de semana</option>
//             <option value="Both">Ambos</option>
//           </select>

//           <label>Imagem</label>
//           <input type="file" accept="image/png, image/gif, image/jpeg" title=" Selecione" />
//         </Form>

//         <h1>COntent</h1>
//         <h1>COntent</h1>
//         <h1>COntent</h1>
//         <h1>COntent</h1>
//         <h1>COntent</h1>
//         <h1>COntent</h1>
//         <h1>COntent</h1>
//         <h1>COntent</h1>
//         <h1>COntent</h1>
//         <h1>COntent</h1>
//         <h1>COntent</h1>
//         <h1>COntent</h1>
//         <h1>COntent</h1>
//         <h1>COntent</h1>
//         <h1>COntent</h1>
//         <h1>COntent</h1>
//         <h1>COntent</h1>
//         <h1>COntent</h1>

//       </>
//     )
//   },
// }

// export type ModalProps = {
//   variant: ModalVariants,
//   events: {
//     closeModal: () => void;
//     handleCreateIngredient: (values: Values<AdaptedIngredient>) => void;
//     handleUpdateIngredient: (id: Id, values: Values<AdaptedIngredient>) => void;
//     handleDeleteIngredient: (id: Id) => void;
//     handleCreateRecipe: (attr: Values<AdaptedRecipe>) => void;
//     handleUpdateRecipe: (id: Id, values: Values<AdaptedRecipe>) => void;
//     handleDeleteRecipe: (id: Id) => void;
//   }
// }

// export function OldModal(props: ModalProps) {

//   let ModalVariant: ReactElement | null = null
//   let title: string
//   switch (variant.name) {
//   case "none":
//     return null
//   case "CreateIngredient": {
//     title = "Criar novo ingrediente"
//     ModalVariant = <ModalComponents.CreateIngredient
//       events={{
//         handleSubmit: events.handleCreateIngredient,
//         closeModal: events.closeModal
//       }}
//     />
//     break
//   }
//   case "UpdateIngredient": {
//     title = "Atualizar ingrediente"
//     ModalVariant = <ModalComponents.UpdateIngredient
//       id={variant.id}
//       events={{
//         handleSubmit: events.handleUpdateIngredient,
//         closeModal: events.closeModal
//       }}
//     />
//     break
//   }
//   case "ConfirmIngredientDelete": {
//     title = "Tem certeza que deseja excluir o ingrediente?"
//     ModalVariant = <ModalComponents.ConfirmIngredientDelete
//       id={variant.id}
//       events={{
//         handleConfirm: events.handleDeleteIngredient,
//         closeModal: events.closeModal
//       }}
//     />
//     break
//   }
//   case "CreateRecipe": {
//     title = "Criar nova receita"
//     ModalVariant = <ModalComponents.CreateRecipe
//       events={{
//         handleSubmit: events.handleCreateRecipe,
//         closeModal: events.closeModal
//       }}
//     />
//     break
//   }
//   case "UpdateRecipe": {
//     title = "Atualizar receita"
//     ModalVariant = <ModalComponents.UpdateRecipe
//       id={variant.id}
//       events={{
//         handleSubmit: events.handleUpdateRecipe,
//         closeModal: events.closeModal
//       }}
//     />
//     break
//   }
//   case "ConfirmRecipeDelete": {
//     title = "Tem certeza que deseja excluir a receita?"
//     ModalVariant = <ModalComponents.ConfirmRecipeDelete
//       id={variant.id}
//       events={{
//         handleConfirm: events.handleDeleteRecipe,
//         closeModal: events.closeModal
//       }}
//     />
//     break
//   }
//   }

//   return (
//     <ModalContainer title={title}>
//       {ModalVariant}
//     </ModalContainer>
//   )
// }

type ModalProps = {
  title: string;
  events: {
    closeModalEvent: () => void
  };
  children: ReactNode
}

export default function Modal(props: ModalProps) {
  const modalBoxRef = useRef<HTMLDivElement>(null)

  const modalCloseClickOutside = useCallback((e: MouseEvent) => {
    if (!modalBoxRef.current?.contains(e.target as Node)) {
      props.events.closeModalEvent()
    }
  }, [modalBoxRef])

  return (
    <ModalBackground onClick={(e) => modalCloseClickOutside(e)}>

      <Grid>
        <GridItem rAbs={{ xs: [1, 5], sm: [2, 8], md: [2, 12] }}>
          <ModalBox ref={modalBoxRef}>
            <TopContainer>
              <h3>{props.title}</h3>
              <Button variant="icon" onClick={() => props.events.closeModalEvent()}>
                <Icon variant="Close" size={24} />
              </Button>
            </TopContainer>
            {props.children}
          </ModalBox>
        </GridItem>
      </Grid>

    </ModalBackground>
  )
} 