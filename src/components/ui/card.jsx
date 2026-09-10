import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* shadcn Card — wariant koloru = stary .card--solar/pop/electric/mint/tangerine (stripe + blob). */
const cardVariants = cva("relative flex flex-col overflow-hidden border-5 bg-card text-card-foreground shadow-[6px_6px_0_#000,inset_0_0_20px_#ffff00]", {
  variants: {
    color: {
      solar: "border-ugly-yellow [border-style:ridge]",
      pop: "border-ugly-pink [border-style:ridge]",
      electric: "border-cke-blue [border-style:ridge]",
      mint: "border-ugly-lime [border-style:ridge]",
      tangerine: "border-orange-500 [border-style:ridge]",
    },
    tilt: {
      odd: "rotate-[-0.7deg]",
      even: "rotate-[0.9deg]",
      alt: "rotate-[-1.2deg]",
    },
  },
  defaultVariants: { color: "solar", tilt: "odd" },
});

const stripeVariants = cva("h-[14px] border-b-4 border-black [border-bottom-style:ridge] bg-[repeating-linear-gradient(90deg,#ff0000_0_8px,#ffff00_8px_16px,#00ff00_16px_24px)]", {
  variants: {
    color: {
      solar: "bg-ugly-yellow bg-none",
      pop: "bg-ugly-pink bg-none",
      electric: "bg-cke-blue bg-none",
      mint: "bg-ugly-lime bg-none",
      tangerine: "bg-orange-500 bg-none",
    },
  },
  defaultVariants: { color: "solar" },
});

function Card({ className, color, tilt, ...props }) {
  return <div data-slot="card" className={cn(cardVariants({ color, tilt }), "group hover:rotate-0 hover:scale-[1.02] hover:z-[5] hover:shadow-[8px_8px_0_#000,0_0_30px_#ff00ff] hover:hue-rotate-[30deg]", className)} {...props} />;
}

function CardStripe({ className, color, ...props }) {
  return <div data-slot="card-stripe" className={cn(stripeVariants({ color }), className)} {...props} />;
}

function CardHeader({ className, ...props }) {
  return <div data-slot="card-header" className={cn("flex-1 p-3.5 bg-[repeating-linear-gradient(0deg,transparent_0_20px,rgba(255,255,0,0.08)_20px_21px)]", className)} {...props} />;
}

function CardTitle({ className, ...props }) {
  return <h3 data-slot="card-title" className={cn("my-2.5 font-display text-[17px] font-black leading-[1.05] tracking-wider text-ugly-pink uppercase -rotate-[0.5deg] [text-shadow:2px_2px_0_#ffff00,-1px_-1px_0_#00ffff]", className)} {...props} />;
}

function CardDescription({ className, ...props }) {
  return <p data-slot="card-description" className={cn("mt-2 bg-white border-2 border-inset border-win95 p-1.5 text-[11px] font-bold leading-[1.4] text-black", className)} {...props} />;
}

function CardContent({ className, ...props }) {
  return <div data-slot="card-content" className={cn("p-3.5 pt-0", className)} {...props} />;
}

function CardFooter({ className, ...props }) {
  return <div data-slot="card-footer" className={cn("flex gap-1.5 border-t-[5px] border-win95 bg-win95 p-2.5 [border-top-style:ridge]", className)} {...props} />;
}

export { Card, CardStripe, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, cardVariants };
