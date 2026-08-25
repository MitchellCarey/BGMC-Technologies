const menuButton = document.querySelector("[data-menu-button]");
const menu = document.querySelector("[data-menu]");

const themeToggle = document.querySelector("[data-theme-toggle]");
const themeRoot = document.documentElement;
const themeStorageKey = "bgmc-theme";
const themeColorMeta = document.querySelector('meta[name="theme-color"]');

const getActiveTheme = () => {
  if (themeRoot.dataset.theme === "light" || themeRoot.dataset.theme === "dark") {
    return themeRoot.dataset.theme;
  }

  return "dark";
};

const updateThemeToggle = () => {
  if (!themeToggle) return;

  const activeTheme = getActiveTheme();
  const isDark = activeTheme === "dark";
  const nextTheme = isDark ? "light" : "dark";
  const label = themeToggle.querySelector("[data-theme-label]");

  themeToggle.setAttribute("aria-pressed", String(isDark));
  themeToggle.setAttribute("aria-label", `Switch to ${nextTheme} mode`);
  if (label) label.textContent = `${activeTheme} mode active. Switch to ${nextTheme} mode.`;
  if (themeColorMeta) themeColorMeta.setAttribute("content", isDark ? "#100f0d" : "#f8f6f1");
};

if (themeToggle) {
  updateThemeToggle();

  themeToggle.addEventListener("click", () => {
    const nextTheme = getActiveTheme() === "dark" ? "light" : "dark";
    themeRoot.dataset.theme = nextTheme;

    try {
      window.localStorage.setItem(themeStorageKey, nextTheme);
    } catch {
      // The selected theme still applies for this page view.
    }

    updateThemeToggle();
  });
}

if (menuButton && menu) {
  const closeMenu = () => {
    menu.dataset.open = "false";
    menuButton.setAttribute("aria-expanded", "false");
  };

  menuButton.addEventListener("click", () => {
    const open = menu.dataset.open !== "true";
    menu.dataset.open = String(open);
    menuButton.setAttribute("aria-expanded", String(open));
  });

  menu.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
}
