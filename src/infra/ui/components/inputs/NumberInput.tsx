import { Error } from "@infra/ui/types/Error"
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
  errorState?: React.StateType<Error>
  showErrorMessage?: boolean
}

export default function NumberInput(props: NumberInputProps) {
  const [error] = props.errorState || []

  return (
    <FieldSet errorStatus={error?.status}>
      {props.label && (<label>{props.label}</label>)}
      <InputField errorStatus={error?.status}>
        <input
          type="number" id={props.id} name={props.name}
          step={props.step} min={props.min}
          placeholder={props.placeholder} value={props.value}
          onChange={props.onChange}
        />
      </InputField>
      {props.showErrorMessage && error?.status && (
        <Span>{error.message}</Span>
      )}
    </FieldSet>
  )
}