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
  font-size: 16px;
  color: ${({ theme }) => theme.main.contrastV1};
`

export const Subtitle = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.main.contrastV1 + "90"};

`

export const Span = styled.span<{ 
  color?: string
}>`
  font-weight: bold;
  color: ${({ color }) => color ?? "inherit"};
`