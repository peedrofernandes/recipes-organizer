type GetKeysWithout<T, U> = {
  [K in keyof T]: T[K] extends U ? never : K;
}[keyof T]

export type Attributes<T> = {
  [K in Exclude<GetKeysWithout<T, Function>, "id">]: T[K]
}
