import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/*
 * Card AKTA — kartka dokumentu: białe podłoże, atramentowa kreska, cień papieru.
 * Warianty koloru różnią się barwą paska górnego; tilt zostaje z nawami (bez obrotu).
 */
const cardVariants = cva(
  "relative flex flex-col overflow-hidden rounded-lg border bg-card text-card-foreground",
  {
    variants: {
      color: {
        solar: "border-atrament/90",
        pop: "border-atrament/90",
        electric: "border-urzad/40",
        mint: "border-doba/40",
        tangerine: "border-sygnal/40",
      },
      tilt: {
        odd: "",
        even: "",
        alt: "",
      },
    },
    defaultVariants: { color: "solar", tilt: "odd" },
  }
);

const stripeVariants = cva("h-2 w-full shrink-0 border-b border-atrament/90", {
  variants: {
    color: {
      solar: "bg-atrament",
      pop: "bg-pieczatka",
      electric: "bg-urzad",
      mint: "bg-doba",
      tangerine: "bg-sygnal",
    },
  },
  defaultVariants: { color: "solar" },
});

export type CardColor = NonNullable<VariantProps<typeof cardVariants>["color"]>;
export type CardTilt = NonNullable<VariantProps<typeof cardVariants>["tilt"]>;

export interface CardProps extends Omit<React.ComponentProps<"div">, "color">, VariantProps<typeof cardVariants> {}
export interface CardStripeProps extends Omit<React.ComponentProps<"div">, "color">, VariantProps<typeof stripeVariants> {}

function Card({ className, color, tilt, ...props }: CardProps) {
  return (
    <div
      data-slot="card"
      className={cn(
        cardVariants({ color, tilt }),
        "group shadow-[0_1px_2px_rgba(32,36,44,0.08),0_10px_28px_rgba(32,36,44,0.07)] transition-[box-shadow,transform] duration-150 hover:-translate-y-px hover:shadow-[0_2px_4px_rgba(32,36,44,0.10),0_14px_32px_rgba(32,36,44,0.10)]",
        className
      )}
      {...props}
    />
  );
}

function CardStripe({ className, color, ...props }: CardStripeProps) {
  return <div data-slot="card-stripe" className={cn(stripeVariants({ color }), className)} {...props} />;
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-header" className={cn("flex-1 p-3.5", className)} {...props} />;
}

function CardTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return <h3 data-slot="card-title" className={cn("my-2.5 text-[15px] font-semibold leading-snug tracking-normal text-atrament", className)} {...props} />;
}

function CardDescription({ className, ...props }: React.ComponentProps<"p">) {
  return <p data-slot="card-description" className={cn("mt-2 text-[12px] leading-[1.5] text-grafit", className)} {...props} />;
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-content" className={cn("p-3.5 pt-0", className)} {...props} />;
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-footer" className={cn("flex gap-1.5 border-t border-linia bg-muted/50 p-2.5", className)} {...props} />;
}

export { Card, CardStripe, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, cardVariants };
