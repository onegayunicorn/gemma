import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Badge({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm border border-border bg-hover px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}
