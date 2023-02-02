import React, { useEffect } from "react";
import { createContext, ReactNode, useState } from "react";
import ThemeController from "../../../controllers/ThemeController";

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
  }
}

type ThemesSet = {
  light: Theme;
  dark: Theme;
}

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
    }
  }
}

export type ThemeContextValue = {
  theme: Theme;
  toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextValue>({
  theme: themesSet.light,
  toggleTheme: () => { }
})

export default function ThemeContextProvider(props: { children: ReactNode }) {
  const { children } = props;

  const themeController = new ThemeController();

  const [theme, setTheme] = useState<Theme>(themesSet.light);

  useEffect(() => {
    const existingTheme = themeController.loadTheme();
    if (existingTheme) {
      setTheme(existingTheme === "dark" ? themesSet.dark : themesSet.light)
    }
  }, [])

  const toggleTheme = () => {
    const newTheme: Theme = (theme === themesSet.light) ? themesSet.dark : themesSet.light;

    themeController.persistTheme(newTheme === themesSet.light ? "light" : "dark");

    setTheme(newTheme);
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
