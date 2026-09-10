import { useEffect } from "react";
import { useChatStore } from "@/stores/chat-store";
import { useUiStore } from "@/stores/ui-store";

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || target.isContentEditable;
}

export function useKeyboardShortcuts() {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const meta = event.metaKey || event.ctrlKey;
      const ui = useUiStore.getState();
      const chat = useChatStore.getState();

      if (event.key === "Escape") {
        if (chat.status === "streaming") {
          event.preventDefault();
          chat.stopGeneration();
          return;
        }
        ui.setSearchOpen(false);
        ui.setSettingsOpen(false);
        ui.setShortcutsOpen(false);
        ui.setSidebarOpen(false);
        return;
      }

      if (meta && event.key.toLowerCase() === "k") {
        event.preventDefault();
        ui.setSearchOpen(!ui.searchOpen);
        return;
      }

      if (meta && event.key.toLowerCase() === "n") {
        event.preventDefault();
        chat.createConversation();
        return;
      }

      if (meta && event.key === "/") {
        event.preventDefault();
        ui.setShortcutsOpen(!ui.shortcutsOpen);
        return;
      }

      if (meta && event.key === ",") {
        event.preventDefault();
        ui.setSettingsOpen(!ui.settingsOpen);
        return;
      }

      if (isTypingTarget(event.target)) return;
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
}
