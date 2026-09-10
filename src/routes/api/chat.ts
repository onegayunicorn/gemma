import { createFileRoute } from "@tanstack/react-router";
import { startXaiStream } from "@/lib/ai/xai.server";
import { MODEL_IDS, DEFAULT_MODEL_ID } from "@/lib/models";
import { clampMaxTokens, clampTemperature, clampTopP, MAX_MESSAGE_CHARS } from "@/lib/validation";
import type { ChatRequest, ChatMessagePayload } from "@/services/ai/types";

function isRole(value: unknown): value is ChatMessagePayload["role"] {
  return value === "user" || value === "assistant" || value === "system";
}

function asRequest(raw: unknown): ChatRequest | null {
  if (!raw || typeof raw !== "object") return null;
  const body = raw as Record<string, unknown>;
  if (!Array.isArray(body.messages)) return null;
  const messages: ChatMessagePayload[] = [];
  for (const item of body.messages) {
    if (!item || typeof item !== "object") continue;
    const m = item as Record<string, unknown>;
    if (!isRole(m.role) || typeof m.content !== "string") continue;
    messages.push({
      role: m.role,
      content: m.content.slice(0, MAX_MESSAGE_CHARS),
      attachments: Array.isArray(m.attachments) ? m.attachments : undefined,
    });
  }

  if (messages.length === 0) return null;

  const settingsRaw = (body.settings ?? {}) as Record<string, unknown>;
  const model = typeof body.model === "string" && MODEL_IDS.has(body.model) ? body.model : DEFAULT_MODEL_ID;

  return {
    conversationId: typeof body.conversationId === "string" ? body.conversationId : "unknown",
    messages,
    model,
    settings: {
      temperature: clampTemperature(Number(settingsRaw.temperature)),
      topP: clampTopP(Number(settingsRaw.topP ?? 1)),
      maxOutputTokens: clampMaxTokens(Number(settingsRaw.maxOutputTokens)),
      systemInstruction: typeof settingsRaw.systemInstruction === "string" ? settingsRaw.systemInstruction : "",
    },
  };
}

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      GET: async () => {
        return Response.json({ available: Boolean(process.env.XAI_API_KEY) });
      },
      POST: async ({ request }) => {
        let parsed: unknown;
        try {
          parsed = await request.json();
        } catch {
          return Response.json(
            {
              error: {
                code: "invalid_request",
                message: "Request body must be JSON.",
                retryable: false,
              },
            },
            { status: 400 },
          );
        }
        const input = asRequest(parsed);
        if (!input) {
          return Response.json(
            {
              error: {
                code: "invalid_request",
                message: "A non-empty messages array is required.",
                retryable: false,
              },
            },
            { status: 400 },
          );
        }
        return startXaiStream(input, request.signal);
      },
    },
  },
});
