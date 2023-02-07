import React from "react"
import { Id } from "@domain/utilities/types/Id"
import { ConfirmButtonSet } from "./_Form"
import Button from "../buttons/_Button"

type ConfirmDeleteFormProps = {
  variant: "Recipe",
  id: Id
  events: {
    confirmEvent: (id: Id) => Promise<void>
    cancelEvent: () => void
  }
} | {
  variant: "Ingredient",
  id: Id
  events: {
    confirmEvent: (id: Id) => Promise<void>
    cancelEvent: () => void
  }
}

export default function ConfirmDeleteForm(props: ConfirmDeleteFormProps) {
  const handleConfirm = () => {
    props.events.confirmEvent(props.id)
  }

  const handleCancel = () => {
    props.events.cancelEvent()
  }

  return (
    <ConfirmButtonSet>
      <Button variant="styled" text="Sim" onClick={handleConfirm} />
      <Button variant="styled" text="Não" color="red" onClick={handleCancel} />
    </ConfirmButtonSet>
  )
}