import { AdaptedRecipe } from "@controllers/AdaptedTypes"
import { Id } from "@domain/utilities/types/Id"
import { CardContainer, ContentContainer, ImageContainer, TypeSpan } from "@infra/ui/styles/cardStyles"
import React from "react"
import Button from "../buttons/_Button"
import Icon from "../icons/_Icon"

type RecipeCardProps = {
  recipe: AdaptedRecipe;
  events: {
    updateEvent: (adaptedRecipe: AdaptedRecipe) => void;
    deleteEvent: (id: Id) => void;
  }
}

export default function RecipeCard(props: RecipeCardProps) {
  const { id, type, name, description, imageUrl  } = props.recipe

  return (
    <CardContainer status="active">

      {
        (type === "Week") ? <TypeSpan>Receita de semana</TypeSpan> :
          (type === "Weekend") ? <TypeSpan>Receita de fim de semana</TypeSpan> : null
      }

      <ImageContainer imageUrl={imageUrl}>
        {!imageUrl && <Icon variant="NoRecipe" />}
      </ImageContainer>

      <ContentContainer>
        <div>
          <h3>{name}</h3>
          {description && <p>{description}</p>}
        </div>
        <div>
          <Button variant="icon" onClick={() => props.events.updateEvent(props.recipe)}>
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