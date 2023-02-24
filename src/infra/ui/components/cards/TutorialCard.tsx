import React from "react"
import styled from "styled-components"
import { Text, Title } from "../styles"

const TutorialCardContainer = styled.div`
  display: flex;
`

type TutorialCardProps = {
  title: string
  text: string
  imageSrc: string 
}

export default function TutorialCard(props: TutorialCardProps) {
  return (
    <TutorialCardContainer>
      <Title variant={2} as="h2">{props.title}</Title>
      <Text>{props.text}</Text>
      <img src={"../../assets/mealMindLaptop.png"} />
    </TutorialCardContainer>
  )
}