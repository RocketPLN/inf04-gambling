import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

/*
 * shadcn Button — sztuczki:
 * 1. cva: warianty = stara klasa .btn-hard--solar/--pop/--ink/--slot/--claim
 *    przepisana na tokeny (bg-accent, bg-primary...), wygląd 1:1.
 * 2. compoundVariants: claim + big dostaje blink, slot + big dostaje wiggle.
 * 3. asChild + Slot: <Button asChild><Link/></Button> bez wrapper-diva.
 * 4. cn(): className z callsitu zawsze wygrywa z wariantem (tailwind-merge).
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-1.5 border-4 border-outset font-bold uppercase tracking-wider cursor-pointer no-underline shadow-[4px_4px_0_#000] transition-none select-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "border-win95 bg-gradient-to-b from-white via-win95 to-win95dark text-black [border-style:outset] hover:[border-style:inset] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#000] hover:hue-rotate-90",
        solar:
          "border-ugly-red bg-gradient-to-r from-ugly-yellow to-orange-500 text-black hover:[border-style:inset]",
        yellow:
          "border-ugly-pink bg-ugly-yellow text-ugly-pink [border-style:ridge]",
        pop: "border-ugly-yellow bg-ugly-pink text-ugly-yellow [border-style:ridge]",
        ink: "border-cke-green bg-black font-mono text-cke-green [border-style:ridge]",
        ghost: "bg-white [border-style:dotted] hover:[border-style:inset]",
        slot:
          "border-casino-gold bg-gradient-to-b from-red-500 to-casino-felt text-casino-goldsoft animate-ugly-wiggle [border-style:ridge]",
        claim:
          "w-full border-casino-goldsoft bg-gradient-to-b from-casino-goldsoft to-amber-500 text-casino-felt animate-ugly-blink [border-style:ridge]",
        outline: "border-input bg-background text-foreground [border-style:outset]",
        secondary: "border-white bg-secondary text-secondary-foreground [border-style:outset]",
        destructive: "border-white bg-destructive text-destructive-foreground [border-style:outset]",
        link: "border-0 shadow-none bg-transparent text-ugly-red underline decoration-ugly-cyan decoration-wavy decoration-[3px]",
      },
      size: {
        default: "px-4 py-2.5 text-xs",
        sm: "px-2.5 py-1.5 text-[11px]",
        lg: "px-5 py-3.5 text-sm",
        big: "px-[18px] py-[14px] text-sm animate-ugly-wiggle",
        icon: "size-9 p-0",
      },
    },
    compoundVariants: [
      { variant: "claim", size: "big", className: "text-sm" },
      { variant: "slot", size: "lg", className: "text-[13px]" },
    ],
    defaultVariants: { variant: "default", size: "default" },
  }
);

function Button({ className, variant, size, asChild = false, ...props }) {
  const Comp = asChild ? Slot : "button";
  return <Comp data-slot="button" className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

export { Button, buttonVariants };
