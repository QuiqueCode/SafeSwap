"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./Button/Button.variants";

export interface ThemeToggleProps {
  className?: string;
}

/**
 * Icon toggle that flips between the light and dark brand themes.
 * Reuses the shared `buttonVariants` styling (the Button primitive only
 * renders a text label, so we style a native button for the icon here).
 */
export function ThemeToggle({ className }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();

  // Hydration-safe "mounted" flag: server snapshot is false, client is true.
  // Avoids a setState-in-effect while still deferring theme-dependent output
  // until after hydration.
  const mounted = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label={
        mounted ? `Switch to ${isDark ? "light" : "dark"} theme` : "Toggle theme"
      }
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        buttonVariants({ variant: "ghost", size: "sm" }),
        "size-10 rounded-full p-0 bg-card text-foreground shadow-lg",
        className
      )}
    >
      {/* Render both icons only after mount to avoid a hydration mismatch */}
      {mounted && isDark ? (
        <Sun className="size-5" />
      ) : (
        <Moon className={cn("size-5", !mounted && "opacity-0")} />
      )}
    </button>
  );
}
