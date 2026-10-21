import * as React from "react";
import { cn } from "@/lib/utils";

/* Input AKTA — rubryka formularza: kartka, kreska pola, mono dla danych. */

function Input({ className, type = "text", ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "w-full rounded-lg border border-input bg-kartka px-2.5 py-2 font-mono text-[13px] text-atrament outline-none placeholder:text-grafit/60 focus:border-urzad",
        className
      )}
      {...props}
    />
  );
}

export { Input };
