(() => {
  const storageKey = "bgmc-theme";
  let savedTheme = null;

  try {
    savedTheme = window.localStorage.getItem(storageKey);
  } catch {
    // Dark mode remains the fallback when storage is unavailable.
  }

  const theme = savedTheme === "light" || savedTheme === "dark" ? savedTheme : "dark";
  document.documentElement.dataset.theme = theme;

  const themeColor = document.querySelector('meta[name="theme-color"]');
  if (themeColor) themeColor.setAttribute("content", theme === "light" ? "#f4f0e7" : "#100f0d");
})();
