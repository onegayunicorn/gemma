import { Sparkles } from "lucide-react";
import { useChatStore } from "@/stores/chat-store";

const PROMPTS = [
  { title: "Explain quantum computing", body: "Explain quantum computing to a curious software engineer in plain language, then give a tiny Python-flavoured analogy." },
  { title: "Build a React component", body: "Write a polished React + TypeScript autocomplete component with keyboard support and a brief usage example." },
  { title: "Research Australian history", body: "Give a concise briefing on the Federation of Australia: causes, key figures, and lasting effects." },
  { title: "Debug this approach", body: "I have a chat UI that feels laggy while streaming tokens. Walk me through the likely causes and a clean React architecture." },
];

export function EmptyState() {
  const sendMessage = useChatStore((s) => s.sendMessage);

  return (
    <div className="flex h-full flex-col items-center justify-center px-4 py-10 text-center">
      <div className="mb-5 flex size-12 items-center justify-center rounded-md border border-border bg-surface text-cyan">
        <Sparkles className="size-6" />
      </div>
      <h2 className="text-2xl font-semibold tracking-tight">Gemma AI Assistant</h2>
      <p className="mt-2 max-w-md text-sm text-muted">
        Dark Mistral interface. Ask anything — code, research, or a hard design problem.
      </p>
      <div className="mt-8 grid w-full max-w-2xl grid-cols-1 gap-2 sm:grid-cols-2">
        {PROMPTS.map((prompt) => (
          <button
            key={prompt.title}
            type="button"
            onClick={() => void sendMessage(prompt.body)}
            className="rounded-md border border-border bg-surface px-4 py-3 text-left transition-colors hover:border-accent/50 hover:bg-hover"
          >
            <div className="text-sm font-medium">{prompt.title}</div>
            <div className="mt-1 line-clamp-2 text-xs text-muted">{prompt.body}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
