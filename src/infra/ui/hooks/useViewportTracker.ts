import { useEffect, useState } from "react"
import useTheme from "./useTheme"

export default function useViewportTracker() {
  const { breakpoints } = useTheme().theme
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false)

  useEffect(() => {
    const mediaWatcher = window.matchMedia(breakpoints.md)
    setIsSmallScreen(!mediaWatcher.matches)

    function update(value: boolean) {
      setIsSmallScreen(value)
    }

    mediaWatcher.addEventListener("change", () => update(!mediaWatcher.matches))

    return () => {
      mediaWatcher.removeEventListener("change", () => update(!mediaWatcher.matches))
    }
  }, [])

  return isSmallScreen
}