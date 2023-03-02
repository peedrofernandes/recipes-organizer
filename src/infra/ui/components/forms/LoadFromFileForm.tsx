import React, { useState } from "react"
import Button from "../buttons/Button"
import Input from "../inputs/Input"
import { FormContainer, SubmitContainer } from "./Form/styles"

type LoadFromFileFormProps = {
  events: { load: (file: File) => Promise<void> }
}

type Error = ({
  status: false
} | {
  status: true
  message: string
})

export default function LoadFromFileForm(props: LoadFromFileFormProps) {
  const [jsonFile, setJsonFile] = useState<File | null>(null)
  function handleChangeFile(e: React.ChangeEvent<HTMLInputElement>) {
    setFileError(error => ({ ...error, status: false }))

    setJsonFile(e.target.files?.[0] || null)
  }

  const [fileError, setFileError] = useState<Error>({
    status: false
  })

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!jsonFile) {
      setFileError(error => ({
        ...error,
        status: true,
        message: "Escolha um arquivo para carregar seus dados!"
      }))
      return
    }

    console.log("Submitted at the LoadFromFileForm! File: ")
    console.table(jsonFile)
    props.events.load(jsonFile)
  }

  return (
    <FormContainer onSubmit={handleSubmit}>

      {/* <FieldSet errorStatus={submitError.file}>
        <label>Selecione seu arquivo</label>
        <InputField errorStatus={submitError.file}>
          <input
            type="file"
            accept="application/JSON"
            onChange={handleChangeFile}
          />
        </InputField>
        {submitError.file && <Span>{submitError.fileMessage}</Span>}
      </FieldSet> */}

      <Input variant="file" id="LoadFromFileInput" name="LoadFromFileInput"
        accept="application/JSON" onChange={handleChangeFile}
        fileName={jsonFile?.name || ""} error={fileError}
      />

      <SubmitContainer>
        <Button variant="styled" text="Carregar" type="submit"/>
      </SubmitContainer>

    </FormContainer>
  )
}