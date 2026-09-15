import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { cn } from "@/lib/utils";

function Separator({ className, orientation = "horizontal", decorative = true, ...props }: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 border-ugly-pink [border-style:dashed]",
        orientation === "horizontal" ? "h-0 w-full border-t-[5px]" : "h-full w-0 border-l-[5px]",
        className
      )}
      {...props}
    />
  );
}

export { Separator };
