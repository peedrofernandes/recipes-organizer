import React, { ReactNode } from "react"
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  
  & > div {
    display: grid;

    // Material design. 
    // https://m2.material.io/design/layout/responsive-layout-grid.html#breakpoints
    
    // 0-599px
    grid-template-columns: repeat(4, 1fr);
    width: 100%;
    margin: 0 16px;
    gap: 4px;

    // 600-904px
    @media (min-width: 600px) {
      grid-template-columns: repeat(8, 1fr);
      width: 100%;
      margin: 0 32px;
      gap: 4px;
    }

    // 905-1239px
    @media (min-width: 905px) {
      grid-template-columns: repeat(12, 1fr);
      width: 840px;
      gap: 4px;
    }

    // 1240-1439px
    @media (min-width: 1240px) {
      width: 100%;
      margin: 0 200px;
      gap: 8px;
    }

    // 1440+px
    @media (min-width: 1440px) {
      width: 1040px;
      gap: 8px;
    }
  }
`

export function Grid(props: { children: ReactNode }) {
  return (
    <Container>
      <div>
        {props.children}
      </div>
    </Container>
  )
}

type GridItemProps = {
  children: ReactNode
  span?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
}
export const GridItem = styled.div<GridItemProps>`
  grid-column: span ${props => props.span};
`