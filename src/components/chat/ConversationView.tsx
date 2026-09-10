import { ArrowDown } from "lucide-react";
import { ChatInput } from "@/components/composer/ChatInput";
import { ChatMessage } from "@/components/chat/ChatMessage";
import { EmptyState } from "@/components/chat/EmptyState";
import { TypingIndicator } from "@/components/chat/TypingIndicator";
import { Button } from "@/components/ui/button";
import { useAutoScroll } from "@/hooks/use-auto-scroll";
import { useChatStore } from "@/stores/chat-store";

export function ConversationView() {
  const conversations = useChatStore((s) => s.conversations);
  const activeId = useChatStore((s) => s.activeId);
  const status = useChatStore((s) => s.status);
  const active = conversations.find((c) => c.id === activeId);
  const messages = active?.messages ?? [];

  const { containerRef, bottomRef, onScroll, isStuck, scrollToBottom } = useAutoScroll([
    messages.map((m) => `${m.id}:${m.content.length}:${m.status}`).join("|"),
    status,
  ]);

  const empty = messages.length === 0;

  return (
    <div className="relative flex min-h-0 flex-1 flex-col">
      {empty ? (
        <div className="min-h-0 flex-1 overflow-y-auto">
          <EmptyState />
        </div>
      ) : (
        <div
          ref={containerRef}
          onScroll={onScroll}
          className="min-h-0 flex-1 overflow-y-auto px-3 py-5 sm:px-6"
        >
          <div className="mx-auto w-full max-w-3xl space-y-5" aria-live="polite">
            {messages.map((message) => {
              if (
                message.role === "assistant" &&
                (message.status === "pending" || (message.status === "streaming" && !message.content))
              ) {
                return <TypingIndicator key={message.id} />;
              }
              return <ChatMessage key={message.id} message={message} />;
            })}
            <div ref={bottomRef} />
          </div>
        </div>
      )}

      {!empty && !isStuck ? (
        <div className="pointer-events-none absolute inset-x-0 bottom-28 flex justify-center sm:bottom-24">
          <Button
            type="button"
            size="sm"
            variant="secondary"
            className="pointer-events-auto shadow-[var(--shadow)]"
            onClick={scrollToBottom}
          >
            <ArrowDown className="size-3.5" /> New messages
          </Button>
        </div>
      ) : null}

      <div id="composer" className="border-t border-border px-3 pt-3 pb-14 sm:px-6 sm:pb-5">
        <div className="mx-auto w-full max-w-3xl">
          <ChatInput />
          <p className="mt-2 text-center text-xs text-muted">
            Gemma can be wrong. Double-check anything that matters.
          </p>
        </div>
      </div>
    </div>
  );
}
