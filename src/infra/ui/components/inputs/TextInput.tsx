import { Error } from "@infra/ui/types/Error"
import React from "react"
import { InputField } from "../forms/Form/styles"
import { Span } from "../styles"
import { FieldSet } from "./Input/styles"

type TextInputProps = {
  id: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  label?: string
  placeholder?: string
  errorState?: React.StateType<Error>
  showErrorMessage?: boolean
}

export default function TextInput(props: TextInputProps) {
  const [error] = props.errorState ?? []

  return (
    <FieldSet errorStatus={error?.status}>

      {props.label && (<label>{props.label}</label>)}
      <InputField errorStatus={error?.status}>
        <input
          type="text" id={props.id} name={props.name}
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChange}
        />
      </InputField>
      {props.showErrorMessage && error?.status && (
        <Span>{error.message}</Span>
      )}
    </FieldSet>
  )
}