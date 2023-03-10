import { AdaptedIngredient } from "@controllers/AdaptedTypes"
import { Id } from "@domain/utilities/types/Id"
import { CardContainer, ContentContainer, ImageContainer, MacrosSpan } from "@infra/ui/components/cards/Card/styles"
import React from "react"
import Button from "../buttons/Button"
import Icon from "../icons/Icon"

type IngredientCardProps = {
  ingredient: AdaptedIngredient;
  events: {
    updateEvent: (adaptedIngredient: AdaptedIngredient) => void;
    deleteEvent: (id: Id) => void;
  }
  loadingUpdate: boolean
}

export default function IngredientCard(props: IngredientCardProps) {
  const { id, name, description, macros, imageUrl } = props.ingredient

  return (
    <CardContainer status="active">

      <ImageContainer imageUrl={imageUrl}>

        {props.loadingUpdate ? (
          <Icon variant="Spinner"/>
        ) : (
          <>
            {macros && (
              <MacrosSpan>
                <ul>
                  <li>P: {macros[0].toFixed(2)}g</li>
                  <li>C: {macros[1].toFixed(2)}g</li>
                  <li>G: {macros[2].toFixed(2)}g</li>
                </ul>
              </MacrosSpan>
            )}
            {!imageUrl && <Icon variant="NoRecipe" />}
          </> 
        )}

        

      </ImageContainer>

      <ContentContainer>
        <div>
          <h3>{name}</h3>
          {description && <p>{description}</p>}
        </div>
        <div>
          <Button variant="icon" onClick={() => props.events.updateEvent(props.ingredient)}>
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