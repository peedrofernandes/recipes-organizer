export function hasProperty<T extends object>(
  obj: T, prop: keyof T
): obj is T & Record<keyof T, unknown> {
  return prop in obj
}