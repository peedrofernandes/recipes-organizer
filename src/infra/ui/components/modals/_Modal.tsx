import React, {
  MouseEvent,
  ReactNode,
  useCallback,
  useRef,
} from "react"
import styled from "styled-components"

import { Grid, GridItem } from "../MaterialGrid"
import Icon from "../icons/_Icon"
import Button from "../buttons/_Button"
import useEvents from "@infra/ui/hooks/useEvents"

const ModalBackground = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, .6);
  z-index: 1;

  display: flex;
  justify-content: center;
  align-items: center;
`

const ModalBox = styled.div`
  background-color: ${({ theme }) => theme.main.primaryV2};
  color: ${({ theme }) => theme.main.contrastV2};
  width: 100%;
  height: 100%;
  border-radius: 8px;
  max-height: 80vh;
  overflow-y: auto;
`

const TopContainer = styled.div`
  position: sticky;
  background-color: ${({ theme }) => theme.main.primaryV2};
  box-sizing: border-box;
  z-index: 1;
  padding: 16px 0;
  top: 0;
  width: 100%;
  filter: ${({ theme }) => `drop-shadow(0 12px 6px ${theme.main.primaryV2})`};

  & > button {
    position: absolute;
    top: 16px;
    right: 8px;
  };

  & > h1, h2, h3 {
    width: 100%;
    text-align: center;
  }
`

const ModalContent = styled.div`
  padding: 0 16px 16px 16px;
`

type ModalProps = {
  title: string;
  children: ReactNode
}

export default function Modal(props: ModalProps) {
  const modalBoxRef = useRef<HTMLDivElement>(null)
  const { cancelRequest } = useEvents()

  const modalCloseClickOutside = useCallback((e: MouseEvent) => {
    if (!modalBoxRef.current?.contains(e.target as Node)) {
      cancelRequest()
    }
  }, [modalBoxRef])

  return (
    <ModalBackground onClick={(e) => modalCloseClickOutside(e)}>

      <Grid>
        <GridItem rAbs={{ xs: [1, 5], sm: [2, 8], md: [2, 12] }}>
          <ModalBox ref={modalBoxRef}>
            <TopContainer>
              <h3>{props.title}</h3>
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