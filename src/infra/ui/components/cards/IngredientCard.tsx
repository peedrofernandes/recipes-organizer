import { AdaptedIngredient } from "@controllers/AdaptedTypes"
import { Id } from "@domain/utilities/types/Id"
import { Values } from "@domain/utilities/types/Values"
import { CardContainer, ContentContainer, ImageContainer, MacrosSpan } from "@infra/ui/styles/cardStyles"
import React from "react"
import Button from "../buttons/_Button"
import Icon from "../icons/_Icon"

type IngredientCardProps = {
  ingredient: AdaptedIngredient;
  events: {
    updateEvent: (id: Id, currentValues: Values<AdaptedIngredient>) => void;
    deleteEvent: (id: Id) => void;
  }
}

export default function IngredientCard(props: IngredientCardProps) {
  const { id, name, description, macros, imageUrl, imageFile } = props.ingredient
  const values: Values<AdaptedIngredient> = {
    name, description, macros, imageUrl, imageFile
  }

  return (
    <CardContainer status="active">

      <ImageContainer imageUrl={imageUrl}>

        {
          macros && (
            <MacrosSpan>
              <ul>
                <li>P: {macros[0].toFixed(2)}g</li>
                <li>C: {macros[1].toFixed(2)}g</li>
                <li>G: {macros[2].toFixed(2)}g</li>
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
          <Button variant="icon" onClick={() => props.events.updateEvent(id, values)}>
            <Icon variant="Edit" size={24} />
          </Button>
          <Button variant="icon" onClick={() => props.events.deleteEvent(id)}>
            <Icon variant="Delete" size={24} color="red" />
          </Button>
        </div>
      </ContentContainer>

    </CardContainer>
  )
}