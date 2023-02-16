import React, { ReactNode, ReactElement } from "react"
import Icon from "../../icons/_Icon"
import IconButton from "../IconButton"
import LayoutButton from "../LayoutButton"
import StyledButton from "../StyledButton"

export interface BaseButtonProps {
  onClick?: () => void;
  type?: "submit"
}

type ButtonProps = ({
  variant: "styled";
  text: string;
  color?: "red" | "green" | "blue";
} | {
  variant: "icon";
  children: ReactElement<typeof Icon>;
} | {
  variant: "layout";
  selected?: boolean;
  children?: ReactNode;
}) & BaseButtonProps;

export default function Button(props: ButtonProps) {
  switch (props.variant) {

  case "styled":
    return (
      <StyledButton
        onClick={props.onClick}
        color={props.color}
        text={props.text}
        type={props.type}
      />
    )
  case "icon":
    return (
      <IconButton
        onClick={props.onClick}
        type={props.type}
      >
        {props.children}
      </IconButton>
    )
  case "layout":
    return (
      <LayoutButton
        selected={props.selected ?? false}
        onClick={props.onClick}
        type={props.type}
      >
        {props.children}
      </LayoutButton>
    )
  default:
    return null
  }
}