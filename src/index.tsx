import ContextWrapper from "@infra/ui/context/_ContextWrapper"
import React from "react"
import ReactDOM from "react-dom"
import App from "./infra/ui/App"

ReactDOM.render((
  <ContextWrapper>
    <App />
  </ContextWrapper>
), document.getElementById("root")
)

