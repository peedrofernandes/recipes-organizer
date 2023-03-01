import React from "react"
import styled from "styled-components"
import Blob from "../blobs/Blob"
import { Text, Title } from "../styles"

const TutorialCardContainer = styled.div`
  display: flex;

  ${({ theme }) => `
    @media ${theme.breakpoints.sm} {
      flex-direction: row;
    }
  `}

  & > div:nth-child(1) {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 4px;
  }

  & > div:nth-child(2) {
    width: 100%;
    display: flex;
    justify-content: center;
    position: relative;

    img {
      max-height: 180px;
      ${({ theme }) => `
        @media ${theme.breakpoints.sm} {
          max-height: 240px;
        }
        @media ${theme.breakpoints.md} {
          max-height: 360px;
        }
      `}
      filter:
        drop-shadow(0px 8.5px 9.2px rgba(0, 0, 0, 0.19))
        drop-shadow(0px 15.1px 17.8px rgba(0, 0, 0, 0.146))
        drop-shadow(0px 23.9px 26.8px rgba(0, 0, 0, 0.115))
        drop-shadow(0px 45.7px 40.7px rgba(0, 0, 0, 0.098))
        drop-shadow(0px 172px 89px rgba(0, 0, 0, 0.083));
      }
  }
`

type TutorialCardProps = {
  title: string
  text: string
  children: React.ReactNode
}

export default function TutorialCard(props: TutorialCardProps) {
  return (
    <TutorialCardContainer>
      <div>
        <Title variant={2} as="h2">{props.title}</Title>
        <Text>{props.text}</Text>
      </div>
      <div>
        {props.children}
      </div>
    </TutorialCardContainer>
  )
}