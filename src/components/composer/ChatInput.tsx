import { Paperclip, Square, ArrowUp } from "lucide-react";
import { useEffect, useRef, useState, type ClipboardEvent, type DragEvent, type FormEvent, type KeyboardEvent } from "react";
import { AttachmentPreview } from "@/components/composer/AttachmentPreview";
import { ModelSelector } from "@/components/model/ModelSelector";
import { Button } from "@/components/ui/button";
import { filesToAttachments } from "@/lib/files";
import { MAX_MESSAGE_CHARS } from "@/lib/validation";
import { cn } from "@/lib/utils";
import { useChatStore } from "@/stores/chat-store";
import { useSettingsStore } from "@/stores/settings-store";
import type { Attachment } from "@/types/chat";

export function ChatInput() {
  const activeId = useChatStore((s) => s.activeId);
  const drafts = useChatStore((s) => s.drafts);
  const setDraft = useChatStore((s) => s.setDraft);
  const sendMessage = useChatStore((s) => s.sendMessage);
  const stopGeneration = useChatStore((s) => s.stopGeneration);
  const status = useChatStore((s) => s.status);
  const enterToSend = useSettingsStore((s) => s.enterToSend);
  const [files, setFiles] = useState<Attachment[]>([]);
  const [dragging, setDragging] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const draftKey = activeId ?? "new";
  const value = drafts[draftKey] ?? "";
  const busy = status === "streaming" || status === "submitting";
  const canSend = Boolean(value.trim() || files.some((f) => f.status === "ready")) && !busy;

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 200)}px`;
  }, [value]);

  async function addFiles(list: File[]) {
    const next = await filesToAttachments(list, files.length);
    setFiles((prev) => [...prev, ...next]);
  }

  async function onSubmit(e?: FormEvent) {
    e?.preventDefault();
    if (!canSend) return;
    const content = value;
    const attachments = files.filter((f) => f.status === "ready");
    setFiles([]);
    await sendMessage(content, attachments);
    textareaRef.current?.focus();
  }

  function onKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey && enterToSend) {
      e.preventDefault();
      void onSubmit();
    }
  }

  function onPaste(e: ClipboardEvent<HTMLTextAreaElement>) {
    const pasted = Array.from(e.clipboardData.files);
    if (pasted.length) {
      e.preventDefault();
      void addFiles(pasted);
    }
  }

  function onDrop(e: DragEvent) {
    e.preventDefault();
    setDragging(false);
    const dropped = Array.from(e.dataTransfer.files);
    if (dropped.length) void addFiles(dropped);
  }

  return (
    <form
      onSubmit={(e) => void onSubmit(e)}
      onDragEnter={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragOver={(e) => e.preventDefault()}
      onDragLeave={() => setDragging(false)}
      onDrop={onDrop}
      className={cn(
        "relative rounded-md border border-border bg-surface p-2 transition-colors",
        dragging && "border-accent",
      )}
    >
      {dragging ? (
        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center rounded-md bg-background/80 text-sm text-foreground">
          Drop files here
        </div>
      ) : null}
      <AttachmentPreview files={files} onRemove={(id) => setFiles((prev) => prev.filter((f) => f.id !== id))} />
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => setDraft(draftKey, e.target.value.slice(0, MAX_MESSAGE_CHARS))}
        onKeyDown={onKeyDown}
        onPaste={onPaste}
        placeholder="Message Gemma…"
        disabled={status === "submitting"}
        rows={1}
        className="max-h-52 min-h-12 w-full resize-none bg-transparent px-2 py-2 text-sm text-foreground outline-none placeholder:text-muted"
        aria-label="Message Gemma"
      />
      <div className="flex items-center justify-between gap-2 px-1 pb-0.5">
        <div className="flex items-center gap-1">
          <input
            ref={fileRef}
            type="file"
            hidden
            multiple
            accept="image/*,.txt,.md,.json,.csv,.ts,.tsx,.js,.py,.html,.css,.yml,.yaml,.sql,.sh"
            onChange={(e) => {
              void addFiles(Array.from(e.target.files ?? []));
              e.target.value = "";
            }}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label="Attach file"
            onClick={() => fileRef.current?.click()}
          >
            <Paperclip />
          </Button>
          <ModelSelector />
        </div>
        <div className="flex items-center gap-2">
          {value.length > MAX_MESSAGE_CHARS * 0.8 ? (
            <span className="text-[11px] text-muted tabular-nums">
              {value.length.toLocaleString()} / {MAX_MESSAGE_CHARS.toLocaleString()}
            </span>
          ) : null}
          {busy ? (
            <Button type="button" variant="secondary" size="icon-sm" onClick={stopGeneration} aria-label="Stop generation">
              <Square className="size-3.5 fill-current" />
            </Button>
          ) : (
            <Button type="submit" size="icon-sm" disabled={!canSend} aria-label="Send message">
              <ArrowUp />
            </Button>
          )}
        </div>
      </div>
    </form>
  );
}
