import React from "react"
import FileInput from "../FileInput"

type InputProps = ({
  variant: "file"
} & React.ComponentPropsWithoutRef<typeof FileInput>)

export function Input(props: InputProps) {
  switch (props.variant) {
  case "file":
    return <FileInput {...props} />
  default:
    return null
  }
}