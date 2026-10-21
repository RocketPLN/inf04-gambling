import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/*
 * Button AKTA — przycisk jako czynność urzędowa, płasko:
 * default = pas atramentowy; ghost = biała kartka z linią formularza;
 * slot/ink = mono w pasie (sygnatura); claim = odbita pieczątka;
 * pressed = translate-y-[1px], bez beveli i bez animacji.
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-1.5 rounded-lg border font-medium whitespace-nowrap text-[13px] leading-none cursor-pointer no-underline select-none transition-none disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-urzad active:translate-y-[1px] [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "border-atrament bg-atrament text-kartka hover:bg-atrament/90",
        solar:
          "border-sygnal bg-sygnal-tlo text-sygnal hover:bg-sygnal/15",
        yellow:
          "border-urzad bg-urzad-tlo text-urzad hover:bg-urzad-tlo/70",
        pop: "border-doba bg-doba-tlo text-doba hover:bg-doba-tlo/70",
        ink: "border-atrament bg-atrament font-mono text-[11px] text-kartka hover:bg-atrament/90",
        ghost:
          "border-linia bg-kartka text-atrament hover:bg-muted",
        slot:
          "border-atrament bg-atrament font-mono text-[11px] text-kartka hover:bg-atrament/90",
        claim:
          "w-full border-2 border-pieczatka bg-pieczatka-tlo font-semibold text-pieczatka hover:bg-pieczatka hover:text-white",
        outline:
          "border-input bg-kartka text-atrament hover:border-atrament",
        secondary:
          "border-linia bg-urzad-tlo text-urzad hover:bg-urzad-tlo/70",
        destructive:
          "border-pieczatka bg-pieczatka text-white hover:bg-[#9d1d28]",
        link: "rounded-none border-0 bg-transparent p-0 text-urzad underline underline-offset-2 shadow-none hover:text-urzad/80",
      },
      size: {
        default: "px-4 py-2",
        sm: "px-2.5 py-1.5 text-[12px]",
        lg: "px-5 py-3",
        big: "px-5 py-3.5",
        icon: "size-9 p-0",
      },
    },
    compoundVariants: [
      { variant: "claim", size: "big", className: "text-[13px]" },
      { variant: "slot", size: "lg", className: "text-[13px]" },
    ],
    defaultVariants: { variant: "default", size: "default" },
  }
);

export interface ButtonProps extends React.ComponentProps<"button">, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return <Comp data-slot="button" className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

export { Button, buttonVariants };
