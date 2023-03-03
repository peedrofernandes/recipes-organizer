import React from "react"
import FileInput from "../FileInput"
import NumberInput from "../NumberInput"
import TextInput from "../TextInput"

type InputProps = ({
  variant: "text"
} & React.ComponentPropsWithoutRef<typeof TextInput>) | ({
  variant: "file"
} & React.ComponentPropsWithoutRef<typeof FileInput>) | ({
  variant: "number"  
} & React.ComponentPropsWithoutRef<typeof NumberInput>)

export function Input(props: InputProps) {
  switch (props.variant) {
  case "text":
    return <TextInput {...props} />
  case "file":
    return <FileInput {...props} />
  case "number":
    return <NumberInput {...props} />
  default:
    return null
  }
}