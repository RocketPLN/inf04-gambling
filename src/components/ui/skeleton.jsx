import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }) {
  return <div data-slot="skeleton" className={cn("animate-pulse border-4 border-win95 bg-[repeating-linear-gradient(90deg,#c0c0c0_0_12px,#ffff00_12px_24px)] [border-style:ridge]", className)} {...props} />;
}

export { Skeleton };
