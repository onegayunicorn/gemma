import { MODEL_IDS, DEFAULT_MODEL_ID, DEFAULT_SYSTEM_INSTRUCTION } from "@/lib/models";
import { clampMaxTokens, clampTemperature, clampTopP, MAX_MESSAGE_CHARS } from "@/lib/validation";
import { mapHttpError } from "@/lib/ai/errors";
import type { ChatRequest } from "@/services/ai/types";
import type { Attachment } from "@/types/chat";

type OpenAiContent =
  | string
  | Array<
      | { type: "text"; text: string }
      | { type: "image_url"; image_url: { url: string } }
    >;

interface OpenAiMessage {
  role: "system" | "user" | "assistant";
  content: OpenAiContent;
}

const CONTEXT_CHAR_BUDGET = 24_000;

function attachmentText(attachments: Attachment[] | undefined): string {
  if (!attachments?.length) return "";
  const parts: string[] = [];
  for (const file of attachments) {
    if (file.textContent) {
      parts.push(`\n\n[File: ${file.name}]\n\`\`\`\n${file.textContent.slice(0, 12_000)}\n\`\`\``);
    }
  }
  return parts.join("");
}

function toOpenAiContent(content: string, attachments: Attachment[] | undefined): OpenAiContent {
  const images = (attachments ?? []).filter(
    (a) => a.dataUrl && a.mimeType.startsWith("image/") && a.status === "ready",
  );
  const text = `${content}${attachmentText(attachments)}`.slice(0, MAX_MESSAGE_CHARS);
  if (images.length === 0) return text;
  return [
    { type: "text", text: text || "Describe the attached image." },
    ...images.map((img) => ({
      type: "image_url" as const,
      image_url: { url: img.dataUrl! },
    })),
  ];
}

function selectContext(messages: ChatRequest["messages"]): ChatRequest["messages"] {
  const picked: ChatRequest["messages"] = [];
  let used = 0;
  for (let i = messages.length - 1; i >= 0; i--) {
    const msg = messages[i]!;
    const size = msg.content.length + (msg.attachments?.reduce((n, a) => n + (a.textContent?.length ?? 0), 0) ?? 0);
    if (picked.length > 0 && used + size > CONTEXT_CHAR_BUDGET) break;
    picked.unshift(msg);
    used += size;
  }
  return picked;
}

export function buildUpstreamBody(input: ChatRequest) {
  const model = MODEL_IDS.has(input.model) ? input.model : DEFAULT_MODEL_ID;
  const temperature = clampTemperature(input.settings.temperature);
  const topP = clampTopP(input.settings.topP);
  const maxTokens = clampMaxTokens(input.settings.maxOutputTokens);
  const system = (input.settings.systemInstruction || DEFAULT_SYSTEM_INSTRUCTION).slice(0, 4000);

  const history = selectContext(input.messages.filter((m) => m.role !== "system"));
  const messages: OpenAiMessage[] = [
    { role: "system", content: system },
    ...history.map((m) => ({
      role: m.role,
      content: toOpenAiContent(m.content, m.attachments),
    })),
  ];

  return {
    model,
    messages,
    stream: true,
    temperature,
    max_tokens: maxTokens,
    stream_options: { include_usage: true },
    ...(topP < 1 ? { top_p: topP } : {}),
  };
}

export async function startXaiStream(input: ChatRequest, signal: AbortSignal): Promise<Response> {
  const apiKey = process.env.XAI_API_KEY;
  if (!apiKey) {
    return Response.json(
      {
        error: {
          code: "unavailable",
          message: "AI is not available in this environment.",
          retryable: false,
        },
      },
      { status: 503 },
    );
  }

  const body = buildUpstreamBody(input);
  let upstream: Response;
  try {
    upstream = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(body),
      signal,
    });
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") {
      return new Response(null, { status: 499 });
    }
    return Response.json(
      {
        error: {
          code: "network",
          message: "Could not reach the model. Check your connection and retry.",
          retryable: true,
        },
      },
      { status: 502 },
    );
  }

  if (!upstream.ok) {
    const text = await upstream.text().catch(() => "");
    const mapped = mapHttpError(upstream.status, text);
    return Response.json({ error: mapped }, { status: upstream.status });
  }

  if (!upstream.body) {
    return Response.json(
      {
        error: {
          code: "empty",
          message: "The model returned an empty stream.",
          retryable: true,
        },
      },
      { status: 502 },
    );
  }

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  const reader = upstream.body.getReader();

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      let buffer = "";
      const emit = (payload: unknown) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(payload)}\n\n`));
      };
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";
          for (const raw of lines) {
            const line = raw.trim();
            if (!line.startsWith("data:")) continue;
            const data = line.slice(5).trim();
            if (!data) continue;
            if (data === "[DONE]") {
              emit({ type: "done" });
              continue;
            }
            try {
              const json = JSON.parse(data) as {
                choices?: Array<{ delta?: { content?: string } }>;
                usage?: {
                  prompt_tokens?: number;
                  completion_tokens?: number;
                  total_tokens?: number;
                };
              };
              const delta = json.choices?.[0]?.delta?.content;
              if (delta) emit({ type: "delta", text: delta });
              if (json.usage) {
                emit({
                  type: "usage",
                  usage: {
                    inputTokens: json.usage.prompt_tokens,
                    outputTokens: json.usage.completion_tokens,
                    totalTokens: json.usage.total_tokens,
                  },
                });
              }
            } catch {
              /* skip malformed chunks */
            }
          }
        }
        controller.close();
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") {
          controller.close();
          return;
        }
        emit({
          type: "error",
          error: {
            code: "stream",
            message: "The stream was interrupted. Partial output was kept.",
            retryable: true,
          },
        });
        controller.close();
      }
    },
    cancel() {
      void reader.cancel();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
