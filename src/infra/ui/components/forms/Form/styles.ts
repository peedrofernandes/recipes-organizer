import styled, { css } from "styled-components"

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
  height: 100%;
  overflow-y: scroll;
  padding: 0 8px;

  legend {
    display: block;
    margin-top: 32px;
  }

  input[type=file] {
    border: none;
    width: auto;
  }

  legend {
    margin-top: 16px;
    font-weight: bolder;
  }
`

export const FieldSet = styled.fieldset<{
  errorStatus?: boolean
}>`
  display: flex;
  flex-direction: column;
  gap: 8px;


  position: relative;
  width: 100%;
  border: none;
  color: ${({ errorStatus, theme }) => errorStatus ? theme.color.red : "inherit"};

  input[type=text], input[type=number], input[type=date], select {
    background-color: inherit;
    outline: none;
    border: none;
    color: ${({ theme }) => theme.main.contrastV1};
    width: 100%;

    &::placeholder {
      color: ${({ errorStatus, theme }) => errorStatus ? theme.color.red + "90" : theme.main.contrastV1 + "90"};
      font-size: 14px;
    }
  }

  input[type=date]::-webkit-calendar-picker-indicator {
    filter: ${({ theme }) => theme.variant === "Dark" ? "invert(100%)" : "none"};
  }

  ul {
    list-style: none;
  }
`

export const InputFieldStyles = css<{
  errorStatus?: boolean
}>`
  position: relative;
  display: flex;
  justify-content: stretch;
  align-items: center;
  gap: 4px;
  padding: 8px 4px;
  background-color: ${({ theme }) => theme.main.primaryV1 + "00"};
  color: ${({ theme }) => theme.main.contrastV1};
  border: none;

  box-shadow: ${({ theme, errorStatus }) =>
    `inset 0 0 1px ${errorStatus ? theme.color.red : theme.main.contrastV1},
     0 0 1px ${errorStatus ? theme.color.red : theme.main.contrastV1}`};
  
  &:hover {
    box-shadow: ${({ theme, errorStatus }) =>
    `inset 0 0 2px ${errorStatus ? theme.color.red : theme.main.contrastV1},
     0 0 2px ${errorStatus ? theme.color.red : theme.main.contrastV1}`};
  }
  
  &:focus-within {
    outline: none;
    box-shadow: ${({ theme, errorStatus }) =>
    `inset 0 0 4px ${errorStatus ? theme.color.red : theme.main.contrastV1},
     0 0 4px ${errorStatus ? theme.color.red : theme.main.contrastV1}`};
  }
`
export const InputField = styled.div`
  ${InputFieldStyles}
`

export const InputGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`

export const SubmitContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  padding: 16px 0;
`

export const ConfirmButtonSet = styled.div`
  width: 100%;
  display: flex;
  gap: 16px;
  justify-content: center;
`

export const SelectField = styled.span<{
  errorStatus?: boolean;
  selected?: boolean;
}>`
  ${InputFieldStyles}

  font-size: 14px;
  color: ${({ errorStatus, theme, selected }) => errorStatus
    ? theme.color.red + "90"
    : selected
      ? theme.main.contrastV1
      : theme.main.contrastV1 + "90"};
  cursor: pointer;
`

export const Dropdown = styled.ul`
  position: absolute;
  bottom: 0;
  max-width: 100%;
  z-index: 1000;
  background-color: ${({ theme }) => theme.main.primaryV1};
  border-radius: 8px;
  max-height: 200px;
  overflow-y: auto;

  animation: drop 0.2s ease-in-out forwards;

  transform: translateY(100%);
  transform-origin: top center;
  @keyframes drop {
    0% {
      transform: translateY(100%) scaleY(0);
      opacity: 0;
    }
    60% {
      transform: translateY(100%) scaleY(120%);
    }
    100% {
      transform: translateY(100%) scaleY(100%);
      opacity: 1;
    }
  }
`

export const DropdownItem = styled.li<{
  active?: boolean
}>`
  margin: 0;
  padding: 16px 12px;
  color: ${({ active, theme }) =>
    active ? theme.color.green : theme.main.contrastV1};
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;

  p {
    color: ${({ theme, active }) => active ? theme.color.green : "unset"} !important;
  }
  path {
    fill: ${({ theme, active }) => active ? theme.color.green : theme.main.contrastV1};
  }

  &:hover {
    background-color: ${({ theme }) => theme.main.primaryV3};
    cursor: pointer;
  }
`

export const MacrosList = styled.ul`
  display: flex;
  justify-content: space-evenly;
  position: relative;
  font-size: 12px;
  gap: 8px;
  font-weight: bold;

  li:nth-child(1) {
    color: ${({ theme }) => theme.color.green + "90"}
  }
  li:nth-child(2) {
    color: ${({ theme }) => theme.color.blue + "90"}
  }
  li:nth-child(3) {
    color: ${({ theme }) => theme.color.orange + "90"}
  }
`

export const IngredientListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
`