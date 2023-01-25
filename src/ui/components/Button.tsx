import React, { ReactNode, ReactElement } from "react";
import styled from "styled-components";
import Icon from "./Icon";

type ButtonProps = ({
  type: "styled";
  text: string;
} | {
  type: "icon";
  children: ReactElement<typeof Icon>;
} | {
  type: "layout";
  selected?: boolean;
  children?: ReactNode;
}) & { onClick?: any }

const StyledButton = styled.button`
  background-color: ${({ theme }) => theme.color.primaryV1};
  color: ${({ theme }) => theme.color.contrastV1};
  padding: 10px;
  border-radius: 16px;
  outline: none;
  border: none;
  font-weight: bold;

  &:hover {
    cursor: pointer;
  }
`

const IconButton = styled.button`
  outline: none;
  border: none;
  font-weight: bold;

  display: flex;
  justify-content: center;
  align-items: center;

  background: none;
  color: ${({ theme }) => theme.main.contrastV1};

  transition: 0.1s ease-in-out;
  opacity: 0.75;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }
`

const LayoutButton = styled.button<{
  selected: boolean;
}>`
  outline: none;
  border: none;

  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 8px 0 8px 0;
  font-weight: bold;
  cursor: pointer;

  background-color: ${({ theme, selected }) =>
    selected ? theme.color.primaryV1 : theme.main.primaryV1
  };
  color: ${({ theme, selected }) =>
    selected ? theme.color.contrastV1 : theme.main.contrastV1
  };

  &:hover {
    background-color: ${({ theme, selected }) =>
      selected ? theme.color.primaryV2 : theme.main.primaryV2
    };
  };
`

const UnsetButton = styled.button`
  outline: none;
  border: none;
  background: none;
`

export default function Button(props: ButtonProps) {
  switch (props.type) {

    case "styled":
      return (
        <StyledButton onClick={props.onClick}>
          {props.text}
        </StyledButton>
      )
    
    case "icon":
      return (
        <IconButton onClick={props.onClick}>
          {props.children}
        </IconButton>
      )
    case "layout":
      return (
        <LayoutButton selected={props.selected ?? false}>
          {props.children}
        </LayoutButton>
      )
    default:
      return null;
  }
}