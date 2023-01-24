import React, { createContext, ReactNode, useState } from "react";

// // type ModalProps = {
// //   type: "CreateRecipe"
// // } | {
// //   type: "UpdateRecipe"
// // } | {
// //   type: "ConfirmRecipeDelete"
// // } | {
// //   type: "CreateIngredient"
// // } | {
// //   type: "UpdateIngredient"
// // } | {
// //   type: "ConfirmIngredientDelete"
// // }

type ModalOptions = "none" | "CreateRecipe" | "UpdateRecipe" | "ConfirmRecipeDelete" | "CreateIngredient" | "UpdateIngredient" | "ConfirmIngredientDelete";

type ModalContextType = {
  currentModal: ModalOptions;
  setModal: (modal: ModalOptions) => void
}

export const ModalContext = createContext<ModalContextType>({
  currentModal: "none",
  setModal: () => { }
})

export default function ModalContextProvider(props: { children: ReactNode }) {
  const { children } = props

  const [modal, setModal] = useState<ModalOptions>("none")

  return (
    <ModalContext.Provider value={{ currentModal: modal, setModal }}>
      {children}
    </ModalContext.Provider>
  )
}