import { AtLeastOne } from "./AtLeastOne"

export type OnlyOne<T, U = {
  [K1 in keyof T]: {
    [K2 in keyof T]?: Pick<T, K1> extends Pick<T, K2> ? T[K1] : undefined
  }
}> = (U[keyof U]) & AtLeastOne<T>