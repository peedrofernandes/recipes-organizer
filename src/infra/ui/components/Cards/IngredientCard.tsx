import { AdaptedIngredient } from "@controllers/AdaptedTypes"
import { Id } from "@domain/utilities/types/Id"
import React from "react"
import Button from "../Buttons/_Button"
import Icon from "../Icons/_Icon"
import { CardContainer, ContentContainer, ImageContainer, MacrosSpan } from "./_Card"

type IngredientCardProps = {
  ingredient: AdaptedIngredient;
  events: {
    handleEditClick: (id: Id) => void;
    handleDeleteClick: (id: Id) => void;
  }
}

export default function IngredientCard(props: IngredientCardProps) {
  const { id, name, description, macros, imageUrl } = props.ingredient

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
          <Button variant="icon" onClick={() => props.events.handleEditClick(id)}>
            <Icon variant="Edit" size={24} />
          </Button>
          <Button variant="icon" onClick={() => props.events.handleDeleteClick(id)}>
            <Icon variant="Delete" size={24} color="red" />
          </Button>
        </div>
      </ContentContainer>

    </CardContainer>
  )
}