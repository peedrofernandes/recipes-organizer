import React, { useState } from "react"
import Button from "../buttons/Button"
import { Span } from "../styles"
import { FieldSet, FormContainer, InputField, SubmitContainer } from "./Form/styles"

type LoadFromFileFormProps = {
  events: { load: (file: File) => Promise<void> }
}

type SubmitErrors = ({
  file: false
} | {
  file: true
  fileMessage: string
})

export default function LoadFromFileForm(props: LoadFromFileFormProps) {
  const [jsonFile, setJsonFile] = useState<File | null>(null)
  function handleChangeFile(e: React.ChangeEvent<HTMLInputElement>) {
    setSubmitError(error => ({ ...error, file: false }))

    setJsonFile(e.target.files?.[0] || null)
  }

  const [submitError, setSubmitError] = useState<SubmitErrors>({
    file: false
  })

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!jsonFile) {
      setSubmitError(error => ({
        ...error,
        file: true,
        fileMessage: "Escolha um arquivo para carregar seus dados!"
      }))
      return
    }

    console.log("Submitted at the LoadFromFileForm! File: ")
    console.table(jsonFile)
    props.events.load(jsonFile)
  }

  return (
    <FormContainer onSubmit={handleSubmit}>

      <FieldSet errorStatus={submitError.file}>
        <label>Selecione seu arquivo</label>
        <InputField errorStatus={submitError.file}>
          <input
            type="file"
            accept="application/JSON"
            onChange={handleChangeFile}
          />
        </InputField>
        {submitError.file && <Span>{submitError.fileMessage}</Span>}
      </FieldSet>

      <SubmitContainer>
        <Button variant="styled" text="Carregar" type="submit"/>
      </SubmitContainer>

    </FormContainer>
  )
}