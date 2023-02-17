import React, { useEffect } from "react"
import { createContext, ReactNode, useState } from "react"
import { DefaultTheme } from "styled-components"
import ThemeController from "../../../controllers/ThemeController"

type ThemesSet = {
  light: DefaultTheme;
  dark: DefaultTheme;
}

const breakpoints: [number, number, number, number, number] = [0, 600, 905, 1240, 1440]
type ParsedBreakpoints = {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
}
    
function parseBreakpoints(b: [number, number, number, number, number]): ParsedBreakpoints {
  return ["xs", "sm", "md", "lg", "xl"].reduce((object, key, i) => ({
    ...object,
    [key]: `(min-width: ${b[i]}px)`
  }), {} as ParsedBreakpoints)
}

export const themesSet: ThemesSet = {
  light: {
    variant: "Light",
    main: {
      primaryV1: "#ffffff",
      primaryV2: "#f8f8f8",
      primaryV3: "#dddddd",
      contrastV1: "#2E3232",
      contrastV2: "#242828",
      contrastV3: "#111414",
    },
    color: {
      primaryV1: "#07da63",
      primaryV2: "#00ac4a",
      primaryV3: "#007c36",
      contrastV1: "#111414",
      contrastV2: "#ffffff",
      contrastV3: "#ffffff",
      green: "#076e34",
      orange: "#002d81",
      blue: "#913a00",
      red: "#860000",
      yellow: "#8b8200"
    },
    breakpoints: parseBreakpoints(breakpoints)
  },
  dark: {
    variant: "Dark",
    main: {
      primaryV1: "#111414",
      primaryV2: "#1a1d1d",
      primaryV3: "#272b2b",
      contrastV1: "#f8f8f8",
      contrastV2: "#ffffff",
      contrastV3: "#ffffff",
    },
    color: {
      primaryV1: "#007c36",
      primaryV2: "#00ac4a",
      primaryV3: "#07da63",
      contrastV1: "#ffffff",
      contrastV2: "#111414",
      contrastV3: "#111414",
      green: "#07da63",
      orange: "#1184e2",
      blue: "#ea6f1c",
      red: "#dd2323",
      yellow: "#fffb00"
    },
    breakpoints: parseBreakpoints(breakpoints)
  }
}

export type ThemeContextValue = {
  theme: DefaultTheme;
  toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextValue>({
  theme: themesSet.light,
  toggleTheme: () => { return }
})

export default function ThemeContextProvider(props: { children: ReactNode }) {
  const { children } = props

  const themeController = new ThemeController()

  const [theme, setTheme] = useState<DefaultTheme>(themesSet.light)

  useEffect(() => {
    const existingTheme = themeController.loadTheme()
    if (existingTheme) {
      setTheme(existingTheme === "dark" ? themesSet.dark : themesSet.light)
    }
  }, [])

  const toggleTheme = () => {
    const newTheme: DefaultTheme = (theme === themesSet.light) ? themesSet.dark : themesSet.light

    themeController.persistTheme(newTheme === themesSet.light ? "light" : "dark")

    setTheme(newTheme)
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
