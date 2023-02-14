import "styled-components"

declare module "styled-components" {
  export interface DefaultTheme {
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
    }
  }
}