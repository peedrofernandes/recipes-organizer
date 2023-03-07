import React, { useEffect, useImperativeHandle, useMemo, useRef, useState } from "react"
import { Dropdown, InputField } from "../forms/Form/styles"
import Icon from "../Icon"
import { Span } from "../styles"
import { FieldSet } from "./Input/styles"

declare module "react" {
  function forwardRef<T, P = object>(
    render: (props: P, ref: React.Ref<T>) => React.ReactElement | null
  ): (props: P & React.RefAttributes<T>) => React.ReactElement| null
}


interface SelectInputProps<T> {
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
  error?: { status: false } | {
    status: true
    message: string
  }
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
  const { label, placeholder, data, createOptions, error } = props

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
  }, [search])

  useEffect(() => {
    if (!data.loading)
      setDataSearched(data.options)
  }, [data])

  return (
    <FieldSet errorStatus={props.error?.status}>
      {label && (<label>{props.label}</label>)}
      <InputField
        ref={searchRef}
        onClick={() => setShowDropdown(true)}
      >
        {useMemo(() => (
          <Icon variant={props.data.loading ? "Spinner" : "Search"} size={20} />
        ), [props.data.loading])}
        <input
          type="text" id="search" name="search" placeholder={placeholder ?? "Pesquisar"}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearch(e.target.value)
          }
          value={search}
        />
    
      </InputField>
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