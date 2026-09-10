import type { ApiError } from "@/types/chat";

export function mapHttpError(status: number, body: string): ApiError {
  const snippet = body.replace(/\s+/g, " ").slice(0, 240);
  if (status === 401 || status === 403) {
    return {
      code: "auth",
      message: "The AI provider rejected this request. Try again later.",
      retryable: false,
      status,
    };
  }
  if (status === 429) {
    return {
      code: "rate_limit",
      message: "Too many requests. Wait a moment, then retry.",
      retryable: true,
      status,
    };
  }
  if (status === 400) {
    return {
      code: "invalid_request",
      message: snippet || "The request was rejected. Try a shorter prompt or fewer attachments.",
      retryable: false,
      status,
    };
  }
  if (status === 413) {
    return {
      code: "context",
      message: "This conversation is too large for the model. Start a new chat.",
      retryable: false,
      status,
    };
  }
  if (status >= 500) {
    return {
      code: "upstream",
      message: "The model is temporarily unavailable. Retry in a moment.",
      retryable: true,
      status,
    };
  }
  return {
    code: "unknown",
    message: snippet || `Request failed (${status}).`,
    retryable: status >= 500,
    status,
  };
}

export class ChatRequestError extends Error {
  error: ApiError;
  constructor(error: ApiError) {
    super(error.message);
    this.name = "ChatRequestError";
    this.error = error;
  }
}
