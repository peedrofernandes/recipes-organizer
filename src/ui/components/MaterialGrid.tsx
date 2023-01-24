import React, { ReactNode } from "react"
import styled from "styled-components";
import { AtLeastOne } from "../../types/AtLeastOne";
import { OnlyOne } from "../../types/OnlyOne";

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  
  & > div {
    display: grid;

    // Material design. 
    // https://m2.material.io/design/layout/responsive-layout-grid.html#breakpoints
    
    // 0-599px - xs
    grid-template-columns: repeat(4, 1fr);
    width: 100%;
    margin: 0 16px;
    gap: 4px;

    // 600-904px - sm
    @media (min-width: 600px) {
      grid-template-columns: repeat(8, 1fr);
      width: 100%;
      margin: 0 32px;
      gap: 8px;
    }

    // 905-1239px - md
    @media (min-width: 905px) {
      grid-template-columns: repeat(12, 1fr);
      width: 840px;
      gap: 12px;
    }

    // 1240-1439px - lg
    @media (min-width: 1240px) {
      width: 100%;
      margin: 0 200px;
      gap: 12px;
    }

    // 1440+px - xl
    @media (min-width: 1440px) {
      width: 1040px;
      gap: 12px;
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

// type GridItemProps = {
//   children: ReactNode;
//   span?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
// }

type Cols = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;

type GridItemProps = { children: ReactNode } & OnlyOne<{
  span: Cols;
  rSpan: AtLeastOne<{
    [K in "xs" | "sm" | "md" | "lg" | "xl"]: Cols
  }>;
  abs: [Cols, Cols];
  rAbs: AtLeastOne<{
    [K in "xs" | "sm" | "md" | "lg" | "xl"]: [Cols, Cols]
  }>;
}>

export const GridItem = styled.div<GridItemProps>`
  position: relative;

  // 0-599px - xs+
  grid-column: ${({ span, rSpan, abs, rAbs }) => {
    if (span)
      return `span ${span}`
    else if (rSpan)
      return `span ${rSpan.xs ?? 1}`
    else if (abs)
      return `${abs[0]} / ${abs[1]}`
    else if (rAbs) 
        return `
          ${rAbs.xs ? rAbs.xs[0] : 0} / ${rAbs.xs ? rAbs.xs[1] : 0}
        `
  }};
    
  @media (min-width: 600px) {
    ${({ rSpan, rAbs }) => {
      if (rSpan)
        return `grid-column: span ${rSpan.sm ?? 1}`
      else if (rAbs) 
        return `
          grid-column: ${rAbs.sm ? rAbs.sm[0] : 0} / ${rAbs.sm ? rAbs.sm[1] : 0}
        `
    }}
  }

  @media (min-width: 905px) {
    ${({ rSpan, rAbs }) => {
      if (rSpan)
        return `grid-column: span ${rSpan.md ?? 1}`
      else if (rAbs) 
        return `
          grid-column: ${rAbs.md ? rAbs.md[0] : 0} / ${rAbs.md ? rAbs.md[1] : 0}
        `
    }}
  }

  @media (min-width: 1240px) {
    ${({ rSpan, rAbs }) => {
      if (rSpan)
        return `grid-column: span ${rSpan.lg ?? 1}`
      else if (rAbs) 
        return `
          grid-column: ${rAbs.lg ? rAbs.lg[0] : 0} / ${rAbs.lg ? rAbs.lg[1] : 0}
        `
    }}
  }

  @media (min-width: 1440px) {
    ${({ rSpan, rAbs }) => {
      if (rSpan)
        return `grid-column: span ${rSpan.xl ?? 1}`
      else if (rAbs) 
        return `
          grid-column: ${rAbs.xl ? rAbs.xl[0] : 0} / ${rAbs.xl ? rAbs.xl[1] : 0}
        `
    }}
  }
`