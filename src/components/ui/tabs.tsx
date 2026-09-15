import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const tabsTriggerVariants = cva("flex-1 cursor-pointer border-4 border-win95 bg-win95 px-2 py-2 text-[11px] font-black shadow-[2px_2px_0_#000] uppercase outline-none [border-style:outset] data-[state=active]:bg-[#000080] data-[state=active]:text-ugly-yellow data-[state=active]:[border-style:inset]", {
  variants: {
    tone: {
      default: "",
      tag: "uppercase data-[state=active]:bg-ugly-pink data-[state=active]:text-ugly-yellow data-[state=active]:animate-ugly-blink",
    },
  },
  defaultVariants: { tone: "default" },
});

function Tabs(props: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return <TabsPrimitive.Root data-slot="tabs" {...props} />;
}

function TabsList({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) {
  return <TabsPrimitive.List data-slot="tabs-list" className={cn("flex gap-1.5", className)} {...props} />;
}

export interface TabsTriggerProps extends React.ComponentProps<typeof TabsPrimitive.Trigger>, VariantProps<typeof tabsTriggerVariants> {}

function TabsTrigger({ className, tone, ...props }: TabsTriggerProps) {
  return <TabsPrimitive.Trigger data-slot="tabs-trigger" className={cn(tabsTriggerVariants({ tone }), className)} {...props} />;
}

function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return <TabsPrimitive.Content data-slot="tabs-content" className={cn("outline-none", className)} {...props} />;
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
