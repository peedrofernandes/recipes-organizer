import ContextWrapper from "@infra/ui/context/_ContextWrapper"
import React from "react"
import { createRoot } from "react-dom/client"
import App from "./infra/ui/App"

const domNode = document.getElementById("root") as HTMLElement
const root = createRoot(domNode)

root.render(
  <ContextWrapper>
    <App />
  </ContextWrapper>
)