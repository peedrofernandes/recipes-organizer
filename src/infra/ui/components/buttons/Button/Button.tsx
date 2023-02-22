import React from "react"
import DropdownButton from "../DropdownButton"
import IconButton from "../IconButton"
import LayoutButton from "../LayoutButton"
import StyledButton from "../StyledButton"


type ButtonProps = ({
  variant: "styled"
} & React.ComponentPropsWithoutRef<typeof StyledButton>) | ({
  variant: "icon"
} & React.ComponentPropsWithoutRef<typeof IconButton>) | ({
  variant: "layout"
} & React.ComponentPropsWithoutRef<typeof LayoutButton>) | ({
  variant: "dropdown"
} & React.ComponentPropsWithoutRef<typeof DropdownButton>)

export function Button(props: ButtonProps) {
  switch (props.variant) {

  case "styled":
    return (
      <StyledButton {...props} />
    )
  case "icon":
    return (
      <IconButton {...props}>
        {props.children}
      </IconButton>
    )
  case "layout":
    return (
      <LayoutButton {...props}>
        {props.children}
      </LayoutButton>
    )
  case "dropdown":
    return (
      <DropdownButton {...props} />
    )
  default:
    return null
  }
}