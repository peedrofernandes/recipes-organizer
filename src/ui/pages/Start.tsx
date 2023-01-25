import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import Button from "../components/Button"
import Layout from "../components/Layout"

export default function Start() {
  return (
    <Layout>
      <h1>Start page</h1>
      <Link to="/recipes">
        <Button type="styled" text="Go to dashboard" />
      </Link>
    </Layout>
  )
}