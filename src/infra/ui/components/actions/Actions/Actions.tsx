import React from "react"
import ActionsDesktop from "../ActionsDesktop"
import ActionsMobile from "../ActionsMobile"

type ActionsProps = ({
  variant: "Mobile"
} & React.ComponentPropsWithRef<typeof ActionsMobile>) | ({
  variant: "Desktop"
} & React.ComponentPropsWithoutRef<typeof ActionsDesktop>)

export const Actions = React.forwardRef((
  props: ActionsProps,
  ref?: React.ForwardedRef<HTMLDivElement>
) => {
  switch (props.variant) {
  case "Mobile":
    return <ActionsMobile {...props} ref={ref} />
  case "Desktop":
    return <ActionsDesktop {...props} />
  }
})
Actions.displayName = "Actions"