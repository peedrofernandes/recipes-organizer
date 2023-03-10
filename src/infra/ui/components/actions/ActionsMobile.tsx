import React from "react"
import styled from "styled-components"
import Button from "../buttons/Button"
import { Dropdown } from "../forms/Form/styles"
import Icon from "../icons/Icon"

const ActionsMobileContainer = styled.section`

`

type ActionsMobileProps = {
  events: {
    generatePdfRequestOnClick: () => void
    saveToJsonOnClick: () => void
    loadFromJsonRequestOnClick: () => void
  }
  toggleMenuDropdown: () => void
  showMenuDropdown: boolean
}

function ActionsMobile(
  props: ActionsMobileProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const { generatePdfRequestOnClick, saveToJsonOnClick, loadFromJsonRequestOnClick } = props.events

  return (
    <ActionsMobileContainer>
      <div ref={ref}>
        <Button variant="icon" onClick={props.toggleMenuDropdown} ariaLabel="Menu Icon">
          <Icon variant="Menu" size={36} />
        </Button>
      </div>
      {props.showMenuDropdown && (
        <Dropdown style={{ width: "calc(100% - 32px)" }}>
          <Button variant="dropdown"
            text="Gerar PDF"
            onClick={generatePdfRequestOnClick}
            icon={<Icon variant="Document" size={20} />}
          />
          <Button variant="dropdown"
            text="Salvar em arquivo"
            onClick={saveToJsonOnClick}
            icon={<Icon variant="Save" size={20} />}
          />
          <Button variant="dropdown"
            text="Carregar arquivo"
            onClick={loadFromJsonRequestOnClick}
            icon={<Icon variant="Load" size={20} />}
          />
        </Dropdown>
      )}
    </ActionsMobileContainer>
  )
}

const ForwardedActionsMobile = React.forwardRef(ActionsMobile)

export default ForwardedActionsMobile