import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* Sonner w wersji shadcn-ugly: jedna kolejka, tokeny kasyna, cn() scala pozycję. */
const toasterVariants = cva("pointer-events-auto flex w-full max-w-sm items-start gap-2 border-4 p-3 font-bold text-xs shadow-[5px_5px_0_#000]", {
  variants: {
    tone: {
      win: "border-casino-gold bg-black text-casino-goldsoft [border-style:ridge]",
      bonus: "border-ugly-yellow bg-ugly-red text-ugly-yellow animate-ugly-blink [border-style:ridge]",
      info: "border-ugly-cyan bg-white text-black [border-style:ridge]",
    },
  },
  defaultVariants: { tone: "win" },
});

export type ToastTone = NonNullable<VariantProps<typeof toasterVariants>["tone"]>;

export interface ToastProps extends Omit<React.ComponentProps<"div">, "title">, VariantProps<typeof toasterVariants> {
  title?: React.ReactNode;
  description?: React.ReactNode;
}

function Toast({ className, tone, title, description, ...props }: ToastProps) {
  return (
    <div data-slot="toast" role="status" className={cn(toasterVariants({ tone }), className)} {...props}>
      <span aria-hidden className="grid size-8 shrink-0 place-items-center border-[3px] border-white bg-ugly-pink font-mono text-[11px] font-black text-ugly-yellow [border-style:outset]">
        {tone === "bonus" ? "$" : tone === "info" ? "?" : "7"}
      </span>
      <div className="min-w-0">
        {title && <div className="font-display uppercase tracking-wider">{title}</div>}
        {description && <div className="mt-0.5 leading-snug">{description}</div>}
      </div>
    </div>
  );
}

function Toaster({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="toaster" aria-live="polite" className={cn("pointer-events-none fixed bottom-16 right-3 z-[9998] flex flex-col gap-2", className)} {...props}>
      {children}
    </div>
  );
}

export { Toast, Toaster };
