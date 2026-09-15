import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* shadcn Alert przepisany na stary .callout: żółto, ridge, shake. */
const alertVariants = cva("flex items-start gap-2.5 border-5 p-3 text-xs leading-[1.4] font-black shadow-[5px_5px_0_#000]", {
  variants: {
    variant: {
      default: "border-ugly-red bg-ugly-yellow text-ugly-pink animate-ugly-shake [border-style:ridge]",
      casino: "border-casino-gold bg-casino-feltdark text-casino-goldsoft [border-style:ridge]",
      info: "border-ugly-cyan bg-white text-black [border-style:ridge] [border-width:4px]",
    },
  },
  defaultVariants: { variant: "default" },
});

export interface AlertProps extends React.ComponentProps<"div">, VariantProps<typeof alertVariants> {}

function Alert({ className, variant, ...props }: AlertProps) {
  return <div data-slot="alert" role="alert" className={cn(alertVariants({ variant }), className)} {...props} />;
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="alert-title" className={cn("font-display text-sm uppercase tracking-wider", className)} {...props} />;
}

function AlertDescription({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="alert-description" className={cn("font-bold", className)} {...props} />;
}

export { Alert, AlertTitle, AlertDescription };
