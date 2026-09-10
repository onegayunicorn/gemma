import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useUiStore } from "@/stores/ui-store";

const SHORTCUTS = [
  { keys: ["⌘", "N"], action: "New chat" },
  { keys: ["⌘", "K"], action: "Search conversations" },
  { keys: ["⌘", ","], action: "Open settings" },
  { keys: ["⌘", "/"], action: "Keyboard shortcuts" },
  { keys: ["Esc"], action: "Stop generation / close dialogs" },
  { keys: ["Enter"], action: "Send message" },
  { keys: ["Shift", "Enter"], action: "New line" },
];

function isMac() {
  if (typeof navigator === "undefined") return true;
  return /Mac|iPhone|iPad/.test(navigator.platform) || /Mac OS/.test(navigator.userAgent);
}

export function ShortcutsModal() {
  const open = useUiStore((s) => s.shortcutsOpen);
  const setOpen = useUiStore((s) => s.setShortcutsOpen);
  const mac = isMac();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Keyboard shortcuts</DialogTitle>
          <DialogDescription>Stay in the editor without reaching for the mouse.</DialogDescription>
        </DialogHeader>
        <ul className="divide-y divide-border">
          {SHORTCUTS.map((item) => (
            <li key={item.action} className="flex items-center justify-between gap-3 py-2.5">
              <span className="text-sm">{item.action}</span>
              <span className="flex items-center gap-1">
                {item.keys.map((key) => (
                  <kbd
                    key={key}
                    className="rounded-sm border border-border bg-hover px-1.5 py-0.5 font-mono text-[11px] text-muted"
                  >
                    {key === "⌘" ? (mac ? "⌘" : "Ctrl") : key}
                  </kbd>
                ))}
              </span>
            </li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  );
}
