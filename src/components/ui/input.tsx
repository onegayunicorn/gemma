import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      className={cn(
        "flex h-9 w-full rounded-md border border-border bg-surface px-3 py-1 text-sm text-foreground placeholder:text-muted",
        "transition-colors duration-150 focus-visible:border-accent focus-visible:outline-none focus-visible:shadow-[0_0_0_1px_var(--accent),0_0_18px_color-mix(in_oklab,var(--accent)_28%,transparent)]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      ref={ref}
      {...props}
    />
  ),
);
Input.displayName = "Input";
