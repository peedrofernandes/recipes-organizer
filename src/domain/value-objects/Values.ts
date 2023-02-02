type KeysWithoutFunction<T> = {
  [K in keyof T]: T[K] extends Function ? never : K
}[keyof T]

export type Values<T> = {
  [K in Exclude<KeysWithoutFunction<T>, "id">]: T[K]
}