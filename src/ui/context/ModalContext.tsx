import React, { createContext, ReactNode, useState } from "react";
import { ModalVariants } from "../types/ModalVariants";

type ModalContextType = {
  currentModal: ModalVariants;
  setModal: (modal: ModalVariants) => void
}

export const ModalContext = createContext<ModalContextType>(undefined!)

export default function ModalContextProvider(props: { children: ReactNode }) {
  const { children } = props

  const [modal, setModal] = useState<ModalVariants>({ name: "none" })

  const handleChangeModal = (modal: ModalVariants) => {
    setModal(modal);
    console.log("Modal set to " + modal.name)
  }

  return (
    <ModalContext.Provider value={{ currentModal: modal, setModal: handleChangeModal }}>
      {children}
    </ModalContext.Provider>
  )
}