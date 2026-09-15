import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

export type UglyTheme = "ugly" | "casino" | "dark";

/*
 * Sztuczka shadcn dark-mode bez re-renderów: przełączamy klasę .dark / .theme-*
 * na <html>, kolory przeliczają się same z CSS variables. Stan w useState
 * służy tylko ikonce, nie stylom.
 */
export function useUglyTheme(): [UglyTheme, React.Dispatch<React.SetStateAction<UglyTheme>>] {
  const get = useCallback((): UglyTheme => {
    if (typeof document === "undefined") return "ugly";
    const el = document.documentElement;
    if (el.classList.contains("dark")) return "dark";
    if (el.classList.contains("theme-casino")) return "casino";
    return "ugly";
  }, []);
  const [theme, setTheme] = useState<UglyTheme>(get);

  useEffect(() => {
    const el = document.documentElement;
    el.classList.remove("dark", "theme-casino", "theme-ugly");
    if (theme === "dark") el.classList.add("dark");
    else if (theme === "casino") el.classList.add("theme-casino");
    else el.classList.add("theme-ugly");
    try {
      localStorage.setItem("inf04-theme", theme);
    } catch {}
  }, [theme]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("inf04-theme");
      if (saved === "dark" || saved === "casino" || saved === "ugly") setTheme(saved);
    } catch {}
  }, []);

  return [theme, setTheme];
}

export interface ThemeToggleProps {
  value?: UglyTheme;
  onChange?: (theme: UglyTheme) => void;
}

export function ThemeToggle({ value, onChange }: ThemeToggleProps) {
  const [inner, setInner] = useUglyTheme();
  const theme = value ?? inner;
  const setTheme = onChange ?? setInner;
  const isDark = theme === "dark";
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant={isDark ? "ink" : "ghost"}
          size="sm"
          onClick={() => setTheme(isDark ? "ugly" : "dark")}
          aria-label="Przełącz motyw"
          title="Motyw: ugly / dark / casino"
        >
          {isDark ? <Sun /> : <Moon />}
          {isDark ? "JASNO" : "CIEMNO"}
        </Button>
      </TooltipTrigger>
      <TooltipContent>Motyw shadcn: .dark / .theme-casino / .theme-ugly — jedna klasa na &lt;html&gt;</TooltipContent>
    </Tooltip>
  );
}

export function ThemeCycleButton() {
  const [theme, setTheme] = useUglyTheme();
  const next: UglyTheme = theme === "ugly" ? "casino" : theme === "casino" ? "dark" : "ugly";
  const label = theme === "ugly" ? "✦ UGLY" : theme === "casino" ? "🎰 CASINO" : "🌙 DARK";
  return (
    <Button variant="secondary" size="sm" onClick={() => setTheme(next)} title="Przełącz theme: ugly → casino → dark">
      {label} →
    </Button>
  );
}
