import compareStrings from "./compareStrings"

function indexBinarySearch <T> (
  arr: T[],
  n: T,
  compareFn: (a: T, b: T) => number
): number {
  if (arr.length === 0)
    return 0
  
  const mid = Math.floor((arr.length - 1) / 2)

  // n > arr[mid]
  if (compareFn(n, arr[mid]) > 0)
    return mid + 1 + indexBinarySearch(arr.slice(mid + 1, arr.length), n, compareFn)
  
  // n <= arr[mid]
  return indexBinarySearch(arr.slice(0, mid), n, compareFn)
}


function booleanBinarySearch <T> (
  arr: T[],
  n: T,
  compareFn: (a: T, b: T) => number
): boolean {
  if (arr.length === 0)
    return false
  
  const mid = Math.floor((arr.length) / 2)

  // n == arr[mid]
  if (compareFn(n, arr[mid]) === 0) return true

  // n > arr[mid]
  if (compareFn(n, arr[mid]) > 0)
    return booleanBinarySearch(arr.slice(mid + 1, arr.length), n, compareFn)

  // n < arr[mid]
  return booleanBinarySearch(arr.slice(0, mid), n, compareFn)
}


export function exists<T>(
  arr: T[],
  elem: T,
  stringAttribute: (t: T) => string
): boolean {
  const compareFn = (a: T, b: T) => compareStrings(
    stringAttribute(a), stringAttribute(b)
  )

  arr.sort(compareFn)
  return booleanBinarySearch(arr, elem, compareFn)
}

export function insertSorted<T>(
  arr: T[],
  elem: T,
  compareFn: (a: T, b: T) => number
): void {
  const index = indexBinarySearch(arr, elem, compareFn)
  arr.splice(index, 0, elem)
}