import React from "react"
import DateInput from "../DateInput"
import FileInput from "../FileInput"
import NumberInput from "../NumberInput"
import SelectInput, { SelectInputRefs } from "../SelectInput"
import TextInput from "../TextInput"

type InputProps<T> = ({
  variant: "text"
} & React.ComponentPropsWithoutRef<typeof TextInput>) | ({
  variant: "file"
} & React.ComponentPropsWithoutRef<typeof FileInput>) | ({
  variant: "number"  
} & React.ComponentPropsWithoutRef<typeof NumberInput>) | ({
  variant: "select"
} & React.ComponentPropsWithRef<typeof SelectInput<T>>) | ({
  variant: "date"
} & React.ComponentPropsWithoutRef<typeof DateInput>)

type RefType = SelectInputRefs

function InputComponent<T>( 
  props: InputProps<T>,
  ref?: React.ForwardedRef<RefType>
) {
  switch (props.variant) {
  case "text":
    return <TextInput {...props} />
  case "file":
    return <FileInput {...props} />
  case "number":
    return <NumberInput {...props} />
  case "select":
    return <SelectInput {...props} ref={ref} />
  case "date":
    return <DateInput {...props} />
  default:
    return null
  }
}

const Input = React.forwardRef(InputComponent)

export default Input