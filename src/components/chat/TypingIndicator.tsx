import { Sparkles } from "lucide-react";

export function TypingIndicator() {
  return (
    <div className="flex items-center gap-3 text-muted" aria-live="polite" aria-label="Gemma is responding">
      <div className="flex size-8 items-center justify-center rounded-md bg-cyan/15 text-cyan">
        <Sparkles className="size-4" />
      </div>
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="typing-dot size-1.5 rounded-full bg-cyan"
            style={{ animationDelay: `${i * 0.16}s` }}
          />
        ))}
      </div>
    </div>
  );
}
