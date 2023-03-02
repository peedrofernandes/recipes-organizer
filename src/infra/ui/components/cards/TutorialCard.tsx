import useViewportTracker from "@infra/ui/hooks/useViewportTracker"
import React from "react"
import styled from "styled-components"
import { Text, Title } from "../styles"

const TutorialCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;

  * {
    text-align: center;
  }

  #TutorialCardText {
    line-height: 1.8rem;
  }

  ${({ theme }) => `
    @media ${theme.breakpoints.md} {
      flex-direction: row;
      * {
        text-align: left;
      }
    }
  `}

  & > div#TitleText {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 24px;
  }

  & > div#imageContainer {
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

      svg {
        width: 100%;
        height: 100%;
      }
  }
`

type TutorialCardProps = {
  title: string
  text: string
  children: React.ReactNode
}

export default function TutorialCard(props: TutorialCardProps) {
  const viewportStatus = useViewportTracker()

  return (
    <TutorialCardContainer>
      {viewportStatus.md ? (
        <>
          <div id="TitleText">
            <Title variant={2} as="h2">{props.title}</Title>
            <Text id="TutorialCardText">{props.text}</Text>
          </div>
          <div id="imageContainer">
            {props.children}
          </div>
        </>
      ) : (
        <>
          <Title variant={2} as="h2">{props.title}</Title>
          <div id="imageContainer">
            {props.children}
          </div>
          <Text id="TutorialCardText">{props.text}</Text>
        </>
      )}
    </TutorialCardContainer>
  )
}