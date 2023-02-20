import React from "react"
import { Link } from "react-router-dom"
import Button from "../components/buttons/Button"
import PageLayout from "./PageLayout"

export default function HelpPage() {
  return (
    <PageLayout>
      <h1>Start page</h1>
      <Link to="/recipes">
        <Button variant="styled" text="Go to dashboard" />
      </Link>
    </PageLayout>
  )
}