import styled from "styled-components"

export const CardContainer = styled.div<{
  status: "active" | "inactive"
}>`
  display: flex;
  align-items: center;
  ${({ status }) => status === "active" ? `
      flex-direction: column;
    ` : `
      justify-content: center;
    `}


  width: 100%;
  aspect-ratio: 3 / 2;
  padding: 4px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.main.primaryV2};
  color: ${({ theme }) => theme.main.contrastV2};

  box-shadow: ${props => props.status === "active" && `0 0 4px ${props.theme.main.contrastV1}`};

  border: ${props => props.status === "inactive" && "1px dashed grey"};

  & > * {
    font-size: 0.8em;
    font-weight: normal;
    font-family: "Roboto", sans-serif;
  }

  & > h1, h2, h3 {
    font-size: 1.1em;
  }

  transition: 0.1s ease-in-out;

  z-index: 0;

  ${({ status, theme }) => status === "inactive" && `
    cursor: pointer;

    &:hover {
      background-color: ${theme.main.primaryV1}
    }
  `}
`

export const TypeSpan = styled.span`
  position: absolute;
  background-color: ${({ theme }) => theme.main.primaryV2};
  color: ${({ theme }) => theme.main.contrastV2};
  padding: 2px 4px;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
`

export const MacrosSpan = styled.span`
  position: absolute;
  bottom: 2px;
  width: auto;
  background-color: ${({ theme }) => theme.main.primaryV2 + "7F"};
  backdrop-filter: blur(2px);
  font-weight: bold;
  border-radius: inherit;
  padding: 2px;

  ul {
    list-style: none;
    display: flex;
    justify-content: space-evenly;

    li {
      padding: 4px;
    }

    li:nth-child(1) {
      color: ${({ theme }) => theme.color.green}
    }
    li:nth-child(2) {
      color: ${({ theme }) => theme.color.orange}
    }
    li:nth-child(3) {
      color: ${({ theme }) => theme.color.blue}
    }
    li:nth-child(5) {
      color: ${({ theme }) => theme.color.yellow}
    }

  }
`

export const ContentContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 30%;
  width: 100%;
  padding: 4px;

  & > *:last-child {
    display: flex;
    align-items: flex-end;
    height: 100%;
  }
`

export const ImageContainer = styled.div<{
  imageUrl?: string
}>`
  position: relative;
  width: 100%;
  height: 70%;
  background: ${props => props.imageUrl ? `url(${props.imageUrl})` : `${props.theme.main.primaryV3}`};
  background-size: cover;
  background-position: center;
  border-radius: inherit;
  
  display: flex;
  justify-content: center;
  align-items: center;
`