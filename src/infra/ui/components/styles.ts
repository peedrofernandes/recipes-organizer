import styled from "styled-components"

export const Title = styled.div<{
  variant: "1" | "2" | "3" | "4" | "5"
}>`
  font-size: ${({ variant }) => {
    switch (variant) {
    case "1":
      return "28px"
    case "2":
      return "26px"
    case "3":
      return "24px"
    case "4":
      return "20px"
    case "5":
      return "18px"
    default:
      return
    }
  }};

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
  font-size: 10px;

  ${({ theme }) => `
    @media ${theme.breakpoints.md} {
      font-size: 12px;
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