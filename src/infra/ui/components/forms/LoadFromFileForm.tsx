import { Error } from "@infra/ui/types/Error"
import React, { useState } from "react"
import Button from "../buttons/Button"
import Input from "../inputs/Input"
import { FormContainer, SubmitContainer } from "./Form/styles"

type LoadFromFileFormProps = {
  events: { load: (file: File) => Promise<void> }
}

export default function LoadFromFileForm(props: LoadFromFileFormProps) {
  const [jsonFile, setJsonFile] = useState<File | null>(null)
  function handleChangeFile(e: React.ChangeEvent<HTMLInputElement>) {
    setFileError(error => ({ ...error, status: false }))
    setJsonFile(e.target.files?.[0] || null)
  }

  const fileErrorState = useState<Error>({ status: false })
  const [, setFileError] = fileErrorState

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!jsonFile) {
      setFileError({
        status: true,
        message: "Escolha um arquivo para carregar seus dados!"
      })
      return
    }

    props.events.load(jsonFile)
  }

  return (
    <FormContainer onSubmit={handleSubmit}>

      

      {/* File Input */}
      <Input variant="file" id="LoadFromFileInput" name="LoadFromFileInput"
        accept="application/JSON" onChange={handleChangeFile}
        fileName={jsonFile?.name || ""} errorState={fileErrorState} showErrorMessage
      />

      

      {/* Submit */}
      <SubmitContainer>
        <Button variant="styled" text="Carregar" type="submit"/>
      </SubmitContainer>

      
      
    </FormContainer>
  )
}