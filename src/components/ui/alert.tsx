import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* Alert AKTA — adnotacja komisji: tinty urzędowe, płasko, bez trzęsienia. */
const alertVariants = cva("flex items-start gap-2.5 rounded-lg border p-3 text-[13px] leading-[1.5]", {
  variants: {
    variant: {
      default: "border-sygnal/50 bg-sygnal-tlo text-atrament",
      casino: "border-atrament bg-atrament text-kartka",
      info: "border-urzad/40 bg-urzad-tlo text-atrament",
    },
  },
  defaultVariants: { variant: "default" },
});

export interface AlertProps extends React.ComponentProps<"div">, VariantProps<typeof alertVariants> {}

function Alert({ className, variant, ...props }: AlertProps) {
  return <div data-slot="alert" role="alert" className={cn(alertVariants({ variant }), className)} {...props} />;
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="alert-title" className={cn("text-[13px] font-semibold tracking-normal", className)} {...props} />;
}

function AlertDescription({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="alert-description" className={cn("font-normal", className)} {...props} />;
}

export { Alert, AlertTitle, AlertDescription };
