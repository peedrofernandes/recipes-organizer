import React from "react"
import styled from "styled-components"
import Button from "../buttons/Button"
import Icon from "../icons/Icon"

const ActionsDesktopContainer = styled.section`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  padding: 16px 0;
  gap: 8px;
  align-items: center;
`

type ActionsDesktopProps = {
  events: {
    generatePdfRequestOnClick: () => void
    saveToJsonOnClick: () => void
    loadFromJsonRequestOnClick: () => void
  }
}

export default function ActionsDesktop(props: ActionsDesktopProps) {
  const {
    generatePdfRequestOnClick,
    saveToJsonOnClick,
    loadFromJsonRequestOnClick
  } = props.events 

  return (
    <ActionsDesktopContainer>
      <Button variant="styled"
        text="Gerar PDF"
        onClick={generatePdfRequestOnClick}
        icon={<Icon variant="Document" size={20} />}
      />
      <Button variant="styled"
        text="Salvar em arquivo"
        onClick={saveToJsonOnClick}
        icon={<Icon variant="Save" size={20} />}
      />
      <Button variant="styled"
        text="Carregar arquivo"
        onClick={loadFromJsonRequestOnClick}
        icon={<Icon variant="Load" size={20} />}
      />
    </ActionsDesktopContainer>
  )
}