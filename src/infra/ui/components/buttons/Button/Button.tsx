import React from "react"
import DropdownButton from "../DropdownButton"
import IconButton from "../IconButton"
import LayoutButton from "../LayoutButton"
import StyledButton from "../StyledButton"


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
  switch (props.variant) {

  case "styled":
    return <StyledButton {...props} variant="normal" />
  case "styledBig":
    return <StyledButton {...props} variant="big" />
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