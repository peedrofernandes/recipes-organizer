import React, { Suspense } from "react"

const ActionsDesktop = React.lazy(() => import("../ActionsDesktop"))
const ActionsMobile = React.lazy(() => import("../ActionsMobile"))

type ActionsProps = ({
  variant: "Mobile"
} & React.ComponentPropsWithRef<typeof ActionsMobile>) | ({
  variant: "Desktop"
} & React.ComponentPropsWithoutRef<typeof ActionsDesktop>)

function ActionsComponent(
  props: ActionsProps,
  ref?: React.ForwardedRef<HTMLDivElement>
) {

  let result: JSX.Element
  switch (props.variant) {
  case "Mobile":
    result = <ActionsMobile {...props} ref={ref} />
    break
  case "Desktop":
    result = <ActionsDesktop {...props} />
    break
  default:
    return null
  }

  return (
    <Suspense>
      {result}
    </Suspense>
  )
}

export const Actions = React.forwardRef(ActionsComponent)