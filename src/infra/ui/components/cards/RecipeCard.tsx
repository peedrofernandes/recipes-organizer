import { AdaptedRecipe } from "@controllers/AdaptedTypes"
import { Id } from "@domain/utilities/types/Id"
import { CardContainer, ContentContainer, ImageContainer, MacrosSpan, TypeSpan } from "@infra/ui/components/cards/Card/styles"
import React from "react"
import Button from "../buttons/Button"
import Icon from "../icons/_Icon"

type RecipeCardProps = {
  recipe: AdaptedRecipe;
  events: {
    updateEvent: (adaptedRecipe: AdaptedRecipe) => void;
    deleteEvent: (id: Id) => void;
  }
  loadingUpdate: boolean
}

export default function RecipeCard(props: RecipeCardProps) {
  const { id, type, name, description, imageUrl, macros, kcal  } = props.recipe

  return (
    <CardContainer status="active">

      {
        (type === "Week") ? <TypeSpan>Receita de semana</TypeSpan> :
          (type === "Weekend") ? <TypeSpan>Receita de fim de semana</TypeSpan> : null
      }

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
                  <li>|</li>
                  <li>{kcal?.toFixed(2)}kcal</li>
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