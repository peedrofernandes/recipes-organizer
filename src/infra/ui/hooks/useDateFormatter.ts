export default function useDateFormatter() {
  function dateToString(date: Date) {
    const year = date.getFullYear().toString()
    const month = (date.getMonth() + 1).toString().padStart(2, "0")
    const day = date.getDate().toString().padStart(2, "0")
    return `${year}-${month}-${day}`
  }

  function stringToDate(string: string) {
    const timezoneOffsetMilliseconds = new Date().getTimezoneOffset() * 60 * 1000
    const stringMilliseconds = new Date(string).getTime()
    return new Date(stringMilliseconds + timezoneOffsetMilliseconds)
  }

  return { dateToString, stringToDate }
}