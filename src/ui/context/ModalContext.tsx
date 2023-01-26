import React, { createContext, ReactNode, useState } from "react";
import { ModalOptions } from "../types/ModalOptions";



type ModalContextType = {
  currentModal: ModalOptions;
  setModal: (modal: ModalOptions) => void
}

export const ModalContext = createContext<ModalContextType>(undefined!)

export default function ModalContextProvider(props: { children: ReactNode }) {
  const { children } = props

  const [modal, setModal] = useState<ModalOptions>({ variant: "none" })

  return (
    <ModalContext.Provider value={{ currentModal: modal, setModal }}>
      {children}
    </ModalContext.Provider>
  )
}