import "react"
import "styled-components"

declare module "react" {
  function forwardRef<T, P = object>(
    render: (props: P, ref: React.Ref<T>) => React.ReactElement | null
  ): (props: P & React.RefAttributes<T>) => React.ReactElement | null

  function lazy<T extends ComponentType<any>>(
    factory: () => Promise<{ default: T }>
  ): T
}

declare module "styled-components" {
  export interface DefaultTheme {
    variant: "Dark" | "Light";
    main: {
      primaryV1: string;
      primaryV2?: string;
      primaryV3?: string;
      contrastV1: string;
      contrastV2?: string;
      contrastV3?: string;
    },
    color: {
      primaryV1: string;
      primaryV2?: string;
      primaryV3?: string;
      contrastV1: string;
      contrastV2?: string;
      contrastV3?: string;
      green?: string;
      orange?: string;
      blue?: string;
      red?: string;
      yellow?: string;
    },
    breakpoints: {
      xs: string,
      sm: string,
      md: string,
      lg: string,
      xl: string
    }
  }
}