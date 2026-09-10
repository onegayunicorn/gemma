import { Keyboard, Menu, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { estimateTokens, formatTokenCount } from "@/lib/formatting";
import { getModel } from "@/lib/models";
import { cn } from "@/lib/utils";
import { useChatStore } from "@/stores/chat-store";
import { useUiStore } from "@/stores/ui-store";

export function Header() {
  const toggleSidebar = useUiStore((s) => s.toggleSidebar);
  const setSettingsOpen = useUiStore((s) => s.setSettingsOpen);
  const setShortcutsOpen = useUiStore((s) => s.setShortcutsOpen);
  const conversations = useChatStore((s) => s.conversations);
  const activeId = useChatStore((s) => s.activeId);
  const status = useChatStore((s) => s.status);
  const active = conversations.find((c) => c.id === activeId);
  const model = getModel(active?.model);
  const used = estimateTokens((active?.messages ?? []).map((m) => m.content).join(" "));
  const pct = Math.min(100, Math.round((used / model.contextTokens) * 100));

  return (
    <header className="flex h-12 shrink-0 items-center justify-between gap-3 border-b border-border px-3 sm:px-5">
      <div className="flex min-w-0 items-center gap-2">
        <Button variant="ghost" size="icon-sm" className="lg:hidden" onClick={toggleSidebar} aria-label="Open sidebar">
          <Menu />
        </Button>
        <h1 className="flex items-center gap-2 text-[15px] font-semibold tracking-tight">
          <span className={cn("size-2 rounded-full bg-cyan", status === "streaming" ? "animate-pulse" : "")} />
          Gemma AI
        </h1>
        <span className="hidden text-xs text-muted sm:inline">Dark Mistral</span>
      </div>
      <div className="flex items-center gap-1 sm:gap-2">
        <div className="hidden items-center gap-2 sm:flex" title="Estimated context">
          <div className="h-1 w-16 overflow-hidden rounded-full bg-hover">
            <div className="h-full bg-accent" style={{ width: `${pct}%` }} />
          </div>
          <span className="text-[11px] text-muted tabular-nums">
            {formatTokenCount(used)} / {formatTokenCount(model.contextTokens)}
          </span>
        </div>
        <Button variant="ghost" size="icon-sm" onClick={() => setShortcutsOpen(true)} aria-label="Keyboard shortcuts">
          <Keyboard />
        </Button>
        <Button variant="ghost" size="icon-sm" onClick={() => setSettingsOpen(true)} aria-label="Settings">
          <Settings2 />
        </Button>
      </div>
    </header>
  );
}
