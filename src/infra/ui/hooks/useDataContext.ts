import { useContext } from "react"
import { DataContext } from "../context/DataContext"

export default function useDataContext() {
  return useContext(DataContext)
}