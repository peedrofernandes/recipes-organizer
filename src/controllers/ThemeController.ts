type ThemeOptions = "light" | "dark";

export default class ThemeController {

  private isTheme(theme: unknown): theme is ThemeOptions {
    return (theme === "light" || theme === "dark")
  }

  persistTheme(theme: ThemeOptions) {
    localStorage.setItem("theme", theme)
  }

  loadTheme() {
    const theme = localStorage.getItem("theme")

    if (this.isTheme(theme))
      return theme
    else
      return null
  }
}