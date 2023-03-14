import useViewportTracker from "@infra/ui/hooks/useViewportTracker"
import { Error } from "@infra/ui/types/Error"
import React from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { InputField } from "../forms/Form/styles"
import { FieldSet } from "./Input/styles"

type DateInputProps = {
  id: string
  name: string
  label?: string
  initialDate: string
  handleChangeDate: (date: string) => void
  errorState: React.StateType<Error>
}

export default function DateInput(props: DateInputProps) {
  // Props
  const { id, name, label, initialDate, handleChangeDate, errorState } = props
  const viewportState = useViewportTracker()

  const [error] = errorState

  return (
    <FieldSet errorStatus={error?.status}>
      {label && <label>{label}</label>}
      <InputField errorStatus={error?.status}>

        {viewportState.md ? (
          <input
            id={id} name={name}
            type="date"
            value={initialDate}
            onChange={(e) => handleChangeDate(e.target.value)}
          />
        ) : (
          <DatePicker
            placeholderText="dd/mm/yyyy"
            dateFormat="dd/MM/yyyy"
            selected={initialDate ? new Date(initialDate) : null}
            onChange={(date) => handleChangeDate(date?.toUTCString() ?? "")}
          />
        )}
      </InputField>
    </FieldSet>
  )
}