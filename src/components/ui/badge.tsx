import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/*
 * Badge AKTA — plomby i adnotacje w rogu kartki: tinty urzędowe,
 * mono, bez beveli i bez migania (wyjątek: live, monit komisji).
 */
const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-lg border px-1.5 py-0.5 font-mono text-[10px] font-medium uppercase tracking-[0.06em] whitespace-nowrap select-none",
  {
    variants: {
      variant: {
        default: "border-linia bg-muted text-atrament",
        year: "border-urzad/40 bg-urzad-tlo text-urzad",
        pkt: "border-atrament bg-atrament text-kartka",
        odds: "border-sygnal/50 bg-sygnal-tlo text-sygnal",
        rtp: "border-sygnal/50 bg-sygnal-tlo text-sygnal",
        zip: "border-grafit/30 bg-kartka text-grafit",
        tech: "border-grafit bg-transparent text-grafit",
        live: "border-pieczatka bg-pieczatka-tlo text-pieczatka",
        bonus: "border-pieczatka/40 bg-pieczatka-tlo text-pieczatka",
        casino: "border-atrament bg-atrament text-kartka",
        outline: "border-border bg-transparent text-foreground",
        secondary: "border-linia bg-urzad-tlo text-urzad",
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
