import React from "react"
import styled from "styled-components"
import { Ingredient, Recipe } from "../types/Data";

import Button from "./Button";
import Icon from "./Icon";

// --------- Visual Elements ----------

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

  ${({ status, theme }) => status === "inactive" && `
    cursor: pointer;

    &:hover {
      background-color: ${theme.main.primaryV1}
    }
  `}
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
  background-position: center;
  border-radius: 8px;
  
  display: flex;
  justify-content: center;
  align-items: center;
`;

// ----------- Type Options -----------

type CardProps = {
  variant: "Ingredient";
  ingredient: Ingredient;
  events: {
    handleEditClick: (id: number | string) => void;
    handleDeleteClick: (id: number | string) => void;
  }
} | {
  variant: "Recipe";
  recipe: Recipe;
  events: {
    handleEditClick: (id: number | string) => void;
    handleDeleteClick: (id: number | string) => void;
  }
} | {
  variant: "CreateRecipe";
  events: {
    handleCreateClick: () => void;
  }
} | {
  variant: "CreateIngredient";
  events: {
    handleCreateClick: () => void;
  }
};

// ------------------------------------

export default function Card(props: CardProps) {
  switch (props.variant) {
    case "Ingredient": {
      const { events, ingredient } = props;
      const { id, name, macros, options } = ingredient;

      return (
      <CardContainer status="active">
        
      <ImageContainer imageUrl={options?.imageUrl}>
        {!options?.imageUrl && <Icon variant="NoRecipe" />}
      </ImageContainer>

      <ContentContainer>
        <div>
          <h3>{name}</h3>
          {options?.description && <p>{options.description}</p>}
        </div>
        <div>
          <Button variant="icon" onClick={() => events.handleEditClick(id)}>
            <Icon variant="Edit" size={24}/>
          </Button>
          <Button variant="icon" onClick={() => events.handleDeleteClick(id)}>
            <Icon variant="Delete" size={24} color="red" />
          </Button>
        </div>
      </ContentContainer>
        
      </CardContainer>
      )


      return null;
    }
    case "CreateIngredient": {
      return (
        <CardContainer status="inactive" onClick={() => props.events.handleCreateClick()}>
          <Icon variant="AddRecipe" size={48} />
          <Icon variant="Plus" size={24} />
        </CardContainer>
      )
    }
    case "Recipe": {
      const { events } = props;
      const { id, name, type, macros, options } = props.recipe;

      return (
        <CardContainer status="active">

        {
          (type === "Week") ? <TypeSpan>Receita de semana</TypeSpan> :
          (type === "Weekend") ? <TypeSpan>Receita de fim de semana</TypeSpan> : null
        }
          
        <ImageContainer imageUrl={options?.imageUrl}>
          {!options?.imageUrl && <Icon variant="NoRecipe" />}
        </ImageContainer>

        <ContentContainer>
          <div>
            <h3>{name}</h3>
            {options?.description && <p>{options.description}</p>}
          </div>
          <div>
            <Button variant="icon" onClick={() => events.handleEditClick(id)}>
              <Icon variant="Edit" size={24}/>
            </Button>
            <Button variant="icon" onClick={() => events.handleDeleteClick(id)}>
              <Icon variant="Delete" size={24} color="red" />
            </Button>
          </div>
        </ContentContainer>
          
        </CardContainer>
      )
    }
    case "CreateRecipe": {
      const { events } = props;

      return (
        <CardContainer status="inactive" onClick={() => events.handleCreateClick()}>
          <Icon variant="AddRecipe" size={48} />
          <Icon variant="Plus" size={24} />
        </CardContainer>
      )
      break;
    }
  }
}