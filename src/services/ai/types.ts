import type { ApiError, Attachment, TokenUsage } from "@/types/chat";

export interface ChatMessagePayload {
  role: "system" | "user" | "assistant";
  content: string;
  attachments?: Attachment[];
}

export interface GenerationRequestSettings {
  temperature: number;
  topP: number;
  maxOutputTokens: number;
  systemInstruction: string;
}

export interface ChatRequest {
  conversationId: string;
  messages: ChatMessagePayload[];
  model: string;
  settings: GenerationRequestSettings;
}

export type ChatEvent =
  | { type: "delta"; text: string }
  | { type: "usage"; usage: TokenUsage }
  | { type: "done" }
  | { type: "error"; error: ApiError };

export interface ChatStream {
  stream: AsyncIterable<ChatEvent>;
  cancel: () => void;
}
