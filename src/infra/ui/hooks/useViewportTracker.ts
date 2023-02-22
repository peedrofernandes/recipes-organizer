import { useCallback, useEffect, useState } from "react"
import useTheme from "./useTheme"
import useThrottle from "./useThrottle"

type Viewport = {
  xs: boolean // 0px (always true)
  sm: boolean // 600px
  md: boolean // 905px
  lg: boolean // 1240px
  xl: boolean // 1440px
  // min-width values
}

export default function useViewportTracker(): Viewport {
  const { breakpoints } = useTheme().theme
  
  const getCurrentViewport = useCallback((): Viewport => {
    
    switch (true) {
    case (window.matchMedia(breakpoints.xl).matches):
      return { xs: true, sm: true, md: true, lg: true, xl: true }
    case (window.matchMedia(breakpoints.lg).matches):
      return { xs: true, sm: true, md: true, lg: true, xl: false }
    case (window.matchMedia(breakpoints.md).matches):
      return { xs: true, sm: true, md: true, lg: false, xl: false }
    case (window.matchMedia(breakpoints.sm).matches):
      return { xs: true, sm: true, md: false, lg: false, xl: false }
    case (window.matchMedia(breakpoints.xs).matches):
      return { xs: true, sm: false, md: false, lg: false, xl: false }
    default:
      return { xs: false, sm: false, md: false, lg: false, xl: false }
    }
  }, [])
              
  const [viewportState, setViewportState] = useState<Viewport>(getCurrentViewport())

  useEffect(() => {
    
    window.addEventListener("resize", useThrottle(() => {
      setViewportState(getCurrentViewport())
    }))

    return () => {
      window.removeEventListener("resize", useThrottle(() => {
        setViewportState(getCurrentViewport())
      }))
    }
  }, [])

  return viewportState
}