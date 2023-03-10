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
  error?: {
    status: false
  } | {
    status: true
    message: string
  }
  showErrorMessage?: boolean
}

export default function TextInput(props: TextInputProps) {
  return (
    <FieldSet errorStatus={props.error?.status}>

      {props.label && (<label>{props.label}</label>)}
      <InputField errorStatus={props.error?.status}>
        <input
          type="text" id={props.id} name={props.name}
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChange}
        />
      </InputField>
      {props.showErrorMessage && props.error?.status && (
        <Span>{props.error.message}</Span>
      )}
    </FieldSet>
  )
}