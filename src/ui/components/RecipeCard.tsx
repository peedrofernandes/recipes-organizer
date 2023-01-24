import React, { Component, ReactNode, useContext } from "react"
import styled, { StyledComponent } from "styled-components"
import { AtLeastOne } from "../../types/AtLeastOne"
import ThemeContext from "../context/ThemeContext";
import Button from "./Button";
import Icon from "./Icon";

const CardContainer = styled.div<{
  status: "active" | "inactive"
}>`
  display: flex;
  align-items: center;
  ${({ status }) => status === "active" ? `
      flex-direction: column;
    ` : `
      justify-content: center;
    `}


  width: 100%;
  aspect-ratio: 3 / 2;
  padding: 4px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.main.primaryV2};
  color: ${({ theme }) => theme.main.contrastV2};

  box-shadow: ${
  props => props.status === "active" && `0 0 4px ${props.theme.main.contrastV1}`};

  border: ${props => props.status === "inactive" && '1px dashed grey'};

  & > * {
    font-size: 0.8em;
    font-weight: normal;
    font-family: "Roboto", sans-serif;
  }

  & > h1, h2, h3 {
    font-size: 1.1em;
  }

  transition: 0.1s ease-in-out;

  z-index: 0;

  &:hover {
    transform: scale(1.02);
    cursor: pointer;
  }
`;

const TypeSpan = styled.span`
  position: absolute;
  background-color: ${({ theme }) => theme.main.primaryV2};
  color: ${({ theme }) => theme.main.contrastV2};
  padding: 2px 4px;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
`;

const ContentContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 30%;
  width: 100%;
  padding: 4px;

  & > *:last-child {
    display: flex;
    align-items: flex-end;
    height: 100%;
  }
`;

const ImageContainer = styled.div<{
  imageUrl?: string
}>`
  width: 100%;
  height: 70%;
  background: ${props => props.imageUrl ? `url(${props.imageUrl})` : `${props.theme.main.primaryV3}`};
  background-size: cover;
  border-radius: 8px;
  
  display: flex;
  justify-content: center;
  align-items: center;
`;

type RecipeCardProps = {
  status: "active";
  name: string;
  type: "Week" | "Weekend" | "Both";
  options?: AtLeastOne<{ description: string, imageUrl: string }>;
} | { status: "inactive" }

const isActive = (props: RecipeCardProps): props is {
  status: "active";
  name: string;
  type: "Week" | "Weekend" | "Both";
  options?: AtLeastOne<{ description: string, imageUrl: string }>;
} => props.status === "active"

export default function RecipeCard(props: RecipeCardProps) {

  if (isActive(props)) {
    const { name, options, type } = props;
    
    return (
      <CardContainer status="active">

        {
          (type === "Week") ? <TypeSpan>Receita de semana</TypeSpan> :
          (type === "Weekend") ? <TypeSpan>Receita de fim de semana</TypeSpan> : null
        }

        {
          (options?.imageUrl) ? <ImageContainer imageUrl={options.imageUrl} /> :
          <ImageContainer>
              <Icon type="NoRecipe" />
          </ImageContainer>
        }

        <ContentContainer>
          <div>
            <h3>{props.name}</h3>
            {options?.description && <p>{options.description}</p>}
          </div>
          <div>
            <Button type="icon">
              <Icon type="Delete" size={24} color="red" />
            </Button>
          </div>
        </ContentContainer>
          
      </CardContainer>
    )
  } else {
    return (
      <CardContainer status="inactive">
        <Icon type="AddRecipe" size={48} />
        <Icon type="Plus" size={24} />
      </CardContainer>
    )
    
  }
}