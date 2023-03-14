import { Error } from "@infra/ui/types/Error"
import React, { useEffect, useImperativeHandle, useMemo, useRef, useState } from "react"
import { Dropdown, InputField } from "../forms/Form/styles"
import Icon from "../icons/Icon"
import { Span } from "../styles"
import { FieldSet } from "./Input/styles"

interface SelectInputProps<T> {
  id: string
  name: string
  data: {
    loading: true
  } | {
    loading: false
    options: T[]
    searchableProp: (t: T) => string
  }
  createOptions: (t: T) => React.ReactElement
  dropdownState: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ]
  label?: string
  placeholder?: string
  errorState?: React.StateType<Error>
}

export type SelectInputRefs = {
  searchRef: React.RefObject<HTMLDivElement>,
  dropdownRef: React.RefObject<HTMLUListElement>
}
 
function SelectInputComponent<T>(
  props: SelectInputProps<T>,
  ref: React.ForwardedRef<SelectInputRefs>
) {
  // Props
  const { id, name, label, placeholder, data, createOptions } = props
  const [error] = props.errorState || []

  // Refs
  const searchRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLUListElement>(null)
  useImperativeHandle(ref, () => ({ searchRef, dropdownRef }))

  const [showDropdown, setShowDropdown] = props.dropdownState
  const [search, setSearch] = useState<string>("")
  const [dataSearched, setDataSearched] = useState<T[]>(
    !data.loading ? data.options : [])
  
  useEffect(() => {
    if (data.loading) return setDataSearched([])
    if (!search) return setDataSearched(data.options)
    setDataSearched(data.options.filter(
      item => data.searchableProp(item).toLowerCase().includes(search.toLowerCase())))
  }, [search, data.loading])

  useEffect(() => {
    if (!data.loading)
      setDataSearched(data.options)
  }, [data])

  useEffect(() => {
    console.log("Data.loading is " + data.loading)
    if (!data.loading) console.log(data.options)
  }, [data.loading])

  return (
    <FieldSet errorStatus={error?.status}>
      {label && (<label>{label}</label>)}
      <InputField
        ref={searchRef}
        onClick={() => setShowDropdown(true)}
        errorStatus={error?.status}
      >
        {useMemo(() => (
          <Icon variant={data.loading ? "Spinner" : "Search"} size={20} />
        ), [data.loading])}
        <input
          type="text" id={id} name={name} placeholder={placeholder ?? "Pesquisar"}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearch(e.target.value)
          }
          value={search}
        />
    
      </InputField>
      {error?.status && <Span>{error.message}</Span>}
      {showDropdown && !data.loading && data.options.length > 0 && (
        <Dropdown ref={dropdownRef}>
          {dataSearched.map(createOptions)}
        </Dropdown>
      )}
    </FieldSet>
  )
}

const SelectInput = React.forwardRef(SelectInputComponent)

export default SelectInput