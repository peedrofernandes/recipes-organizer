import React from "react"
import styled from "styled-components"
import Icon from "../icons/Icon"
import { Text, Title } from "../styles"

const EntryCardContainer = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  gap: 32px;
  padding: 24px;
  border-radius: 4px;

  background-color: #ffffff;
  * {
    color: #111414;
    fill: #111414;
  }
  box-shadow: 0 0 24px #00000090;

`

type EntryCardProps = {
  icon: React.ReactElement<typeof Icon>;
  title: string
  text: string
}

export default function EntryCard(props: EntryCardProps) {
  const { icon, title, text } = props
  
  return (
    <EntryCardContainer>
      {icon}
      <Title variant={3} as="h3">
        {title}
      </Title>
      <Text>
        {text}
      </Text>
    </EntryCardContainer>
  )
}