export default function compareStrings(a: string, b: string, count = 0): -1 | 0 | 1 {
  const va = a.charCodeAt(count)
  const vb = b.charCodeAt(count)

  if (va > vb) return 1
  if (vb > va) return -1

  // a == b
  if (a.length === count && b.length === count) return 0

  if (a.length === count) return -1
  if (b.length === count) return 1

  return compareStrings(a, b, count + 1)
}