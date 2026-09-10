import { RotateCcw } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { MODELS } from "@/lib/models";
import { cn } from "@/lib/utils";
import { useChatStore } from "@/stores/chat-store";
import { useSettingsStore } from "@/stores/settings-store";
import { useUiStore } from "@/stores/ui-store";
import type { ThemePreference } from "@/types/settings";

const THEMES: { id: ThemePreference; label: string }[] = [
  { id: "dark", label: "Dark" },
  { id: "oled", label: "OLED" },
  { id: "light", label: "Light" },
  { id: "system", label: "System" },
];

function Row({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-2.5">
      <div className="min-w-0">
        <div className="text-sm text-foreground">{label}</div>
        {hint ? <p className="mt-0.5 text-xs text-muted">{hint}</p> : null}
      </div>
      {children}
    </div>
  );
}

export function SettingsPanel() {
  const open = useUiStore((s) => s.settingsOpen);
  const setOpen = useUiStore((s) => s.setSettingsOpen);
  const theme = useSettingsStore((s) => s.theme);
  const setTheme = useSettingsStore((s) => s.setTheme);
  const enterToSend = useSettingsStore((s) => s.enterToSend);
  const setEnterToSend = useSettingsStore((s) => s.setEnterToSend);
  const showTimestamps = useSettingsStore((s) => s.showTimestamps);
  const setShowTimestamps = useSettingsStore((s) => s.setShowTimestamps);
  const compactMessages = useSettingsStore((s) => s.compactMessages);
  const setCompactMessages = useSettingsStore((s) => s.setCompactMessages);
  const saveConversations = useSettingsStore((s) => s.saveConversations);
  const setSaveConversations = useSettingsStore((s) => s.setSaveConversations);
  const generation = useSettingsStore((s) => s.generation);
  const setTemperature = useSettingsStore((s) => s.setTemperature);
  const setTopP = useSettingsStore((s) => s.setTopP);
  const setMaxOutputTokens = useSettingsStore((s) => s.setMaxOutputTokens);
  const setSystemInstruction = useSettingsStore((s) => s.setSystemInstruction);
  const resetGeneration = useSettingsStore((s) => s.resetGeneration);
  const clearAll = useChatStore((s) => s.clearAll);
  const [confirmClear, setConfirmClear] = useState(false);

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) setConfirmClear(false);
      }}
    >
      <DialogContent className="max-h-[min(40rem,calc(100dvh-2rem))] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>Appearance, chat behaviour, and generation for Gemma.</DialogDescription>
        </DialogHeader>

        <section className="space-y-2">
          <h3 className="text-xs font-medium tracking-widest text-muted uppercase">Appearance</h3>
          <div className="grid grid-cols-4 gap-1.5">
            {THEMES.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setTheme(item.id)}
                className={cn(
                  "rounded-md border px-2 py-2 text-xs font-medium transition-colors",
                  theme === item.id
                    ? "border-accent bg-accent/15 text-foreground"
                    : "border-border bg-hover/40 text-muted hover:bg-hover hover:text-foreground",
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        </section>

        <section className="mt-5 border-t border-border pt-4">
          <h3 className="text-xs font-medium tracking-widest text-muted uppercase">Chat</h3>
          <Row label="Enter to send" hint="Shift+Enter always inserts a newline">
            <Switch checked={enterToSend} onCheckedChange={setEnterToSend} aria-label="Enter to send" />
          </Row>
          <Row label="Show timestamps">
            <Switch
              checked={showTimestamps}
              onCheckedChange={setShowTimestamps}
              aria-label="Show timestamps"
            />
          </Row>
          <Row label="Compact messages">
            <Switch
              checked={compactMessages}
              onCheckedChange={setCompactMessages}
              aria-label="Compact messages"
            />
          </Row>
          <Row label="Save chats on this device" hint="Stored locally in your browser">
            <Switch
              checked={saveConversations}
              onCheckedChange={(value) => {
                setSaveConversations(value);
                if (!value) {
                  try {
                    localStorage.removeItem("gemma-conversations");
                  } catch {
                    /* ignore */
                  }
                  toast.message("Future chats will not be saved");
                }
              }}
              aria-label="Save conversations"
            />
          </Row>
        </section>

        <section className="mt-5 border-t border-border pt-4">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-xs font-medium tracking-widest text-muted uppercase">Generation</h3>
            <Button type="button" variant="ghost" size="sm" onClick={resetGeneration}>
              <RotateCcw className="size-3.5" /> Reset
            </Button>
          </div>
          <div className="space-y-4">
            <div>
              <div className="mb-2 flex items-center justify-between">
                <Label htmlFor="temperature">Temperature</Label>
                <span className="font-mono text-xs text-muted tabular-nums">
                  {generation.temperature.toFixed(2)}
                </span>
              </div>
              <Slider
                id="temperature"
                min={0}
                max={1.5}
                step={0.05}
                value={[generation.temperature]}
                onValueChange={(v) => setTemperature(v[0] ?? 0.7)}
              />
            </div>
            <div>
              <div className="mb-2 flex items-center justify-between">
                <Label htmlFor="top-p">Top P</Label>
                <span className="font-mono text-xs text-muted tabular-nums">
                  {generation.topP.toFixed(2)}
                </span>
              </div>
              <Slider
                id="top-p"
                min={0}
                max={1}
                step={0.05}
                value={[generation.topP]}
                onValueChange={(v) => setTopP(v[0] ?? 1)}
              />
            </div>
            <div>
              <div className="mb-2 flex items-center justify-between">
                <Label htmlFor="max-tokens">Max output tokens</Label>
                <span className="font-mono text-xs text-muted tabular-nums">
                  {generation.maxOutputTokens}
                </span>
              </div>
              <Slider
                id="max-tokens"
                min={256}
                max={2048}
                step={128}
                value={[generation.maxOutputTokens]}
                onValueChange={(v) => setMaxOutputTokens(v[0] ?? 1024)}
              />
            </div>
            <div>
              <Label htmlFor="system-instruction">System instruction</Label>
              <Textarea
                id="system-instruction"
                className="mt-2 min-h-28"
                value={generation.systemInstruction}
                onChange={(e) => setSystemInstruction(e.target.value.slice(0, 4000))}
              />
            </div>
          </div>
          <p className="mt-3 text-xs text-muted">
            Models: {MODELS.map((m) => m.name).join(" · ")}. Replies are generated by xAI Grok.
          </p>
        </section>

        <section className="mt-5 border-t border-border pt-4">
          <h3 className="text-xs font-medium tracking-widest text-muted uppercase">Data</h3>
          <p className="mt-1 mb-3 text-xs text-muted">
            Clears every conversation from this browser. This cannot be undone.
          </p>
          <Button
            type="button"
            variant="danger"
            size="sm"
            onClick={() => {
              if (!confirmClear) {
                setConfirmClear(true);
                return;
              }
              clearAll();
              try {
                localStorage.removeItem("gemma-conversations");
              } catch {
                /* ignore */
              }
              setConfirmClear(false);
              toast.message("All conversations deleted");
            }}
          >
            {confirmClear ? "Click again to confirm" : "Delete all conversations"}
          </Button>
        </section>
      </DialogContent>
    </Dialog>
  );
}
