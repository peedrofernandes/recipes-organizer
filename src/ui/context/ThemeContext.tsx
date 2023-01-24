import React from "react";
import { createContext, ReactNode, useState } from "react";

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
      primaryV2: "#01A84A",
      primaryV3: "#01A84A",
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
      primaryV1: "#01A84A",
      primaryV2: "#07da63",
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
  toggleTheme: () => {}
})

export default function ThemeContextProvider(props: { children: ReactNode }) {
  const { children } = props;

  const [theme, setTheme] = useState<Theme>(themesSet.light);

  const toggleTheme = () => {
    const newTheme: Theme = (theme === themesSet.light) ? themesSet.dark : themesSet.light;

    console.log("Toggle theme!")

    setTheme(newTheme);
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
