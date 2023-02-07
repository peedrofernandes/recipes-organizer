import React, { useEffect } from "react"
import { createContext, ReactNode, useState } from "react"
import ThemeController from "../../../controllers/ThemeController"

export type Theme = {
  main: {
    primaryV1: string;
    primaryV2?: string;
    primaryV3?: string;
    contrastV1: string;
    contrastV2?: string;
    contrastV3?: string;
  },
  color: {
    primaryV1: string;
    primaryV2?: string;
    primaryV3?: string;
    contrastV1: string;
    contrastV2?: string;
    contrastV3?: string;
    green?: string;
    orange?: string;
    blue?: string;
    red?: string;
  }
}

type ThemesSet = {
  light: Theme;
  dark: Theme;
}

const green = "#07da63"
const orange = "#ea6f1c"
const blue = "#1184e2"
const red = "#dd2323"

export const themesSet: ThemesSet = {
  light: {
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
      green,
      orange,
      blue,
      red
    }
  },
  dark: {
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
      green,
      orange,
      blue,
      red
    }
  }
}

export type ThemeContextValue = {
  theme: Theme;
  toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextValue>({
  theme: themesSet.light,
  toggleTheme: () => { return }
})

export default function ThemeContextProvider(props: { children: ReactNode }) {
  const { children } = props

  const themeController = new ThemeController()

  const [theme, setTheme] = useState<Theme>(themesSet.light)

  useEffect(() => {
    const existingTheme = themeController.loadTheme()
    if (existingTheme) {
      setTheme(existingTheme === "dark" ? themesSet.dark : themesSet.light)
    }
  }, [])

  const toggleTheme = () => {
    const newTheme: Theme = (theme === themesSet.light) ? themesSet.dark : themesSet.light

    themeController.persistTheme(newTheme === themesSet.light ? "light" : "dark")

    setTheme(newTheme)
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
