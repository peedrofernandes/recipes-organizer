type ThemeOptions = "light" | "dark";

interface IThemeController {
  persistTheme(theme: ThemeOptions): void;
  loadTheme(): ThemeOptions | null;
}

export default class ThemeController implements IThemeController {

  private isTheme(theme: any): theme is ThemeOptions {
    return (theme === "light" || theme === "dark")
  }

  persistTheme(theme: ThemeOptions) {
    localStorage.setItem("theme", theme);
  }

  loadTheme() {
    const theme = localStorage.getItem("theme");

    if (this.isTheme(theme))
      return theme;
    else
      return null;
  }
}