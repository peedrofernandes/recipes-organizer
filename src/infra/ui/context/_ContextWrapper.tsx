import React, { ReactNode } from "react"
import DataContextProvider from "./DataContext"
import FormContextProvider from "./FormContext"
import ThemeContextProvider from "./ThemeContext"

export default function ContextWrapper(props: { children: ReactNode }) {
  return (
    <ThemeContextProvider>
      <DataContextProvider>
        <FormContextProvider>
          {props.children}
        </FormContextProvider>
      </DataContextProvider>
    </ThemeContextProvider>
  )
} 