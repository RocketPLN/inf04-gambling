import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/lib/utils";

function Progress({ className, value, indicatorClassName, ...props }) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn("h-[22px] w-full overflow-hidden border-4 border-win95 bg-white shadow-[inset_2px_2px_0_#808080] [border-style:inset]", className)}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={cn("h-full bg-[repeating-linear-gradient(90deg,#ff0000_0_12px,#ffff00_12px_24px,#00ff00_24px_36px)] bg-[length:48px_100%] transition-none", indicatorClassName)}
        style={{ width: `${value ?? 0}%` }}
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress };
