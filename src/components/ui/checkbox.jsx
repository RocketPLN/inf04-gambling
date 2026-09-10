import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

function Checkbox({ className, ...props }) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer mt-0.5 size-4 shrink-0 border-[3px] border-win95dark bg-white shadow-[inset_2px_2px_0_#808080] outline-none [border-style:inset] focus-visible:outline-4 focus-visible:outline-dotted focus-visible:outline-ugly-pink disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-ugly-lime data-[state=checked]:text-ugly-red",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator data-slot="checkbox-indicator" className="grid place-items-center text-current">
        <Check className="size-3.5" strokeWidth={4} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
