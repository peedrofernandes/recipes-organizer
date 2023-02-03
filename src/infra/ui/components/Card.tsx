import { AdaptedIngredient, AdaptedRecipe } from "@controllers/AdaptedTypes";
import { Id } from "@domain/value-objects/Id";
import React from "react"
import styled from "styled-components"

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

const MacrosSpan = styled.span`
  position: absolute;
  bottom: 2px;
  width: 75%;
  background-color: ${({ theme }) => theme.main.primaryV2 + "7F"};
  backdrop-filter: blur(2px);
  font-weight: bold;
  border-radius: inherit;
  padding: 2px;

  ul {
    list-style: none;
    display: flex;
    justify-content: space-evenly;

    li:nth-child(1) {
      color: ${({ theme }) => theme.color.green}
    }
    li:nth-child(2) {
      color: ${({ theme }) => theme.color.blue}
    }
    li:nth-child(3) {
      color: ${({ theme }) => theme.color.orange}
    }

  }
`

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
  position: relative;
  width: 100%;
  height: 70%;
  background: ${props => props.imageUrl ? `url(${props.imageUrl})` : `${props.theme.main.primaryV3}`};
  background-size: cover;
  background-position: center;
  border-radius: inherit;
  
  display: flex;
  justify-content: center;
  align-items: center;
`;

// ----------- Type Options -----------

type CardProps = {
  variant: "Ingredient";
  ingredient: AdaptedIngredient;
  events: {
    handleEditClick: (id: Id) => void;
    handleDeleteClick: (id: Id) => void;
  }
} | {
  variant: "Recipe";
  recipe: AdaptedRecipe;
  events: {
    handleEditClick: (id: Id) => void;
    handleDeleteClick: (id: Id) => void;
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
      const { id, name, macros, description, imageFile, imageUrl } = ingredient;

      return (
      <CardContainer status="active">
      

            
        
      <ImageContainer imageUrl={imageUrl}>

        {
          macros && (
            <MacrosSpan>
              <ul>
                <li>P: {macros[0]}</li>    
                <li>C: {macros[1]}</li>    
                <li>G: {macros[2]}</li>    
              </ul>
            </MacrosSpan>
          )     
        }

        {!imageUrl && <Icon variant="NoRecipe" />}
      </ImageContainer>

      <ContentContainer>
        <div>
          <h3>{name}</h3>
          {description && <p>{description}</p>}
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
    case "CreateIngredient": {
      const { events } = props;

      return (
        <CardContainer status="inactive" onClick={() => events.handleCreateClick()}>
          <Icon variant="AddRecipe" size={48} />
          <Icon variant="Plus" size={24} />
        </CardContainer>
      )
    }
    case "Recipe": {
      const { events } = props;
      const { id, name, type, macros, description, imageFile, imageUrl } = props.recipe;

      return (
        <CardContainer status="active">

        {
          (type === "Week") ? <TypeSpan>Receita de semana</TypeSpan> :
          (type === "Weekend") ? <TypeSpan>Receita de fim de semana</TypeSpan> : null
        }
          
        <ImageContainer imageUrl={imageUrl}>
          {imageUrl && <Icon variant="NoRecipe" />}
        </ImageContainer>

        <ContentContainer>
          <div>
            <h3>{name}</h3>
            {description && <p>{description}</p>}
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