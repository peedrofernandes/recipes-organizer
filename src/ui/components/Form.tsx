import React, { ReactNode } from "react"
import styled from "styled-components"

const Form = styled.form`
  display: flex;
  flex-direction: column;

  label {
    margin-top: 16px;
  }

  input, select, option {
    width: 100%;
    display: inline-block;
    padding: 8px 4px;
    background-color: ${({ theme }) => theme.main.primaryV1 + "00"};
    color: ${({ theme }) => theme.main.contrastV1};
    border: 1px solid ${({ theme }) => theme.main.contrastV1};
    margin-top: 4px;
    min-width: 0;
    
    &:focus {
      outline: none;
      box-shadow: ${({ theme }) => `inset 0 0 4px ${theme.main.contrastV1}, 0 0 4px ${theme.main.contrastV1}`};
    }
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

const FieldSet = styled.fieldset`
  display: flex;
  justify-content: center;
  gap: 8px;
  border: none;
`

const InputBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`

const SubmitContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 16px 0;
`

export { Form, FieldSet, InputBox, SubmitContainer };