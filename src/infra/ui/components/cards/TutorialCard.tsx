import useViewportTracker from "@infra/ui/hooks/useViewportTracker"
import React from "react"
import styled from "styled-components"
import Blob from "../blobs/Blob"
import Image from "../images/Image"
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

    & > div#image {
      z-index: 0;
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
      }
    }

    & > div#blob {
      svg {
        width: 100%;
        height: 100%;
      }
    }
  }
`

type TutorialCardProps = {
  title: string
  text: string
  image: React.ReactElement<typeof Image>
  blob: React.ReactElement<typeof Blob>
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
            <div id="blob">
              {props.blob}
            </div>
            <div id="image">
              {props.image}
            </div>
          </div>
        </>
      ) : (
        <>
          <Title variant={2} as="h2">{props.title}</Title>
          <div id="imageContainer">
            <div id="blob">
              {props.blob}
            </div>
            <div id="image">
              {props.image}
            </div>
          </div>
          <Text id="TutorialCardText">{props.text}</Text>
        </>
      )}
    </TutorialCardContainer>
  )
}