import { ChatRequestError } from "@/lib/ai/errors";
import type { ApiError } from "@/types/chat";
import type { ChatEvent, ChatRequest } from "@/services/ai/types";

async function* parseSse(response: Response): AsyncGenerator<ChatEvent> {
  const reader = response.body?.getReader();
  if (!reader) {
    yield {
      type: "error",
      error: {
        code: "empty",
        message: "Empty response from the server.",
        retryable: true,
      },
    };
    return;
  }
  const decoder = new TextDecoder();
  let buffer = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const parts = buffer.split("\n\n");
    buffer = parts.pop() ?? "";
    for (const part of parts) {
      const line = part
        .split("\n")
        .map((l) => l.trim())
        .find((l) => l.startsWith("data:"));
      if (!line) continue;
      const data = line.slice(5).trim();
      if (!data) continue;
      try {
        const event = JSON.parse(data) as ChatEvent;
        yield event;
      } catch {
        /* ignore */
      }
    }
  }
}

export async function* streamChat(
  request: ChatRequest,
  signal?: AbortSignal,
): AsyncGenerator<ChatEvent> {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
    signal,
  });

  const contentType = response.headers.get("content-type") ?? "";
  if (!response.ok || !contentType.includes("text/event-stream")) {
    let error: ApiError = {
      code: "http",
      message: `Request failed (${response.status}).`,
      retryable: response.status >= 500,
      status: response.status,
    };
    try {
      const json = (await response.json()) as { error?: ApiError };
      if (json.error) error = json.error;
    } catch {
      /* keep fallback */
    }
    throw new ChatRequestError(error);
  }

  yield* parseSse(response);
}

export async function checkAiAvailable(): Promise<boolean> {
  try {
    const res = await fetch("/api/chat", { method: "GET" });
    if (!res.ok) return false;
    const json = (await res.json()) as { available?: boolean };
    return Boolean(json.available);
  } catch {
    return false;
  }
}
