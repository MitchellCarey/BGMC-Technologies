(() => {
  const storageKey = "bgmc-theme";

  try {
    const savedTheme = window.localStorage.getItem(storageKey);
    const hasSavedTheme = savedTheme === "light" || savedTheme === "dark";
    const systemTheme = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
    const theme = hasSavedTheme ? savedTheme : systemTheme;

    if (hasSavedTheme) {
      document.documentElement.dataset.theme = savedTheme;
    }

    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) themeColor.setAttribute("content", theme === "light" ? "#f8f6f1" : "#100f0d");
  } catch {
    // The CSS media query remains the fallback when storage is unavailable.
  }
})();
