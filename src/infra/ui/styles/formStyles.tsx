import styled, { css } from "styled-components"

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;

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

export const InputStyles = css`
  width: 100%;
  display: inline-block;
  padding: 8px 4px;
  background-color: ${({ theme }) => theme.main.primaryV1 + "00"};
  color: ${({ theme }) => theme.main.contrastV1};
  border: none;
  box-shadow: ${({ theme }) => `inset 0 0 1px ${theme.main.contrastV1}, 0 0 1px ${theme.main.contrastV1}`};
  min-width: 0;
  margin-top: 8px;

  &:hover {
    box-shadow: ${({ theme }) => `inset 0 0 2px ${theme.main.contrastV1}, 0 0 2px ${theme.main.contrastV1}`};
  }
  
  &:focus {
    outline: none;
    box-shadow: ${({ theme }) => `inset 0 0 4px ${theme.main.contrastV1}, 0 0 4px ${theme.main.contrastV1}`};
  }
`
export const Input = styled.input`
  ${InputStyles}
`

export const InputGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
`

export const FieldSet = styled.fieldset<{
  error?: boolean
}>`
  position: relative;
  width: 100%;
  display: block;
  border: none;
  color: ${({ error, theme }) => error ? theme.color.red : "inherit"};

  input {
    &::placeholder {
      color: ${({ error, theme }) => error ? theme.color.red + "90" : theme.main.contrastV1 + "90"};
      font-size: 14px;
    }
  }

  ul {
    list-style: none;
    position: absolute;
    width: 100%;
    z-index: 1;
  }
`

export const SubmitContainer = styled.div`
  display: flex;
  justify-content: center;
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

export const SelectTitle = styled.span<{
  error?: boolean;
  selected?: boolean;
}>`
  ${InputStyles}

  font-size: 14px;
  color: ${({ error, theme, selected }) => error
    ? theme.color.red + "90"
    : selected
      ? theme.main.contrastV1
      : theme.main.contrastV1 + "90"};
  cursor: pointer;
`

export const Select = styled.ul``

export const Option = styled.li<{
  active?: boolean
}>`
  margin: 0;
  padding: 12px 8px;
  box-shadow: ${({ theme }) => `inset 0 0 1px ${theme.main.contrastV1}, 0 0 1px ${theme.main.contrastV1}`};
  background-color: ${({ active, theme }) =>
    active ? theme.color.green : theme.main.primaryV1};
  color: ${({ active, theme }) =>
    active ? theme.main.primaryV1 : theme.main.contrastV1};

  &:hover {
    background-color: ${({ theme }) => theme.main.contrastV1};
    color: ${({ theme }) => theme.main.primaryV1};
    cursor: pointer;
  }

`