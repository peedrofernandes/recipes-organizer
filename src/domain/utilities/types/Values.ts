import { DeepPartial } from "./DeepPartial"

type KeysWithFunction<T> = {
  [K in keyof T]: T[K] extends Function ? K : never
}[keyof T]

export type Values<T> = Omit<T, "id" | KeysWithFunction<T>>

export type OptionalValues<T> = DeepPartial<Values<T>>;