import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* Sonner AKTA — kartka z notatką MW/MW: jedna kolejka, plomba kontekstu, płasko. */
const toasterVariants = cva(
  "pointer-events-auto flex w-full max-w-sm items-start gap-2 rounded-lg border bg-kartka p-3 text-[13px] leading-[1.5] text-atrament shadow-[0_6px_18px_rgba(32,36,44,0.14)]",
  {
    variants: {
      tone: {
        win: "border-doba/50",
        bonus: "border-sygnal/60",
        info: "border-urzad/40",
      },
    },
    defaultVariants: { tone: "win" },
  }
);

export type ToastTone = NonNullable<VariantProps<typeof toasterVariants>["tone"]>;

export interface ToastProps extends Omit<React.ComponentProps<"div">, "title">, VariantProps<typeof toasterVariants> {
  title?: React.ReactNode;
  description?: React.ReactNode;
}

function Toast({ className, tone, title, description, ...props }: ToastProps) {
  return (
    <div data-slot="toast" role="status" className={cn(toasterVariants({ tone }), className)} {...props}>
      <span
        aria-hidden
        className={cn(
          "grid size-6 shrink-0 place-items-center rounded-lg border font-mono text-[11px] font-semibold uppercase",
          tone === "bonus" ? "border-sygnal/60 bg-sygnal-tlo text-sygnal" : tone === "info" ? "border-urzad/40 bg-urzad-tlo text-urzad" : "border-doba/50 bg-doba-tlo text-doba"
        )}
      >
        {tone === "bonus" ? "§" : tone === "info" ? "i" : "v"}
      </span>
      <div className="min-w-0">
        {title && <div className="text-[13px] font-semibold tracking-normal">{title}</div>}
        {description && <div className="mt-0.5 text-[12px] leading-snug text-grafit">{description}</div>}
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
