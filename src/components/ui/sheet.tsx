import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";

export const Sheet = DialogPrimitive.Root;
export const SheetTrigger = DialogPrimitive.Trigger;
export const SheetClose = DialogPrimitive.Close;

export const SheetContent = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & { side?: "left" | "right" }
>(({ className, children, side = "left", ...props }, ref) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-background/70" />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed z-50 flex h-full w-[min(20rem,calc(100%-2rem))] flex-col border-border bg-surface shadow-[var(--shadow)]",
        side === "left" ? "inset-y-0 left-0 border-r" : "inset-y-0 right-0 border-l",
        className,
      )}
      {...props}
    >
      <DialogPrimitive.Title className="sr-only">Conversations</DialogPrimitive.Title>
      <DialogPrimitive.Description className="sr-only">
        Browse and manage Gemma conversations
      </DialogPrimitive.Description>
      {children}
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
));
SheetContent.displayName = "SheetContent";
