import React, { Suspense } from "react"

const DropdownButton = React.lazy(() => import("../DropdownButton"))
const IconButton = React.lazy(() => import("../IconButton"))
const LayoutButton = React.lazy(() => import("../LayoutButton"))
const StyledButton = React.lazy(() => import("../StyledButton"))

type ButtonProps = ({
  variant: "styled"
} & Omit<React.ComponentPropsWithoutRef<typeof StyledButton>, "variant">) | ({
  variant: "styledBig"
} & Omit<React.ComponentPropsWithoutRef<typeof StyledButton>, "variant">) | ({
  variant: "icon"
} & React.ComponentPropsWithoutRef<typeof IconButton>) | ({
  variant: "layout"
} & React.ComponentPropsWithoutRef<typeof LayoutButton>) | ({
  variant: "dropdown"
} & React.ComponentPropsWithoutRef<typeof DropdownButton>)

export function Button(props: ButtonProps) {
  let result: JSX.Element
  switch (props.variant) {
  case "styled":
    result = <StyledButton {...props} variant="normal" />
    break
  case "styledBig":
    result = <StyledButton {...props} variant="big" />
    break
  case "icon":
    result = <IconButton {...props} />
    break
  case "layout":
    result = <LayoutButton {...props} />
    break
  case "dropdown":
    result = <DropdownButton {...props} />
    break
  default:
    return null
  }

  return (
    <Suspense>
      {result}
    </Suspense>
  )
}