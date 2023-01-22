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