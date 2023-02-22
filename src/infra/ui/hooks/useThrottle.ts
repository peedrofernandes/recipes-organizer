export default function useThrottle(cb: (...args: unknown[]) => unknown, delay = 1000) {
  function throttle(cb: (...args: unknown[]) => unknown, delay: number) {
    let shouldWait = false
    let remainingArgs: unknown[] | null = null

    function timeoutFn() {
      if (remainingArgs !== null) {
        cb(...remainingArgs)
        remainingArgs = null
        setTimeout(timeoutFn, delay)
      } else {
        shouldWait = false
      } 
    }

    return (...args: unknown[]) => {
      if (shouldWait) {
        remainingArgs = args
        return
      }

      cb(...args)
      shouldWait = true

      setTimeout(timeoutFn, delay)
    }
  } 

  return throttle(cb, delay)
}