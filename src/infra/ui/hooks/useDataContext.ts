import { useContext } from "react"
import { DataContext } from "../context/DataContext"

export default function useDataContext() {
  const data = useContext(DataContext)
  return data
}