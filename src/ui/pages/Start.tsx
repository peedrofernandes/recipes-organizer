import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import Button from "../components/Button"

const StartPage = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export default function Start() {
  return (
    <StartPage>
      <h1>Start page</h1>
      <Link to="/dashboard">
        <Button>Go to Dashboard</Button>
      </Link>
    </StartPage>
  )
}