import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

function Dialog(props: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

function DialogTrigger(props: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

function DialogPortal(props: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

function DialogOverlay({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn("fixed inset-0 z-[9999] bg-black/70 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0", className)}
      {...props}
    />
  );
}

function DialogContent({ className, children, ...props }: React.ComponentProps<typeof DialogPrimitive.Content>) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          "fixed left-1/2 top-1/2 z-[9999] flex max-h-[90vh] w-[min(480px,94vw)] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden border-8 border-ugly-red bg-gradient-to-b from-casino-goldsoft to-amber-500 p-0 shadow-[12px_12px_0_#000,0_0_60px_#ffd700] [border-style:ridge] duration-200 data-[state=open]:animate-in data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:zoom-out-95",
          className
        )}
        {...props}
      >
        {children}
      </DialogPrimitive.Content>
    </DialogPortal>
  );
}

function DialogHeader({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="dialog-header" className={cn("relative w-full shrink-0 border-b-[5px] border-casino-gold bg-gradient-to-r from-ugly-red to-orange-500 py-2 pl-2.5 pr-12 font-display tracking-wider text-ugly-yellow [border-bottom-style:ridge]", className)} {...props}>
      {children}
      <DialogPrimitive.Close
        aria-label="Zamknij"
        className="absolute right-2 top-1/2 grid size-[30px] -translate-y-1/2 cursor-pointer place-items-center border-[3px] border-white bg-black font-black text-white [border-style:outset] hover:[border-style:inset]"
      >
        <X className="size-4" />
        <span className="sr-only">Zamknij</span>
      </DialogPrimitive.Close>
    </div>
  );
}

function DialogBody({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="dialog-body" className={cn("min-h-0 w-full flex-1 overflow-y-auto px-0 pb-3", className)} {...props} />;
}

function DialogTitle({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return <DialogPrimitive.Title data-slot="dialog-title" className={cn("text-center font-display text-xl uppercase [text-shadow:2px_2px_0_#fff]", className)} {...props} />;
}

function DialogDescription({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return <DialogPrimitive.Description data-slot="dialog-description" className={cn("mx-3 mt-2.5 border-4 border-casino-gold bg-black p-2.5 text-center text-[13px] font-black text-white [border-style:ridge]", className)} {...props} />;
}

export { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogBody, DialogTitle, DialogDescription };
