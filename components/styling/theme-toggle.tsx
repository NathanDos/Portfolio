"use client";

import { useTheme } from "../provider/ThemeProvider";

export function ThemeToggle( { className }: { className?: string } ) {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() =>
        setTheme(
          theme === "light"
            ? "dark"
            : theme === "dark"
              ? "light"
              : "dark"
        )
      }
      className={className}
    >
      Theme: {theme}
    </button>
  );
}