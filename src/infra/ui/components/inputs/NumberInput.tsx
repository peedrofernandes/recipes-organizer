import React from "react"
import { InputField } from "../forms/Form/styles"
import { Span } from "../styles"
import { FieldSet } from "./Input/styles"

type NumberInputProps = {
  id: string
  name: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  value: string
  label?: string
  step?: string
  min?: string
  placeholder?: string
  error?: {
    status: false
  } | {
    status: true
    message: string
  }
  showErrorMessage?: boolean
}

export default function NumberInput(props: NumberInputProps) {
  return (
    <FieldSet errorStatus={props.error?.status}>
      {props.label && (<label>{props.label}</label>)}
      <InputField errorStatus={props.error?.status}>
        <input
          type="number" id={props.id} name={props.name}
          step={props.step} min={props.min}
          placeholder={props.placeholder} value={props.value}
          onChange={props.onChange}
        />
      </InputField>
      {props.showErrorMessage && props.error?.status && (
        <Span>{props.error.message}</Span>
      )}
    </FieldSet>
  )
}