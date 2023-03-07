import React from "react"
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
} & React.ComponentPropsWithRef<typeof SelectInput<T>>)

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
  case "select": {
    return <SelectInput {...props} ref={ref} />
  }
  default:
    return null
  }
}

const Input = React.forwardRef(InputComponent)

export default Input