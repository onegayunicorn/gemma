import { useEffect, type ReactNode } from "react";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts";
import { useSettingsStore } from "@/stores/settings-store";
import type { ThemePreference } from "@/types/settings";

function resolveTheme(pref: ThemePreference): "dark" | "oled" | "light" {
  if (pref === "system") {
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  }
  return pref;
}

function ThemeSync() {
  const theme = useSettingsStore((s) => s.theme);

  useEffect(() => {
    const apply = () => {
      document.documentElement.dataset.theme = resolveTheme(theme);
    };
    apply();
    if (theme !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [theme]);

  return null;
}

export function AppProviders({ children }: { children: ReactNode }) {
  useKeyboardShortcuts();
  const theme = useSettingsStore((s) => s.theme);

  return (
    <TooltipProvider delayDuration={220}>
      <ThemeSync />
      {children}
      <Toaster
        theme={theme === "light" ? "light" : "dark"}
        position="bottom-center"
        toastOptions={{
          classNames: {
            toast:
              "bg-surface text-foreground border border-border shadow-[var(--shadow)] font-sans",
            title: "text-foreground",
            description: "text-muted",
          },
        }}
      />
    </TooltipProvider>
  );
}
