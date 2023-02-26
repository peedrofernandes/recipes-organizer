import styled from "styled-components"

const fontSizesXs = [64, 48, 32, 14, 14]
const fontSizesSm = [64, 48, 32, 16, 16]
const fontSizesLg = [64, 48, 32, 20, 18]
// const fontSizesXs = [22, 20, 14, 14, 14]
// const fontSizesSm = [24, 22, 18, 16, 16]
// const fontSizesLg = [28, 26, 22, 20, 18]

export const Title = styled.div<{
  variant: 1 | 2 | 3 | 4 | 5;
  align?: "left" | "right" | "center"
}>`
  ${({ theme, variant }) => `
    @media ${theme.breakpoints.xs} {
      font-size: ${fontSizesXs[variant - 1]}px;
    }

    @media ${theme.breakpoints.sm} {
      font-size: ${fontSizesSm[variant - 1]}px;
    }

    @media ${theme.breakpoints.lg} {
      font-size: ${fontSizesLg[variant - 1]}px;
    }
  `}

  text-align: ${({ align }) => align ?? "left" };
  color: ${({ theme }) => theme.main.contrastV1};
`

export const Text = styled.p`

  font-size: 14px;  


  ${({ theme }) => `
    @media ${theme.breakpoints.md} {
      font-size: 16px;
    }
  `}

  color: ${({ theme }) => theme.main.contrastV1};
`

export const Subtitle = styled.p`
  font-size: 12px;

  ${({ theme }) => `
    @media ${theme.breakpoints.md} {
      font-size: 14px;
    }
  `}

  color: ${({ theme }) => theme.main.contrastV1 + "90"};

`

export const Span = styled.span<{ 
  color?: string
}>`
  font-size: 12px;

  ${({ theme }) => `
    @media ${theme.breakpoints.md} {
      font-size: 14px;
    }
  `}

  font-weight: bold;
  color: ${({ color }) => color ?? "inherit"};
`

export const StyledTable = styled.table`
  width: 100%;
  margin: 20px 0;
  border-collapse: collapse;
  td, th {
    padding: 8px 16px;
    text-align: left;
  }

  thead tr {
    background-color: ${({ theme }) => theme.color.primaryV1};
    color: ${({ theme }) => theme.main.contrastV1};
  }

  tbody span {
    text-align: center;
    padding: 8px;
    width: 100%;
  }

  tbody tr {
    border-bottom: 1px solid ${({ theme }) => theme.main.contrastV3 + "60"};
    &:nth-of-type(even) {
      background-color: ${({ theme }) => theme.main.primaryV3}
    }
    &:last-of-type {
      border-bottom: 2px solid ${({ theme }) => theme.color.primaryV1}
    }

    td {
      &:nth-child(2) {
        color: ${({ theme }) => theme.color.green}
      }
      &:nth-child(3) {
        color: ${({ theme }) => theme.color.orange}
      }
      &:nth-child(4) {
        color: ${({ theme }) => theme.color.blue}
      }
    }
  }
`

export const CardList = styled.ul`
  list-style: none;
  width: 100%;
`

export const CardListItem = styled.li`
  display: flex;
  justify-content: space-between;
  gap: 16px;
`