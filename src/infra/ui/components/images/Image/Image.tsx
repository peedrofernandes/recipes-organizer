import React, { Suspense } from "react"

// import LaptopImage from "../LaptopImage"
// import PDFImage from "../PDFImage"
// import PhoneImage from "../PhoneImage"
// import SaveButtonImage from "../SaveButtonImage"

const LaptopImage = React.lazy(() => import("../LaptopImage"))
const PDFImage = React.lazy(() => import("../PDFImage"))
const PhoneImage = React.lazy(() => import("../PhoneImage"))
const SaveButtonImage = React.lazy(() => import("../SaveButtonImage"))

type ImageProps = {
  variant: "Laptop" | "Phone" | "PDF" | "SaveButton"
}

export function Image(props: ImageProps) {

  let result: JSX.Element
  switch (props.variant) {
  case "Laptop":
    result = <LaptopImage />
    break
  case "Phone":
    result = <PhoneImage />
    break
  case "PDF":
    result = <PDFImage />
    break
  case "SaveButton":
    result = <SaveButtonImage />
    break
  }

  return (
    <Suspense>
      {result}
    </Suspense>
  )
}