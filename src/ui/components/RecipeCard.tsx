import React, { Component, ReactNode } from "react"
import styled, { StyledComponent } from "styled-components"
import { AtLeastOne } from "../../types/AtLeastOne"
import DeleteIconButton from "./buttons/DeleteIconButton"
import EditIconButton from "./buttons/EditIconButton"

const CardContainer = styled.div<{
  status: "active" | "inactive"
}>`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  aspect-ratio: 3 / 2;
  padding: 4px;
  border-radius: 8px;
  background-color: white;

  box-shadow: ${props => props.status === "active" && '0 0 4px black'};
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

  &:hover {
    ${({ status }) => status === "active" && ('transform: scale(1.02)')};
  }
`;

const TypeSpan = styled.span`
  position: absolute;
  background-color: white;
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
  background: ${props => props.imageUrl ? `url(${props.imageUrl})` : "grey"};
  background-size: cover;
  border-radius: 8px;
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
          <ImageContainer />
        }

        <ContentContainer>
          <div>
            <h3>{props.name}</h3>
            {options?.description && <p>{options.description}</p>}
          </div>
          <div>
            <EditIconButton size={24} />
            <DeleteIconButton size={24} />
          </div>
        </ContentContainer>
          
      </CardContainer>
    )
  } else {
    return (
      <CardContainer status="inactive">

      </CardContainer>
    )
    
  }
}