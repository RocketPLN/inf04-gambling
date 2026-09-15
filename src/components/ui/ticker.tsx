import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* Marquee/Ticker jako shadcn-style primitive: cva tone + prędkość, children klonowane x2 dla loopa. */
const tickerVariants = cva("overflow-hidden whitespace-nowrap border-y-[6px] font-display text-base font-black uppercase tracking-[2px]", {
  variants: {
    tone: {
      rainbow: "bg-[linear-gradient(90deg,#ff0000,#ffff00,#00ff00,#00ffff,#ff00ff,#ff0000)] bg-[length:300%_100%] animate-ugly-rainbow text-black [border-top-style:ridge] [border-bottom-style:groove] border-ugly-yellow [text-shadow:2px_2px_0_#fff,-2px_-2px_0_#ff00ff] shadow-[0_0_20px_#ff00ff,inset_0_0_20px_#ffff00]",
      casino: "border-casino-gold bg-casino-feltdark text-casino-gold [border-style:ridge] [text-shadow:0_0_12px_#ff0000,2px_2px_0_#000]",
      terminal: "border-cke-green bg-black font-mono text-[11px] text-cke-green [border-style:ridge]",
    },
    speed: {
      fast: "[&_[data-slot=ticker-track]]:animate-[ugly-marquee_8s_linear_infinite]",
      slow: "[&_[data-slot=ticker-track]]:animate-[ugly-marquee_20s_linear_infinite]",
    },
  },
  defaultVariants: { tone: "rainbow", speed: "fast" },
});

export interface TickerProps extends React.ComponentProps<"div">, VariantProps<typeof tickerVariants> {}

function Ticker({ className, tone, speed, children, ...props }: TickerProps) {
  return (
    <div data-slot="ticker" role="marquee" className={cn(tickerVariants({ tone, speed }), "py-2.5", className)} {...props}>
      <div data-slot="ticker-track" className="inline-flex font-black">
        <span className="pr-4 animate-ugly-blink">{children}</span>
        <span aria-hidden className="pr-4">
          {children}
        </span>
      </div>
    </div>
  );
}

export { Ticker, tickerVariants };
