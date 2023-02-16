import React, {
  MouseEvent,
  ReactNode,
  useRef,
  useState,
} from "react"
import styled from "styled-components"

import { Grid, GridItem } from "../MaterialGrid"
import Icon from "../icons/_Icon"
import Button from "../buttons/Button"
import useEvents from "@infra/ui/hooks/useEvents"

const ModalBackground = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, .6);
  z-index: 1;
`

const ModalBox = styled.div`
  margin-top: 10%;
  background-color: ${({ theme }) => theme.main.primaryV2};
  color: ${({ theme }) => theme.main.contrastV2};
  width: 100%;
  border-radius: 8px;
  max-height: 80vh;
  overflow-y: auto;
`

const TopContainer = styled.div`
  position: sticky;
  background-color: ${({ theme }) => theme.main.primaryV2};
  box-sizing: border-box;
  z-index: 1;
  padding: 16px;
  gap: 16px;
  top: 0;
  width: 100%;
  filter: ${({ theme }) => `drop-shadow(0 12px 6px ${theme.main.primaryV2})`};
  display: flex;
  justify-content: space-between;

  & > h1, h2, h3 {
    width: 100%;
    text-align: center;
  }
`

const ModalContent = styled.div`
  padding: 0 16px 16px 16px;
`

type ModalProps = {
  variant: "small" | "form"
  title: string;
  renderChildren: (scrollEvent: boolean) => ReactNode
}

export default function Modal(props: ModalProps) {
  const modalBoxRef = useRef<HTMLDivElement>(null)
  const { cancelRequest } = useEvents()

  let outsideClick = false
  const clickBackground = (e: MouseEvent) => {
    const targetIsModalBox = modalBoxRef.current?.contains(e.target as Node)
    if (!targetIsModalBox) outsideClick = true
    else outsideClick = false
    console.log(`Backgound click detected! outsideClick: ${outsideClick}`)
  }
  const releaseClickBackground = (e: MouseEvent) => {
    const targetIsModalBox = modalBoxRef.current?.contains(e.target as Node)
    console.log("Click released!")
    if (!targetIsModalBox && outsideClick)
      cancelRequest()
  }

  const [scrolled, setScrolled] = useState<boolean>(false)
  const fireScrolledEvent = () => {
    setScrolled(true)
    setTimeout(() => setScrolled(false), 1000)
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
          <ModalBox ref={modalBoxRef} onScroll={fireScrolledEvent}>
            <TopContainer>
              <h3>{props.title}</h3>
              <Button variant="icon" onClick={() => cancelRequest()}>
                <Icon variant="Close" size={24} />
              </Button>
            </TopContainer>
            <ModalContent>
              {props.renderChildren(scrolled)}
            </ModalContent>
          </ModalBox>
        </GridItem>
      </Grid>

    </ModalBackground>
  )
} 