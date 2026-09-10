import { Sparkles, User } from "lucide-react";
import { useState } from "react";
import { MessageActions } from "@/components/chat/MessageActions";
import { MessageContent } from "@/components/chat/MessageContent";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { formatTime } from "@/lib/formatting";
import { cn } from "@/lib/utils";
import { useChatStore } from "@/stores/chat-store";
import { useSettingsStore } from "@/stores/settings-store";
import type { Message } from "@/types/chat";

export function ChatMessage({ message }: { message: Message }) {
  const isUser = message.role === "user";
  const showTimestamps = useSettingsStore((s) => s.showTimestamps);
  const compact = useSettingsStore((s) => s.compactMessages);
  const editAndResubmit = useChatStore((s) => s.editAndResubmit);
  const retryMessage = useChatStore((s) => s.retryMessage);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(message.content);
  const streaming = message.status === "streaming";

  return (
    <article
      className={cn("group animate-message-in flex gap-3", isUser && "flex-row-reverse")}
      aria-label={isUser ? "Your message" : "Gemma response"}
    >
      <div
        className={cn(
          "mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md",
          isUser ? "bg-accent/20 text-accent" : "bg-cyan/15 text-cyan",
        )}
        aria-hidden
      >
        {isUser ? <User className="size-4" /> : <Sparkles className="size-4" />}
      </div>

      <div className={cn("min-w-0 max-w-[min(100%,44rem)]", isUser && "items-end")}>
        <div
          className={cn(
            "rounded-md px-4 leading-relaxed",
            compact ? "py-2" : "py-3",
            isUser ? "bg-user" : "border border-border bg-assistant",
            message.status === "error" && "border-danger/40",
          )}
        >
          {message.attachments && message.attachments.length > 0 ? (
            <div className="mb-2 flex flex-wrap gap-2">
              {message.attachments.map((file) =>
                file.dataUrl ? (
                  <img
                    key={file.id}
                    src={file.dataUrl}
                    alt={file.name}
                    className="h-24 w-24 rounded-sm border border-border object-cover"
                  />
                ) : (
                  <span
                    key={file.id}
                    className="rounded-sm border border-border bg-hover px-2 py-1 font-mono text-[11px] text-muted"
                  >
                    {file.name}
                  </span>
                ),
              )}
            </div>
          ) : null}

          {editing ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                void editAndResubmit(message.id, draft);
                setEditing(false);
              }}
              className="space-y-2"
            >
              <Textarea value={draft} onChange={(e) => setDraft(e.target.value)} rows={4} />
              <div className="flex justify-end gap-2">
                <Button type="button" variant="ghost" size="sm" onClick={() => setEditing(false)}>
                  Cancel
                </Button>
                <Button type="submit" size="sm">
                  Save & resubmit
                </Button>
              </div>
            </form>
          ) : isUser ? (
            <p className="whitespace-pre-wrap">{message.content}</p>
          ) : (
            <MessageContent content={message.content} streaming={streaming} />
          )}

          {message.status === "error" && message.error ? (
            <div className="mt-3 rounded-sm border border-danger/30 bg-danger/10 px-3 py-2 text-sm">
              <p className="font-medium text-danger">Unable to generate response</p>
              <p className="mt-1 text-muted">{message.error.message}</p>
              {message.error.retryable ? (
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  className="mt-2"
                  onClick={() => retryMessage(message.id)}
                >
                  Retry
                </Button>
              ) : null}
            </div>
          ) : null}

          {message.status === "cancelled" && message.content ? (
            <p className="mt-2 text-xs text-muted">Generation stopped.</p>
          ) : null}

          {showTimestamps ? (
            <span className="mt-1.5 block text-[11px] text-muted tabular-nums">{formatTime(message.createdAt)}</span>
          ) : null}
        </div>
        {!editing && message.status !== "pending" && message.status !== "streaming" ? (
          <MessageActions message={message} onEdit={isUser ? () => setEditing(true) : undefined} />
        ) : null}
      </div>
    </article>
  );
}
