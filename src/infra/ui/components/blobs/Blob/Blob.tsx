import React, { Suspense } from "react"

const Blob1 = React.lazy(() => import("../Blob1"))
const Blob2 = React.lazy(() => import("../Blob2"))

type BlobProps = ({
  variant: "1"
} & React.ComponentPropsWithoutRef<typeof Blob1>) | ({
  variant: "2"
} & React.ComponentPropsWithoutRef<typeof Blob2>)

export function Blob(props: BlobProps) {

  let result: JSX.Element
  switch (props.variant) {
  case "1":
    result = <Blob1 />
    break
  case "2":
    result = <Blob2 />
    break
  default:
    return null
  }

  return <Suspense>{result}</Suspense>
}