import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

/* Dialog AKTA — zawiadomienie na kartce: płaska powierzchnia, kreska, cień papieru. */

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
      className={cn("fixed inset-0 z-[9999] bg-atrament/50 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0", className)}
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
          "fixed left-1/2 top-1/2 z-[9999] flex max-h-[90vh] w-[min(480px,94vw)] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-lg border border-atrament/90 bg-kartka p-0 shadow-[0_10px_28px_rgba(32,36,44,0.18)] duration-200 data-[state=open]:animate-in data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:zoom-out-95",
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
    <div data-slot="dialog-header" className={cn("relative w-full shrink-0 border-b border-linia bg-muted/70 py-2 pl-3 pr-12 text-left", className)} {...props}>
      {children}
      <DialogPrimitive.Close
        aria-label="Zamknij"
        className="absolute right-2 top-1/2 grid size-[26px] -translate-y-1/2 cursor-pointer place-items-center rounded-lg border border-linia bg-kartka text-grafit hover:bg-muted hover:text-atrament"
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
  return <DialogPrimitive.Title data-slot="dialog-title" className={cn("text-center text-[14px] font-semibold text-atrament", className)} {...props} />;
}

function DialogDescription({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return <DialogPrimitive.Description data-slot="dialog-description" className={cn("mt-2.5 px-3 text-center text-[13px] leading-[1.5] text-grafit", className)} {...props} />;
}

export { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogBody, DialogTitle, DialogDescription };
