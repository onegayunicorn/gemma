import { useEffect, useState } from "react";
import { ConversationView } from "@/components/chat/ConversationView";
import { CommandSearch } from "@/components/layout/CommandSearch";
import { Header } from "@/components/layout/Header";
import { ShortcutsModal } from "@/components/layout/ShortcutsModal";
import { Sidebar, SidebarBody } from "@/components/layout/Sidebar";
import { SettingsPanel } from "@/components/settings/SettingsPanel";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { checkAiAvailable } from "@/services/ai/chat-client";
import { useUiStore } from "@/stores/ui-store";

export function MainLayout() {
  const sidebarOpen = useUiStore((s) => s.sidebarOpen);
  const setSidebarOpen = useUiStore((s) => s.setSidebarOpen);
  const [aiAvailable, setAiAvailable] = useState<boolean | null>(null);

  useEffect(() => {
    let cancelled = false;
    checkAiAvailable()
      .then((ok) => {
        if (!cancelled) setAiAvailable(ok);
      })
      .catch(() => {
        if (!cancelled) setAiAvailable(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="flex h-dvh overflow-hidden bg-background text-foreground">
      <a
        href="#composer"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-3 focus:rounded-md focus:bg-surface focus:px-3 focus:py-2"
      >
        Skip to composer
      </a>
      <Sidebar />
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-72 bg-background p-0">
          <SidebarBody />
        </SheetContent>
      </Sheet>
      <div className="flex min-w-0 flex-1 flex-col">
        <Header />
        {aiAvailable === false ? (
          <div className="border-b border-danger/30 bg-danger/10 px-4 py-2 text-center text-xs text-danger">
            Gemma is offline in this environment. You can still browse saved chats, but new replies
            cannot be generated.
          </div>
        ) : null}
        <ConversationView />
      </div>
      <SettingsPanel />
      <ShortcutsModal />
      <CommandSearch />
    </div>
  );
}
