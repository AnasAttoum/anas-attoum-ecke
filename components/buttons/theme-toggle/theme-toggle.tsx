"use client";

import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const isDark = theme === "dark" || (theme === "system" && systemTheme === "dark")

  return (
    <button
      onClick={() =>
        setTheme(isDark ? "light" : "dark")
      }
      className="simpleBtn"
    >
      {isDark ? "🔆" : "🌙"}
    </button>
  );
}
