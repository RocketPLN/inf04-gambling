import { useEffect } from "react";

/** Dokleja klasę do <body> dopóki flaga aktywna (SSR-safe, sprząta po sobie). */
export function useBodyClass(cls: string, active: boolean): void {
  useEffect(() => {
    if (!active) return;
    document.body.classList.add(cls);
    return () => {
      document.body.classList.remove(cls);
    };
  }, [cls, active]);
}
