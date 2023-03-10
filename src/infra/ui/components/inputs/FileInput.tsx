import React, { useRef } from "react"
import Icon from "../icons/Icon"
import { Span, Subtitle, Title } from "../styles"
import { FieldSet, FileInputData, FileInputLabel } from "./Input/styles"

type FileInputProps = {
  id: string
  name: string
  fileName: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  accept: string
  error?: {
    status: false
  } | {
    status: true
    message: string
  }
  showErrorMessage?: boolean
}

export default function FileInput(props: FileInputProps) {
  const fileInputButton = useRef<HTMLLabelElement>(null)

  function handleDragOver(e: React.MouseEvent<HTMLLabelElement>) {
    e.preventDefault()

    if (!fileInputButton.current || fileInputButton.current.classList.contains("dragged")) return

    fileInputButton.current.classList.add("dragged")
  }

  function handleDragEnd() {
    if (!fileInputButton.current || !fileInputButton.current.classList.contains("dragged")) return
    
    fileInputButton.current.classList.remove("dragged")
  }

  function handleClick(e: React.MouseEvent<HTMLLabelElement>) {
    if (!fileInputButton.current) return

    const rect = fileInputButton.current.getBoundingClientRect()
    const x = e.clientX - rect.x
    const y = e.clientY - rect.y

    const span = document.createElement("span")
    span.classList.add("clickCircle")
    span.style.left = x + "px"
    span.style.top = y + "px"
    fileInputButton.current.appendChild(span)
    setTimeout(() => {
      fileInputButton.current?.removeChild(span)
    }, 1000)
  }

  return (
    <FieldSet errorStatus={props.error?.status ?? false}>
      <FileInputLabel
        htmlFor={props.name}
        ref={fileInputButton}
        onDragOverCapture={handleDragOver}
        onDragLeaveCapture={handleDragEnd}
        onDrop={handleDragEnd}
        onClick={handleClick}
      >
        <input
          type="file"
          id={props.id}
          name={props.name}
          onChange={props.onChange}
        />
        <Title variant={5} as="h5">Selecione um arquivo</Title>
        <Subtitle>Ou arraste um arquivo para cá</Subtitle>
        {props.fileName && (
          <FileInputData>
            <Icon variant="Document" size={20} />
            <Span>{props.fileName}</Span>
          </FileInputData>
        )}

      </FileInputLabel>
      {props.showErrorMessage && props.error?.status &&
        <Span>{props.error.message}</Span>
      }
    </FieldSet>
  )
}