import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary1: string;
      primary2: string;
      primary3: string;
      white1: string;
      gray1: string;
      gray2: string;
    };
  }
}
