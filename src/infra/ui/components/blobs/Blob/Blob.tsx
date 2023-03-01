import React, { Suspense } from "react"
import Blob3 from "../Blob3"
import Blob4 from "../Blob4"
import { BlobContainer } from "./styles"

const Blob1 = React.lazy(() => import("../Blob1"))
const Blob2 = React.lazy(() => import("../Blob2"))

type BlobProps = {
  variant: "1" | "2" | "3" | "4"
}

export function Blob(props: BlobProps) {

  let result: JSX.Element
  switch (props.variant) {
  case "1":
    result = <Blob1 />
    break
  case "2":
    result = <Blob2 />
    break
  case "3":
    result = <Blob3 />
    break
  case "4":
    result = <Blob4 />
    break
  default:
    return null
  }

  return (
    <Suspense>
      <BlobContainer>
        {result}
      </BlobContainer>
    </Suspense>)
}