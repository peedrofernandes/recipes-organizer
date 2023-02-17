import styled, { css } from "styled-components"

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  padding: 0 16px 16px 16px;
  height: 100%;
  overflow-y: scroll;

  label {
    margin-top: 24px;
    display: block;
  }

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
  position: relative;
  width: 100%;
  display: block;
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
  min-width: 0;
  margin-top: 8px;

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
  position: absolute;
  bottom: 0;
  margin-bottom: 16px;
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
  max-width: 100%;
  z-index: 1000;
  background-color: ${({ theme }) => theme.main.primaryV1};
  border-radius: 0 8px 8px 0;
  padding: 4px;
  max-height: 200px;
  overflow-y: auto;
`

export const DropdownItem = styled.li<{
  active?: boolean
}>`
  margin: 0;
  padding: 12px 8px;
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