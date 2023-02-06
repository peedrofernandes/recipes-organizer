import React, { ReactNode, ReactElement } from "react"
import Icon from "../Icons/_Icon"
import IconButton from "./IconButton"
import LayoutButton from "./LayoutButton"
import StyledButton from "./StyledButton"

export interface BaseButtonProps {
  onClick?: () => void;
  onSubmit?: () => void;
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
        onSubmit={props.onSubmit}
        color={props.color}
        text={props.text}
      />
    )
  case "icon":
    return (
      <IconButton
        onClick={props.onClick}
        onSubmit={props.onSubmit}
      >
        {props.children}
      </IconButton>
    )
  case "layout":
    return (
      <LayoutButton
        selected={props.selected ?? false}
        onClick={props.onClick}
        onSubmit={props.onSubmit}
      >
        {props.children}
      </LayoutButton>
    )
  default:
    return null
  }
}