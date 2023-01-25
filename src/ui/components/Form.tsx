import React, { ReactNode } from "react"
import styled from "styled-components"

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;

  label {
    margin-top: 16px;
  }

  input, select {
    padding: 8px 4px;
    background-color: ${({ theme }) => theme.main.primaryV1 + "00"};
    color: ${({ theme }) => theme.main.contrastV1};
    border: 1px solid ${({ theme }) => theme.main.contrastV1};
    margin-top: 4px;
    
    &:focus {
      outline: none;
    }
  }
`

export default function Form(props: { children: ReactNode }) {
  return (
    <StyledForm>
      {props.children}
    </StyledForm>
  )
}