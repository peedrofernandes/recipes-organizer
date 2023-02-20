import React from "react"
import IconButton from "../IconButton"
import LayoutButton from "../LayoutButton"
import StyledButton from "../StyledButton"


type ButtonProps = ({
  variant: "styled"
} & React.ComponentPropsWithoutRef<typeof StyledButton>) | ({
  variant: "icon"
} & React.ComponentPropsWithoutRef<typeof IconButton>) | ({
  variant: "layout"
} & React.ComponentPropsWithoutRef<typeof LayoutButton>)

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
  default:
    return null
  }
}