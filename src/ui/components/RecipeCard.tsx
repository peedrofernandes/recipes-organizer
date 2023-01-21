import React, { ReactNode } from "react"
import styled from "styled-components"
import { AtLeastOne } from "../../types/AtLeastOne"
import DeleteIconButton from "./buttons/DeleteIconButton"
import EditIconButton from "./buttons/EditIconButton"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  aspect-ratio: 3 / 2;
  padding: 4px;
  box-shadow: 0 0 4px black;
  border-radius: 8px;

  & > * {
    font-size: 0.8em;
    font-weight: normal;
    font-family: "Roboto", sans-serif;
  }

  & > h1, h2, h3 {
    font-size: 1.1em;
  }
`

const TypeSpan = styled.span`
  position: absolute;
  background-color: white;
  padding: 2px 4px;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
`

const ImageContainer = styled.div<{
  imageUrl?: string
}>`
  width: 100%;
  height: 70%;
  background: ${props => props.imageUrl ? `url(${props.imageUrl})` : "grey"};
  background-size: cover;
  border-radius: 8px;

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
`

type RecipeCardProps = {
  name: string
  type: "Week" | "Weekend" | "Both"
  options?: AtLeastOne<{ description: string, imageUrl: string }>
}

export default function RecipeCard(props: RecipeCardProps) {
  const { name, options, type } = props

  const ImageElement = (() => {
    if (options && options.imageUrl) {
      return <ImageContainer imageUrl={options.imageUrl} />
    } else {
      return <ImageContainer />
    }
  })

  const TypeElement = (() => {
    switch (type) {
      case "Week":
        return <TypeSpan>Receita de semana</TypeSpan>
      case "Weekend":
        return <TypeSpan>Receita de fim de semana</TypeSpan>
      case "Both":
        return null
      default:
        return null
    }
  })

  const DescriptionElement = (() => {
    if (options && options.description) {
      return <p>{options.description}</p>
    } else {
      return null
    }
  })

  return (
    <Container>
      <TypeElement />

      <ImageElement />
      <ContentContainer>
        <div>
          <h3>{props.name}</h3>
          <DescriptionElement />
        </div>
        <div>
          <EditIconButton size={24} />
          <DeleteIconButton size={24} />
        </div>
      </ContentContainer>

    </Container>
  )
}