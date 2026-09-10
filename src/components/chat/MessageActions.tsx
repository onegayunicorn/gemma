import { Check, Copy, Pencil, RefreshCw, ThumbsDown, ThumbsUp } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useChatStore } from "@/stores/chat-store";
import type { Message } from "@/types/chat";

function Tip({ label, children }: { label: string; children: ReactNode }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
}

export function MessageActions({
  message,
  onEdit,
}: {
  message: Message;
  onEdit?: () => void;
}) {
  const retryMessage = useChatStore((s) => s.retryMessage);
  const setFeedback = useChatStore((s) => s.setFeedback);
  const status = useChatStore((s) => s.status);
  const [copied, setCopied] = useState(false);
  const busy = status === "streaming" || status === "submitting";

  async function copy() {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  if (message.role === "user") {
    return (
      <div className="mt-1 flex justify-end opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100">
        <Tip label="Edit">
          <Button variant="ghost" size="icon-sm" onClick={onEdit} disabled={busy} aria-label="Edit message">
            <Pencil />
          </Button>
        </Tip>
        <Tip label={copied ? "Copied" : "Copy"}>
          <Button variant="ghost" size="icon-sm" onClick={copy} aria-label="Copy message">
            {copied ? <Check /> : <Copy />}
          </Button>
        </Tip>
      </div>
    );
  }

  return (
    <div className="mt-1 flex items-center gap-0.5 opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100">
      <Tip label={copied ? "Copied" : "Copy"}>
        <Button variant="ghost" size="icon-sm" onClick={copy} aria-label="Copy response">
          {copied ? <Check /> : <Copy />}
        </Button>
      </Tip>
      <Tip label="Regenerate">
        <Button
          variant="ghost"
          size="icon-sm"
          disabled={busy}
          onClick={() => retryMessage(message.id)}
          aria-label="Regenerate"
        >
          <RefreshCw />
        </Button>
      </Tip>
      <Tip label="Good response">
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => setFeedback(message.id, message.feedback === "up" ? null : "up")}
          aria-label="Good response"
          className={message.feedback === "up" ? "text-cyan" : undefined}
        >
          <ThumbsUp />
        </Button>
      </Tip>
      <Tip label="Poor response">
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => setFeedback(message.id, message.feedback === "down" ? null : "down")}
          aria-label="Poor response"
          className={message.feedback === "down" ? "text-danger" : undefined}
        >
          <ThumbsDown />
        </Button>
      </Tip>
    </div>
  );
}
