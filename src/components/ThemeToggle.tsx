"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative flex items-center justify-center w-10 h-10 rounded-full bg-stone-100/50 hover:bg-stone-200/50 dark:bg-neutral-800 dark:hover:bg-neutral-700 transition-all border border-stone-200 dark:border-neutral-800 dark:border-neutral-700 shadow-sm overflow-hidden"
      aria-label="Toggle theme"
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0 text-amber-500 absolute" />
      <Moon className="h-5 w-5 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100 text-purple-400 absolute" />
    </button>
  );
}
