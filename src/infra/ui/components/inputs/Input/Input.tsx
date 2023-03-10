import React, { Suspense } from "react"

const DateInput = React.lazy(() => import("../DateInput"))
const FileInput = React.lazy(() => import("../FileInput"))
const NumberInput = React.lazy(() => import("../NumberInput"))
const SelectInput = React.lazy(() => import("../SelectInput"))
const TextInput = React.lazy(() => import("../TextInput"))

import { SelectInputRefs } from "../SelectInput"

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

  let result: JSX.Element
  switch (props.variant) {
  case "text":
    result = <TextInput {...props} />
    break
  case "file":
    result = <FileInput {...props} />
    break
  case "number":
    result = <NumberInput {...props} />
    break
  case "select":
    result = <SelectInput<T> {...props} ref={ref} />
    break
  case "date":
    result = <DateInput {...props} />
    break
  default:
    return null
  }

  return <Suspense>{result}</Suspense>
}

const Input = React.forwardRef(InputComponent)

export default Input