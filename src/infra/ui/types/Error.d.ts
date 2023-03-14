export type Error = {
  status: false
} | {
  status: true
  message: string
}