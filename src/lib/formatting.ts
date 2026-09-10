const TIME_FORMAT: Intl.DateTimeFormatOptions = {
  hour: "2-digit",
  minute: "2-digit",
};

export function formatTime(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleTimeString([], TIME_FORMAT);
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function estimateTokens(text: string): number {
  if (!text) return 0;
  return Math.max(1, Math.ceil(text.length / 4));
}

export function formatTokenCount(n: number): string {
  if (n < 1000) return `${n}`;
  if (n < 10_000) return `${(n / 1000).toFixed(1)}k`;
  return `${Math.round(n / 1000)}k`;
}

export function titleFromPrompt(content: string): string {
  const cleaned = content.replace(/\s+/g, " ").trim();
  if (!cleaned) return "New chat";
  if (cleaned.length <= 42) return cleaned;
  return `${cleaned.slice(0, 42).trimEnd()}…`;
}

export function startOfDay(date: Date): number {
  const copy = new Date(date);
  copy.setHours(0, 0, 0, 0);
  return copy.getTime();
}

export type DateGroup = "Pinned" | "Today" | "Yesterday" | "Last 7 days" | "Older";

export function conversationGroup(updatedAt: string, pinned?: boolean): DateGroup {
  if (pinned) return "Pinned";
  const then = startOfDay(new Date(updatedAt));
  const today = startOfDay(new Date());
  const diff = today - then;
  const day = 24 * 60 * 60 * 1000;
  if (diff < day) return "Today";
  if (diff < day * 2) return "Yesterday";
  if (diff < day * 7) return "Last 7 days";
  return "Older";
}

export function downloadText(filename: string, contents: string, mime: string) {
  const blob = new Blob([contents], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function conversationToMarkdown(title: string, messages: { role: string; content: string }[]): string {
  const body = messages
    .filter((m) => m.role === "user" || m.role === "assistant")
    .map((m) => `### ${m.role === "user" ? "You" : "Gemma"}\n\n${m.content}`)
    .join("\n\n");
  return `# ${title}\n\n${body}\n`;
}

export function conversationToText(title: string, messages: { role: string; content: string }[]): string {
  const body = messages
    .filter((m) => m.role === "user" || m.role === "assistant")
    .map((m) => `${m.role === "user" ? "You" : "Gemma"}:\n${m.content}`)
    .join("\n\n");
  return `${title}\n\n${body}\n`;
}
