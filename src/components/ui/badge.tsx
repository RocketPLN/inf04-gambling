import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* shadcn Badge — stare .card-badge/.card-pkt/.pill/.chip/.plan-year jako warianty cva. */
const badgeVariants = cva(
  "inline-flex items-center gap-1 border px-2 py-1 font-mono text-[10px] font-black uppercase tracking-wider whitespace-nowrap select-none",
  {
    variants: {
      variant: {
        default: "border-win95 bg-win95 text-black [border-style:outset] shadow-[2px_2px_0_#000]",
        year: "border-white bg-ugly-red text-ugly-yellow animate-ugly-blink [border-style:outset] shadow-[3px_3px_0_#000]",
        pkt: "border-ugly-yellow bg-ugly-red font-display text-[11px] text-ugly-yellow animate-ugly-blink [border-style:ridge]",
        odds: "border-casino-gold bg-black text-casino-gold [border-style:ridge]",
        rtp: "border-cke-green bg-black text-cke-green animate-ugly-blink [border-style:outset]",
        zip: "border-win95 bg-ugly-yellow text-ugly-red animate-ugly-blink [border-style:outset]",
        tech: "border-win95 bg-ugly-cyan text-black [border-style:outset]",
        live: "border-white bg-ugly-red font-mono text-ugly-yellow animate-ugly-blink [border-style:outset]",
        bonus: "border-ugly-yellow bg-ugly-red text-ugly-yellow [border-style:ridge]",
        casino: "border-casino-gold bg-casino-felt text-casino-gold [border-style:ridge] [text-shadow:0_0_8px_#ff0000]",
        outline: "border-border bg-transparent text-foreground",
        secondary: "border-white bg-secondary text-secondary-foreground [border-style:outset]",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps extends React.ComponentProps<"span">, VariantProps<typeof badgeVariants> {
  asChild?: boolean;
}

function Badge({ className, variant, asChild = false, ...props }: BadgeProps) {
  const Comp = asChild ? Slot : "span";
  return <Comp data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
