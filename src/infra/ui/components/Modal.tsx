import React, {
  MouseEvent,
  ReactNode,
  useRef,
} from "react"
import styled from "styled-components"

import { Grid, GridItem } from "./Grid"
import Icon from "./icons/Icon"
import Button from "./buttons/Button"
import useEvents from "@infra/ui/hooks/useEvents"
import { Title } from "./styles"

const ModalBackground = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, .6);
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`

const ModalBox = styled.div<{ variant?: "small" | "form" }>`
  position: relative;
  background-color: ${({ theme }) => theme.main.primaryV2};
  color: ${({ theme }) => theme.main.contrastV2};
  width: 100%;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  padding: 16px 8px;

  height: ${({ variant }) => variant === "small" ? "100px" : "80vh"};

  ${({ theme, variant }) => `
    @media ${theme.breakpoints.sm} {
      height: ${variant === "small" ? "120px" : "80vh"};
      padding: 16px;
    }
  `}
`

const TopContainer = styled.div`
  position: sticky;
  box-sizing: border-box;
  z-index: 1;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;

  ${({ theme }) => `
    @media ${theme.breakpoints.sm} {
      gap: 16px;
    }
  `}
  


  & > h1, h2, h3 {
    width: 100%;
    text-align: center;
  }
`

const ModalContent = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-end;
  padding-top: 32px;
`

type ModalProps = {
  variant: "small" | "form";
  title: string;
  children: ReactNode;
  events?: { scrollEvent: () => void }
}

export default function Modal(props: ModalProps) {
  const modalBoxRef = useRef<HTMLDivElement>(null)
  const { cancelRequest } = useEvents()

  let outsideClick = false
  const clickBackground = (e: MouseEvent) => {
    const targetIsModalBox = modalBoxRef.current?.contains(e.target as Node)
    if (!targetIsModalBox) outsideClick = true
    else outsideClick = false
  }
  const releaseClickBackground = (e: MouseEvent) => {
    const targetIsModalBox = modalBoxRef.current?.contains(e.target as Node)
    if (!targetIsModalBox && outsideClick)
      cancelRequest()
  }

  return (
    <ModalBackground
      onMouseDown={(e) => clickBackground(e)}
      onMouseUp={(e) => releaseClickBackground(e)}
    >

      <Grid>
        <GridItem rAbs={props.variant === "form" ? {
          xs: [1, 5], sm: [2, 8], md: [2, 12]
        } : {
          xs: [2, 4], sm: [3, 7], md: [4, 10]
        }}>

          <ModalBox ref={modalBoxRef} variant={props.variant}>

            <TopContainer>
              <Title variant={5} as="h5">{props.title}</Title>
              <Button variant="icon" onClick={() => cancelRequest()}>
                <Icon variant="Close" size={24} />
              </Button>
            </TopContainer>

            <ModalContent>
              {props.children}
            </ModalContent>

          </ModalBox>

        </GridItem>
      </Grid>

    </ModalBackground>
  )
} 